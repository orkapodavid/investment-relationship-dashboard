"""
Pytest configuration for Playwright tests
Automatically handles browser setup and teardown
"""

import pytest
from playwright.sync_api import sync_playwright


@pytest.fixture(scope="session")
def browser():
    """Session-scoped browser instance"""
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        yield browser
        browser.close()


@pytest.fixture(scope="session", autouse=True)
def setup_test_environment():
    """Setup test environment before running tests"""
    print("""
🚀 Starting E2E Test Suite...""")
    print("📝 Note: Ensure 'reflex run' is already running on localhost:3000")
    yield
    print("""
✅ Test Suite Completed""")