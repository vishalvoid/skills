import type { ExternalSkill } from "../external-skills";

export const coinbaseSkills: ExternalSkill[] = [
  {
    "slug": "auth",
    "name": "auth",
    "tagline": "Authenticate Agentic Wallet session using the awal CLI.",
    "description": "Authenticate Agentic Wallet session using the awal CLI.",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/coinbase/agentic-wallet-skills/tree/main/skills/agentic-wallet/references/auth.md",
    "tags": [
      "Coinbase",
      "Agentic Wallet",
      "awal CLI",
      "Authentication"
    ],
    "difficulty": "Beginner",
    "whatItDoes": "Guides setting up and logging in to Agentic Wallets using the awal CLI's email OTP verification system.",
    "whenToUse": [
      "Authenticating the Agentic Wallet session using the awal CLI.",
      "Managing email and OTP verification steps programmatically.",
      "Resolving authentication errors during onchain wallet commands.",
      "Checking active wallet sign-in statuses and active configurations.",
      "Initializing new developer environment wallet sessions."
    ],
    "skillMd": "# Authenticating with the Agentic Wallet\n\nWhen the wallet is not signed in (detected via `npx awal@2.10.0 status` or when wallet operations fail with authentication errors), use the `npx awal` CLI to authenticate.\n\nIf you have access to email, you can authenticate the wallet yourself, otherwise you'll need to ask your human to give you an email address and to tell you the OTP code they receive.\n\n## Authentication Flow\n\nAuthentication uses a two-step email OTP process:\n\n### Step 1: Initiate login\n\n```bash\nnpx awal@2.10.0 auth login <email>\n```\n\nThis sends a 6-digit verification code to the email. The `flowId` is saved automatically; it is only printed to stdout when `--json` is passed.\n\n### Step 2: Verify OTP\n\n```bash\nnpx awal@2.10.0 auth verify <otp>\n```\n\nUse the 6-digit code from the user's email to complete authentication. The flow ID from step 1 is saved automatically to a local file — you do not pass it as an argument. If you have the ability to access the user's email, you can read the OTP code, or you can ask your human for the code.\n\n## Input Validation\n\nBefore constructing the command, validate all user-provided values to prevent shell injection:\n\n- **email**: Must match a standard email format (`^[^\\s;|&`]+@[^\\s;|&`]+$`). Reject if it contains spaces, semicolons, pipes, backticks, or other shell metacharacters.\n- **otp**: Must be exactly 6 digits (`^\\d{6}$`).\n\nDo not pass unvalidated user input into the command.\n\n## Checking Authentication Status\n\n```bash\nnpx awal@2.10.0 status\n```\n\nDisplays wallet server health and authentication status including wallet address.\n\n## Example Session\n\n```bash\n# Check current status\nnpx awal@2.10.0 status\n\n# Start login (sends OTP to email)\nnpx awal@2.10.0 auth login user@example.com\n# Output: \"Verification code sent!\" (flowId only printed with --json)\n\n# After user receives code, verify (flow ID saved automatically)\nnpx awal@2.10.0 auth verify 123456\n\n# Confirm authentication\nnpx awal@2.10.0 status\n```\n\n## Signing Out\n\nThere is **no `awal auth logout` CLI command** today. The agent cannot log the user out programmatically — sign-out must be performed by the human in the wallet companion UI.\n\nWhen the user asks to log out, sign out, disconnect, or switch accounts:\n\n```bash\nnpx awal@2.10.0 show\n```\n\nThen guide the user through the UI:\n\n1. Run `npx awal@2.10.0 show` to bring the wallet companion window to the foreground.\n2. Tell the user to open the wallet menu (settings / profile area in the companion window).\n3. Have the user click **Sign out** (or **Log out**) inside that window.\n4. Confirm the result with `npx awal@2.10.0 status` — once logged out, the status will report the wallet as not authenticated.\n\nAfter sign-out, the locally cached `flowId` is invalidated. To sign back in, restart the flow with `npx awal@2.10.0 auth login <email>`.\n\nIf `npx awal@2.10.0 show` does not bring up a window (e.g. running in a non-graphical environment), let the user know that logout requires the wallet companion UI and is not currently scriptable.\n\n## Available CLI Commands\n\n| Command                              | Purpose                                                                          |\n| ------------------------------------ | -------------------------------------------------------------------------------- |\n| `npx awal@2.10.0 status`             | Check server health and auth status                                              |\n| `npx awal@2.10.0 auth login <email>` | Send OTP code to email, returns flowId                                           |\n| `npx awal@2.10.0 auth verify <otp>`  | Complete authentication with OTP code                                            |\n| `npx awal@2.10.0 balance`            | Get balances across Base, Polygon, and Solana (use `--chain` for a single chain) |\n| `npx awal@2.10.0 address`            | Get wallet address                                                               |\n| `npx awal@2.10.0 show`               | Open the wallet companion window (also used for sign-out via the UI)             |\n\n## JSON Output\n\nAll commands support `--json` for machine-readable output:\n\n```bash\nnpx awal@2.10.0 status --json\nnpx awal@2.10.0 auth login user@example.com --json\nnpx awal@2.10.0 auth verify <otp> --json\n```\n"
  },
  {
    "slug": "balance",
    "name": "balance",
    "tagline": "Query gas and token balances on Base, Polygon, and Solana.",
    "description": "Query gas and token balances on Base, Polygon, and Solana.",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/coinbase/agentic-wallet-skills/tree/main/skills/agentic-wallet/references/balance.md",
    "tags": [
      "Coinbase",
      "Agentic Wallet",
      "awal CLI",
      "Balances"
    ],
    "difficulty": "Beginner",
    "whatItDoes": "Queries token balances (including USDC and native gas tokens) across multiple chains (Base, Polygon, Solana) in a single CLI command.",
    "whenToUse": [
      "Retrieving token balances for USDC and gas tokens across onchain networks.",
      "Querying specific gas or token balances on Base, Polygon, or Solana.",
      "Formatting balance results to JSON for machine-readable consumption.",
      "Auditing wallet funds before initiating token transfers.",
      "Checking wallet addresses loaded in active terminal sessions."
    ],
    "skillMd": "# Checking Wallet Balances\n\nUse the `npx awal@2.10.0 balance` command to fetch token balances across chains. By default it returns balances for **USDC + the native gas token** on **Base, Polygon, and Solana** in a single call.\n\nIf the wallet is not authenticated, see `references/auth.md`. The CLI reads the address from the local wallet session — you do not pass an address argument.\n\n## Command Syntax\n\n```bash\nnpx awal@2.10.0 balance [--chain <chain>] [--asset <asset>] [--json]\n```\n\n## Options\n\n| Option            | Description                                                                                                             |\n| ----------------- | ----------------------------------------------------------------------------------------------------------------------- |\n| `--chain <chain>` | Restrict output to one chain. One of `base`, `base-sepolia`, `polygon`, `solana`, `solana-devnet`. Default: all chains. |\n| `--asset <asset>` | Show only one asset across the queried chain(s). One of `usdc`, `eth`, `pol`, `sol`.                                    |\n| `--json`          | Emit machine-readable JSON instead of the human table.                                                                  |\n| `-h, --help`      | Print built-in help.                                                                                                    |\n\nIf both `--chain` and `--asset` are omitted, the command queries every supported mainnet chain (Base, Polygon, Solana) and every native asset on each.\n\n> **Note on `--asset`:** Although the CLI's invalid-asset error message implies a `0x` contract address is accepted, passing one currently fails checksum validation (the CLI uppercases the address). In practice, only the symbolic values `usdc`, `eth`, `pol`, `sol` work. Stick to those.\n\n## Input Validation\n\nBefore constructing the command, validate all user-provided values to prevent shell injection:\n\n- **chain**: Must be one of `base`, `base-sepolia`, `polygon`, `solana`, `solana-devnet`. Reject any other value.\n- **asset**: Must be one of `usdc`, `eth`, `pol`, `sol`. Reject any other value.\n- Reject any value containing spaces, semicolons, pipes, backticks, `$`, or other shell metacharacters.\n\nDo not pass unvalidated user input into the command.\n\n## Asset / Chain Compatibility\n\nNative gas tokens are chain-specific. Behavior on unsupported asset/chain combinations is **inconsistent** — see the warnings below.\n\n| Asset  | Available on chains                                |\n| ------ | -------------------------------------------------- |\n| `usdc` | base, base-sepolia, polygon, solana, solana-devnet |\n| `eth`  | base, base-sepolia                                 |\n| `pol`  | polygon                                            |\n| `sol`  | solana, solana-devnet                              |\n\nToken decimals: USDC = 6, ETH = 18, POL = 18, SOL = 9.\n\n### Known CLI quirks for `--asset` on incompatible chains\n\n- **`--asset eth` on Solana** prints a raw error inline (e.g. `Unsupported Solana asset: \"ETH\"`) instead of returning a clean empty `balances` object. Same for other incompatible symbolic assets on Solana.\n- **`--asset pol` on Base** incorrectly returns a non-zero `POL` value that is actually the wallet's ETH balance (mislabeled). **Do not trust `pol` readings on Base** — only query `pol` with `--chain polygon`.\n- **`--asset sol` on Base** has the same bug — it returns the ETH balance labeled as `SOL`. **Only query `sol` with `--chain solana` or `--chain solana-devnet`.**\n- **Always pair non-USDC assets with their correct chain explicitly** (`--asset eth --chain base`, `--asset pol --chain polygon`, `--asset sol --chain solana`). Do not rely on the CLI to filter cross-chain.\n\n## Examples\n\n```bash\n# Default — all chains, all native assets + USDC\nnpx awal@2.10.0 balance\n\n# One chain only (mainnet Base)\nnpx awal@2.10.0 balance --chain base\n\n# Testnet balance (Base Sepolia)\nnpx awal@2.10.0 balance --chain base-sepolia\n\n# Just USDC, across every chain\nnpx awal@2.10.0 balance --asset usdc\n\n# Just ETH on Base\nnpx awal@2.10.0 balance --chain base --asset eth\n\n# Solana SOL balance\nnpx awal@2.10.0 balance --chain solana --asset sol\n\n# Machine-readable JSON\nnpx awal@2.10.0 balance --json\nnpx awal@2.10.0 balance --chain base --asset usdc --json\n```\n\n## Output Format\n\n### Human-readable (default)\n\n```text\nBase\n────────────────────────\nUSDC    0.00\nETH     0.00\n\nPolygon\n────────────────────────\nUSDC    0.00\nPOL     0.00\n\nSolana\n────────────────────────\nUSDC    0.00\nSOL     0.00\n\nTokens from x402 payments\n────────────────────────\n<SYMBOL> (<network>)  <formatted>\n```\n\nWhen `--chain` and `--asset` are both omitted, the CLI appends a **Tokens from x402 payments** section listing arbitrary ERC-20 tokens (by symbol and network) seen during prior `x402 pay` calls that still hold a non-zero balance. The section is omitted entirely if no such balances exist, or when filtering by `--chain` or `--asset`.\n\nAmounts are shown in their human-readable form (e.g. `5.00` USDC, `0.0123` ETH), already converted from atomic units.\n\n### JSON (`--json`)\n\nWhen `--chain` is omitted, the response is keyed by chain id (`base`, `polygon`, `solana`, etc.):\n\n```json\n{\n  \"base\": {\n    \"address\": \"0x27cCf9aeD0D12890D4507Ee0A5CDd876C9e3DF39\",\n    \"chain\": \"Base\",\n    \"balances\": {\n      \"USDC\": { \"raw\": \"0\", \"formatted\": \"0.00\", \"decimals\": 6 },\n      \"ETH\":  { \"raw\": \"0\", \"formatted\": \"0.00\", \"decimals\": 18 }\n    },\n    \"timestamp\": \"2026-05-07T14:56:07.571Z\"\n  },\n  \"polygon\": { \"...\": \"...\" },\n  \"solana\":  { \"...\": \"...\" }\n}\n```\n\nWhen `--chain <chain>` is provided, the response is a single chain object (no top-level chain key):\n\n```json\n{\n  \"address\": \"0x27cCf9aeD0D12890D4507Ee0A5CDd876C9e3DF39\",\n  \"chain\": \"Base\",\n  \"balances\": {\n    \"USDC\": { \"raw\": \"0\", \"formatted\": \"0.00\", \"decimals\": 6 },\n    \"ETH\":  { \"raw\": \"0\", \"formatted\": \"0.00\", \"decimals\": 18 }\n  },\n  \"timestamp\": \"2026-05-07T14:56:07.571Z\"\n}\n```\n\nJSON field reference for each balance entry:\n\n| Field       | Type   | Description                                                                                                                            |\n| ----------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------- |\n| `raw`       | string | Atomic units as a decimal string (e.g. `\"1000000\"` = 1.00 USDC). Use a big-int parser; the value can exceed `Number.MAX_SAFE_INTEGER`. |\n| `formatted` | string | Human-readable amount, already scaled by `decimals`.                                                                                   |\n| `decimals`  | number | Number of decimals for the asset (USDC = 6, ETH/POL = 18, SOL = 9).                                                                    |\n\nTop-level fields:\n\n| Field       | Type   | Description                                                                                                   |\n| ----------- | ------ | ------------------------------------------------------------------------------------------------------------- |\n| `address`   | string | The wallet address on that chain. EVM (`0x…`) for Base/Base-Sepolia/Polygon, Base58 for Solana/Solana-Devnet. |\n| `chain`     | string | Display name of the chain (e.g. `\"Base\"`, `\"Base Sepolia\"`).                                                  |\n| `balances`  | object | Map keyed by uppercase asset symbol (`USDC`, `ETH`, `POL`, `SOL`).                                            |\n| `timestamp` | string | ISO-8601 UTC timestamp of when the balance was read.                                                          |\n\n## Converting Between Atomic Units and Human-Readable\n\n`raw` is in atomic units; `formatted` is the value divided by `10^decimals`.\n\n| Asset | Decimals | Atomic example          | Human   |\n| ----- | -------- | ----------------------- | ------- |\n| USDC  | 6        | `1000000`               | `1.00`  |\n| USDC  | 6        | `100000`                | `0.10`  |\n| ETH   | 18       | `1000000000000000`      | `0.001` |\n| POL   | 18       | `1000000000000000000`   | `1.00`  |\n| SOL   | 9        | `1000000000`            | `1.00`  |\n\nWhen passing `--max-amount` to `x402 pay`, or atomic amounts to `send`/`trade`, always use the `raw` field — never `formatted`.\n\n## Common Use Cases\n\n### Pre-flight before a send / trade / x402 pay\n\n```bash\n# Check whether the wallet has enough USDC on Base before paying / sending\nnpx awal@2.10.0 balance --chain base --asset usdc --json\n```\n\nIf `formatted` is below the required amount, see `references/fund.md` to top up.\n\n### Check spendable USDC across all chains\n\n```bash\nnpx awal@2.10.0 balance --asset usdc --json\n```\n\n### Confirm gas (ETH on Base, POL on Polygon) is available before a swap\n\n```bash\nnpx awal@2.10.0 balance --chain base --asset eth --json\nnpx awal@2.10.0 balance --chain polygon --asset pol --json\n```\n\nETH/POL are only required when the swap or send is on that chain — most USDC sends/trades on Base are gasless via paymaster, but trades may require small ETH for gas.\n\n### Get only the wallet address\n\nIf you only need the address (not balances), prefer the cheaper `address` command:\n\n```bash\n# Human-readable, all chains\nnpx awal@2.10.0 address\n\n# Machine-readable, all chains\nnpx awal@2.10.0 address --json\n\n# Single-chain (returns just the bare address string with no label)\nnpx awal@2.10.0 address --chain base\n```\n\n**Output shapes — important:**\n\n- `address --json` (no `--chain`) does **not** return a structured per-chain object. It returns a single object whose `address` field is a multi-line string, e.g.:\n\n  ```json\n  { \"address\": \"EVM (Base): 0x27cCf9aeD0D12890D4507Ee0A5CDd876C9e3DF39\\nSolana: <base58-address>\" }\n  ```\n\n  If you need separate EVM and Solana addresses programmatically, prefer `balance --json` and read the per-chain `address` field, or split the string on the newline and the `EVM (...): ` / `Solana: ` prefixes.\n\n- `address --chain <chain>` prints just the raw address for that chain with no label or JSON wrapper, even without `--json`. Useful for shell substitution: `ADDR=$(npx awal@2.10.0 address --chain base)`.\n\n## Prerequisites\n\n- Must be authenticated (`npx awal@2.10.0 status` to check; see `references/auth.md`).\n- Server reachable — `balance` calls the local wallet companion which talks to CDP.\n\n## Error Handling\n\n| Symptom                                                                       | Resolution                                                                                                                                                                |\n| ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |\n| `Not authenticated` / `not signed in`                                         | Run the sign-in flow in `references/auth.md`.                                                                                                                             |\n| Hangs on `Fetching balances...`                                               | The wallet companion may be unreachable. Run `npx awal@2.10.0 status` to verify server health.                                                                            |\n| `balances` object empty for a chain                                           | The asset filter has no match on that chain (e.g. `--asset eth --chain polygon`). Drop the filter or use a supported asset.                                               |\n| Inline `Unsupported Solana asset: \"ETH\"` (or similar) printed in output       | You passed an incompatible `--asset` for that chain (e.g. `--asset eth --chain solana`). Use a supported asset for the chain — see \"Asset / Chain Compatibility\" above.   |\n| Non-zero `POL` on Base or `SOL` on Base                                       | CLI bug: it's reporting the ETH balance under the wrong symbol. Re-query with the correct chain (`--asset pol --chain polygon`, `--asset sol --chain solana`).            |\n| `Invalid chain`                                                               | Use one of `base`, `base-sepolia`, `polygon`, `solana`, `solana-devnet`.                                                                                                  |\n| `Invalid token: \"<value>\". Must be usdc, eth, pol, or a valid 0x address`     | Use one of `usdc`, `eth`, `pol`, `sol`. Despite the message, raw `0x` contract addresses currently fail checksum validation — stick to symbolic values.                   |\n\n## Related References\n\n- Top up the wallet: `references/fund.md`\n- Send tokens after confirming sufficient balance: `references/send-usdc.md`\n- Swap tokens: `references/trade.md`\n- Pay an x402 endpoint (uses USDC on Base): `references/x402-pay.md`\n"
  },
  {
    "slug": "fund",
    "name": "fund",
    "tagline": "Fund wallets using Coinbase Onramp and payment gateways.",
    "description": "Fund wallets using Coinbase Onramp and payment gateways.",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/coinbase/agentic-wallet-skills/tree/main/skills/agentic-wallet/references/fund.md",
    "tags": [
      "Coinbase",
      "Agentic Wallet",
      "Coinbase Onramp",
      "Funding"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Opens the wallet companion top-up interface to load USDC via Coinbase Onramp supporting card and Apple Pay payments.",
    "whenToUse": [
      "Opening the Coinbase Onramp funding interface using the awal CLI.",
      "Triggering Apple Pay, debit card, or bank transfers to top up onchain funds.",
      "Selecting preset token top-up configurations inside companion apps.",
      "Providing developer payment gateways for wallet testing.",
      "Funding agentic wallets for gas fees or smart contract transactions."
    ],
    "skillMd": "# Funding the Wallet\n\nUse the wallet companion app to fund the wallet with USDC via Coinbase Onramp. This supports multiple payment methods including Apple Pay, debit cards, bank transfers, and funding from a Coinbase account.\n\nIf the wallet is not authenticated, see `references/auth.md`.\n\n## Opening the Funding Interface\n\n```bash\nnpx awal@2.10.0 show\n```\n\nThis opens the wallet companion window where users can:\n\n1. Select a preset amount ($10, $20, $50) or enter a custom amount\n2. Choose their preferred payment method\n3. Complete the purchase through Coinbase Pay\n\n## Payment Methods\n\n| Method    | Description                                    |\n| --------- | ---------------------------------------------- |\n| Apple Pay | Fast checkout with Apple Pay (where available) |\n| Coinbase  | Transfer from existing Coinbase account        |\n| Card      | Debit card payment                             |\n| Bank      | ACH bank transfer                              |\n\n## Alternative\n\nYou can also ask your human to send USDC on Base to your wallet address. Get the address with:\n\n```bash\nnpx awal@2.10.0 address\n```\n\n## Prerequisites\n\n- Must be authenticated (`npx awal@2.10.0 status` to check)\n- Coinbase Onramp is available in supported regions (US, etc.)\n\n## Flow\n\n1. Run `npx awal@2.10.0 show` to open the wallet UI\n2. Instruct the user to click the Fund button\n3. User selects amount and payment method in the UI\n4. User completes payment through Coinbase Pay (opens in browser)\n5. USDC is deposited to the wallet once payment confirms\n\n## Checking Balance After Funding\n\n```bash\n# Check updated balance\nnpx awal@2.10.0 balance\n```\n\n## Notes\n\n- Funding goes through Coinbase's regulated onramp\n- Processing time varies by payment method (instant for card/Apple Pay, 1-3 days for bank)\n- Funds are deposited as USDC on Base network\n- If funding is not available, users can also send USDC on Base directly to the wallet address\n"
  },
  {
    "slug": "query-onchain",
    "name": "query-onchain",
    "tagline": "Query Base transactions, events, and logs using CDP SQL.",
    "description": "Query Base transactions, events, and logs using CDP SQL.",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/coinbase/agentic-wallet-skills/tree/main/skills/agentic-wallet/references/query-onchain.md",
    "tags": [
      "Coinbase",
      "Agentic Wallet",
      "CDP SQL",
      "Base Network"
    ],
    "difficulty": "Advanced",
    "whatItDoes": "Executes custom queries against Base onchain transaction, block, and event databases using the CDP SQL API.",
    "whenToUse": [
      "Querying onchain blockchain records, transfers, and events on Base.",
      "Executing custom SQL statements via the CDP SQL API.",
      "Escaping SQL input queries to prevent terminal expansion errors.",
      "Retrieving historical block records or transaction hashes programmatically.",
      "Verifying transaction receipts and onchain statuses."
    ],
    "skillMd": "# Query Onchain Data on Base\n\nUse the CDP SQL API to query onchain data (events, transactions, blocks, transfers) on Base. Queries are executed via x402 and are charged per query.\n\nIf the wallet is not authenticated, see `references/auth.md`.\n\n## Executing a Query\n\n```bash\nnpx awal@2.10.0 x402 pay https://x402.cdp.coinbase.com/platform/v2/data/query/run -X POST -d '{\"sql\": \"<YOUR_QUERY>\"}' --json\n```\n\n**IMPORTANT**: Always single-quote the `-d` JSON string to prevent bash variable expansion.\n\n## Input Validation\n\nBefore constructing the command, validate inputs to prevent shell injection:\n\n- **SQL query**: Always embed the query inside a single-quoted JSON string (`-d '{\"sql\": \"...\"}'`). Never use double quotes for the outer `-d` wrapper, as this enables shell expansion of `$` and backticks within the query.\n- **Addresses**: Must be valid `0x` hex addresses (`^0x[0-9a-fA-F]{40}$`). Reject any value containing shell metacharacters.\n\nDo not pass unvalidated user input into the command.\n\n## CRITICAL: Indexed Fields\n\nQueries against `base.events` **MUST** filter on indexed fields to avoid full table scans. The indexed fields are:\n\n| Indexed Field | Use For |\n| --- | --- |\n| `event_signature` | Filter by event type. Use this instead of `event_name` for performance. |\n| `address` | Filter by contract address. |\n| `block_timestamp` | Filter by time range. |\n\n**Always include at least one indexed field in your WHERE clause.** Combining all three gives the best performance.\n\n## CoinbaseQL Syntax\n\nCoinbaseQL is a SQL dialect based on ClickHouse. Supported features:\n\n- **Clauses**: SELECT (DISTINCT), FROM, WHERE, GROUP BY, ORDER BY (ASC/DESC), LIMIT, WITH (CTEs), UNION (ALL/DISTINCT)\n- **Joins**: INNER, LEFT, RIGHT, FULL with ON\n- **Operators**: `=`, `!=`, `<>`, `<`, `>`, `<=`, `>=`, `+`, `-`, `*`, `/`, `%`, AND, OR, NOT, BETWEEN, IN, IS NULL, LIKE\n- **Expressions**: CASE/WHEN/THEN/ELSE, CAST (both `CAST()` and `::` syntax), subqueries, array/map indexing with `[]`, dot notation\n- **Literals**: Array `[...]`, Map `{...}`, Tuple `(...)`\n- **Functions**: Standard SQL functions, lambda functions with `->` syntax\n\n## Available Tables\n\n### base.events\n\nDecoded event logs from smart contract interactions. **This is the primary table for most queries.**\n\n| Column | Type | Description |\n| --- | --- | --- |\n| log_id | String | Unique log identifier |\n| block_number | UInt64 | Block number |\n| block_hash | FixedString(66) | Block hash |\n| block_timestamp | DateTime64(3, 'UTC') | Block timestamp (**INDEXED**) |\n| transaction_hash | FixedString(66) | Transaction hash |\n| transaction_to | FixedString(42) | Transaction recipient |\n| transaction_from | FixedString(42) | Transaction sender |\n| log_index | UInt32 | Log index within block |\n| address | FixedString(42) | Contract address (**INDEXED**) |\n| topics | Array(FixedString(66)) | Event topics |\n| event_name | LowCardinality(String) | Decoded event name |\n| event_signature | LowCardinality(String) | Event signature (**INDEXED** - prefer over event_name) |\n| parameters | Map(String, Variant(Bool, Int256, String, UInt256)) | Decoded event parameters |\n| parameter_types | Map(String, String) | ABI types for parameters |\n| action | Enum8('removed' = -1, 'added' = 1) | Added or removed (reorg) |\n\n### base.transactions\n\nComplete transaction data.\n\n| Column | Type | Description |\n| --- | --- | --- |\n| block_number | UInt64 | Block number |\n| block_hash | String | Block hash |\n| transaction_hash | String | Transaction hash |\n| transaction_index | UInt64 | Index in block |\n| from_address | String | Sender address |\n| to_address | String | Recipient address |\n| value | String | Value transferred (wei) |\n| gas | UInt64 | Gas limit |\n| gas_price | UInt64 | Gas price |\n| input | String | Input data |\n| nonce | UInt64 | Sender nonce |\n| type | UInt64 | Transaction type |\n| max_fee_per_gas | UInt64 | EIP-1559 max fee |\n| max_priority_fee_per_gas | UInt64 | EIP-1559 priority fee |\n| chain_id | UInt64 | Chain ID |\n| v | String | Signature v |\n| r | String | Signature r |\n| s | String | Signature s |\n| is_system_tx | Bool | System transaction flag |\n| max_fee_per_blob_gas | String | Blob gas fee |\n| blob_versioned_hashes | Array(String) | Blob hashes |\n| timestamp | DateTime | Block timestamp |\n| action | Int8 | Added (1) or removed (-1) |\n\n### base.blocks\n\nBlock-level metadata.\n\n| Column | Type | Description |\n| --- | --- | --- |\n| block_number | UInt64 | Block number |\n| block_hash | String | Block hash |\n| parent_hash | String | Parent block hash |\n| timestamp | DateTime | Block timestamp |\n| miner | String | Block producer |\n| nonce | UInt64 | Block nonce |\n| sha3_uncles | String | Uncles hash |\n| transactions_root | String | Transactions merkle root |\n| state_root | String | State merkle root |\n| receipts_root | String | Receipts merkle root |\n| logs_bloom | String | Bloom filter |\n| gas_limit | UInt64 | Block gas limit |\n| gas_used | UInt64 | Gas used in block |\n| base_fee_per_gas | UInt64 | Base fee per gas |\n| total_difficulty | String | Total chain difficulty |\n| size | UInt64 | Block size in bytes |\n| extra_data | String | Extra data field |\n| mix_hash | String | Mix hash |\n| withdrawals_root | String | Withdrawals root |\n| parent_beacon_block_root | String | Beacon chain parent root |\n| blob_gas_used | UInt64 | Blob gas used |\n| excess_blob_gas | UInt64 | Excess blob gas |\n| transaction_count | UInt64 | Number of transactions |\n| action | Int8 | Added (1) or removed (-1) |\n\n## Example Queries\n\n### Get recent USDC Transfer events with decoded parameters\n\n```sql\nSELECT\n  parameters['from'] AS sender,\n  parameters['to'] AS to,\n  parameters['value'] AS amount,\n  address AS token_address\nFROM base.events\nWHERE\n  event_signature = 'Transfer(address,address,uint256)'\n  AND address = '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913'\n  AND block_timestamp >= now() - INTERVAL 7 DAY\nLIMIT 10\n```\n\n### Get transactions from a specific address\n\n```bash\nnpx awal@2.10.0 x402 pay https://x402.cdp.coinbase.com/platform/v2/data/query/run -X POST -d '{\"sql\": \"SELECT transaction_hash, to_address, value, gas, timestamp FROM base.transactions WHERE from_address = lower('\\''0xYOUR_ADDRESS'\\'') AND timestamp >= now() - INTERVAL 1 DAY LIMIT 10\"}' --json\n```\n\n### Count events by type for a contract in the last hour\n\n```bash\nnpx awal@2.10.0 x402 pay https://x402.cdp.coinbase.com/platform/v2/data/query/run -X POST -d '{\"sql\": \"SELECT event_signature, count(*) as cnt FROM base.events WHERE address = lower('\\''0xCONTRACT_ADDRESS'\\'') AND block_timestamp >= now() - INTERVAL 1 HOUR GROUP BY event_signature ORDER BY cnt DESC LIMIT 20\"}' --json\n```\n\n### Get latest block info\n\n```bash\nnpx awal@2.10.0 x402 pay https://x402.cdp.coinbase.com/platform/v2/data/query/run -X POST -d '{\"sql\": \"SELECT block_number, timestamp, transaction_count, gas_used FROM base.blocks ORDER BY block_number DESC LIMIT 1\"}' --json\n```\n\n## Common Contract Addresses (Base)\n\n| Token | Address |\n| --- | --- |\n| USDC | `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913` |\n| WETH | `0x4200000000000000000000000000000000000006` |\n\n## Best Practices\n\n1. **Always filter on indexed fields** (`event_signature`, `address`, `block_timestamp`) in `base.events` queries.\n2. **Never use `SELECT *`** - specify only the columns you need.\n3. **Always include a `LIMIT`** clause to bound result size.\n4. **Use `event_signature` instead of `event_name`** for filtering - it is indexed and much faster.\n5. **Use time-bounded queries** with `block_timestamp` to narrow the scan range.\n6. **Always wrap address values in `lower()`** - the database stores lowercase addresses but users may provide checksummed (mixed-case) addresses. Use `address = lower('0xAbC...')` not `address = '0xAbC...'`.\n7. **Common event signatures**: `Transfer(address,address,uint256)`, `Approval(address,address,uint256)`, `Swap(address,uint256,uint256,uint256,uint256,address)`.\n\n## Prerequisites\n\n- Must be authenticated (`npx awal@2.10.0 status` to check; see `references/auth.md`)\n- Wallet must have sufficient USDC balance (`npx awal@2.10.0 balance` to check; see `references/fund.md`)\n- Each query costs $0.10 (100000 USDC atomic units)\n\n## Error Handling\n\n- \"Not authenticated\" - See `references/auth.md`\n- \"Insufficient balance\" - See `references/fund.md`\n- Query timeout or error - Ensure you are filtering on indexed fields and using a LIMIT\n"
  },
  {
    "slug": "send-usdc",
    "name": "send-usdc",
    "tagline": "Transfer USDC and native gas tokens on Base, Polygon, and Solana.",
    "description": "Transfer USDC and native gas tokens on Base, Polygon, and Solana.",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/coinbase/agentic-wallet-skills/tree/main/skills/agentic-wallet/references/send-usdc.md",
    "tags": [
      "Coinbase",
      "Agentic Wallet",
      "USDC Transfer",
      "Transactions"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Initiates token transfers from wallets to any recipient address across Base, Polygon, and Solana using the awal send command.",
    "whenToUse": [
      "Transferring USDC or native tokens to recipient addresses.",
      "Selecting target networks (Base, Polygon, Solana) for asset transfers.",
      "Formatting transaction outcomes into JSON objects.",
      "Verifying recipient details before executing transactions.",
      "Automating transaction dispatching inside background scripts."
    ],
    "skillMd": "# Sending Tokens\n\nUse the `npx awal@2.10.0 send` command to transfer tokens from the wallet to any address on Base, Polygon, or Solana.\n\nIf the wallet is not authenticated, see `references/auth.md`.\n\n## Command Syntax\n\n```bash\nnpx awal@2.10.0 send <amount> <recipient> [--chain <chain>] [--asset <asset>] [--json]\n```\n\n## Arguments\n\n| Argument    | Description                                                                                                                                                                                                                          |\n| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |\n| `amount`    | Amount to send: '$1.00', '1.00', or atomic units (1000000 = $1). Always single-quote amounts that use `$` to prevent bash variable expansion. If the number looks like atomic units (no decimal or > 100), treat as atomic units. Assume that people won't be sending more than 100 USDC the majority of the time |\n| `recipient` | Ethereum address (0x...), ENS name (vitalik.eth), or Solana address (Base58)                                                                                                                                                         |\n\n## Options\n\n| Option             | Description                                                         |\n| ------------------ | ------------------------------------------------------------------- |\n| `--chain <name>`   | Blockchain network: base, polygon, solana (default: base)           |\n| `--asset <symbol>` | Token to send: usdc, eth, pol, sol (default: usdc)                  |\n| `--json`           | Output result as JSON                                               |\n\n## Input Validation\n\nBefore constructing the command, validate all user-provided values to prevent shell injection:\n\n- **amount**: Must match `^\\$?[\\d.]+$` (digits, optional decimal point, optional `$` prefix). Reject if it contains spaces, semicolons, pipes, backticks, or other shell metacharacters.\n- **recipient**: Must be a valid `0x` hex address (`^0x[0-9a-fA-F]{40}$`), an ENS name (`^[a-zA-Z0-9.-]+\\.eth$`), or a Solana address (`^[1-9A-HJ-NP-Za-km-z]{32,44}$`). Reject any value containing spaces or shell metacharacters.\n- **chain**: Must be one of `base`, `polygon`, `solana`. Reject any other value.\n- **asset**: Must be one of `usdc`, `eth`, `pol`, `sol`. Reject any other value.\n\nDo not pass unvalidated user input into the command.\n\n## Examples\n\n```bash\n# Send $1.00 USDC to an address on Base (default)\nnpx awal@2.10.0 send 1 0x1234...abcd\n\n# Send $0.50 USDC to an ENS name\nnpx awal@2.10.0 send 0.50 vitalik.eth\n\n# Send with dollar sign prefix (note the single quotes)\nnpx awal@2.10.0 send '$5.00' 0x1234...abcd\n\n# Send ETH on Base\nnpx awal@2.10.0 send 0.01 0x1234...abcd --asset eth\n\n# Send USDC on Polygon\nnpx awal@2.10.0 send 1 0x1234...abcd --chain polygon\n\n# Send USDC to a Solana address\nnpx awal@2.10.0 send 1 AxW7...5fGz --chain solana\n\n# Get JSON output\nnpx awal@2.10.0 send 1 vitalik.eth --json\n```\n\n## ENS Resolution\n\nENS names are automatically resolved to addresses via Ethereum mainnet. The command will:\n\n1. Detect ENS names (any string containing a dot that isn't a hex address)\n2. Resolve the name to an address\n3. Display both the ENS name and resolved address in the output\n\n## Prerequisites\n\n- Must be authenticated (`npx awal@2.10.0 status` to check; see `references/auth.md`)\n- Wallet must have sufficient balance (`npx awal@2.10.0 balance` to check; see `references/fund.md` to top up)\n\n## Error Handling\n\nCommon errors:\n\n- \"Not authenticated\" - See `references/auth.md`\n- \"Insufficient balance\" - Check balance with `npx awal@2.10.0 balance`; see `references/fund.md`\n- \"Could not resolve ENS name\" - Verify the ENS name exists\n- \"Invalid recipient\" - Must be valid 0x address, ENS name, or Solana Base58 address\n- \"SOL only supported on Solana chains\" - Use `--chain solana` when sending SOL\n- \"ETH/POL only supported on EVM chains\" - ETH on base, POL on polygon\n"
  },
  {
    "slug": "trade",
    "name": "trade",
    "tagline": "Swap onchain assets on Base or Polygon via CDP Swap.",
    "description": "Swap onchain assets on Base or Polygon via CDP Swap.",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/coinbase/agentic-wallet-skills/tree/main/skills/agentic-wallet/references/trade.md",
    "tags": [
      "Coinbase",
      "Agentic Wallet",
      "CDP Swap",
      "Tokens Trade"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Swaps assets using the CDP Swap CLI commands on Base or Polygon, including slippage and gas configurations.",
    "whenToUse": [
      "Swapping tokens on Base or Polygon networks using the CDP Swap API.",
      "Executing trade swaps via CLI commands or alias shortcuts.",
      "Checking price slips and gas fee projections before swapping.",
      "Exchanging USDC for other supported onchain assets.",
      "Automating asset rebalancing strategies inside agent wallets."
    ],
    "skillMd": "# Trading Tokens\n\nUse the `npx awal@2.10.0 trade` command to swap tokens on Base or Polygon via the CDP Swap API. You must be authenticated to trade.\n\nIf the wallet is not authenticated, see `references/auth.md`.\n\n## Command Syntax\n\n```bash\nnpx awal@2.10.0 trade <amount> <from> <to> [options]\n```\n\nThe command is also available as `npx awal@2.10.0 swap` (alias).\n\n## Arguments\n\n| Argument | Description                                                             |\n| -------- | ----------------------------------------------------------------------- |\n| `amount` | Amount to swap (see Amount Formats below)                               |\n| `from`   | Source token: alias (usdc, eth, pol) or contract address (0x...)        |\n| `to`     | Destination token: alias (usdc, eth, pol) or contract address (0x...)   |\n\n## Amount Formats\n\nThe amount can be specified in multiple formats:\n\n| Format        | Example                | Description                            |\n| ------------- | ---------------------- | -------------------------------------- |\n| Dollar prefix | `'$1.00'`, `'$0.50'`  | USD notation (decimals based on token) |\n| Decimal       | `1.0`, `0.50`, `0.001` | Human-readable with decimal point      |\n| Whole number  | `5`, `100`             | Interpreted as whole tokens            |\n| Atomic units  | `500000`               | Large integers treated as atomic units |\n\n**Auto-detection**: Large integers without a decimal point are treated as atomic units. For example, `500000` for USDC (6 decimals) = $0.50.\n\n**Decimals**: For known tokens (usdc=6, eth=18, pol=18), decimals are automatic. For arbitrary contract addresses, decimals are read from the token contract.\n\n## Options\n\n| Option               | Description                                   |\n| -------------------- | --------------------------------------------- |\n| `-c, --chain <name>` | Blockchain network: base, polygon (default: base) |\n| `-s, --slippage <n>` | Slippage tolerance in basis points (100 = 1%) |\n| `--json`             | Output result as JSON                         |\n\n## Token Aliases\n\n| Alias | Token | Decimals | Chain   |\n| ----- | ----- | -------- | ------- |\n| usdc  | USDC  | 6        | base    |\n| eth   | ETH   | 18       | base    |\n| pol   | POL   | 18       | polygon |\n\n**IMPORTANT**: Always single-quote amounts that use `$` to prevent bash variable expansion (e.g. `'$1.00'` not `$1.00`).\n\n## Input Validation\n\nBefore constructing the command, validate all user-provided values to prevent shell injection:\n\n- **amount**: Must match `^\\$?[\\d.]+$` (digits, optional decimal point, optional `$` prefix). Reject if it contains spaces, semicolons, pipes, backticks, or other shell metacharacters.\n- **from / to**: Must be a known alias (`usdc`, `eth`, `pol`) or a valid `0x` hex address (`^0x[0-9a-fA-F]{40}$`). Reject any other value.\n- **slippage**: Must be a positive integer (`^\\d+$`).\n\nDo not pass unvalidated user input into the command.\n\n## Examples\n\n```bash\n# Swap $1 USDC for ETH (dollar prefix — note the single quotes)\nnpx awal@2.10.0 trade '$1' usdc eth\n\n# Swap 0.50 USDC for ETH (decimal format)\nnpx awal@2.10.0 trade 0.50 usdc eth\n\n# Swap 500000 atomic units of USDC for ETH\nnpx awal@2.10.0 trade 500000 usdc eth\n\n# Swap 0.01 ETH for USDC\nnpx awal@2.10.0 trade 0.01 eth usdc\n\n# Swap with custom slippage (2%)\nnpx awal@2.10.0 trade '$5' usdc eth --slippage 200\n\n# Swap using contract addresses (decimals read from chain)\nnpx awal@2.10.0 trade 100 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913 0x4200000000000000000000000000000000000006\n\n# Get JSON output\nnpx awal@2.10.0 trade '$1' usdc eth --json\n\n# Swap USDC for POL on Polygon\nnpx awal@2.10.0 trade '$1' usdc pol --chain polygon\n```\n\n## Prerequisites\n\n- Must be authenticated (`npx awal@2.10.0 status` to check; see `references/auth.md`)\n- Wallet must have sufficient balance of the source token\n\n## Error Handling\n\nCommon errors:\n\n- \"Not authenticated\" - See `references/auth.md`\n- \"Invalid token\" - Use a valid alias (usdc, eth, pol) or 0x address\n- \"POL only supported on polygon chain\" - Use `--chain polygon` when trading POL\n- \"Cannot swap a token to itself\" - From and to must be different\n- \"Swap failed: TRANSFER_FROM_FAILED\" - Insufficient balance or approval issue\n- \"No liquidity\" - Try a smaller amount or different token pair\n- \"Amount has X decimals but token only supports Y\" - Too many decimal places\n"
  },
  {
    "slug": "x402-monetize",
    "name": "x402-monetize",
    "tagline": "Charge USDC per API call with Express x402 payment servers.",
    "description": "Charge USDC per API call with Express x402 payment servers.",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/coinbase/agentic-wallet-skills/tree/main/skills/agentic-wallet/references/x402-monetize.md",
    "tags": [
      "Coinbase",
      "Agentic Wallet",
      "x402 protocol",
      "API Monetization"
    ],
    "difficulty": "Advanced",
    "whatItDoes": "Builds micro-payment Express API servers charging USDC per request, verified automatically via the x402 Bazaar.",
    "whenToUse": [
      "Creating Express servers that charge USDC per API request.",
      "Implementing the HTTP 402 payment protocol on custom API endpoints.",
      "Registering API endpoints with the x402 Bazaar directory for discovery.",
      "Extracting payment addresses from authenticated agentic wallets.",
      "Verifying client payment headers and signatures on backend servers."
    ],
    "skillMd": "# Build an x402 Payment Server\n\nCreate an Express server that charges USDC for API access using the x402 payment protocol. Callers pay per-request in USDC on Base — no accounts, API keys, or subscriptions needed. Your service is automatically discoverable by other agents via the x402 Bazaar.\n\n## How It Works\n\nx402 is an HTTP-native payment protocol. When a client hits a protected endpoint without paying, the server returns HTTP 402 with payment requirements. The client signs a USDC payment and retries with a payment header. The facilitator verifies and settles the payment, and the server returns the response. Services register with the x402 Bazaar so other agents can discover and pay for them automatically.\n\nIf the wallet is not authenticated, see `references/auth.md`.\n\n## Step 1: Get the Payment Address\n\nRun this to get the wallet address that will receive payments:\n\n```bash\nnpx awal@2.10.0 address\n```\n\nUse this address as the `payTo` value.\n\n## Step 2: Set Up the Project\n\n```bash\nmkdir x402-server && cd x402-server\nnpm init -y\nnpm install express @x402/express @x402/core @x402/evm @x402/extensions\n```\n\nCreate `index.js`:\n\n```js\nconst express = require(\"express\");\nconst { paymentMiddleware } = require(\"@x402/express\");\nconst { x402ResourceServer, HTTPFacilitatorClient } = require(\"@x402/core/server\");\nconst { ExactEvmScheme } = require(\"@x402/evm/exact/server\");\n\nconst app = express();\napp.use(express.json());\n\nconst PAY_TO = \"<address from step 1>\";\n\n// Create facilitator client and x402 resource server\nconst facilitator = new HTTPFacilitatorClient({ url: \"https://x402.org/facilitator\" });\nconst server = new x402ResourceServer(facilitator);\nserver.register(\"eip155:8453\", new ExactEvmScheme());\n\n// x402 payment middleware — protects routes below\napp.use(\n  paymentMiddleware(\n    {\n      \"GET /api/example\": {\n        accepts: {\n          scheme: \"exact\",\n          price: \"$0.01\",\n          network: \"eip155:8453\",\n          payTo: PAY_TO,\n        },\n        description: \"Description of what this endpoint returns\",\n        mimeType: \"application/json\",\n      },\n    },\n    server,\n  ),\n);\n\n// Protected endpoint\napp.get(\"/api/example\", (req, res) => {\n  res.json({ data: \"This costs $0.01 per request\" });\n});\n\napp.listen(3000, () => console.log(\"Server running on port 3000\"));\n```\n\n## Step 3: Run It\n\n```bash\nnode index.js\n```\n\nTest with curl — you should get a 402 response with payment requirements:\n\n```bash\ncurl -i http://localhost:3000/api/example\n```\n\n## API Reference\n\n### paymentMiddleware(routes, server)\n\nCreates Express middleware that enforces x402 payments.\n\n| Parameter | Type                 | Description                                          |\n| --------- | -------------------- | ---------------------------------------------------- |\n| `routes`  | object               | Route config mapping route patterns to payment config |\n| `server`  | x402ResourceServer   | Pre-configured x402 resource server instance         |\n\n### x402ResourceServer\n\nCreated with a facilitator client. Register payment schemes and extensions before passing to middleware.\n\n```js\nconst { x402ResourceServer, HTTPFacilitatorClient } = require(\"@x402/core/server\");\nconst { ExactEvmScheme } = require(\"@x402/evm/exact/server\");\n\nconst facilitator = new HTTPFacilitatorClient({ url: \"https://x402.org\" });\nconst server = new x402ResourceServer(facilitator);\nserver.register(\"eip155:8453\", new ExactEvmScheme());\n```\n\n| Method                      | Description                                               |\n| --------------------------- | --------------------------------------------------------- |\n| `register(network, scheme)` | Register a payment scheme for a CAIP-2 network identifier |\n\n### Route Config\n\nEach key in the routes object is `\"METHOD /path\"`. The value is a config object:\n\n```js\n{\n  \"GET /api/data\": {\n    accepts: {\n      scheme: \"exact\",\n      price: \"$0.05\",\n      network: \"eip155:8453\",\n      payTo: \"0x...\",\n    },\n    description: \"Human-readable description of the endpoint\",\n    mimeType: \"application/json\",\n    extensions: {\n      ...declareDiscoveryExtension({\n        output: {\n          example: { result: \"example response\" },\n          schema: {\n            properties: {\n              result: { type: \"string\" },\n            },\n          },\n        },\n      }),\n    },\n  },\n}\n```\n\n### Accepts Config Fields\n\nThe `accepts` field can be a single object or an array (for multiple payment options):\n\n| Field     | Type   | Description                                        |\n| --------- | ------ | -------------------------------------------------- |\n| `scheme`  | string | Payment scheme: `\"exact\"`                          |\n| `price`   | string | USDC price (e.g. `\"$0.01\"`, `\"$1.00\"`)            |\n| `network` | string | CAIP-2 network identifier (e.g. `\"eip155:8453\"`)  |\n| `payTo`   | string | Ethereum address (0x...) to receive USDC payments  |\n\n### Route-Level Fields\n\n| Field              | Type    | Description                                        |\n| ------------------ | ------- | -------------------------------------------------- |\n| `accepts`          | object or array | Payment requirements (single or multiple)  |\n| `description`      | string? | What this endpoint does (shown to clients)         |\n| `mimeType`         | string? | MIME type of the response                          |\n| `extensions`       | object? | Extensions config (e.g. Bazaar discovery)          |\n\n### Discovery Extension\n\nThe `declareDiscoveryExtension` function registers your endpoint with the x402 Bazaar so other agents can discover it:\n\n```js\nconst { declareDiscoveryExtension } = require(\"@x402/extensions/bazaar\");\n\nextensions: {\n  ...declareDiscoveryExtension({\n    output: {\n      example: { /* example response body */ },\n      schema: {\n        properties: {\n          /* JSON schema of the response */\n        },\n      },\n    },\n  }),\n}\n```\n\n| Field            | Type   | Description                                    |\n| ---------------- | ------ | ---------------------------------------------- |\n| `output.example` | object | Example response body for the endpoint         |\n| `output.schema`  | object | JSON schema describing the response format     |\n\n### Supported Networks\n\n| Network          | Description                      |\n| ---------------- | -------------------------------- |\n| `eip155:8453`    | Base mainnet (real USDC)         |\n| `eip155:84532`   | Base Sepolia testnet (test USDC) |\n\n## Patterns\n\n### Multiple endpoints with different prices\n\n```js\napp.use(\n  paymentMiddleware(\n    {\n      \"GET /api/cheap\": {\n        accepts: {\n          scheme: \"exact\",\n          price: \"$0.001\",\n          network: \"eip155:8453\",\n          payTo: PAY_TO,\n        },\n        description: \"Inexpensive data lookup\",\n      },\n      \"GET /api/expensive\": {\n        accepts: {\n          scheme: \"exact\",\n          price: \"$1.00\",\n          network: \"eip155:8453\",\n          payTo: PAY_TO,\n        },\n        description: \"Premium data access\",\n      },\n      \"POST /api/query\": {\n        accepts: {\n          scheme: \"exact\",\n          price: \"$0.25\",\n          network: \"eip155:8453\",\n          payTo: PAY_TO,\n        },\n        description: \"Run a custom query\",\n      },\n    },\n    server,\n  ),\n);\n\napp.get(\"/api/cheap\", (req, res) => { /* ... */ });\napp.get(\"/api/expensive\", (req, res) => { /* ... */ });\napp.post(\"/api/query\", (req, res) => { /* ... */ });\n```\n\n### Wildcard routes\n\n```js\napp.use(\n  paymentMiddleware(\n    {\n      \"GET /api/*\": {\n        accepts: {\n          scheme: \"exact\",\n          price: \"$0.05\",\n          network: \"eip155:8453\",\n          payTo: PAY_TO,\n        },\n        description: \"API access\",\n      },\n    },\n    server,\n  ),\n);\n\napp.get(\"/api/users\", (req, res) => { /* ... */ });\napp.get(\"/api/posts\", (req, res) => { /* ... */ });\n```\n\n### Health check (no payment)\n\nRegister free endpoints before the payment middleware:\n\n```js\napp.get(\"/health\", (req, res) => res.json({ status: \"ok\" }));\n\n// Payment middleware only applies to routes registered after it\napp.use(paymentMiddleware({ /* ... */ }, server));\napp.get(\"/api/data\", (req, res) => { /* ... */ });\n```\n\n### POST with body and discovery extension\n\n```js\napp.use(\n  paymentMiddleware(\n    {\n      \"POST /api/analyze\": {\n        accepts: {\n          scheme: \"exact\",\n          price: \"$0.10\",\n          network: \"eip155:8453\",\n          payTo: PAY_TO,\n        },\n        description: \"Analyze text sentiment\",\n        mimeType: \"application/json\",\n        extensions: {\n          ...declareDiscoveryExtension({\n            output: {\n              example: { sentiment: \"positive\", score: 0.95 },\n              schema: {\n                properties: {\n                  sentiment: { type: \"string\" },\n                  score: { type: \"number\" },\n                },\n              },\n            },\n          }),\n        },\n      },\n    },\n    server,\n  ),\n);\n\napp.post(\"/api/analyze\", (req, res) => {\n  const { text } = req.body;\n  // ... your logic\n  res.json({ sentiment: \"positive\", score: 0.95 });\n});\n```\n\n### Multiple payment options per endpoint\n\nAccept payments on multiple networks for the same endpoint:\n\n```js\n\"GET /api/data\": {\n  accepts: [\n    {\n      scheme: \"exact\",\n      price: \"$0.01\",\n      network: \"eip155:8453\",\n      payTo: EVM_ADDRESS,\n    },\n    {\n      scheme: \"exact\",\n      price: \"$0.01\",\n      network: \"eip155:84532\",\n      payTo: EVM_ADDRESS,\n    },\n  ],\n  description: \"Data endpoint accepting Base mainnet or testnet\",\n}\n```\n\n### Using the CDP facilitator (authenticated)\n\nFor production use with the Coinbase facilitator (supports mainnet):\n\n```bash\nnpm install @coinbase/x402\n```\n\n```js\nconst { facilitator } = require(\"@coinbase/x402\");\nconst { HTTPFacilitatorClient } = require(\"@x402/core/server\");\n\nconst facilitatorClient = new HTTPFacilitatorClient(facilitator);\nconst server = new x402ResourceServer(facilitatorClient);\nserver.register(\"eip155:8453\", new ExactEvmScheme());\n```\n\nThis requires `CDP_API_KEY_ID` and `CDP_API_KEY_SECRET` environment variables. Get these from https://portal.cdp.coinbase.com.\n\n## Testing the Server\n\nOnce the server is running, test payments using the commands in `references/x402-pay.md`:\n\n```bash\n# Check the endpoint's payment requirements\nnpx awal@2.10.0 x402 details http://localhost:3000/api/example\n\n# Make a paid request\nnpx awal@2.10.0 x402 pay http://localhost:3000/api/example\n```\n\n## Pricing Guidelines\n\n| Use Case               | Suggested Price |\n| ---------------------- | --------------- |\n| Simple data lookup     | $0.001 - $0.01 |\n| API proxy / enrichment | $0.01 - $0.10  |\n| Compute-heavy query    | $0.10 - $0.50  |\n| AI inference           | $0.05 - $1.00  |\n\n## Checklist\n\n- [ ] Get wallet address with `npx awal@2.10.0 address`\n- [ ] Install `express`, `@x402/express`, `@x402/core`, `@x402/evm`, and `@x402/extensions`\n- [ ] Create `x402ResourceServer` with facilitator client and register `ExactEvmScheme` for `eip155:8453`\n- [ ] Define routes with prices, descriptions, and discovery extensions (Bazaar auto-registers when routes declare it)\n- [ ] Register payment middleware before protected routes\n- [ ] Keep health/status endpoints before payment middleware\n- [ ] Test with `curl` (should get 402) and `npx awal@2.10.0 x402 pay` (should get 200)\n- [ ] Announce your service so other agents can find and use it\n"
  },
  {
    "slug": "x402-pay",
    "name": "x402-pay",
    "tagline": "Call paid API endpoints with automatic wallet x402 payment.",
    "description": "Call paid API endpoints with automatic wallet x402 payment.",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/coinbase/agentic-wallet-skills/tree/main/skills/agentic-wallet/references/x402-pay.md",
    "tags": [
      "Coinbase",
      "Agentic Wallet",
      "x402 pay",
      "Paid APIs"
    ],
    "difficulty": "Advanced",
    "whatItDoes": "Calls x402-monetized endpoints with early payment negotiation, signing, and header transfers handled by awal CLI.",
    "whenToUse": [
      "Making requests to paid API endpoints using the awal CLI.",
      "Signing and dispatching onchain USDC payments automatically on HTTP 402.",
      "Setting maximum pricing boundaries to prevent budget overruns.",
      "Calling protected endpoints with JSON payload parameters.",
      "Extracting paid API response data into application scripts."
    ],
    "skillMd": "# Making Paid x402 Requests\n\nUse the `npx awal@2.10.0 x402 pay` command to call paid API endpoints with automatic USDC payment on Base.\n\nIf the wallet is not authenticated, see `references/auth.md`.\n\n## Command Syntax\n\n```bash\nnpx awal@2.10.0 x402 pay <url> [-X <method>] [-d <json>] [-q <params>] [-h <json>] [--max-amount <n>] [--json]\n```\n\n## Options\n\n| Option                  | Description                                        |\n| ----------------------- | -------------------------------------------------- |\n| `-X, --method <method>` | HTTP method (default: GET)                         |\n| `-d, --data <json>`     | Request body as JSON string                        |\n| `-q, --query <params>`  | Query parameters as JSON string                    |\n| `-h, --headers <json>`  | Custom HTTP headers as JSON string                 |\n| `--max-amount <amount>` | Max payment in USDC atomic units (1000000 = $1.00) |\n| `--correlation-id <id>` | Group related operations                           |\n| `--json`                | Output as JSON                                     |\n\n## USDC Amounts\n\nX402 uses USDC atomic units (6 decimals):\n\n| Atomic Units | USD   |\n| ------------ | ----- |\n| 1000000      | $1.00 |\n| 100000       | $0.10 |\n| 50000        | $0.05 |\n| 10000        | $0.01 |\n\n**IMPORTANT**: Always single-quote amounts that use `$` to prevent bash variable expansion (e.g. `'$1.00'` not `$1.00`).\n\n## Input Validation\n\nBefore constructing the command, validate all user-provided values to prevent shell injection:\n\n- **url**: Must be a valid URL starting with `https://` or `http://`. Reject if it contains spaces, semicolons, pipes, backticks, or shell metacharacters.\n- **data (-d)**: Must be valid JSON. Always wrap in single quotes to prevent shell expansion.\n- **max-amount**: Must be a positive integer (`^\\d+$`).\n\nDo not pass unvalidated user input into the command.\n\n## Examples\n\n```bash\n# Make a GET request (auto-pays)\nnpx awal@2.10.0 x402 pay https://example.com/api/weather\n\n# Make a POST request with body\nnpx awal@2.10.0 x402 pay https://example.com/api/sentiment -X POST -d '{\"text\": \"I love this product\"}'\n\n# Limit max payment to $0.10\nnpx awal@2.10.0 x402 pay https://example.com/api/data --max-amount 100000\n```\n\n## Prerequisites\n\n- Must be authenticated (`npx awal@2.10.0 status` to check; see `references/auth.md`)\n- Wallet must have sufficient USDC balance (`npx awal@2.10.0 balance` to check; see `references/fund.md` to top up)\n- If you don't know the endpoint URL, see `references/x402-search.md` to find services first\n\n## Error Handling\n\n- \"Not authenticated\" - See `references/auth.md`\n- \"No X402 payment requirements found\" - URL may not be an x402 endpoint; see `references/x402-search.md` to find valid endpoints\n- \"Insufficient balance\" - See `references/fund.md`\n"
  },
  {
    "slug": "x402-search",
    "name": "x402-search",
    "tagline": "Search and inspect paid API endpoints on the x402 Bazaar.",
    "description": "Search and inspect paid API endpoints on the x402 Bazaar.",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/coinbase/agentic-wallet-skills/tree/main/skills/agentic-wallet/references/x402-search.md",
    "tags": [
      "Coinbase",
      "Agentic Wallet",
      "x402 Bazaar",
      "Discover APIs"
    ],
    "difficulty": "Beginner",
    "whatItDoes": "Searches the x402 Bazaar registry via CDP vector search to discover paid agent-accessible APIs.",
    "whenToUse": [
      "Searching the x402 Bazaar marketplace for paid API endpoints.",
      "Filtering available bazaar APIs by network, pricing, or keywords.",
      "Discovering onchain services without requiring authentication or wallet balances.",
      "Inspecting API specifications and pricing schemas of bazaar endpoints.",
      "Matching developer requirements to registered AI agent tools."
    ],
    "skillMd": "# Searching the x402 Bazaar\n\nUse the `npx awal@2.10.0 x402` commands to discover and inspect paid API endpoints available on the x402 bazaar marketplace. **No authentication or balance is required for searching.**\n\n## Commands\n\n### Search the Bazaar\n\nFind paid services by keyword using CDP's vector search:\n\n```bash\nnpx awal@2.10.0 x402 bazaar search <query> [-k <n>] [--network <network>] [--scheme <scheme>] [--max-price <price>] [--json]\n```\n\n| Option                  | Description                                                              |\n| ----------------------- | ------------------------------------------------------------------------ |\n| `-k, --top <n>`         | Number of results, 1–20 (default: 20)                                    |\n| `--network <name>`      | Filter by chain (base, base-sepolia, polygon, solana, solana-devnet)     |\n| `--scheme <scheme>`     | Filter by payment scheme: `exact` or `upto`                              |\n| `--max-price <price>`   | Maximum price in USD (e.g. `0.01`)                                       |\n| `--asset <address>`     | Filter by payment asset address                                          |\n| `--pay-to <address>`    | Filter by recipient wallet address                                       |\n| `--extensions <type>`   | Filter by extension type (e.g. `outputSchema`, `bazaar`)                 |\n| `--json`                | Output as JSON                                                           |\n\n### List Bazaar Resources\n\nBrowse all available resources:\n\n```bash\nnpx awal@2.10.0 x402 bazaar list [--network <network>] [--full] [--refresh] [--json]\n```\n\n| Option             | Description                                                          |\n| ------------------ | -------------------------------------------------------------------- |\n| `--network <name>` | Filter by chain (base, base-sepolia, polygon, solana, solana-devnet) |\n| `--full`           | Show complete details including schemas                              |\n| `--refresh`        | Re-fetch resource index from CDP API                                 |\n| `--json`           | Output as JSON                                                       |\n\n### Discover Payment Requirements\n\nInspect an endpoint's x402 payment requirements without paying:\n\n```bash\nnpx awal@2.10.0 x402 details <url> [--json]\n```\n\nAuto-detects the correct HTTP method (GET, POST, PUT, DELETE, PATCH) by trying each until it gets a 402 response, then displays price, accepted payment schemes, network, and input/output schemas.\n\n## Examples\n\n```bash\n# Search for weather-related paid APIs\nnpx awal@2.10.0 x402 bazaar search \"weather\"\n\n# Search with more results\nnpx awal@2.10.0 x402 bazaar search \"sentiment analysis\" -k 10\n\n# Browse all bazaar resources with full details\nnpx awal@2.10.0 x402 bazaar list --full\n\n# Check what an endpoint costs\nnpx awal@2.10.0 x402 details https://example.com/api/weather\n```\n\n## Next Steps\n\nOnce you've found a service you want to use, see `references/x402-pay.md` to make a paid request to the endpoint.\n\n## Error Handling\n\n- \"CDP API returned 429\" - Rate limited; cached data will be used if available\n- \"No X402 payment requirements found\" - URL may not be an x402 endpoint\n"
  },
  {
    "slug": "authenticate-wallet",
    "name": "authenticate-wallet",
    "tagline": "Handle sign-in for the Coinbase payments wallet via email OTP",
    "description": "Handle sign-in for the Coinbase payments wallet via email OTP",
    "category": "Office & Documents",
    "sourceUrl": "https://github.com/coinbase/agentkit/tree/main/skills/authenticate-wallet",
    "tags": [
      "Coinbase",
      "Auth",
      "AI"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Handle sign-in for the Coinbase payments wallet via email OTP",
    "whenToUse": [
      "Integrating authenticate wallet into your development workflow.",
      "Following best practices for handle sign-in for the coinbase payments wallet via email otp.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: authenticate-wallet\ndescription: Handle sign-in for the Coinbase payments wallet via email OTP\n---\n\nHandle sign-in for the Coinbase payments wallet via email OTP"
  },
  {
    "slug": "fund",
    "name": "fund",
    "tagline": "Add USDC to a Coinbase-powered wallet through Coinbase Onramp",
    "description": "Add USDC to a Coinbase-powered wallet through Coinbase Onramp",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/coinbase/agentkit/tree/main/skills/fund",
    "tags": [
      "Coinbase",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Add USDC to a Coinbase-powered wallet through Coinbase Onramp",
    "whenToUse": [
      "Integrating fund into your development workflow.",
      "Following best practices for add usdc to a coinbase-powered wallet through coinbase onramp.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: fund\ndescription: Add USDC to a Coinbase-powered wallet through Coinbase Onramp\n---\n\nAdd USDC to a Coinbase-powered wallet through Coinbase Onramp"
  },
  {
    "slug": "monetize-service",
    "name": "monetize-service",
    "tagline": "Scaffold an Express server that charges USDC per request using x402",
    "description": "Scaffold an Express server that charges USDC per request using x402",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/coinbase/agentkit/tree/main/skills/monetize-service",
    "tags": [
      "Coinbase",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Scaffold an Express server that charges USDC per request using x402",
    "whenToUse": [
      "Integrating monetize service into your development workflow.",
      "Following best practices for scaffold an express server that charges usdc per request using x402.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: monetize-service\ndescription: Scaffold an Express server that charges USDC per request using x402\n---\n\nScaffold an Express server that charges USDC per request using x402"
  },
  {
    "slug": "pay-for-service",
    "name": "pay-for-service",
    "tagline": "Call paid API endpoints that use the x402 protocol with automatic USDC",
    "description": "Call paid API endpoints that use the x402 protocol with automatic USDC",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/coinbase/agentkit/tree/main/skills/pay-for-service",
    "tags": [
      "Coinbase",
      "API",
      "AI"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Call paid API endpoints that use the x402 protocol with automatic USDC",
    "whenToUse": [
      "Integrating pay for service into your development workflow.",
      "Following best practices for call paid api endpoints that use the x402 protocol with automatic usdc.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: pay-for-service\ndescription: Call paid API endpoints that use the x402 protocol with automatic USDC\n---\n\nCall paid API endpoints that use the x402 protocol with automatic USDC"
  },
  {
    "slug": "query-onchain-data",
    "name": "query-onchain-data",
    "tagline": "Query decoded onchain data (events, tx, blocks) on Base",
    "description": "Query decoded onchain data (events, tx, blocks) on Base",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/coinbase/agentkit/tree/main/skills/query-onchain-data",
    "tags": [
      "Coinbase",
      "AI"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Query decoded onchain data (events, tx, blocks) on Base",
    "whenToUse": [
      "Integrating query onchain data into your development workflow.",
      "Following best practices for query decoded onchain data (events, tx, blocks) on base.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: query-onchain-data\ndescription: Query decoded onchain data (events, tx, blocks) on Base\n---\n\nQuery decoded onchain data (events, tx, blocks) on Base"
  },
  {
    "slug": "search-for-service",
    "name": "search-for-service",
    "tagline": "Search and browse the x402 bazaar marketplace",
    "description": "Search and browse the x402 bazaar marketplace",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/coinbase/agentkit/tree/main/skills/search-for-service",
    "tags": [
      "Coinbase",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Search and browse the x402 bazaar marketplace",
    "whenToUse": [
      "Integrating search for service into your development workflow.",
      "Following best practices for search and browse the x402 bazaar marketplace.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: search-for-service\ndescription: Search and browse the x402 bazaar marketplace\n---\n\nSearch and browse the x402 bazaar marketplace"
  },
  {
    "slug": "send-usdc",
    "name": "send-usdc",
    "tagline": "Send USDC to any Ethereum address or ENS name on Base",
    "description": "Send USDC to any Ethereum address or ENS name on Base",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/coinbase/agentkit/tree/main/skills/send-usdc",
    "tags": [
      "Coinbase",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Send USDC to any Ethereum address or ENS name on Base",
    "whenToUse": [
      "Integrating send usdc into your development workflow.",
      "Following best practices for send usdc to any ethereum address or ens name on base.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: send-usdc\ndescription: Send USDC to any Ethereum address or ENS name on Base\n---\n\nSend USDC to any Ethereum address or ENS name on Base"
  },
  {
    "slug": "trade",
    "name": "trade",
    "tagline": "Swap and trade tokens on Base using the CDP Swap API",
    "description": "Swap and trade tokens on Base using the CDP Swap API",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/coinbase/agentkit/tree/main/skills/trade",
    "tags": [
      "Coinbase",
      "API"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Swap and trade tokens on Base using the CDP Swap API",
    "whenToUse": [
      "Integrating trade into your development workflow.",
      "Following best practices for swap and trade tokens on base using the cdp swap api.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: trade\ndescription: Swap and trade tokens on Base using the CDP Swap API\n---\n\nSwap and trade tokens on Base using the CDP Swap API"
  },
  {
    "slug": "x402",
    "name": "x402",
    "tagline": "Discover and call paid API endpoints using the x402 payment protocol",
    "description": "Discover and call paid API endpoints using the x402 payment protocol",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/coinbase/agentkit/tree/main/skills/x402",
    "tags": [
      "Coinbase",
      "API",
      "AI"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Discover and call paid API endpoints using the x402 payment protocol",
    "whenToUse": [
      "Integrating x402 into your development workflow.",
      "Following best practices for discover and call paid api endpoints using the x402 payment protocol.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: x402\ndescription: Discover and call paid API endpoints using the x402 payment protocol\n---\n\nDiscover and call paid API endpoints using the x402 payment protocol"
  }
];
