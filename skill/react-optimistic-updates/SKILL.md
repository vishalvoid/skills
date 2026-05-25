---
name: react-optimistic-updates
description: TanStack Query v5 pattern for instant UI feedback on any CRUD operation without loading spinners. Apply when building lists, edit forms, or dashboards where user actions should feel instantaneous. Commits the optimistic state immediately, rolls back automatically on server error, and revalidates in the background. Works for creates (with temporary IDs), updates, and deletes.
---

# React Optimistic Updates

**Technique:** Instant-Commit, Background-Sync

Never make users wait for a loading spinner after clicking a button. Commit the change to the UI immediately, let the server catch up in the background, and roll back silently if something goes wrong.

## The Problem

Default mutation flow:

```
User clicks "Delete" → loading spinner → await DELETE /api/items/:id (200-800ms) → UI updates
```

This is visually dishonest. The user already decided. Make the UI reflect that decision instantly.

## The Pattern

### Layer 1 — Optimistic onMutate

Before the request fires, snapshot the current cache, apply the change to the cache, and return the snapshot as rollback context.

### Layer 2 — Error Rollback

If the mutation fails, `onError` receives the snapshot and restores it. The user sees the UI revert with no stale state.

### Layer 3 — Background Revalidation

`onSettled` always invalidates the query so the server's true state eventually wins — whether the mutation succeeded or failed.

## Implementation

### Core mutation hook (delete example)

```typescript
// hooks/useDeleteItem.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Item {
  id: string;
  name: string;
  [key: string]: unknown;
}

export function useDeleteItem() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/items/${id}`, { method: "DELETE" }).then((r) => {
        if (!r.ok) throw new Error("Delete failed");
      }),

    onMutate: async (id) => {
      // Cancel in-flight refetches so they don't overwrite our optimistic state
      await qc.cancelQueries({ queryKey: ["items"] });

      // Snapshot current list
      const previous = qc.getQueryData<Item[]>(["items"]);

      // Apply optimistic delete
      qc.setQueryData<Item[]>(["items"], (old = []) =>
        old.filter((item) => item.id !== id)
      );

      return { previous }; // returned as `context` in onError
    },

    onError: (_err, _id, context) => {
      // Restore snapshot on failure
      if (context?.previous) {
        qc.setQueryData(["items"], context.previous);
      }
    },

    onSettled: () => {
      // Always revalidate to ensure server truth
      qc.invalidateQueries({ queryKey: ["items"] });
    },
  });
}
```

### Optimistic create (with temporary ID)

```typescript
// hooks/useCreateItem.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface CreateItemInput {
  name: string;
  description?: string;
}

interface Item extends CreateItemInput {
  id: string;
  createdAt: string;
}

export function useCreateItem() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateItemInput) =>
      fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      }).then((r) => r.json() as Promise<Item>),

    onMutate: async (input) => {
      await qc.cancelQueries({ queryKey: ["items"] });
      const previous = qc.getQueryData<Item[]>(["items"]);

      // Insert optimistic item with temp ID
      const optimisticItem: Item = {
        ...input,
        id: `optimistic-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };

      qc.setQueryData<Item[]>(["items"], (old = []) => [
        optimisticItem,
        ...old,
      ]);

      return { previous };
    },

    onError: (_err, _input, context) => {
      if (context?.previous) {
        qc.setQueryData(["items"], context.previous);
      }
    },

    onSettled: () => {
      // Replaces temp ID with real server ID
      qc.invalidateQueries({ queryKey: ["items"] });
    },
  });
}
```

### Optimistic update (edit)

```typescript
// hooks/useUpdateItem.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdateItemInput {
  id: string;
  name?: string;
  description?: string;
}

export function useUpdateItem() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...patch }: UpdateItemInput) =>
      fetch(`/api/items/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      }).then((r) => r.json()),

    onMutate: async ({ id, ...patch }) => {
      await qc.cancelQueries({ queryKey: ["items"] });
      await qc.cancelQueries({ queryKey: ["items", id] });

      const previousList = qc.getQueryData<Item[]>(["items"]);
      const previousItem = qc.getQueryData<Item>(["items", id]);

      // Optimistically update list
      qc.setQueryData<Item[]>(["items"], (old = []) =>
        old.map((item) => (item.id === id ? { ...item, ...patch } : item))
      );

      // Optimistically update detail cache
      qc.setQueryData<Item>(["items", id], (old) =>
        old ? { ...old, ...patch } : old
      );

      return { previousList, previousItem };
    },

    onError: (_err, { id }, context) => {
      if (context?.previousList) {
        qc.setQueryData(["items"], context.previousList);
      }
      if (context?.previousItem) {
        qc.setQueryData(["items", id], context.previousItem);
      }
    },

    onSettled: (_data, _err, { id }) => {
      qc.invalidateQueries({ queryKey: ["items"] });
      qc.invalidateQueries({ queryKey: ["items", id] });
    },
  });
}
```

### Consuming in a component

```tsx
// components/ItemList.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { useDeleteItem } from "@/hooks/useDeleteItem";
import { useCreateItem } from "@/hooks/useCreateItem";

