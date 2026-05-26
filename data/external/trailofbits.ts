import type { ExternalSkill } from "../external-skills";

export const trailofbitsSkills: ExternalSkill[] = [
  {
    "slug": "claude-in-chrome-troubleshooting",
    "name": "claude-in-chrome-troubleshooting",
    "tagline": "Diagnose and fix Claude in Chrome MCP extension connectivity issues",
    "description": "Diagnose and fix Claude in Chrome MCP extension connectivity issues",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/trailofbits/skills/tree/main/plugins/claude-in-chrome-troubleshooting",
    "tags": [
      "trailofbits",
      "Developer Tools",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Diagnoses and fixes connectivity failures between the Claude in Chrome MCP extension and Claude Code CLI on macOS. The core problem it solves is a conflict between Claude.app (Cowork) and Claude Code CLI, which register competing native messaging hosts in Chrome with incompatible socket formats. Covers socket path mismatches, stale version wrappers, multiple Chrome profiles, and TMPDIR misconfiguration.",
    "whenToUse": [
      "Configuring integration settings for custom agent workflows.",
      "Optimizing query execution and response latency in production.",
      "Developing clean, standard-compliant implementations for enterprise services.",
      "Troubleshooting connection timeouts and authentication handshakes.",
      "Monitoring API rate limits and execution pipelines programmatically."
    ],
    "skillMd": "# Claude in Chrome Troubleshooting\n\nDiagnose and fix Claude in Chrome MCP extension connectivity issues.\n\n**Original Author:** [@jeffzwang](https://github.com/jeffzwang) from [@ExaAILabs](https://github.com/ExaAILabs)\n**Enhanced by:** Trail of Bits\n\n## When to Use\n\n- `mcp__claude-in-chrome__*` tools fail with \"Browser extension is not connected\"\n- Browser automation works erratically or times out\n- After updating Claude Code or Claude.app\n- When switching between Claude Code CLI and Claude.app (Cowork)\n\n## What It Does\n\n- Explains the Claude.app vs Claude Code native host conflict\n- Provides toggle script to switch between the two\n- Quick diagnosis commands\n- Full reset procedure\n- Covers edge cases (multiple profiles, stale wrappers, TMPDIR issues)\n\n## Installation\n\n```\n/plugin install trailofbits/skills/plugins/claude-in-chrome-troubleshooting\n```\n\n## License\n\nThis work is licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-sa/4.0/).\n"
  },
  {
    "slug": "audit-context-building",
    "name": "audit-context-building",
    "tagline": "Deep architectural context via ultra-granular code analysis",
    "description": "Deep architectural context via ultra-granular code analysis",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/trailofbits/skills/tree/main/plugins/audit-context-building",
    "tags": [
      "trailofbits",
      "Developer Tools",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "A structured analysis skill for the pre-audit phase of code review. It guides Claude through line-by-line function analysis, cross-boundary call tracing, and invariant mapping before any vulnerability hunting begins. The output is a stable, evidence-based mental model of how the system actually works.",
    "whenToUse": [
      "Configuring integration settings for custom agent workflows.",
      "Optimizing query execution and response latency in production.",
      "Developing clean, standard-compliant implementations for enterprise services.",
      "Troubleshooting connection timeouts and authentication handshakes.",
      "Monitoring API rate limits and execution pipelines programmatically."
    ],
    "skillMd": "# Audit Context Building\n\nBuild deep architectural context through ultra-granular code analysis before vulnerability hunting.\n\n**Author:** Omar Inuwa\n\n## When to Use\n\nUse this skill when you need to:\n- Develop deep comprehension of a codebase before security auditing\n- Build bottom-up understanding instead of high-level guessing\n- Reduce hallucinations and context loss during complex analysis\n- Prepare for threat modeling or architecture review\n\n## What It Does\n\nThis skill governs how Claude thinks during the context-building phase of an audit. When active, Claude will:\n\n- Perform **line-by-line / block-by-block** code analysis\n- Apply **First Principles**, **5 Whys**, and **5 Hows** at micro scale\n- Build and maintain a stable, explicit mental model\n- Identify invariants, assumptions, flows, and reasoning hazards\n- Track cross-function and external call flows with full context propagation\n\n## Key Principle\n\nThis is a **pure context building** skill. It does NOT:\n- Identify vulnerabilities\n- Propose fixes\n- Generate proofs-of-concept\n- Assign severity or impact\n\nIt exists solely to build deep understanding before the vulnerability-hunting phase.\n\n## Installation\n\n```\n/plugin install trailofbits/skills/plugins/audit-context-building\n```\n\n## Phases\n\n1. **Initial Orientation** - Map modules, entrypoints, actors, and storage\n2. **Ultra-Granular Function Analysis** - Line-by-line semantic analysis with cross-function flow tracking\n3. **Global System Understanding** - State/invariant reconstruction, workflow mapping, trust boundaries\n\n## Anti-Hallucination Rules\n\n- Never reshape evidence to fit earlier assumptions\n- Update the model explicitly when contradicted\n- Avoid vague guesses; use \"Unclear; need to inspect X\"\n- Cross-reference constantly to maintain global coherence\n\n## Related Skills\n\n- `issue-writer` - Write up findings after context is built\n- `differential-review` - Uses context-building for baseline analysis\n- `spec-compliance` - Compare understood behavior to documentation\n"
  },
  {
    "slug": "building-secure-contracts",
    "name": "building-secure-contracts",
    "tagline": "Smart contract security toolkit with vulnerability scanners for 6 blockchains",
    "description": "Smart contract security toolkit with vulnerability scanners for 6 blockchains",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/trailofbits/skills/tree/main/plugins/building-secure-contracts",
    "tags": [
      "trailofbits",
      "Developer Tools",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "A collection of 11 skills for smart contract security across Algorand, Cairo, Cosmos, Solana, Substrate, and TON. Covers platform-specific vulnerability scanning and development guidance based on Trail of Bits' Building Secure Contracts framework.",
    "whenToUse": [
      "Configuring integration settings for custom agent workflows.",
      "Optimizing query execution and response latency in production.",
      "Developing clean, standard-compliant implementations for enterprise services.",
      "Troubleshooting connection timeouts and authentication handshakes.",
      "Monitoring API rate limits and execution pipelines programmatically."
    ],
    "skillMd": "# Building Secure Contracts\n\nComprehensive smart contract security toolkit based on Trail of Bits' [Building Secure Contracts](https://github.com/crytic/building-secure-contracts) framework.\n\n**Author:** Omar Inuwa\n\n## Overview\n\nThis plugin provides 11 specialized skills for smart contract security across multiple blockchain platforms:\n\n- **6 Vulnerability Scanners** for platform-specific attack patterns\n- **5 Development Guidelines Assistants** for secure development practices\n\n## Installation\n\n```\n/plugin install trailofbits/skills/plugins/building-secure-contracts\n```\n\n---\n\n## Vulnerability Scanners\n\nPlatform-specific vulnerability detection based on Trail of Bits' [Not So Smart Contracts](https://github.com/crytic/not-so-smart-contracts) repository.\n\n### Algorand Vulnerability Scanner\n**Skill:** `/algorand-vulnerability-scanner`\n\nScans Algorand/TEAL codebases for 11 vulnerability patterns including:\n- Rekeying vulnerabilities\n- Unchecked transaction fees\n- Asset closing issues\n- Group size checks\n- Time-based replay attacks\n- And 6 more patterns\n\n### Cairo Vulnerability Scanner\n**Skill:** `/cairo-vulnerability-scanner`\n\nAnalyzes StarkNet/Cairo smart contracts for 6 vulnerability patterns:\n- Arithmetic overflow/underflow\n- Reentrancy\n- Uninitialized storage\n- Authorization bypass\n- And 2 more patterns\n\n### Cosmos Vulnerability Scanner\n**Skill:** `/cosmos-vulnerability-scanner`\n\nDetects security issues in Cosmos SDK modules for 9 patterns:\n- Undelegation time validation\n- Amount validation\n- Unbonding validation\n- Rounding issues\n- And 5 more patterns\n\n### Solana Vulnerability Scanner\n**Skill:** `/solana-vulnerability-scanner`\n\nScans Solana/Anchor programs for 6 critical vulnerabilities:\n- Arbitrary CPI\n- Improper PDA validation\n- Missing ownership checks\n- Signer authorization\n- And 2 more patterns\n\n### Substrate Vulnerability Scanner\n**Skill:** `/substrate-vulnerability-scanner`\n\nAnalyzes Substrate pallets for 7 security issues:\n- BadOrigin handling\n- Insufficient weight\n- Panics on overflow\n- Unsigned transaction validation\n- And 3 more patterns\n\n### TON Vulnerability Scanner\n**Skill:** `/ton-vulnerability-scanner`\n\nDetects vulnerabilities in TON smart contracts for 3 patterns:\n- Replay protection\n- Unprotected receiver\n- Sender validation issues\n\n---\n\n## Development Guidelines Assistants\n\nBased on Trail of Bits' [Development Guidelines](https://github.com/crytic/building-secure-contracts/tree/master/development-guidelines).\n\n### Audit Prep Assistant\n**Skill:** `/audit-prep-assistant`\n\nPrepare your codebase for security reviews with a comprehensive checklist:\n1. **Set review goals** - Define objectives and concerns\n2. **Resolve easy issues** - Run static analysis (Slither, dylint, golangci-lint)\n3. **Ensure accessibility** - Build instructions, frozen commits, scope clarity\n4. **Generate documentation** - Flowcharts, user stories, glossaries\n\n**Use this:** 1-2 weeks before your audit to maximize review effectiveness.\n\n### Code Maturity Assessor\n**Skill:** `/code-maturity-assessor`\n\nSystematic code maturity evaluation using Trail of Bits' 9-category framework:\n- Arithmetic safety\n- Auditing practices\n- Authentication/Access controls\n- Complexity management\n- Decentralization\n- Documentation quality\n- Transaction ordering risks\n- Low-level manipulation\n- Testing and verification\n\n**Output:** Professional maturity scorecard with evidence-based ratings and improvement roadmap.\n\n### Guidelines Advisor\n**Skill:** `/guidelines-advisor`\n\nComprehensive development best practices advisor covering:\n- **Documentation & Specifications** - Generate system descriptions and architectural diagrams\n- **Architecture Analysis** - Optimize on-chain/off-chain distribution\n- **Upgradeability Review** - Assess upgrade patterns and delegatecall proxies\n- **Implementation Quality** - Review functions, inheritance, events\n- **Common Pitfalls** - Identify security anti-patterns\n- **Dependencies** - Evaluate library usage\n- **Testing** - Suggest improvements\n\n**Use this:** Throughout development for architectural and implementation guidance.\n\n### Secure Workflow Guide\n**Skill:** `/secure-workflow-guide`\n\nInteractive 5-step secure development workflow:\n1. **Known Security Issues** - Run Slither with 70+ detectors\n2. **Special Features** - Check upgradeability, ERC conformance, token integration\n3. **Visual Inspection** - Generate inheritance graphs, function summaries, authorization maps\n4. **Security Properties** - Document properties, set up Echidna/Manticore\n5. **Manual Review** - Analyze privacy, front-running, cryptography, DeFi risks\n\n**Use this:** On every check-in or before deployment for continuous security validation.\n\n### Token Integration Analyzer\n**Skill:** `/token-integration-analyzer`\n\nComprehensive token security analysis for both implementations and integrations:\n- **ERC20/ERC721 Conformity** - Validate standard compliance\n- **Contract Composition** - Assess complexity and SafeMath usage\n- **Owner Privileges** - Review upgradeability, minting, pausability, blacklists\n- **20+ Weird Token Patterns** - Check for non-standard behaviors (missing returns, fee-on-transfer, rebasing, etc.)\n- **On-chain Analysis** - Query deployed contracts for scarcity and distribution\n- **Integration Safety** - Verify defensive patterns and safe transfer usage\n\n**Use this:** When building tokens or integrating with external tokens.\n\n---\n\n## Skill Organization\n\n```\nbuilding-secure-contracts/\n└── skills/\n    ├── algorand-vulnerability-scanner/\n    ├── audit-prep-assistant/\n    ├── cairo-vulnerability-scanner/\n    ├── code-maturity-assessor/\n    ├── cosmos-vulnerability-scanner/\n    ├── guidelines-advisor/\n    ├── secure-workflow-guide/\n    ├── solana-vulnerability-scanner/\n    ├── substrate-vulnerability-scanner/\n    ├── token-integration-analyzer/\n    └── ton-vulnerability-scanner/\n```\n\n---\n\n## Example Workflows\n\n### Pre-Audit Preparation\n1. Run `/secure-workflow-guide` to ensure clean Slither report\n2. Use `/code-maturity-assessor` to evaluate overall maturity\n3. Run `/audit-prep-assistant` to prepare documentation and checklist\n4. Share prepared package with auditors\n\n### Platform-Specific Security Review\n1. Run appropriate vulnerability scanner for your platform\n2. Use `/guidelines-advisor` for implementation best practices\n3. Run `/secure-workflow-guide` for comprehensive security checks\n4. Address findings and re-scan\n\n### Token Development/Integration\n1. Run `/token-integration-analyzer` for conformity and weird patterns\n2. Use `/guidelines-advisor` for token-specific best practices\n3. Run `/secure-workflow-guide` for complete validation\n4. Deploy with confidence\n\n### Continuous Security\n1. Run `/secure-workflow-guide` on every check-in\n2. Use platform scanner for vulnerability detection\n3. Monitor code maturity with `/code-maturity-assessor`\n4. Maintain documentation with `/guidelines-advisor`\n\n---\n\n## Tool Integration\n\nMany skills leverage security tools when available:\n- **Slither** - Static analysis for Solidity (70+ detectors, visual diagrams, upgradeability checks)\n- **Echidna** - Property-based fuzzing\n- **Manticore** - Symbolic execution\n- **Tealer** - Static analyzer for TEAL/PyTeal\n- **Web3/Ethers** - On-chain queries for deployed contracts\n\n**Note:** Skills gracefully adapt when tools are unavailable, performing manual analysis instead.\n\n---\n\n## Source Material\n\nThis plugin is based on Trail of Bits' open-source security resources:\n- [Building Secure Contracts](https://github.com/crytic/building-secure-contracts)\n- [Not So Smart Contracts](https://github.com/crytic/not-so-smart-contracts)\n- [Weird ERC20](https://github.com/d-xo/weird-erc20)\n\n---\n\n## Related Skills\n\n- **audit-context-building** - Build deep architectural context before vulnerability hunting\n- **issue-writer** - Transform findings into professional audit reports\n- **solidity-poc-builder** - Build proof-of-concept exploits for Solidity vulnerabilities\n\n---\n\n## Support\n\nFor questions or issues:\n- [Trail of Bits Office Hours](https://meetings.hubspot.com/trailofbits/office-hours) - Every Tuesday\n- [Empire Hacking Slack](https://join.slack.com/t/empirehacking/shared_invite/zt-h97bbrj8-1jwuiU33nnzg67JcvIciUw) - #crytic and #ethereum channels\n"
  },
  {
    "slug": "constant-time-analysis",
    "name": "constant-time-analysis",
    "tagline": "Detect compiler-induced timing side-channels in crypto code",
    "description": "Detect compiler-induced timing side-channels in crypto code",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/trailofbits/skills/tree/main/plugins/constant-time-analysis",
    "tags": [
      "trailofbits",
      "Developer Tools",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Detects timing side-channel vulnerabilities in cryptographic code across 12 languages. It analyzes assembly and bytecode for variable-time operations like secret-dependent branches, divisions, and table lookups that can leak private key material through execution timing. Developed by Trail of Bits.",
    "whenToUse": [
      "Configuring integration settings for custom agent workflows.",
      "Optimizing query execution and response latency in production.",
      "Developing clean, standard-compliant implementations for enterprise services.",
      "Troubleshooting connection timeouts and authentication handshakes.",
      "Monitoring API rate limits and execution pipelines programmatically."
    ],
    "skillMd": "# Constant-Time Analyzer (ct-analyzer)\n\nA portable tool for detecting timing side-channel vulnerabilities in compiled cryptographic code. Analyzes assembly output from multiple compilers and architectures to detect instructions that could leak secret data through execution timing.\n\n## Background\n\nTiming side-channel attacks exploit variations in execution time to extract secret information from cryptographic implementations. Common sources include:\n\n- **Hardware division** (`DIV`, `IDIV`): Execution time varies based on operand values\n- **Floating-point operations** (`FDIV`, `FSQRT`): Variable latency based on inputs\n- **Conditional branches**: Different execution paths have different timing\n\nThe infamous [KyberSlash](https://kyberslash.cr.yp.to/) attack demonstrated how division instructions in post-quantum cryptographic implementations could be exploited to recover secret keys.\n\n## Features\n\n- **Multi-language support**: C, C++, Go, Rust, PHP, JavaScript, TypeScript, Python, Ruby\n- **Multi-architecture support**: x86_64, ARM64, ARM, RISC-V, PowerPC, s390x, i386\n- **Multi-compiler support**: GCC, Clang, Go compiler, Rustc\n- **Scripting language support**: PHP (VLD/opcache), JavaScript/TypeScript (V8 bytecode), Python (dis), Ruby (YARV)\n- **Optimization-level testing**: Test across O0-O3, Os, Oz\n- **Multiple output formats**: Text, JSON, GitHub Actions annotations\n- **Cross-compilation**: Analyze code for different target architectures\n\n## Quick Start\n\n```bash\n# Install\nuv pip install -e .\n\n# Analyze a C file\nct-analyzer crypto.c\n```\n\n## Usage\n\n### Basic Analysis\n\n```bash\nct-analyzer <source_file>\n```\n\n### Options\n\n| Option | Description |\n|--------|-------------|\n| `--arch, -a` | Target architecture (x86_64, arm64, arm, riscv64, ppc64le, s390x, i386) |\n| `--compiler, -c` | Compiler to use (gcc, clang, go, rustc) |\n| `--opt-level, -O` | Optimization level (O0, O1, O2, O3, Os, Oz) - default: O2 |\n| `--warnings, -w` | Include conditional branch warnings |\n| `--func, -f` | Regex pattern to filter functions |\n| `--json` | Output JSON format |\n| `--github` | Output GitHub Actions annotations |\n| `--list-arch` | List supported architectures |\n\n### Examples\n\n```bash\n# Test with different optimization levels\nct-analyzer --opt-level O0 crypto.c\nct-analyzer --opt-level O3 crypto.c\n\n# Cross-compile for ARM64\nct-analyzer --arch arm64 crypto.c\n\n# Include conditional branch warnings\nct-analyzer --warnings crypto.c\n\n# Analyze specific functions\nct-analyzer --func 'decompose|sign' crypto.c\n\n# JSON output for CI\nct-analyzer --json crypto.c\n\n# Analyze Go code\nct-analyzer crypto.go\n\n# Analyze Rust code\nct-analyzer crypto.rs\n\n# Analyze PHP code (requires PHP with VLD extension or opcache)\nct-analyzer crypto.php\n\n# Analyze TypeScript (transpiles to JS first)\nct-analyzer crypto.ts\n\n# Analyze JavaScript (uses V8 bytecode analysis)\nct-analyzer crypto.js\n\n# Analyze Python (uses dis module for bytecode disassembly)\nct-analyzer crypto.py\n\n# Analyze Ruby (uses YARV instruction dump)\nct-analyzer crypto.rb\n```\n\n## Detected Vulnerabilities\n\n### Error-Level (Must Fix)\n\n| Category | x86_64 | ARM64 | RISC-V |\n|----------|--------|-------|--------|\n| Integer Division | DIV, IDIV, DIVQ, IDIVQ | UDIV, SDIV | DIV, DIVU, REM, REMU |\n| FP Division | DIVSS, DIVSD, DIVPS, DIVPD | FDIV | FDIV.S, FDIV.D |\n| Square Root | SQRTSS, SQRTSD, SQRTPS, SQRTPD | FSQRT | FSQRT.S, FSQRT.D |\n\n### Warning-Level (Review Needed)\n\nConditional branches that may leak timing if condition depends on secret data:\n\n- x86: JE, JNE, JZ, JNZ, JA, JB, JG, JL, etc.\n- ARM: BEQ, BNE, CBZ, CBNZ, TBZ, TBNZ\n- RISC-V: BEQ, BNE, BLT, BGE\n\n## Scripting Language Support\n\n### PHP Analysis\n\nPHP analysis uses either the VLD extension (recommended) or opcache debug output:\n\n**Detected PHP Vulnerabilities:**\n\n| Category | Pattern | Recommendation |\n|----------|---------|----------------|\n| Division | `ZEND_DIV`, `ZEND_MOD` | Use Barrett reduction |\n| Cache timing | `chr()`, `ord()` | Use `pack('C', $int)` / `unpack('C', $char)[1]` |\n| Table lookups | `bin2hex()`, `hex2bin()`, `base64_encode()` | Use constant-time alternatives |\n| Array access | `FETCH_DIM_R` (secret index) | Use constant-time table lookup |\n| Bit shifts | `ZEND_SL`, `ZEND_SR` (secret amount) | Mask shift amount |\n| Variable encoding | `pack()`, `serialize()`, `json_encode()` | Use fixed-length output |\n| Weak RNG | `rand()`, `mt_rand()`, `uniqid()` | Use `random_int()` / `random_bytes()` |\n| String comparison | `strcmp()`, `===` on secrets | Use `hash_equals()` |\n\n**Installation:**\n\n```bash\n# Install VLD extension (recommended)\n# Query latest version from PECL\nVLD_VERSION=$(curl -s https://pecl.php.net/package/vld | grep -oP 'vld-\\K[0-9.]+(?=\\.tgz)' | head -1)\npecl install channel://pecl.php.net/vld-${VLD_VERSION}\n\n# Or build from source (if PECL fails)\ngit clone https://github.com/derickr/vld.git && cd vld\nphpize && ./configure && make && sudo make install\n\n# Or use opcache (built-in, fallback)\n# Enabled by default in PHP 7+\n```\n\n### JavaScript/TypeScript Analysis\n\nJavaScript analysis uses V8 bytecode via Node.js `--print-bytecode`. TypeScript files are automatically transpiled first.\n\n**Detected JS Vulnerabilities:**\n\n| Category | Pattern | Recommendation |\n|----------|---------|----------------|\n| Division | `Div`, `Mod` bytecodes | Use constant-time multiply-shift |\n| Array access | `LdaKeyedProperty` (secret index) | Use constant-time table lookup |\n| Bit shifts | `ShiftLeft`, `ShiftRight` (secret amount) | Mask shift amount |\n| Variable encoding | `TextEncoder`, `JSON.stringify()`, `btoa()` | Use fixed-length output |\n| Weak RNG | `Math.random()` | Use `crypto.getRandomValues()` or `crypto.randomBytes()` |\n| Variable latency | `Math.sqrt()`, `Math.pow()` | Avoid in crypto paths |\n| String comparison | `===` on secrets | Use `crypto.timingSafeEqual()` (Node.js) |\n| Early-exit search | `indexOf()`, `includes()` | Use constant-time comparison |\n\n**Requirements:**\n```bash\n# Node.js required\nnode --version\n\n# TypeScript compiler (optional, for .ts files)\nnpm install -g typescript\n```\n\n### Python Analysis\n\nPython analysis uses the built-in `dis` module to analyze CPython bytecode.\n\n**Detected Python Vulnerabilities:**\n\n| Category | Pattern | Recommendation |\n|----------|---------|----------------|\n| Division | `BINARY_OP 11 (/)`, `BINARY_OP 6 (%)` | Use Barrett reduction or constant-time alternatives |\n| Array access | `BINARY_SUBSCR` (secret index) | Use constant-time table lookup |\n| Bit shifts | `BINARY_LSHIFT`, `BINARY_RSHIFT` (secret amount) | Mask shift amount |\n| Variable encoding | `int.to_bytes()`, `json.dumps()`, `base64.b64encode()` | Use fixed-length output |\n| Weak RNG | `random.random()`, `random.randint()` | Use `secrets.token_bytes()` / `secrets.randbelow()` |\n| Variable latency | `math.sqrt()`, `math.pow()` | Avoid in crypto paths |\n| String comparison | `==` on secrets | Use `hmac.compare_digest()` |\n| Early-exit search | `.find()`, `.startswith()` | Use constant-time comparison |\n\n**Requirements:**\n```bash\n# Python 3.x required (built-in dis module)\npython3 --version\n```\n\n### Ruby Analysis\n\nRuby analysis uses YARV (Yet Another Ruby VM) bytecode via `ruby --dump=insns`.\n\n**Detected Ruby Vulnerabilities:**\n\n| Category | Pattern | Recommendation |\n|----------|---------|----------------|\n| Division | `opt_div`, `opt_mod` | Use constant-time alternatives |\n| Array access | `opt_aref` (secret index) | Use constant-time table lookup |\n| Bit shifts | `opt_lshift`, `opt_rshift` (secret amount) | Mask shift amount |\n| Variable encoding | `pack()`, `to_json()`, `Base64.encode64()` | Use fixed-length output |\n| Weak RNG | `rand()`, `Random.new` | Use `SecureRandom.random_bytes()` |\n| Variable latency | `Math.sqrt()` | Avoid in crypto paths |\n| String comparison | `==` on secrets | Use `Rack::Utils.secure_compare()` or OpenSSL |\n| Early-exit search | `.include?()`, `.start_with?()` | Use constant-time comparison |\n\n**Requirements:**\n```bash\n# Ruby required (YARV is standard since Ruby 1.9)\nruby --version\n```\n\n## Example Output\n\n```text\n============================================================\nConstant-Time Analysis Report\n============================================================\nSource: decompose.c\nArchitecture: arm64\nCompiler: clang\nOptimization: O2\nFunctions analyzed: 4\nInstructions analyzed: 88\n\nVIOLATIONS FOUND:\n----------------------------------------\n[ERROR] SDIV\n  Function: decompose_vulnerable\n  Reason: SDIV has early termination optimization; execution time depends on operand values\n\n[ERROR] SDIV\n  Function: use_hint_vulnerable\n  Reason: SDIV has early termination optimization; execution time depends on operand values\n\n----------------------------------------\nResult: FAILED\nErrors: 2, Warnings: 0\n```\n\n## Fixing Violations\n\n### Replace Division with Barrett Reduction\n\n```c\n// VULNERABLE\nint32_t q = a / divisor;\n\n// SAFE: Barrett reduction\n// Precompute: mu = ceil(2^32 / divisor)\nuint32_t q = (uint32_t)(((uint64_t)a * mu) >> 32);\n```\n\n### Replace Branches with Constant-Time Selection\n\n```c\n// VULNERABLE\nif (secret) {\n    result = a;\n} else {\n    result = b;\n}\n\n// SAFE: Constant-time selection\nuint32_t mask = -(uint32_t)(secret != 0);\nresult = (a & mask) | (b & ~mask);\n```\n\n### Replace Comparisons\n\n```c\n// VULNERABLE\nif (memcmp(a, b, len) == 0) { ... }\n\n// SAFE: Use crypto/subtle or equivalent\nif (subtle.ConstantTimeCompare(a, b) == 1) { ... }\n```\n\n## Test Samples\n\nThe repository includes test samples demonstrating vulnerable and secure implementations:\n\n- `ct_analyzer/tests/test_samples/decompose_vulnerable.c` - Vulnerable C implementation\n- `ct_analyzer/tests/test_samples/decompose_constant_time.c` - Constant-time C implementation\n- `ct_analyzer/tests/test_samples/decompose_vulnerable.go` - Vulnerable Go implementation\n- `ct_analyzer/tests/test_samples/decompose_vulnerable.rs` - Vulnerable Rust implementation\n- `ct_analyzer/tests/test_samples/vulnerable.php` - Vulnerable PHP implementation\n- `ct_analyzer/tests/test_samples/vulnerable.ts` - Vulnerable TypeScript implementation\n- `ct_analyzer/tests/test_samples/vulnerable.py` - Vulnerable Python implementation\n- `ct_analyzer/tests/test_samples/vulnerable.rb` - Vulnerable Ruby implementation\n\nThese implement the Decompose and UseHint algorithms from ML-DSA (FIPS-204) as test cases.\n\n## CI Integration\n\n### GitHub Actions\n\n```yaml\nname: Constant-Time Check\n\non: [push, pull_request]\n\njobs:\n  ct-check:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n\n      - name: Set up Python\n        uses: actions/setup-python@v5\n        with:\n          python-version: '3.11'\n\n      - name: Install dependencies\n        run: |\n          uv pip install -e .\n\n      - name: Check constant-time properties\n        run: |\n          ct-analyzer --github src/crypto/*.c\n```\n\n### GitLab CI\n\n```yaml\nct-check:\n  stage: test\n  script:\n    - uv pip install -e .\n    - ct-analyzer --json src/crypto/*.c > ct-report.json\n  artifacts:\n    reports:\n      codequality: ct-report.json\n```\n\n## Limitations\n\n1. **Compiler Output Analysis**: Analyzes what the compiler produces, not runtime behavior. Cannot detect:\n   - Cache timing attacks from memory access patterns\n   - Microarchitectural side-channels (Spectre, etc.)\n   - Processor-specific optimizations\n\n2. **No Data Flow Analysis**: Flags all dangerous instructions regardless of whether they operate on secret data. Manual review is needed to determine if flagged code handles secrets. **This means false positives are expected** - for example, division used in loop bounds with public constants will be flagged even though it's not a vulnerability.\n\n3. **False Positive Verification**: For each flagged violation, verify the operands:\n   - If operands are compile-time constants or public parameters → likely false positive\n   - If operands are derived from keys, plaintext, or secrets → true positive\n   - See the SKILL.md documentation for detailed triage guidance\n\n4. **Compiler Variations**: Different compilers/versions may produce different assembly. Test with:\n   - Multiple optimization levels\n   - Multiple compilers\n   - Target production architectures\n\n5. **Scripting Languages**: PHP, JavaScript/TypeScript, Python, and Ruby are supported via bytecode analysis.\n\n## Running Tests\n\n```bash\npython3 ct_analyzer/tests/test_analyzer.py\n```\n\n## References\n\n- [Cryptocoding Guidelines](https://github.com/veorq/cryptocoding)\n- [KyberSlash Attack](https://kyberslash.cr.yp.to/)\n- [NIST FIPS 204: ML-DSA](https://csrc.nist.gov/pubs/fips/204/final)\n- [Trail of Bits ML-DSA Implementation](https://github.com/trailofbits/ml-dsa)\n\n## Acknowledgments\n\nBased on the [test_ct utility](https://github.com/trailofbits/ml-dsa/pull/16) created for ML-DSA.\n"
  },
  {
    "slug": "ask-questions-if-underspecified",
    "name": "ask-questions-if-underspecified",
    "tagline": "Prompt for clarification on ambiguous requirements",
    "description": "Prompt for clarification on ambiguous requirements",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/trailofbits/skills/tree/main/plugins/ask-questions-if-underspecified",
    "tags": [
      "trailofbits",
      "Developer Tools",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Guides an AI agent to pause and ask clarifying questions when a request has ambiguous objectives, unclear scope, or missing constraints. The agent asks 1-5 targeted questions before doing any work, offers multiple-choice options with defaults, and waits for answers before proceeding.",
    "whenToUse": [
      "Configuring integration settings for custom agent workflows.",
      "Optimizing query execution and response latency in production.",
      "Developing clean, standard-compliant implementations for enterprise services.",
      "Troubleshooting connection timeouts and authentication handshakes.",
      "Monitoring API rate limits and execution pipelines programmatically."
    ],
    "skillMd": "# Ask Questions If Underspecified\n\nAsk the minimum set of clarifying questions needed to avoid wrong work.\n\n**Author:** Kevin Valerio\n\n## When to Use\n\nUse this skill when:\n- The request has multiple plausible interpretations\n- Success criteria, scope, constraints, or environment details are unclear\n- Starting implementation without clarification risks doing the wrong work\n\n## What It Does\n\n- Asks 1–5 must-have questions in a scannable, answerable format (multiple choice + defaults)\n- Pauses before acting until required answers are provided (unless the user approves proceeding on stated assumptions)\n- Restates confirmed requirements before starting work\n\n## Installation\n\n```\n/plugin install trailofbits/skills/plugins/ask-questions-if-underspecified\n```\n"
  },
  {
    "slug": "burpsuite-project-parser",
    "name": "burpsuite-project-parser",
    "tagline": "Search and extract data from Burp Suite project files",
    "description": "Search and extract data from Burp Suite project files",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/trailofbits/skills/tree/main/plugins/burpsuite-project-parser",
    "tags": [
      "trailofbits",
      "Developer Tools",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Searches and extracts data from Burp Suite project files (.burp) via the command line. Supports regex search across response headers and bodies, extraction of audit findings with severity and confidence metadata, and structured access to proxy history and site map data.",
    "whenToUse": [
      "Configuring integration settings for custom agent workflows.",
      "Optimizing query execution and response latency in production.",
      "Developing clean, standard-compliant implementations for enterprise services.",
      "Troubleshooting connection timeouts and authentication handshakes.",
      "Monitoring API rate limits and execution pipelines programmatically."
    ],
    "skillMd": "# Burp Suite Project Parser\n\nSearch and extract data from Burp Suite project files (.burp) for use in Claude\n\n**Author:** Will Vandevanter\n\n## Prerequisites\n\n- **Burp Suite Professional** - Required for project file support\n- **burpsuite-project-file-parser extension** - Must be installed in Burp Suite (Available: https://github.com/BuffaloWill/burpsuite-project-file-parser)\n- **jq** (optional) - Recommended for formatting/filtering JSON output\n\n## When to Use\n\nUse this skill when you need to get the following from a Burp project:\n- Search response headers or bodies using regex patterns\n- Extract security audit findings and vulnerabilities\n- Dump proxy history or site map data for analysis\n- Programmatically analyze HTTP traffic captured by Burp Suite\n\nTrigger phrases: \"search the burp project\", \"find in burp file\", \"what vulnerabilities in the burp\", \"get audit items from burp\"\n\n## What It Does\n\nThis skill provides CLI access to Burp Suite project files through the burpsuite-project-file-parser extension:\n\n1. **Search headers/bodies** - Find specific patterns in captured HTTP traffic using regex\n2. **Extract audit items** - Get all security findings with severity, confidence, and URLs\n3. **Dump traffic data** - Export proxy history and site map entries as JSON\n4. **Filter output** - Use sub-component filters to optimize performance on large projects\n\n## Installation\n\n```\n/plugin install trailofbits/skills/plugins/burpsuite-project-parser\n```\n\n## Usage\n\nBase command:\n```bash\nscripts/burp-search.sh /path/to/project.burp [FLAGS]\n```\n\n### Available Commands\n\n| Command | Description | Output |\n|---------|-------------|--------|\n| `auditItems` | Extract all security findings | JSON: name, severity, confidence, host, port, protocol, url |\n| `proxyHistory` | Dump all captured HTTP traffic | Complete request/response data |\n| `siteMap` | Dump all site map entries | Site structure |\n| `responseHeader='.*regex.*'` | Search response headers | JSON: url, header |\n| `responseBody='.*regex.*'` | Search response bodies | Matching content |\n\n### Sub-Component Filters\n\nFor large projects, filter to specific data to improve performance:\n\n```bash\nproxyHistory.request.headers    # Only request headers\nproxyHistory.request.body       # Only request body\nproxyHistory.response.headers   # Only response headers\nproxyHistory.response.body      # Only response body\n```\n\nSame patterns work with `siteMap.*`\n\n## Examples\n\nSearch for CORS headers:\n```bash\nscripts/burp-search.sh project.burp \"responseHeader='.*Access-Control.*'\"\n```\n\nGet all high-severity findings:\n```bash\nscripts/burp-search.sh project.burp auditItems | jq 'select(.severity == \"High\")'\n```\n\nFind server signatures:\n```bash\nscripts/burp-search.sh project.burp \"responseHeader='.*(nginx|Apache|Servlet).*'\"\n```\n\nExtract request URLs from proxy history:\n```bash\nscripts/burp-search.sh project.burp proxyHistory.request.headers | jq -r '.request.url'\n```\n\nSearch for HTML forms:\n```bash\nscripts/burp-search.sh project.burp \"responseBody='.*<form.*action.*'\"\n```\n\n## Output Format\n\nAll output is JSON, one object per line. Pipe to `jq` for formatting or use `grep` for filtering:\n\n```bash\nscripts/burp-search.sh project.burp auditItems | jq .\nscripts/burp-search.sh project.burp auditItems | grep -i \"sql injection\"\n```\n"
  },
  {
    "slug": "culture-index",
    "name": "culture-index",
    "tagline": "Index and search culture documentation",
    "description": "Index and search culture documentation",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/trailofbits/skills/tree/main/plugins/culture-index",
    "tags": [
      "trailofbits",
      "Developer Tools",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Interprets Culture Index behavioral assessments for individuals and teams. Maps survey results to 19 archetypes, detects burnout risk by comparing Survey vs Job trait energy, and evaluates team gas/brake/glue balance.",
    "whenToUse": [
      "Configuring integration settings for custom agent workflows.",
      "Optimizing query execution and response latency in production.",
      "Developing clean, standard-compliant implementations for enterprise services.",
      "Troubleshooting connection timeouts and authentication handshakes.",
      "Monitoring API rate limits and execution pipelines programmatically."
    ],
    "skillMd": "# Culture Index\n\nInterprets Culture Index survey results for individuals and teams.\n\n**Author:** Dan Guido\n\n## When to Use\n\nUse this skill when you need to:\n- Interpret an individual's Culture Index profile\n- Analyze team composition for gas/brake/glue balance\n- Detect burnout signals by comparing Survey vs Job traits\n- Compare multiple profiles for compatibility\n- Get motivator recommendations for specific trait types\n\n## What It Does\n\nThis skill provides expert interpretation of Culture Index behavioral assessments:\n\n- **Relative Interpretation** - Always uses distance from arrow, never absolute values\n- **Survey vs Job Analysis** - Identifies behavior modification and energy drain\n- **Pattern Recognition** - Maps profiles to 19 archetypes\n- **Team Analysis** - Assesses gas/brake/glue balance and gaps\n- **Burnout Detection** - Calculates energy utilization and flags risk\n\n## Installation\n\n```\n/plugin install trailofbits/skills/plugins/culture-index\n```\n\n## Key Concepts\n\n### Trait Colors\n| Trait | Color | Measures |\n|-------|-------|----------|\n| A | Maroon | Autonomy, initiative |\n| B | Yellow | Social ability |\n| C | Blue | Pace/Patience |\n| D | Green | Conformity, detail |\n| L | Purple | Logic |\n| I | Cyan | Ingenuity |\n\n### Energy Utilization\n```\nUtilization = (Job EU / Survey EU) x 100\n\n70-130% = Healthy\n>130% = STRESS (burnout risk)\n<70% = FRUSTRATION (flight risk)\n```\n\n### Gas/Brake/Glue Framework\n| Role | Trait | Function |\n|------|-------|----------|\n| Gas | High A | Growth, risk-taking |\n| Brake | High D | Quality control |\n| Glue | High B | Relationships, morale |\n\n## Input Formats\n\n- **JSON** - Extracted profiles from culture-index tool (recommended)\n- **PDF** - Direct PDF analysis using Claude's vision\n\n## Workflows\n\n- `interpret-individual.md` - Single profile analysis\n- `analyze-team.md` - Team composition assessment\n- `detect-burnout.md` - Stress/frustration detection\n- `compare-profiles.md` - Multi-profile compatibility\n\n## Reference Documents\n\n- `primary-traits.md` - A, B, C, D trait details\n- `secondary-traits.md` - EU, L, I trait details\n- `patterns-archetypes.md` - 19 patterns and archetypes\n- `motivators.md` - Engagement strategies by trait\n- `team-composition.md` - Gas/brake/glue framework\n- `anti-patterns.md` - Common interpretation mistakes\n"
  },
  {
    "slug": "semgrep-rule-variant-creator",
    "name": "semgrep-rule-variant-creator",
    "tagline": "Port existing Semgrep rules to new target languages with test-driven validation",
    "description": "Port existing Semgrep rules to new target languages with test-driven validation",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/trailofbits/skills/tree/main/plugins/semgrep-rule-variant-creator",
    "tags": [
      "trailofbits",
      "Developer Tools",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Takes an existing Semgrep rule and ports it to one or more target languages. For each language, it runs applicability analysis, writes test cases first, translates the rule syntax to match target language AST and idioms, then validates until all tests pass. Outputs an independent rule and test file directory per language.",
    "whenToUse": [
      "Configuring integration settings for custom agent workflows.",
      "Optimizing query execution and response latency in production.",
      "Developing clean, standard-compliant implementations for enterprise services.",
      "Troubleshooting connection timeouts and authentication handshakes.",
      "Monitoring API rate limits and execution pipelines programmatically."
    ],
    "skillMd": "# Semgrep Rule Variant Creator\n\nA Claude Code skill for porting existing Semgrep rules to new target languages with proper applicability analysis and test-driven validation.\n\n## Overview\n\nThis skill takes an existing Semgrep rule and one or more target languages, then generates independent rule variants for each applicable language. Each variant goes through a complete 4-phase cycle:\n\n1. **Applicability Analysis** - Determine if the vulnerability pattern applies to the target language\n2. **Test Creation** - Write test-first with vulnerable and safe cases\n3. **Rule Creation** - Translate patterns and adapt for target language idioms\n4. **Validation** - Ensure all tests pass before proceeding\n\n## Prerequisites\n\n- [Semgrep](https://semgrep.dev/docs/getting-started/) installed and available in PATH\n- Existing Semgrep rule to port (in YAML)\n- Target languages specified\n\n## Usage\n\nInvoke the skill when you want to port an existing Semgrep rule:\n\n```\nPort the sql-injection.yaml Semgrep rule to Go and Java\n```\n\n```\nCreate Semgrep rule variants of my-rule.yaml for TypeScript, Rust, and C#\n```\n\n```\nCreate the same Semgrep rule for JavaScript and Ruby\n```\n\n```\nPort this Semgrep rule to Golang\n```\n\n## Output Structure\n\nFor each applicable target language, the skill produces:\n\n```\n<original-rule-id>-<language>/\n├── <original-rule-id>-<language>.yaml     # Ported rule\n└── <original-rule-id>-<language>.<ext>    # Test file\n```\n\n## Example\n\n**Input:**\n- Rule: `python-command-injection.yaml`\n- Target languages: Go, Java\n\n**Output:**\n```\npython-command-injection-golang/\n├── python-command-injection-golang.yaml\n└── python-command-injection-golang.go\n\npython-command-injection-java/\n├── python-command-injection-java.yaml\n└── python-command-injection-java.java\n```\n\n## Key Differences from semgrep-rule-creator\n\n| Aspect | semgrep-rule-creator | semgrep-rule-variant-creator |\n|--------|---------------------|------------------------------|\n| Input | Bug pattern description | Existing rule + target languages |\n| Output | Single rule+test | Multiple rule+test directories |\n| Workflow | Single creation cycle | Independent cycle per language |\n| Phase 1 | Problem analysis | Applicability analysis |\n\n## Skill Files\n\n- `skills/semgrep-rule-variant-creator/SKILL.md` - Main entry point\n- `skills/semgrep-rule-variant-creator/references/applicability-analysis.md` - Phase 1 guidance\n- `skills/semgrep-rule-variant-creator/references/language-syntax-guide.md` - Pattern translation guidance\n- `skills/semgrep-rule-variant-creator/references/workflow.md` - Detailed 4-phase workflow\n\n## Related Skills\n\n- **semgrep-rule-creator** - Create new Semgrep rules from scratch\n- **static-analysis** - Run existing Semgrep rules against code\n"
  },
  {
    "slug": "dwarf-expert",
    "name": "dwarf-expert",
    "tagline": "DWARF debugging format expertise",
    "description": "DWARF debugging format expertise",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/trailofbits/skills/tree/main/plugins/dwarf-expert",
    "tags": [
      "trailofbits",
      "Developer Tools",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Adds deep knowledge of the DWARF debug format (versions 3-5) to an agent. Covers parsing and validating DWARF data from compiled binaries, answering questions about the standard, and writing or reviewing code that works with DWARF structures.",
    "whenToUse": [
      "Configuring integration settings for custom agent workflows.",
      "Optimizing query execution and response latency in production.",
      "Developing clean, standard-compliant implementations for enterprise services.",
      "Troubleshooting connection timeouts and authentication handshakes.",
      "Monitoring API rate limits and execution pipelines programmatically."
    ],
    "skillMd": "# DWARF Expert\n\nInteract with and analyze DWARF debug files, understand the DWARF debug format/standard, and write code that parses DWARF data.\n\n**Author:** Evan Hellman\n\n## When to Use\n\nUse this skill when you need to:\n- Understand or parse DWARF debug information from compiled binaries\n- Answer questions about the DWARF standard (v3, v4, v5)\n- Write or review code that interacts with DWARF data\n- Use `dwarfdump` or `readelf` to extract debug information\n- Verify DWARF data integrity using `llvm-dwarfdump --verify`\n- Work with DWARF parsing libraries (libdwarf, pyelftools, gimli, etc.)\n\n## What It Does\n\nThis skill provides expertise on:\n- DWARF standards (v3-v5) via web search and authoritative source references\n- Parsing DWARF files using `dwarfdump` and `readelf` commands\n- Verification workflows using `llvm-dwarfdump --verify` and `--statistics`\n- Library recommendations for DWARF parsing in C/C++, Python, Rust, Go, and .NET\n- DIE (Debug Information Entry) analysis and searching\n- Understanding DWARF sections, attributes, and forms\n\n## Authoritative Sources\n\nThis skill uses the following authoritative sources for DWARF standard information:\n- **dwarfstd.org**: Official DWARF specification (via web search)\n- **LLVM source**: `llvm/lib/DebugInfo/DWARF/` for reference implementations\n- **libdwarf source**: github.com/davea42/libdwarf-code for C implementations\n\n## Installation\n\n```\n/plugin install trailofbits/skills/plugins/dwarf-expert\n```\n"
  },
  {
    "slug": "modern-python",
    "name": "modern-python",
    "tagline": "Modern Python tooling with uv, ruff, ty, and pytest best practices",
    "description": "Modern Python tooling with uv, ruff, ty, and pytest best practices",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/trailofbits/skills/tree/main/plugins/modern-python",
    "tags": [
      "trailofbits",
      "Developer Tools",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Configures Python projects with uv, ruff, and ty — the modern replacements for pip, flake8/black, and mypy. Covers new projects, standalone scripts using PEP 723 inline metadata, and migrations from legacy tooling like Poetry or requirements.txt.",
    "whenToUse": [
      "Configuring integration settings for custom agent workflows.",
      "Optimizing query execution and response latency in production.",
      "Developing clean, standard-compliant implementations for enterprise services.",
      "Troubleshooting connection timeouts and authentication handshakes.",
      "Monitoring API rate limits and execution pipelines programmatically."
    ],
    "skillMd": "# Modern Python\n\nModern Python tooling and best practices using uv, ruff, ty, and pytest. Based on patterns from [trailofbits/cookiecutter-python](https://github.com/trailofbits/cookiecutter-python).\n\n**Author:** William Tan\n\n## When to Use\n\n- Setting up a new Python project with modern, fast tooling\n- Replacing pip/virtualenv with uv for faster dependency management\n- Replacing flake8/black/isort with ruff for unified linting and formatting\n- Replacing mypy with ty for faster type checking\n- Adding pre-commit hooks and security scanning to an existing project\n\n## What It Covers\n\n**Core Tools:**\n- **uv** - Package/dependency management (replaces pip, virtualenv, pip-tools, pipx, pyenv)\n- **ruff** - Linting and formatting (replaces flake8, black, isort, pyupgrade)\n- **ty** - Type checking (replaces mypy, pyright)\n- **pytest** - Testing with coverage enforcement\n- **prek** - Pre-commit hooks (replaces pre-commit)\n\n**Security Tools:**\n- **shellcheck** - Shell script linting\n- **detect-secrets** - Secret detection in commits\n- **actionlint** - GitHub Actions syntax validation\n- **zizmor** - GitHub Actions security audit\n- **pip-audit** - Dependency vulnerability scanning\n- **Dependabot** - Automated dependency updates with supply chain protection\n\n**Standards:**\n- **pyproject.toml** - Single configuration file with dependency groups (PEP 735)\n- **PEP 723** - Inline script metadata for single-file scripts\n- **src/ layout** - Standard package structure\n- **Python 3.11+** - Minimum version requirement\n\n## Hook: Legacy Command Interception\n\nThis plugin includes a `SessionStart` hook that prepends PATH shims for `python`, `pip`, `pipx`, and `uv`. When Claude runs a bare `python`, `pip`, or `pipx` command, the shell resolves to the shim, which prints an error with the correct `uv` alternative and exits non-zero. `uv run` is unaffected because it prepends its managed virtualenv's `bin/` to PATH, shadowing the shims.\n\n| Intercepted Command | Suggested Alternative |\n|---------------------|----------------------|\n| `python ...` | `uv run python ...` |\n| `python -m module` | `uv run python -m module` |\n| `python -m pip` | `uv add`/`uv remove` |\n| `pip install pkg` | `uv add pkg` or `uv run --with pkg` |\n| `pip uninstall pkg` | `uv remove pkg` |\n| `pip freeze` | `uv export` |\n| `uv pip ...` | `uv add`/`uv remove`/`uv sync` |\n| `pipx install <pkg>` | `uv tool install <pkg>` |\n| `pipx run <pkg>` | `uvx <pkg>` |\n| `pipx uninstall <pkg>` | `uv tool uninstall <pkg>` |\n| `pipx upgrade <pkg>` | `uv tool upgrade <pkg>` |\n| `pipx upgrade-all` | `uv tool upgrade --all` |\n| `pipx ensurepath` | `uv tool update-shell` |\n| `pipx inject <pkg> <dep>` | `uv tool install --with <dep> <pkg>` |\n| `pipx list` | `uv tool list` |\n\nCommands like `grep python`, `which python`, and `cat python.txt` work normally because `python` is a shell argument, not the command being invoked.\n\n## Installation\n\n```\n/plugin install trailofbits/skills/plugins/modern-python\n```\n"
  },
  {
    "slug": "insecure-defaults",
    "name": "insecure-defaults",
    "tagline": "Detect insecure default configurations like hardcoded secrets, default credentials, and weak crypto",
    "description": "Detect insecure default configurations like hardcoded secrets, default credentials, and weak crypto",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/trailofbits/skills/tree/main/plugins/insecure-defaults",
    "tags": [
      "trailofbits",
      "Developer Tools",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Detects fail-open security vulnerabilities where applications run insecurely due to missing or weak configuration. Focuses on distinguishing exploitable defaults (app runs with a weak secret) from fail-secure patterns (app crashes without proper config). Covers hardcoded credentials, weak crypto, permissive access controls, and debug features left enabled.",
    "whenToUse": [
      "Configuring integration settings for custom agent workflows.",
      "Optimizing query execution and response latency in production.",
      "Developing clean, standard-compliant implementations for enterprise services.",
      "Troubleshooting connection timeouts and authentication handshakes.",
      "Monitoring API rate limits and execution pipelines programmatically."
    ],
    "skillMd": "# Insecure Defaults Detection\n\nSecurity skill for detecting insecure default configurations that create vulnerabilities when applications run with missing or incomplete configuration.\n\n## Overview\n\nThe `insecure-defaults` skill helps identify security vulnerabilities caused by:\n\n- **Hardcoded fallback secrets** (JWT keys, API keys, session secrets)\n- **Default credentials** (admin/admin, root/password)\n- **Weak cryptographic defaults** (MD5, DES, ECB mode)\n- **Permissive access control** (CORS *, public by default)\n- **Missing security configuration** that causes fail-open behavior\n\n**Critical Distinction:** This skill emphasizes **fail-secure vs. fail-open** behavior. Applications that crash without proper configuration are safe; applications that run with insecure defaults are vulnerable.\n\n## Installation\n\n```bash\ncd parent-folder/skills\n/plugin install ./plugins/insecure-defaults\n```\n\nOr from the plugin marketplace:\n```bash\n/plugin install insecure-defaults\n```\n\n## When to Use\n\nUse this skill when:\n\n- **Security auditing** production applications or services\n- **Configuration review** of deployment manifests (Docker, Kubernetes, IaC)\n- **Pre-production checks** before deploying new services\n- **Code review** of authentication, authorization, or cryptographic code\n- **Environment variable handling** analysis for secrets management\n- **API security review** checking CORS, rate limiting, authentication\n- **Third-party integration** review for hardcoded test credentials\n\n## Usage\n\n```\nAudit this codebase for insecure defaults—focus on environment variable fallbacks and authentication configuration\n```\n"
  },
  {
    "slug": "differential-review",
    "name": "differential-review",
    "tagline": "Security-focused diff review with git history analysis",
    "description": "Security-focused diff review with git history analysis",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/trailofbits/skills/tree/main/plugins/differential-review",
    "tags": [
      "trailofbits",
      "Developer Tools",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Runs security-focused differential reviews on PRs, commits, and diffs. Scales analysis depth to codebase size, calculates blast radius for high-risk changes, checks test coverage gaps, and writes a markdown report file. Detects security regressions by tracing git history on removed code.",
    "whenToUse": [
      "Configuring integration settings for custom agent workflows.",
      "Optimizing query execution and response latency in production.",
      "Developing clean, standard-compliant implementations for enterprise services.",
      "Troubleshooting connection timeouts and authentication handshakes.",
      "Monitoring API rate limits and execution pipelines programmatically."
    ],
    "skillMd": "# Differential Review\n\nSecurity-focused differential review of code changes with git history analysis and blast radius estimation.\n\n**Author:** Omar Inuwa\n\n## When to Use\n\nUse this skill when you need to:\n- Review PRs, commits, or diffs for security vulnerabilities\n- Detect security regressions (re-introduced vulnerabilities)\n- Analyze the blast radius of code changes\n- Check test coverage gaps for modified code\n\n## What It Does\n\nThis skill performs comprehensive security review of code changes:\n\n- **Risk-First Analysis** - Prioritizes auth, crypto, value transfer, external calls\n- **Git History Analysis** - Uses blame to understand why code existed and detect regressions\n- **Blast Radius Calculation** - Quantifies impact by counting callers\n- **Test Coverage Gaps** - Identifies untested changes\n- **Adaptive Depth** - Scales analysis based on codebase size (small/medium/large)\n\n## Installation\n\n```\n/plugin install trailofbits/skills/plugins/differential-review\n```\n\n## Documentation Structure\n\nThis skill uses a **modular documentation architecture** for token efficiency and progressive disclosure:\n\n### Core Entry Point\n- **[SKILL.md](skills/differential-review/SKILL.md)** - Main entry point (217 lines)\n  - Quick reference tables for triage\n  - Decision tree routing to detailed docs\n  - Quality checklist and red flags\n  - Integration with other skills\n\n### Supporting Documentation\n- **[methodology.md](skills/differential-review/methodology.md)** - Detailed phase-by-phase workflow (~200 lines)\n  - Pre-Analysis: Baseline context building\n  - Phase 0: Intake & Triage\n  - Phase 1: Changed Code Analysis\n  - Phase 2: Test Coverage Analysis\n  - Phase 3: Blast Radius Analysis\n  - Phase 4: Deep Context Analysis\n\n- **[adversarial.md](skills/differential-review/adversarial.md)** - Attacker modeling and exploit scenarios (~150 lines)\n  - Phase 5: Adversarial Vulnerability Analysis\n  - Attacker model definition (WHO/ACCESS/INTERFACE)\n  - Exploitability rating framework\n  - Complete exploit scenario templates\n\n- **[reporting.md](skills/differential-review/reporting.md)** - Report structure and formatting (~120 lines)\n  - Phase 6: Report Generation\n  - 9-section report template\n  - Formatting guidelines and conventions\n  - File naming and notification templates\n\n- **[patterns.md](skills/differential-review/patterns.md)** - Common vulnerability patterns (~80 lines)\n  - Security regressions detection\n  - Reentrancy, access control, overflow patterns\n  - Quick detection bash commands\n\n### Benefits of This Structure\n- **Token Efficient** - Load only the documentation you need\n- **Progressive Disclosure** - Quick reference for triage, detailed docs for deep analysis\n- **Maintainable** - Each concern separated into its own file\n- **Navigable** - Decision tree routes you to the right document\n\n## Workflow\n\nThe complete workflow spans Pre-Analysis + Phases 0-6:\n\n1. **Pre-Analysis** - Build baseline context with `audit-context-building` skill (if available)\n2. **Phase 0: Intake** - Extract changes, assess size, risk-score files\n3. **Phase 1: Changed Code** - Analyze diffs, git blame, check for regressions\n4. **Phase 2: Test Coverage** - Identify coverage gaps\n5. **Phase 3: Blast Radius** - Calculate impact of changes\n6. **Phase 4: Deep Context** - Five Whys root cause analysis\n7. **Phase 5: Adversarial Analysis** - Hunt vulnerabilities with attacker model\n8. **Phase 6: Report** - Generate comprehensive markdown report\n\n**Navigation:** Use the decision tree in SKILL.md to jump directly to the phase you need.\n\n## Output\n\nGenerates a markdown report with:\n- Executive summary with severity distribution\n- Critical findings with attack scenarios and PoCs\n- Test coverage analysis\n- Blast radius analysis\n- Historical context and regression risks\n- Actionable recommendations\n\n## Example Usage\n\n```\nReview the security implications of this PR:\ngit diff main..feature/auth-changes\n```\n\n## Related Skills\n\n- `context-building` - Used for baseline context analysis\n- `issue-writer` - Transform findings into formal audit reports\n"
  },
  {
    "slug": "sharp-edges",
    "name": "sharp-edges",
    "tagline": "Identify error-prone APIs and dangerous configurations",
    "description": "Identify error-prone APIs and dangerous configurations",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/trailofbits/skills/tree/main/plugins/sharp-edges",
    "tags": [
      "trailofbits",
      "Developer Tools",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Evaluates whether APIs, configurations, and interfaces are resistant to developer misuse. Focuses on cases where the easy path leads to insecurity, such as algorithm selection footguns, dangerous defaults, silent failures, and stringly-typed security values. Applies the \"pit of success\" principle: secure usage should be the default, not an opt-in.",
    "whenToUse": [
      "Configuring integration settings for custom agent workflows.",
      "Optimizing query execution and response latency in production.",
      "Developing clean, standard-compliant implementations for enterprise services.",
      "Troubleshooting connection timeouts and authentication handshakes.",
      "Monitoring API rate limits and execution pipelines programmatically."
    ],
    "skillMd": "# Sharp Edges\n\nIdentifies error-prone APIs, dangerous configurations, and footgun designs that enable security mistakes through developer confusion, laziness, or malice.\n\n## When to Use\n\n- Reviewing API designs for security-relevant interfaces\n- Auditing configuration schemas that expose security choices\n- Evaluating cryptographic library ergonomics\n- Assessing authentication/authorization APIs\n- Any code review where developers make security-critical decisions\n\n## What It Does\n\nAnalyzes code and designs through the lens of three adversaries:\n\n1. **The Scoundrel**: Can a malicious developer or attacker disable security via configuration?\n2. **The Lazy Developer**: Will copy-pasting the first example lead to insecure code?\n3. **The Confused Developer**: Can parameters be swapped without type errors?\n\n## Core Principle\n\n**The pit of success**: Secure usage should be the path of least resistance. If developers must read documentation carefully or remember special rules to avoid vulnerabilities, the API has failed.\n\n## Installation\n\n```\n/plugin install trailofbits/skills/plugins/sharp-edges\n```\n\n## Sharp Edge Categories\n\nThe skill identifies six categories of misuse-prone designs:\n\n| Category | Example |\n|----------|---------|\n| Algorithm Selection | JWT `alg: none` attack; PHP `hash(\"crc32\", $password)` |\n| Dangerous Defaults | `session_timeout: 0` meaning infinite; empty password accepted |\n| Primitive vs. Semantic APIs | `encrypt(msg, bytes, bytes)` where key/nonce can be swapped |\n| Configuration Cliffs | `verify_ssl: false` disables all certificate validation |\n| Silent Failures | Verification returns `False` instead of throwing; ignored return values |\n| Stringly-Typed Security | Permissions as comma-separated strings; SQL from concatenation |\n\n## Agent\n\nThe `sharp-edges-analyzer` agent runs the full analysis workflow autonomously in a subagent context. Use it when you want a dedicated, isolated analysis of APIs, configurations, or interfaces for misuse resistance.\n\n## Related Skills\n\n- [constant-time-analysis](../constant-time-analysis) - Detect timing side-channels in cryptographic code\n- [differential-review](../differential-review) - Security-focused code change review\n- [audit-context-building](../audit-context-building) - Deep architectural analysis before auditing\n"
  },
  {
    "slug": "entry-point-analyzer",
    "name": "entry-point-analyzer",
    "tagline": "Identify state-changing entry points in smart contracts",
    "description": "Identify state-changing entry points in smart contracts",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/trailofbits/skills/tree/main/plugins/entry-point-analyzer",
    "tags": [
      "trailofbits",
      "Developer Tools",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Analyzes smart contract codebases to map all state-changing entry points for security audits. Detects externally callable functions across Solidity, Vyper, Solana/Rust, Move, TON, and CosmWasm, then categorizes them by access level: public, admin, role-restricted, or contract-only. Excludes view and pure functions to keep focus on functions that can actually modify state.",
    "whenToUse": [
      "Configuring integration settings for custom agent workflows.",
      "Optimizing query execution and response latency in production.",
      "Developing clean, standard-compliant implementations for enterprise services.",
      "Troubleshooting connection timeouts and authentication handshakes.",
      "Monitoring API rate limits and execution pipelines programmatically."
    ],
    "skillMd": "# Entry Point Analyzer\n\nA Claude skill for systematically identifying **state-changing** entry points in smart contract codebases to guide security audits.\n\n## Purpose\n\nWhen auditing smart contracts, examining each file or function individually is inefficient. What auditors need is to start from **entry points**—the externally callable functions that represent the attack surface. This skill automates the identification and classification of state-changing entry points, excluding view/pure/read-only functions that cannot directly cause loss of funds or state corruption.\n\n## Supported Languages\n\n| Language | File Extensions | Framework Support |\n|----------|-----------------|-------------------|\n| Solidity | `.sol` | OpenZeppelin, custom modifiers |\n| Vyper | `.vy` | Native patterns |\n| Solana | `.rs` | Anchor, Native |\n| Move | `.move` | Aptos, Sui |\n| TON | `.fc`, `.func`, `.tact` | FunC, Tact |\n| CosmWasm | `.rs` | cw-ownable, cw-controllers |\n\n## Access Classifications\n\nThe skill categorizes entry points into four levels:\n\n1. **Public (Unrestricted)** — Callable by anyone; highest audit priority\n2. **Role-Restricted** — Limited to specific roles (admin, governance, guardian, etc.)\n3. **Review Required** — Ambiguous access patterns needing manual verification\n4. **Contract-Only** — Internal integration points (callbacks, hooks)\n\n## Output\n\nGenerates a structured markdown report with:\n- Summary table of entry point counts by category\n- Detailed tables for each access level\n- Function signatures with file:line references\n- Restriction patterns and role assignments\n- List of analyzed files\n\n## Usage\n\nTrigger the skill with requests like:\n- \"Analyze the entry points in this codebase\"\n- \"Find all external functions and access levels\"\n- \"List audit flows for src/core/\"\n- \"What privileged operations exist in this project?\"\n\n## Directory Filtering\n\nSpecify a subdirectory to limit scope:\n- \"Analyze only `src/core/`\"\n- \"Find entry points in `contracts/protocol/`\"\n\n## Role Detection\n\nThe skill infers roles from common patterns:\n\n| Pattern | Detected Role |\n|---------|---------------|\n| `onlyOwner`, `msg.sender == owner` | Owner |\n| `onlyAdmin`, `ADMIN_ROLE` | Admin |\n| `onlyGovernance`, `governance` | Governance |\n| `onlyGuardian`, `onlyPauser` | Guardian |\n| `onlyKeeper`, `onlyRelayer` | Keeper/Relayer |\n| `onlyStrategy`, `strategist` | Strategist |\n| Dynamic checks (`authorized[msg.sender]`) | Review Required |\n\n## Installation\n\n```\n/plugin install trailofbits/skills/plugins/entry-point-analyzer\n```\n\n## License\n\nSee LICENSE.txt for terms.\n"
  },
  {
    "slug": "static-analysis",
    "name": "static-analysis",
    "tagline": "Static analysis toolkit with CodeQL, Semgrep, and SARIF",
    "description": "Static analysis toolkit with CodeQL, Semgrep, and SARIF",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/trailofbits/skills/tree/main/plugins/static-analysis",
    "tags": [
      "trailofbits",
      "Developer Tools",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Static analysis toolkit combining CodeQL, Semgrep, and SARIF parsing for security vulnerability detection. Covers taint tracking, data flow analysis, and pattern-based scanning across Python, JavaScript, Go, Java, C/C++, and more. Based on the Trail of Bits Testing Handbook.",
    "whenToUse": [
      "Configuring integration settings for custom agent workflows.",
      "Optimizing query execution and response latency in production.",
      "Developing clean, standard-compliant implementations for enterprise services.",
      "Troubleshooting connection timeouts and authentication handshakes.",
      "Monitoring API rate limits and execution pipelines programmatically."
    ],
    "skillMd": "# Static Analysis\n\nA comprehensive static analysis toolkit with CodeQL, Semgrep, and SARIF parsing for security vulnerability detection.\n\nCodeQL and Semgrep skills are based on the Trail of Bits Testing Handbook:\n\n- [CodeQL Testing Handbook](https://appsec.guide/docs/static-analysis/codeql/)\n- [Semgrep Testing Handbook](https://appsec.guide/docs/static-analysis/semgrep/)\n\n**Author:** Axel Mierczuk & Paweł Płatek\n\n## Skills Included\n\n| Skill           | Purpose                                                  |\n|-----------------|----------------------------------------------------------|\n| `codeql`        | Deep security analysis with taint tracking and data flow |\n| `semgrep`       | Fast pattern-based security scanning                     |\n| `sarif-parsing` | Parse and process results from static analysis tools     |\n\n## When to Use\n\nUse this plugin when you need to:\n- Perform security vulnerability detection on codebases\n- Run CodeQL for interprocedural taint tracking and data flow analysis\n- Use Semgrep for fast pattern-based bug detection\n- Parse SARIF output from security scanners\n- Aggregate and deduplicate findings from multiple tools\n\n## What It Does\n\n### CodeQL\n- Create databases for Python, JavaScript, Go, Java, C/C++, and more\n- Run security queries with SARIF/CSV output\n- Generate data extension models for project-specific APIs\n- Select and combine query packs (security-extended, Trail of Bits, Community)\n\n### Semgrep\n- Quick security scans using built-in rulesets (OWASP, CWE, Trail of Bits)\n- Write custom YAML rules with pattern matching\n- Taint mode for tracking data flow from sources to sinks\n- CI/CD integration with baseline scanning\n\n### SARIF Parsing\n- Understand SARIF 2.1.0 structure\n- Quick analysis using jq for CLI queries\n- Python scripting with pysarif and sarif-tools\n- Aggregate and deduplicate results from multiple files\n- CI/CD integration patterns\n\n## Agents Included\n\n| Agent              | Tools                  | Purpose                                                        |\n|--------------------|------------------------|----------------------------------------------------------------|\n| `semgrep-scanner`  | Bash                   | Executes parallel semgrep scans for a language category        |\n| `semgrep-triager`  | Read, Grep, Glob, Write | Classifies findings as true/false positives by reading source |\n\n## Installation\n\n```\n/plugin install trailofbits/skills/plugins/static-analysis\n```\n\n## Related Skills\n\n- `variant-analysis` - Use CodeQL/Semgrep patterns to find bug variants\n"
  },
  {
    "slug": "property-based-testing",
    "name": "property-based-testing",
    "tagline": "Property-based testing for multiple languages and smart contracts",
    "description": "Property-based testing for multiple languages and smart contracts",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/trailofbits/skills/tree/main/plugins/property-based-testing",
    "tags": [
      "trailofbits",
      "Developer Tools",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Guides property-based testing across Python, JavaScript, Rust, and Solidity/Vyper. Detects high-value patterns like serialization pairs, normalizers, and smart contract state invariants, then suggests appropriate properties and generators. Covers the full workflow from test design to failure interpretation.",
    "whenToUse": [
      "Configuring integration settings for custom agent workflows.",
      "Optimizing query execution and response latency in production.",
      "Developing clean, standard-compliant implementations for enterprise services.",
      "Troubleshooting connection timeouts and authentication handshakes.",
      "Monitoring API rate limits and execution pipelines programmatically."
    ],
    "skillMd": "# Property-Based Testing\n\nProperty-based testing guidance for multiple languages and smart contracts.\n\n## Installation\n\nThis plugin is part of the Trail of Bits Skills marketplace.\n\n### Via Marketplace (Recommended)\n\n```\n/plugin marketplace add trailofbits/skills\n/plugin menu\n```\n\nThen select the `property-based-testing` plugin to install.\n\n### Manual Installation\n\n```\n/plugin install trailofbits/skills/plugins/property-based-testing\n```\n\n## What's Included\n\nThis plugin provides a skill that helps Claude Code proactively suggest and write property-based tests when it detects suitable patterns in your code:\n\n- **Serialization pairs**: encode/decode, serialize/deserialize, toJSON/fromJSON\n- **Parsers**: URL parsing, config parsing, protocol parsing\n- **Normalization**: normalize, sanitize, clean, canonicalize\n- **Validators**: is_valid, validate, check_*\n- **Data structures**: Custom collections with add/remove/get operations\n- **Mathematical/algorithmic**: Pure functions, sorting, ordering\n- **Smart contracts**: Solidity/Vyper contracts, token operations, state invariants\n\n## Supported Languages\n\n- Python (Hypothesis)\n- JavaScript/TypeScript (fast-check)\n- Rust (proptest, quickcheck)\n- Go (rapid, gopter)\n- Java (jqwik)\n- Scala (ScalaCheck)\n- Solidity/Vyper (Echidna, Medusa)\n- And many more...\n\nSee `skills/property-based-testing/references/libraries.md` for the complete list.\n"
  },
  {
    "slug": "semgrep-rule-creator",
    "name": "semgrep-rule-creator",
    "tagline": "Create and refine Semgrep rules for vulnerability detection",
    "description": "Create and refine Semgrep rules for vulnerability detection",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/trailofbits/skills/tree/main/plugins/semgrep-rule-creator",
    "tags": [
      "trailofbits",
      "Developer Tools",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Creates custom Semgrep rules for detecting security vulnerabilities and code patterns. Guides you through a test-first workflow: write tests, analyze the AST, write the rule, iterate until all tests pass. Supports both pattern matching and taint mode for data flow analysis.",
    "whenToUse": [
      "Configuring integration settings for custom agent workflows.",
      "Optimizing query execution and response latency in production.",
      "Developing clean, standard-compliant implementations for enterprise services.",
      "Troubleshooting connection timeouts and authentication handshakes.",
      "Monitoring API rate limits and execution pipelines programmatically."
    ],
    "skillMd": "# Semgrep Rule Creator\n\nCreate production-quality Semgrep rules for detecting bug patterns and security vulnerabilities.\n\n**Author:** Maciej Domanski\n\n## Skills Included\n\n| Skill                 | Purpose                                              |\n|-----------------------|------------------------------------------------------|\n| `semgrep-rule-creator` | Guide creation of custom Semgrep rules with testing |\n\n## When to Use\n\nUse this skill when you need to:\n- Create custom Semgrep rules for detecting specific bug patterns\n- Write rules for security vulnerability detection\n- Build taint mode rules for data flow analysis\n- Develop pattern matching rules for code quality checks\n\n## What It Does\n\n- Guides test-driven rule development (write tests first, then iterate)\n- Analyzes AST structure to help craft precise patterns\n- Supports both taint mode (data flow) and pattern matching approaches\n- Includes comprehensive reference documentation from Semgrep docs\n- Provides common vulnerability patterns by language\n\n## Prerequisites\n\n- [Semgrep](https://semgrep.dev/docs/getting-started/) installed (`pip install semgrep` or `brew install semgrep`)\n\n## Installation\n\n```\n/plugin install trailofbits/skills/plugins/semgrep-rule-creator\n```\n\n## Related Skills\n\n- `semgrep-rule-variant-creator` - Port existing Semgrep rules to new target languages\n- `static-analysis` - General static analysis toolkit with Semgrep, CodeQL, and SARIF parsing\n- `variant-analysis` - Find similar vulnerabilities across codebases\n"
  },
  {
    "slug": "testing-handbook-skills",
    "name": "testing-handbook-skills",
    "tagline": "Testing Handbook skills: fuzzers, static analysis, sanitizers",
    "description": "Testing Handbook skills: fuzzers, static analysis, sanitizers",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/trailofbits/skills/tree/main/plugins/testing-handbook-skills",
    "tags": [
      "trailofbits",
      "Developer Tools",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "A meta-skill that reads the Trail of Bits Application Security Testing Handbook and generates Claude Code skills from it. It covers fuzzers (libFuzzer, AFL++, cargo-fuzz), static analysis tools (Semgrep, CodeQL), techniques like harness writing and coverage analysis, and domain-specific testing for crypto. Generated skills are validated before delivery.",
    "whenToUse": [
      "Configuring integration settings for custom agent workflows.",
      "Optimizing query execution and response latency in production.",
      "Developing clean, standard-compliant implementations for enterprise services.",
      "Troubleshooting connection timeouts and authentication handshakes.",
      "Monitoring API rate limits and execution pipelines programmatically."
    ],
    "skillMd": "# Testing Handbook Skills\n\nMeta-skill that generates Claude Code skills from the [Trail of Bits Application Security Testing Handbook](https://appsec.guide).\n\n## Overview\n\nThis plugin provides a skill generator that:\n\n1. Analyzes the Testing Handbook structure\n2. Identifies skill candidates (tools, techniques, domains)\n3. Generates skills using appropriate templates\n4. Validates generated skills\n\n## Installation\n\nAdd to your Claude Code skills configuration:\n\n```bash\n# From the skills marketplace\nclaude skills install testing-handbook-skills\n\n# Or manually add to .claude/settings.json\n{\n  \"plugins\": [\n    \"./plugins/testing-handbook-skills\"\n  ]\n}\n```\n\n## Usage\n\n### Generate All Skills\n\n```\nGenerate skills from the testing handbook\n```\n\nThis will:\n1. Locate the handbook (check common locations, ask user, or clone)\n2. Scan the handbook structure\n3. Present a plan of skills to generate\n4. On approval, generate skills as siblings to `testing-handbook-generator/`\n\n### Generate Specific Skill\n\n```\nCreate a skill for the libFuzzer section of the testing handbook\n```\n\n## Structure\n\n```\nplugins/testing-handbook-skills/\n├── .claude-plugin/\n│   └── plugin.json\n├── scripts/\n│   └── validate-skills.py        # Skill validation tool\n├── skills/\n│   ├── testing-handbook-generator/\n│   │   ├── SKILL.md              # Main skill entry point\n│   │   ├── discovery.md          # Handbook analysis methodology\n│   │   ├── testing.md            # Validation strategy\n│   │   ├── agent-prompt.md       # Agent prompt template for generation\n│   │   └── templates/            # Skill generation templates\n│   │       ├── tool-skill.md     # Semgrep, CodeQL\n│   │       ├── fuzzer-skill.md   # libFuzzer, AFL++, cargo-fuzz\n│   │       ├── technique-skill.md # Harness writing, coverage\n│   │       └── domain-skill.md   # Crypto testing, web security\n│   ├── [generated-skill]/        # Generated skills (siblings to generator)\n│   │   └── SKILL.md\n│   └── ...\n└── README.md\n```\n\n### Scripts\n\n| Script | Purpose |\n|--------|---------|\n| `validate-skills.py` | Validates generated skills (YAML, sections, line count, shortcodes, cross-refs) |\n\n```bash\n# Validate all skills\nuv run scripts/validate-skills.py\n\n# Validate specific skill\nuv run scripts/validate-skills.py --skill libfuzzer\n\n# JSON output for CI\nuv run scripts/validate-skills.py --json\n```\n\n## Skill Types\n\n| Type | Template | Example Sources |\n|------|----------|-----------------|\n| Tool | tool-skill.md | Semgrep, CodeQL |\n| Fuzzer | fuzzer-skill.md | libFuzzer, AFL++, cargo-fuzz |\n| Technique | technique-skill.md | Harness writing, coverage analysis |\n| Domain | domain-skill.md | Wycheproof, constant-time testing |\n\n## Generated Skills\n\nGenerated skills are written as siblings to the generator:\n```\nskills/[skill-name]/SKILL.md\n```\n\nEach generated skill:\n- Follows the appropriate template structure\n- Contains content extracted from the handbook\n- Includes resource links (WebFetch summaries for non-videos)\n- Is validated with `scripts/validate-skills.py` before delivery\n\n## Skills Cross-Reference\n\nThis graph shows the 16 generated skills and their cross-references (from the Related Skills section of each skill). Only links between actually generated skills are shown.\n\n```mermaid\ngraph TB\n    subgraph Fuzzers\n        libfuzzer[libfuzzer]\n        aflpp[aflpp]\n        libafl[libafl]\n        cargo-fuzz[cargo-fuzz]\n        atheris[atheris]\n        ruzzy[ruzzy]\n    end\n\n    subgraph Techniques\n        harness-writing[harness-writing]\n        address-sanitizer[address-sanitizer]\n        coverage-analysis[coverage-analysis]\n        fuzzing-dictionary[fuzzing-dictionary]\n        fuzzing-obstacles[fuzzing-obstacles]\n        ossfuzz[ossfuzz]\n    end\n\n    subgraph Tools\n        semgrep[semgrep]\n        codeql[codeql]\n    end\n\n    subgraph Domain\n        wycheproof[wycheproof]\n        constant-time-testing[constant-time-testing]\n    end\n\n    %% Fuzzer → Technique references\n    libfuzzer --> address-sanitizer\n    libfuzzer --> coverage-analysis\n    aflpp --> address-sanitizer\n    cargo-fuzz --> address-sanitizer\n    cargo-fuzz --> coverage-analysis\n    libafl --> address-sanitizer\n    libafl --> coverage-analysis\n    atheris --> address-sanitizer\n    atheris --> coverage-analysis\n    ruzzy --> address-sanitizer\n\n    %% Fuzzer ↔ Fuzzer alternatives\n    libfuzzer -.-> aflpp\n    libfuzzer -.-> libafl\n    aflpp -.-> libfuzzer\n    aflpp -.-> libafl\n    cargo-fuzz -.-> libfuzzer\n    cargo-fuzz -.-> aflpp\n    cargo-fuzz -.-> libafl\n    libafl -.-> libfuzzer\n    libafl -.-> aflpp\n    libafl -.-> cargo-fuzz\n    ruzzy -.-> libfuzzer\n    ruzzy -.-> aflpp\n\n    %% Tool ↔ Tool alternatives\n    semgrep -.-> codeql\n    codeql -.-> semgrep\n\n    %% Technique → Fuzzer references\n    harness-writing --> libfuzzer\n    harness-writing --> aflpp\n    harness-writing --> cargo-fuzz\n    harness-writing --> atheris\n    harness-writing --> ossfuzz\n    fuzzing-dictionary --> libfuzzer\n    fuzzing-dictionary --> aflpp\n    fuzzing-dictionary --> cargo-fuzz\n    fuzzing-obstacles --> libfuzzer\n    fuzzing-obstacles --> aflpp\n    fuzzing-obstacles --> cargo-fuzz\n    ossfuzz --> libfuzzer\n    ossfuzz --> aflpp\n    ossfuzz --> cargo-fuzz\n    ossfuzz --> atheris\n\n    %% Technique cross-references\n    harness-writing --> address-sanitizer\n    harness-writing --> coverage-analysis\n    harness-writing --> fuzzing-dictionary\n    harness-writing --> fuzzing-obstacles\n    fuzzing-dictionary --> coverage-analysis\n    fuzzing-dictionary --> harness-writing\n    address-sanitizer --> coverage-analysis\n    ossfuzz --> address-sanitizer\n    ossfuzz --> coverage-analysis\n\n    %% Domain → Technique references\n    wycheproof --> coverage-analysis\n    constant-time-testing --> coverage-analysis\n```\n\n**Legend:**\n- Solid arrows (`→`): Primary dependencies (techniques, tools used together)\n- Dashed arrows (`-.->`): Alternative suggestions (similar tools/fuzzers)\n\n**Generated Skills Summary:**\n\n| Type | Skills |\n|------|--------|\n| Fuzzers (6) | libfuzzer, aflpp, libafl, cargo-fuzz, atheris, ruzzy |\n| Techniques (6) | harness-writing, address-sanitizer, coverage-analysis, fuzzing-dictionary, fuzzing-obstacles, ossfuzz |\n| Tools (2) | semgrep, codeql |\n| Domain (2) | wycheproof, constant-time-testing |\n\n**Note:** Some skills reference planned/external skills not yet generated (e.g., `honggfuzz`, `fuzzing-corpus`, `sarif-parsing`). Run `validate-skills.py` to see the full list.\n\n## Configuration\n\nThe skill will automatically:\n1. Check common locations (`./testing-handbook`, `../testing-handbook`, `~/testing-handbook`)\n2. Ask the user for the path if not found\n3. Clone from GitHub as last resort: `https://github.com/trailofbits/testing-handbook`\n\nNo hardcoded paths are used - the skill adapts to your environment.\n\n## Author\n\nPaweł Płatek\n\n## License\n\nSee repository license.\n"
  },
  {
    "slug": "variant-analysis",
    "name": "variant-analysis",
    "tagline": "Find similar vulnerabilities via pattern-based analysis",
    "description": "Find similar vulnerabilities via pattern-based analysis",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/trailofbits/skills/tree/main/plugins/variant-analysis",
    "tags": [
      "trailofbits",
      "Developer Tools",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Variant analysis skill for finding similar vulnerabilities across a codebase after an initial bug is identified. It guides systematic pattern generalization using ripgrep, Semgrep, and CodeQL, moving from exact matches to broader search patterns while tracking false positive rates. Covers interprocedural analysis, taint tracking, and structured triage of results.",
    "whenToUse": [
      "Configuring integration settings for custom agent workflows.",
      "Optimizing query execution and response latency in production.",
      "Developing clean, standard-compliant implementations for enterprise services.",
      "Troubleshooting connection timeouts and authentication handshakes.",
      "Monitoring API rate limits and execution pipelines programmatically."
    ],
    "skillMd": "# Variant Analysis\n\nFind similar vulnerabilities and bugs across codebases using pattern-based analysis.\n\n**Author:** Axel Mierczuk\n\n## When to Use\n\nUse this skill when you need to:\n- Hunt for bug variants after finding an initial vulnerability\n- Build CodeQL or Semgrep queries from a known bug pattern\n- Perform systematic code audits across large codebases\n- Analyze security vulnerabilities and find similar instances\n- Create reusable patterns for recurring vulnerability classes\n\n## What It Does\n\nThis skill provides a systematic five-step process for variant analysis:\n1. **Understand the original issue** - Identify root cause, conditions, and exploitability\n2. **Create an exact match** - Start with a pattern matching only the known bug\n3. **Identify abstraction points** - Determine what can be generalized\n4. **Iteratively generalize** - Expand patterns one element at a time\n5. **Analyze and triage** - Document and prioritize findings\n\nIncludes:\n- Tool selection guidance (ripgrep, Semgrep, CodeQL)\n- Critical pitfalls to avoid (narrow scope, over-specific patterns)\n- Ready-to-use templates for CodeQL and Semgrep in Python, JavaScript, Java, Go, and C++\n- Detailed methodology documentation\n\n## Installation\n\n```\n/plugin install trailofbits/skills/plugins/variant-analysis\n```\n\n## Related Skills\n\n- `codeql` - Primary tool for deep interprocedural variant analysis\n- `semgrep` - Fast pattern matching for simpler variants\n- `sarif-parsing` - Process variant analysis results\n"
  },
  {
    "slug": "firebase-apk-scanner",
    "name": "firebase-apk-scanner",
    "tagline": "Scan Android APKs for Firebase misconfigurations and security vulnerabilities",
    "description": "Scan Android APKs for Firebase misconfigurations and security vulnerabilities",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/trailofbits/skills/tree/main/plugins/firebase-apk-scanner",
    "tags": [
      "trailofbits",
      "Developer Tools",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Scans Android APKs for Firebase security misconfigurations by decompiling the app, extracting Firebase configuration, and actively testing endpoints for vulnerabilities. Checks Realtime Database, Firestore, Storage buckets, Cloud Functions, and authentication settings for unauthenticated access and weak rules. Reports findings with severity ratings and remediation guidance.",
    "whenToUse": [
      "Configuring integration settings for custom agent workflows.",
      "Optimizing query execution and response latency in production.",
      "Developing clean, standard-compliant implementations for enterprise services.",
      "Troubleshooting connection timeouts and authentication handshakes.",
      "Monitoring API rate limits and execution pipelines programmatically."
    ],
    "skillMd": "# Firebase APK Security Scanner\n\nScan Android APKs for Firebase security misconfigurations including open databases, exposed storage buckets, and authentication bypasses.\n\n## When to Use\n\nUse this skill when you need to:\n- Audit Android applications for Firebase misconfigurations\n- Test Firebase endpoints extracted from APKs (Realtime Database, Firestore, Storage)\n- Check authentication security (open signup, anonymous auth, email enumeration)\n- Enumerate Cloud Functions and test for unauthenticated access\n- Perform mobile app security assessments involving Firebase backends\n\n## When NOT to Use\n\n- Scanning apps you do not have explicit authorization to test\n- Testing production Firebase projects without written permission\n- When you only need to extract Firebase config without testing (use manual grep/strings instead)\n- For non-Android targets (iOS, web apps) - this skill is APK-specific\n- When the target app does not use Firebase\n\n## What It Does\n\nThis skill automates Firebase security testing for Android applications. When invoked, Claude will:\n\n- **Decompile** the APK using apktool\n- **Extract** Firebase configuration from all sources (google-services.json, XML resources, assets, smali code, DEX strings)\n- **Test** authentication endpoints for misconfigurations\n- **Probe** Realtime Database and Firestore for open read/write access\n- **Check** Storage buckets for public listing and upload vulnerabilities\n- **Enumerate** Cloud Functions and test accessibility\n- **Generate** detailed reports with findings and remediation guidance\n\n## Key Features\n\n- Supports native Android, React Native, Flutter, and Cordova apps\n- Extracts config from 7+ sources including raw DEX binary strings\n- Tests 14 distinct vulnerability categories\n- Automatic cleanup of test data created during scans\n- Detailed vulnerability reference documentation included\n\n## Installation\n\n```\n/plugin install trailofbits/skills/plugins/firebase-apk-scanner\n```\n\n## Prerequisites\n\nInstall required dependencies before use:\n\n**macOS:**\n```bash\nbrew install apktool curl jq binutils\n```\n\n**Ubuntu/Debian:**\n```bash\nsudo apt install apktool curl jq unzip binutils\n```\n\n## Usage\n\n```\n/firebase-scan ./app.apk\n/firebase-scan ./apks/\n```\n\nOr run the standalone script directly:\n\n```bash\n./scanner.sh app.apk\n./scanner.sh ./apks/ --no-cleanup\n```\n\n## Vulnerability Categories\n\n| Category | Tests | Severity |\n|----------|-------|----------|\n| **Authentication** | Open signup, anonymous auth, email enumeration | Critical/High/Medium |\n| **Realtime Database** | Unauthenticated read/write, auth token bypass | Critical/High |\n| **Firestore** | Document access, collection enumeration | Critical/High |\n| **Storage** | Bucket listing, unauthenticated upload | Critical/High |\n| **Cloud Functions** | Unauthenticated access, function enumeration | Medium/Low |\n| **Remote Config** | Public parameter exposure | Medium |\n"
  },
  {
    "slug": "spec-to-code-compliance",
    "name": "spec-to-code-compliance",
    "tagline": "Specification-to-code compliance checker for blockchain audits",
    "description": "Specification-to-code compliance checker for blockchain audits",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/trailofbits/skills/tree/main/plugins/spec-to-code-compliance",
    "tags": [
      "trailofbits",
      "Developer Tools",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Verifies that a smart contract codebase implements exactly what its specification documents describe. It works by extracting intent from whitepapers, design docs, and protocol specs, then mapping each claim to actual code behavior across logic, math, invariants, access control, and state transitions. Gaps, divergences, and undocumented behaviors are classified by severity and reported with full evidence traces.",
    "whenToUse": [
      "Configuring integration settings for custom agent workflows.",
      "Optimizing query execution and response latency in production.",
      "Developing clean, standard-compliant implementations for enterprise services.",
      "Troubleshooting connection timeouts and authentication handshakes.",
      "Monitoring API rate limits and execution pipelines programmatically."
    ],
    "skillMd": "# Spec-to-Code Compliance\n\nSpecification-to-code compliance checker for blockchain audits with evidence-based alignment analysis.\n\n**Author:** Omar Inuwa\n\n## When to Use\n\nUse this skill when you need to:\n- Verify that code implements exactly what documentation specifies\n- Find gaps between intended behavior and actual implementation\n- Audit smart contracts against whitepapers or design documents\n- Identify undocumented code behavior or unimplemented spec claims\n\n## What It Does\n\nThis skill performs deterministic, evidence-based alignment between specifications and code:\n\n- **Documentation Discovery** - Finds all spec sources (whitepapers, READMEs, design notes)\n- **Spec Intent Extraction** - Normalizes all intended behavior into structured format\n- **Code Behavior Analysis** - Line-by-line semantic analysis of actual implementation\n- **Alignment Comparison** - Maps spec items to code with match types and confidence scores\n- **Divergence Classification** - Categorizes misalignments by severity (Critical/High/Medium/Low)\n\n## Key Principle\n\n**Zero speculation.** Every claim must be backed by:\n- Exact quotes from documentation (section/title)\n- Specific code references (file + line numbers)\n- Confidence scores (0-1) for all mappings\n\n## Installation\n\n```\n/plugin install trailofbits/skills/plugins/spec-to-code-compliance\n```\n\n## Phases\n\n1. **Documentation Discovery** - Identify all spec sources\n2. **Format Normalization** - Create clean spec corpus\n3. **Spec Intent IR** - Extract all intended behavior\n4. **Code Behavior IR** - Line-by-line code analysis\n5. **Alignment IR** - Compare spec to code\n6. **Divergence Classification** - Categorize misalignments\n7. **Final Report** - Generate audit-grade compliance report\n\n## Match Types\n\n- `full_match` - Code exactly implements spec\n- `partial_match` - Incomplete implementation\n- `mismatch` - Spec says X, code does Y\n- `missing_in_code` - Spec claim not implemented\n- `code_stronger_than_spec` - Code adds behavior\n- `code_weaker_than_spec` - Code misses requirements\n\n## Anti-Hallucination Rules\n\n- If spec is silent: classify as **UNDOCUMENTED**\n- If code adds behavior: classify as **UNDOCUMENTED CODE PATH**\n- If unclear: classify as **AMBIGUOUS**\n- Every claim must quote original text or line numbers\n\n## Related Skills\n\n- `context-building` - Deep code understanding\n- `issue-writer` - Format compliance gaps as findings\n"
  },
  {
    "slug": "ask-questions-if-underspecified",
    "name": "ask-questions-if-underspecified",
    "tagline": "Prompt for clarification on ambiguous requirements",
    "description": "Prompt for clarification on ambiguous requirements",
    "category": "Creative & Design",
    "sourceUrl": "https://github.com/trailofbits/skills/tree/main/skills/ask-questions-if-underspecified",
    "tags": [
      "Trail of Bits",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Prompt for clarification on ambiguous requirements",
    "whenToUse": [
      "Integrating ask questions if underspecified into your development workflow.",
      "Following best practices for prompt for clarification on ambiguous requirements.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: ask-questions-if-underspecified\ndescription: Prompt for clarification on ambiguous requirements\n---\n\nPrompt for clarification on ambiguous requirements"
  },
  {
    "slug": "audit-context-building",
    "name": "audit-context-building",
    "tagline": "Deep architectural context via ultra-granular code analysis",
    "description": "Deep architectural context via ultra-granular code analysis",
    "category": "Creative & Design",
    "sourceUrl": "https://github.com/trailofbits/skills/tree/main/skills/audit-context-building",
    "tags": [
      "Trail of Bits",
      "Agent Skills"
    ],
    "difficulty": "Advanced",
    "whatItDoes": "Deep architectural context via ultra-granular code analysis",
    "whenToUse": [
      "Integrating audit context building into your development workflow.",
      "Following best practices for deep architectural context via ultra-granular code analysis.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: audit-context-building\ndescription: Deep architectural context via ultra-granular code analysis\n---\n\nDeep architectural context via ultra-granular code analysis"
  },
  {
    "slug": "building-secure-contracts",
    "name": "building-secure-contracts",
    "tagline": "Smart contract security toolkit with vulnerability scanners for 6 b...",
    "description": "Smart contract security toolkit with vulnerability scanners for 6 blockchains",
    "category": "Creative & Design",
    "sourceUrl": "https://github.com/trailofbits/skills/tree/main/skills/building-secure-contracts",
    "tags": [
      "Trail of Bits",
      "Security",
      "AI"
    ],
    "difficulty": "Advanced",
    "whatItDoes": "Smart contract security toolkit with vulnerability scanners for 6 blockchains",
    "whenToUse": [
      "Integrating building secure contracts into your development workflow.",
      "Following best practices for smart contract security toolkit with vulnerability scanners for 6 blockchains.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: building-secure-contracts\ndescription: Smart contract security toolkit with vulnerability scanners for 6 blockchains\n---\n\nSmart contract security toolkit with vulnerability scanners for 6 blockchains"
  },
  {
    "slug": "burpsuite-project-parser",
    "name": "burpsuite-project-parser",
    "tagline": "Search and extract data from Burp Suite project files",
    "description": "Search and extract data from Burp Suite project files",
    "category": "Creative & Design",
    "sourceUrl": "https://github.com/trailofbits/skills/tree/main/skills/burpsuite-project-parser",
    "tags": [
      "Trail of Bits",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Search and extract data from Burp Suite project files",
    "whenToUse": [
      "Integrating burpsuite project parser into your development workflow.",
      "Following best practices for search and extract data from burp suite project files.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: burpsuite-project-parser\ndescription: Search and extract data from Burp Suite project files\n---\n\nSearch and extract data from Burp Suite project files"
  },
  {
    "slug": "claude-in-chrome-troubleshooting",
    "name": "claude-in-chrome-troubleshooting",
    "tagline": "Diagnose and fix Claude in Chrome MCP extension connectivity issues",
    "description": "Diagnose and fix Claude in Chrome MCP extension connectivity issues",
    "category": "Enterprise",
    "sourceUrl": "https://github.com/trailofbits/skills/tree/main/skills/claude-in-chrome-troubleshooting",
    "tags": [
      "Trail of Bits",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Diagnose and fix Claude in Chrome MCP extension connectivity issues",
    "whenToUse": [
      "Integrating claude in chrome troubleshooting into your development workflow.",
      "Following best practices for diagnose and fix claude in chrome mcp extension connectivity issues.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: claude-in-chrome-troubleshooting\ndescription: Diagnose and fix Claude in Chrome MCP extension connectivity issues\n---\n\nDiagnose and fix Claude in Chrome MCP extension connectivity issues"
  },
  {
    "slug": "constant-time-analysis",
    "name": "constant-time-analysis",
    "tagline": "Detect compiler-induced timing side-channels in crypto code",
    "description": "Detect compiler-induced timing side-channels in crypto code",
    "category": "Enterprise",
    "sourceUrl": "https://github.com/trailofbits/skills/tree/main/skills/constant-time-analysis",
    "tags": [
      "Trail of Bits",
      "Agent Skills"
    ],
    "difficulty": "Advanced",
    "whatItDoes": "Detect compiler-induced timing side-channels in crypto code",
    "whenToUse": [
      "Integrating constant time analysis into your development workflow.",
      "Following best practices for detect compiler-induced timing side-channels in crypto code.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: constant-time-analysis\ndescription: Detect compiler-induced timing side-channels in crypto code\n---\n\nDetect compiler-induced timing side-channels in crypto code"
  },
  {
    "slug": "culture-index",
    "name": "culture-index",
    "tagline": "Index and search culture documentation",
    "description": "Index and search culture documentation",
    "category": "Office & Documents",
    "sourceUrl": "https://github.com/trailofbits/skills/tree/main/skills/culture-index",
    "tags": [
      "Trail of Bits",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Index and search culture documentation",
    "whenToUse": [
      "Integrating culture index into your development workflow.",
      "Following best practices for index and search culture documentation.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: culture-index\ndescription: Index and search culture documentation\n---\n\nIndex and search culture documentation"
  },
  {
    "slug": "differential-review",
    "name": "differential-review",
    "tagline": "Security-focused diff review with git history analysis",
    "description": "Security-focused diff review with git history analysis",
    "category": "Enterprise",
    "sourceUrl": "https://github.com/trailofbits/skills/tree/main/skills/differential-review",
    "tags": [
      "Trail of Bits",
      "Security"
    ],
    "difficulty": "Advanced",
    "whatItDoes": "Security-focused diff review with git history analysis",
    "whenToUse": [
      "Integrating differential review into your development workflow.",
      "Following best practices for security-focused diff review with git history analysis.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: differential-review\ndescription: Security-focused diff review with git history analysis\n---\n\nSecurity-focused diff review with git history analysis"
  },
  {
    "slug": "dwarf-expert",
    "name": "dwarf-expert",
    "tagline": "DWARF debugging format expertise",
    "description": "DWARF debugging format expertise",
    "category": "Enterprise",
    "sourceUrl": "https://github.com/trailofbits/skills/tree/main/skills/dwarf-expert",
    "tags": [
      "Trail of Bits",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "DWARF debugging format expertise",
    "whenToUse": [
      "Integrating dwarf expert into your development workflow.",
      "Following best practices for dwarf debugging format expertise.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: dwarf-expert\ndescription: DWARF debugging format expertise\n---\n\nDWARF debugging format expertise"
  },
  {
    "slug": "entry-point-analyzer",
    "name": "entry-point-analyzer",
    "tagline": "Identify state-changing entry points in smart contracts",
    "description": "Identify state-changing entry points in smart contracts",
    "category": "Creative & Design",
    "sourceUrl": "https://github.com/trailofbits/skills/tree/main/skills/entry-point-analyzer",
    "tags": [
      "Trail of Bits",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Identify state-changing entry points in smart contracts",
    "whenToUse": [
      "Integrating entry point analyzer into your development workflow.",
      "Following best practices for identify state-changing entry points in smart contracts.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: entry-point-analyzer\ndescription: Identify state-changing entry points in smart contracts\n---\n\nIdentify state-changing entry points in smart contracts"
  },
  {
    "slug": "firebase-apk-scanner",
    "name": "firebase-apk-scanner",
    "tagline": "Scan Android APKs for Firebase misconfigurations and security vulne...",
    "description": "Scan Android APKs for Firebase misconfigurations and security vulnerabilities",
    "category": "Enterprise",
    "sourceUrl": "https://github.com/trailofbits/skills/tree/main/skills/firebase-apk-scanner",
    "tags": [
      "Trail of Bits",
      "Security"
    ],
    "difficulty": "Advanced",
    "whatItDoes": "Scan Android APKs for Firebase misconfigurations and security vulnerabilities",
    "whenToUse": [
      "Integrating firebase apk scanner into your development workflow.",
      "Following best practices for scan android apks for firebase misconfigurations and security vulnerabilities.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: firebase-apk-scanner\ndescription: Scan Android APKs for Firebase misconfigurations and security vulnerabilities\n---\n\nScan Android APKs for Firebase misconfigurations and security vulnerabilities"
  },
  {
    "slug": "insecure-defaults",
    "name": "insecure-defaults",
    "tagline": "Detect insecure default configurations like hardcoded secrets, defa...",
    "description": "Detect insecure default configurations like hardcoded secrets, default credentials, and weak crypto",
    "category": "Enterprise",
    "sourceUrl": "https://github.com/trailofbits/skills/tree/main/skills/insecure-defaults",
    "tags": [
      "Trail of Bits",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Detect insecure default configurations like hardcoded secrets, default credentials, and weak crypto",
    "whenToUse": [
      "Integrating insecure defaults into your development workflow.",
      "Following best practices for detect insecure default configurations like hardcoded secrets, default credentials, and weak crypto.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: insecure-defaults\ndescription: Detect insecure default configurations like hardcoded secrets, default credentials, and weak crypto\n---\n\nDetect insecure default configurations like hardcoded secrets, default credentials, and weak crypto"
  },
  {
    "slug": "modern-python",
    "name": "modern-python",
    "tagline": "Modern Python tooling with uv, ruff, ty, and pytest best practices",
    "description": "Modern Python tooling with uv, ruff, ty, and pytest best practices",
    "category": "Enterprise",
    "sourceUrl": "https://github.com/trailofbits/skills/tree/main/skills/modern-python",
    "tags": [
      "Trail of Bits",
      "Python"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Modern Python tooling with uv, ruff, ty, and pytest best practices",
    "whenToUse": [
      "Integrating modern python into your development workflow.",
      "Following best practices for modern python tooling with uv, ruff, ty, and pytest best practices.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: modern-python\ndescription: Modern Python tooling with uv, ruff, ty, and pytest best practices\n---\n\nModern Python tooling with uv, ruff, ty, and pytest best practices"
  },
  {
    "slug": "property-based-testing",
    "name": "property-based-testing",
    "tagline": "Property-based testing for multiple languages and smart contracts",
    "description": "Property-based testing for multiple languages and smart contracts",
    "category": "Creative & Design",
    "sourceUrl": "https://github.com/trailofbits/skills/tree/main/skills/property-based-testing",
    "tags": [
      "Trail of Bits",
      "Testing"
    ],
    "difficulty": "Advanced",
    "whatItDoes": "Property-based testing for multiple languages and smart contracts",
    "whenToUse": [
      "Integrating property based testing into your development workflow.",
      "Following best practices for property-based testing for multiple languages and smart contracts.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: property-based-testing\ndescription: Property-based testing for multiple languages and smart contracts\n---\n\nProperty-based testing for multiple languages and smart contracts"
  },
  {
    "slug": "semgrep-rule-creator",
    "name": "semgrep-rule-creator",
    "tagline": "Create and refine Semgrep rules for vulnerability detection",
    "description": "Create and refine Semgrep rules for vulnerability detection",
    "category": "Enterprise",
    "sourceUrl": "https://github.com/trailofbits/skills/tree/main/skills/semgrep-rule-creator",
    "tags": [
      "Trail of Bits",
      "Agent Skills"
    ],
    "difficulty": "Beginner",
    "whatItDoes": "Create and refine Semgrep rules for vulnerability detection",
    "whenToUse": [
      "Integrating semgrep rule creator into your development workflow.",
      "Following best practices for create and refine semgrep rules for vulnerability detection.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: semgrep-rule-creator\ndescription: Create and refine Semgrep rules for vulnerability detection\n---\n\nCreate and refine Semgrep rules for vulnerability detection"
  },
  {
    "slug": "semgrep-rule-variant-creator",
    "name": "semgrep-rule-variant-creator",
    "tagline": "Port existing Semgrep rules to new target languages with test-drive...",
    "description": "Port existing Semgrep rules to new target languages with test-driven validation",
    "category": "Office & Documents",
    "sourceUrl": "https://github.com/trailofbits/skills/tree/main/skills/semgrep-rule-variant-creator",
    "tags": [
      "Trail of Bits",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Port existing Semgrep rules to new target languages with test-driven validation",
    "whenToUse": [
      "Integrating semgrep rule variant creator into your development workflow.",
      "Following best practices for port existing semgrep rules to new target languages with test-driven validation.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: semgrep-rule-variant-creator\ndescription: Port existing Semgrep rules to new target languages with test-driven validation\n---\n\nPort existing Semgrep rules to new target languages with test-driven validation"
  },
  {
    "slug": "sharp-edges",
    "name": "sharp-edges",
    "tagline": "Identify error-prone APIs and dangerous configurations",
    "description": "Identify error-prone APIs and dangerous configurations",
    "category": "Enterprise",
    "sourceUrl": "https://github.com/trailofbits/skills/tree/main/skills/sharp-edges",
    "tags": [
      "Trail of Bits",
      "API"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Identify error-prone APIs and dangerous configurations",
    "whenToUse": [
      "Integrating sharp edges into your development workflow.",
      "Following best practices for identify error-prone apis and dangerous configurations.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: sharp-edges\ndescription: Identify error-prone APIs and dangerous configurations\n---\n\nIdentify error-prone APIs and dangerous configurations"
  },
  {
    "slug": "spec-to-code-compliance",
    "name": "spec-to-code-compliance",
    "tagline": "Specification-to-code compliance checker for blockchain audits",
    "description": "Specification-to-code compliance checker for blockchain audits",
    "category": "Enterprise",
    "sourceUrl": "https://github.com/trailofbits/skills/tree/main/skills/spec-to-code-compliance",
    "tags": [
      "Trail of Bits",
      "AI"
    ],
    "difficulty": "Advanced",
    "whatItDoes": "Specification-to-code compliance checker for blockchain audits",
    "whenToUse": [
      "Integrating spec to code compliance into your development workflow.",
      "Following best practices for specification-to-code compliance checker for blockchain audits.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: spec-to-code-compliance\ndescription: Specification-to-code compliance checker for blockchain audits\n---\n\nSpecification-to-code compliance checker for blockchain audits"
  },
  {
    "slug": "static-analysis",
    "name": "static-analysis",
    "tagline": "Static analysis toolkit with CodeQL, Semgrep, and SARIF",
    "description": "Static analysis toolkit with CodeQL, Semgrep, and SARIF",
    "category": "Enterprise",
    "sourceUrl": "https://github.com/trailofbits/skills/tree/main/skills/static-analysis",
    "tags": [
      "Trail of Bits",
      "Agent Skills"
    ],
    "difficulty": "Advanced",
    "whatItDoes": "Static analysis toolkit with CodeQL, Semgrep, and SARIF",
    "whenToUse": [
      "Integrating static analysis into your development workflow.",
      "Following best practices for static analysis toolkit with codeql, semgrep, and sarif.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: static-analysis\ndescription: Static analysis toolkit with CodeQL, Semgrep, and SARIF\n---\n\nStatic analysis toolkit with CodeQL, Semgrep, and SARIF"
  },
  {
    "slug": "testing-handbook-skills",
    "name": "testing-handbook-skills",
    "tagline": "Testing Handbook skills: fuzzers, static analysis, sanitizers",
    "description": "Testing Handbook skills: fuzzers, static analysis, sanitizers",
    "category": "Enterprise",
    "sourceUrl": "https://github.com/trailofbits/skills/tree/main/skills/testing-handbook-skills",
    "tags": [
      "Trail of Bits",
      "Testing"
    ],
    "difficulty": "Advanced",
    "whatItDoes": "Testing Handbook skills: fuzzers, static analysis, sanitizers",
    "whenToUse": [
      "Integrating testing handbook skills into your development workflow.",
      "Following best practices for testing handbook skills: fuzzers, static analysis, sanitizers.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: testing-handbook-skills\ndescription: Testing Handbook skills: fuzzers, static analysis, sanitizers\n---\n\nTesting Handbook skills: fuzzers, static analysis, sanitizers"
  },
  {
    "slug": "variant-analysis",
    "name": "variant-analysis",
    "tagline": "Find similar vulnerabilities via pattern-based analysis",
    "description": "Find similar vulnerabilities via pattern-based analysis",
    "category": "Enterprise",
    "sourceUrl": "https://github.com/trailofbits/skills/tree/main/skills/variant-analysis",
    "tags": [
      "Trail of Bits",
      "Agent Skills"
    ],
    "difficulty": "Advanced",
    "whatItDoes": "Find similar vulnerabilities via pattern-based analysis",
    "whenToUse": [
      "Integrating variant analysis into your development workflow.",
      "Following best practices for find similar vulnerabilities via pattern-based analysis.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: variant-analysis\ndescription: Find similar vulnerabilities via pattern-based analysis\n---\n\nFind similar vulnerabilities via pattern-based analysis"
  }
];
