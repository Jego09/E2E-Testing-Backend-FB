import re
from playwright.sync_api import Page, expect
import time

def test_login(page: Page):
    # page.chromium.launch(headless=False, args=["--start-maximized"])
    # context = page.new_context(no_viewport=True)
    # page = context.new_page()
    page.goto("https://www.fullybookedonline.com/")
    page.get_by_label("Open my account").click()
    page.get_by_placeholder("Enter your email", exact=True).click()
    page.get_by_placeholder("Enter your email", exact=True).fill("btad@fullybookedonline.com")
    page.get_by_placeholder("Enter your password").click()
    page.get_by_placeholder("Enter your password").click()
    page.get_by_placeholder("Enter your password").fill("@HOsOCRmzkt4ngZ0YIaKj")
    page.get_by_role("button", name="LOGIN").click()
    time.sleep(5)
    page.get_by_label("Open my account").click()
    expect(page.get_by_role("title", name="My Account"))
    time.sleep(3)