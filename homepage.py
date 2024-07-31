import pytest
from playwright.sync_api import Page, expect

def test_homepage(page: Page):
    page.goto("https://www.fullybookedonline.com/")
    expect(page.get_by_role("title", name="Fully Booked Online Philippines | Online Bookstore PH"))
    