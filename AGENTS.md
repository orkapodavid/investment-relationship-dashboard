# Agent Instructions

## Reflex App Execution

When starting the Reflex application (e.g., `reflex run`), **ALWAYS** set the environment variable `CI=1` to disable the login requirement.

### Required Command Format

**Windows (cmd.exe):**
```cmd
set CI=1 && reflex run
```

**Windows (PowerShell):**
```powershell
$env:CI=1; reflex run
```

**Unix/Linux/macOS:**
```bash
CI=1 reflex run
```

### Why This Is Important

The `CI=1` environment variable bypasses authentication requirements, which is essential for:
- Development workflows
- Automated testing
- CI/CD pipelines
- Local development without login friction

### Rule

**NEVER** run `reflex run` without setting `CI=1` first.
