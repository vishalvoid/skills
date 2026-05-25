import { skills } from "@/data/skills";

export const dynamic = "force-static";

const BASE_URL = "https://skills.vishalvoid.com";
const ALL_SLUGS = skills.map((s) => s.slug).join(" ");

function makeInstallScript(slugs: string): string {
  return `#!/bin/sh
set -e

# skills.vishalvoid.com — installer
# Engineering patterns by Vishal Kumar Singh

# ─── Colors (TTY only) ──────────────────────────────────────────────────────
if [ -t 1 ]; then
  BOLD="\\033[1m"; GREEN="\\033[32m"; YELLOW="\\033[33m"
  GRAY="\\033[37m";  DARK="\\033[90m";  RESET="\\033[0m"
else
  BOLD=""; GREEN=""; YELLOW=""; GRAY=""; DARK=""; RESET=""
fi

print_success() { printf "\${GREEN}✓\${RESET} %s\\n" "\$1"; }
print_info()    { printf "\${YELLOW}→\${RESET} %s\\n" "\$1"; }
print_error()   { printf "\${BOLD}Error:\${RESET} %s\\n" "\$1" >&2; }
print_dim()     { printf "\${DARK}%s\${RESET}\\n" "\$1"; }

# ─── Header ─────────────────────────────────────────────────────────────────
printf "\\n"
printf "\${GRAY}  skills.vishalvoid.com\${RESET}\\n"
printf "\${DARK}  engineering patterns by Vishal Kumar Singh\${RESET}\\n"
printf "\\n"

# ─── Config ─────────────────────────────────────────────────────────────────
BASE_URL="\${SKILLS_BASE_URL:-${BASE_URL}}"
SKILLS_TO_INSTALL="\${1:-${ALL_SLUGS}}"

if [ "\$SKILLS_TO_INSTALL" != "\${SKILLS_TO_INSTALL#* }" ]; then
  COMPACT=1
else
  COMPACT=0
fi

# ─── Temp files ─────────────────────────────────────────────────────────────
TMP_SKILL="\$(mktemp)"
cleanup() { rm -f "\$TMP_SKILL"; }
trap cleanup EXIT

# ─── Download helper ────────────────────────────────────────────────────────
download_skill() {
  slug="\$1"
  url="\${BASE_URL}/api/skill/\${slug}"

  print_info "Downloading \${slug}..."

  if command -v curl >/dev/null 2>&1; then
    curl -fsSL "\$url" -o "\$TMP_SKILL"
  elif command -v wget >/dev/null 2>&1; then
    wget -q "\$url" -O "\$TMP_SKILL"
  else
    print_error "curl or wget is required."
    exit 1
  fi

  if [ ! -s "\$TMP_SKILL" ]; then
    print_error "Download failed or returned empty content for \${slug}."
    exit 1
  fi
}

# ─── Install helper ─────────────────────────────────────────────────────────
INSTALLED=0

maybe_install() {
  base_dir="\$1"
  label="\$2"
  slug="\$3"

  if [ -d "\$base_dir" ]; then
    target="\${base_dir}/\${slug}"
    mkdir -p "\$target"
    cp "\$TMP_SKILL" "\$target/SKILL.md"
    if [ "\$COMPACT" -eq 0 ]; then
      print_success "\${label} skill installed"
    fi
    INSTALLED=\$((INSTALLED + 1))
  fi
}

install_to() {
  base_dir="\$1"
  label="\$2"
  slug="\$3"

  target="\${base_dir}/\${slug}"
  mkdir -p "\$target"
  cp "\$TMP_SKILL" "\$target/SKILL.md"
  if [ "\$COMPACT" -eq 0 ]; then
    print_success "\${label} installed"
  fi
  INSTALLED=\$((INSTALLED + 1))
}

# ─── Main loop ───────────────────────────────────────────────────────────────
for SLUG in \$SKILLS_TO_INSTALL; do
  INSTALLED=0
  printf "\\n"
  print_info "Installing \${SLUG}..."
  printf "\\n"

  download_skill "\$SLUG"

  # ── Project-local tool directories (auto-detected) ──
  maybe_install "\${PWD}/.claude/skills"    "Claude Code project skill"  "\$SLUG"
  maybe_install "\${PWD}/.cursor/skills"    "Cursor project skill"       "\$SLUG"
  maybe_install "\${PWD}/.windsurf/skills"  "Windsurf project skill"     "\$SLUG"
  maybe_install "\${PWD}/.opencode/skill"   "OpenCode project skill"     "\$SLUG"
  maybe_install "\${PWD}/.codex/skills"     "Codex project skill"        "\$SLUG"
  maybe_install "\${PWD}/.gemini/skills"    "Gemini CLI project skill"   "\$SLUG"
  maybe_install "\${PWD}/.roo/skills"       "Roo Code project skill"     "\$SLUG"
  maybe_install "\${PWD}/.github/skills"    "GitHub Copilot skill"       "\$SLUG"

  # ── Claude Code project commands (for /slash support) ──
  if [ -d "\${PWD}/.claude" ]; then
    mkdir -p "\${PWD}/.claude/commands"
    cp "\$TMP_SKILL" "\${PWD}/.claude/commands/\${SLUG}.md"
    if [ "\$COMPACT" -eq 0 ]; then
      print_success "Claude Code /\${SLUG} command installed"
    fi
    INSTALLED=\$((INSTALLED + 1))
  fi

  # ── Cursor project commands ──
  if [ -d "\${PWD}/.cursor" ]; then
    mkdir -p "\${PWD}/.cursor/commands"
    cp "\$TMP_SKILL" "\${PWD}/.cursor/commands/\${SLUG}.md"
    if [ "\$COMPACT" -eq 0 ]; then
      print_success "Cursor /\${SLUG} command installed"
    fi
    INSTALLED=\$((INSTALLED + 1))
  fi

  # ── Claude Code global skills ──
  CLAUDE_DIR=""
  if [ -n "\$CLAUDE_CODE_SKILLS_DIR" ]; then
    CLAUDE_DIR="\$CLAUDE_CODE_SKILLS_DIR"
  elif [ -d "\$HOME/.claude/skills" ]; then
    CLAUDE_DIR="\$HOME/.claude/skills"
  elif [ -d "\$HOME/.config/claude/skills" ]; then
    CLAUDE_DIR="\$HOME/.config/claude/skills"
  fi
  if [ -n "\$CLAUDE_DIR" ]; then
    install_to "\$CLAUDE_DIR" "Claude Code global skill" "\$SLUG"
  fi

  # ── Claude Code global commands ──
  if [ -d "\$HOME/.claude" ]; then
    CCMD="\$HOME/.claude/commands"
  elif [ -d "\$HOME/.config/claude" ]; then
    CCMD="\$HOME/.config/claude/commands"
  else
    CCMD="\$HOME/.claude/commands"
  fi
  mkdir -p "\$CCMD"
  cp "\$TMP_SKILL" "\$CCMD/\${SLUG}.md"
  if [ "\$COMPACT" -eq 0 ]; then
    print_success "Claude Code global /\${SLUG} command installed"
  fi
  INSTALLED=\$((INSTALLED + 1))

  # ── Cursor global commands ──
  mkdir -p "\$HOME/.cursor/commands"
  cp "\$TMP_SKILL" "\$HOME/.cursor/commands/\${SLUG}.md"
  if [ "\$COMPACT" -eq 0 ]; then
    print_success "Cursor global /\${SLUG} command installed"
  fi
  INSTALLED=\$((INSTALLED + 1))

  # ── Windsurf ──
  if [ -d "\$HOME/.codeium" ] || [ -d "\$HOME/Library/Application Support/Windsurf" ]; then
    WS_DIR="\$HOME/.codeium/windsurf/memories"
    MARKER="# skills.vishalvoid.com/\${SLUG}"
    mkdir -p "\$WS_DIR"
    if [ -f "\${WS_DIR}/global_rules.md" ] && grep -q "\$MARKER" "\${WS_DIR}/global_rules.md"; then
      [ "\$COMPACT" -eq 0 ] && print_success "Windsurf already up to date"
    else
      printf "\\n%s\\n\\n" "\$MARKER" >> "\${WS_DIR}/global_rules.md"
      cat "\$TMP_SKILL" >> "\${WS_DIR}/global_rules.md"
      printf "\\n" >> "\${WS_DIR}/global_rules.md"
      [ "\$COMPACT" -eq 0 ] && print_success "Windsurf updated"
    fi
    INSTALLED=\$((INSTALLED + 1))
  fi

  # ── OpenCode ──
  if command -v opencode >/dev/null 2>&1 || [ -d "\$HOME/.config/opencode" ]; then
    mkdir -p "\$HOME/.config/opencode/command"
    cp "\$TMP_SKILL" "\$HOME/.config/opencode/command/\${SLUG}.md"
    [ "\$COMPACT" -eq 0 ] && print_success "OpenCode command installed"
    INSTALLED=\$((INSTALLED + 1))
  fi

  # ── Gemini CLI ──
  if command -v gemini >/dev/null 2>&1 || [ -d "\$HOME/.gemini" ]; then
    mkdir -p "\$HOME/.gemini/skills/\${SLUG}"
    cp "\$TMP_SKILL" "\$HOME/.gemini/skills/\${SLUG}/SKILL.md"
    [ "\$COMPACT" -eq 0 ] && print_success "Gemini CLI skill installed"
    INSTALLED=\$((INSTALLED + 1))
  fi

  if [ "\$COMPACT" -eq 1 ]; then
    if [ "\$INSTALLED" -eq 0 ]; then
      print_info "\${SLUG} downloaded (no tool directories detected)"
    else
      print_success "\${SLUG} installed in \${INSTALLED} location(s)"
    fi
  fi
done

# ─── Summary ─────────────────────────────────────────────────────────────────
printf "\\n"
printf "\${BOLD}Done.\${RESET}\\n"
printf "\\n"
print_dim "Slash commands available:"
for S in \$SKILLS_TO_INSTALL; do
  printf "  \${GREEN}/\${S}\${RESET}\\n"
done
printf "\\n"
print_dim "Full documentation: \${BASE_URL}"
printf "\\n"
`;
}

