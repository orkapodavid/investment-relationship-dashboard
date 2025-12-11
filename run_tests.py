"""
Quick test runner script
Usage: python run_tests.py
"""

import subprocess
import sys


def main():
    print("🧪 Running Investment Relationship Dashboard E2E Tests")
    print("=" * 60)
    try:
        import playwright

        print("✅ Playwright is installed")
    except ImportError:
        print("❌ Playwright not installed. Installing...")
        subprocess.run([sys.executable, "-m", "pip", "install", "playwright"])
        subprocess.run([sys.executable, "-m", "playwright", "install", "chromium"])
    result = subprocess.run(
        [sys.executable, "-m", "pytest", "tests/test_app.py", "-v", "--tb=short"],
        cwd="/home/user/app",
    )
    sys.exit(result.returncode)


if __name__ == "__main__":
    main()