export function ItemList() {
  const { data: items = [] } = useQuery({
    queryKey: ["items"],
    queryFn: () => fetch("/api/items").then((r) => r.json()),
  });

  const deleteItem = useDeleteItem();
  const createItem = useCreateItem();

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {item.id.startsWith("optimistic-") ? (
            <span className="opacity-50">{item.name}</span> // visual hint for pending items
          ) : (
            <span>{item.name}</span>
          )}
          <button
            onClick={() => deleteItem.mutate(item.id)}
            disabled={deleteItem.isPending}
          >
            Delete
          </button>
        </li>
      ))}
      <button
        onClick={() => createItem.mutate({ name: "New Item" })}
        disabled={createItem.isPending}
      >
        Add
      </button>
    </ul>
  );
}
```

### TanStack Query Provider setup

```tsx
// app/providers.tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 min default
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
```

## Implementation Checklist

- [ ] Cancel in-flight queries with `cancelQueries` before mutating cache in `onMutate`
- [ ] Always return snapshot from `onMutate` as context
- [ ] Use `onError` to restore snapshot from context
- [ ] Use `onSettled` (not `onSuccess`) to invalidate — fires on both success and error
- [ ] Assign temporary IDs prefixed with `optimistic-` for creates so you can visually dim them
- [ ] Never use `setQueriesData` + `invalidateQueries` together on the same key — invalidation triggers a refetch that overwrites your optimistic state before it resolves

## staleTime Reference

| Data type | Recommended staleTime |
|---|---|
| User's own CRUD data | 2–5 minutes |
| Shared / collaborative | 30s – 1 minute |
| Static config / lookups | 10–30 minutes |
| Real-time data | 0–10 seconds |

## Common Mistakes

1. **`invalidateQueries` in `onSuccess` instead of `onSettled`** — if the mutation throws, the cache stays in the optimistic state permanently. Always use `onSettled`.

2. **Forgetting `cancelQueries`** — an in-flight refetch can arrive after your `setQueryData` and overwrite the optimistic state with stale server data.

3. **Mutating the snapshot** — `context.previous` is a reference. If you mutate it accidentally, rollback breaks. Always spread: `[...old]`, `{ ...old }`.

4. **Using `isPending` to disable the whole list** — disable only the specific item's button, not the entire UI. Multiple concurrent mutations are fine with optimistic updates.

5. **Not handling the optimistic item visually** — temp IDs like `optimistic-{timestamp}` should be visually dimmed (opacity-50, italic, or a spinner) so users know the item is pending.

## When to Apply

- Delete buttons in lists (most common, highest impact)
- Toggle states (completed, starred, archived)
- Inline editing / field updates
- Drag-and-drop reordering
- Like / upvote / reaction buttons
- Multi-step forms where intermediate steps can be cached

## When NOT to Apply

- Payment or booking flows where stale state is dangerous
- Operations requiring server-generated values displayed immediately (e.g., formatted invoice number)
- Real-time collaborative editing where conflicts must be resolved server-side
- Operations on data the user doesn't already have in cache