function makeListScript(): string {
  const skillLines = skills
    .map((s) => `echo "  ${s.slug.padEnd(32)} ${s.tagline}"`)
    .join("\n");

  return `#!/bin/sh

echo ""
echo "skills.vishalvoid.com"
echo "Engineering patterns by Vishal Kumar Singh"
echo ""
echo "Available patterns:"
echo ""
${skillLines}
echo ""
echo "Install a pattern:"
echo "  curl -fsSL ${BASE_URL}/install/<slug> | bash"
echo ""
echo "Install all patterns:"
echo "  curl -fsSL ${BASE_URL}/install | bash"
echo ""
`;
}

export async function GET(request: Request) {
  const url = new URL(request.url);

  // Support /install/<slug> path pattern
  const pathParts = url.pathname.split("/").filter(Boolean);
  const slugFromPath = pathParts.length > 1 ? pathParts[pathParts.length - 1] : null;

  // Support ?skill=<slug> query param
  const slugFromQuery = url.searchParams.get("skill");

  const slug = slugFromQuery ?? slugFromPath;

  let script: string;

  if (slug && slug !== "install") {
    const isValid = skills.some((s) => s.slug === slug);
    script = isValid ? makeInstallScript(slug) : makeListScript();
  } else {
    script = makeInstallScript(ALL_SLUGS);
  }

  return new Response(script, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
