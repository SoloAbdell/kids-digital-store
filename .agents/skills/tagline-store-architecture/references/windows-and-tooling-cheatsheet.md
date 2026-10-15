# Windows Environment, PATH & Tooling Cheatsheet

This cheatsheet covers environment setups, tool executions, and operational commands when working on Windows with PowerShell in this workspace.

---

## 1. PowerShell Environment Setup

PowerShell instances often have restricted PATH variables. Prepend system and MinGit paths before running Node, Git, or curl:

```powershell
# Full PATH setup for Node, npm, and MinGit:
$env:Path = "C:\Users\pc\.gemini\antigravity\scratch\mingit\cmd;" + [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User");
```

---

## 2. Windows Commands vs PowerShell Aliases

- **`curl`**: In Windows PowerShell, `curl` is an alias for `Invoke-WebRequest`. Always invoke `curl.exe` to use the native binary with flags like `-I` or `-s`.
  ```powershell
  curl.exe -I http://localhost:3000/
  ```
- **Instruction separators**: Use semicolon `;` instead of `&&` in PowerShell:
  ```powershell
  git add .; git commit -m "commit message"; git push origin main
  ```

---

## 3. Verification & Testing Commands

```powershell
# Typecheck TypeScript codebase:
npx.cmd tsc --noEmit

# Test security headers:
curl.exe -I http://localhost:3000/

# Test payment tests suite:
node test-payment-security.js
```
