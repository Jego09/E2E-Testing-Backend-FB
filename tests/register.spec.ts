import { test, expect } from '@playwright/test';
import { elements, sleep } from './elements'

test('register', async ({ page }) => {

  await page.goto(elements.baseUrl);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Fully Booked Online Philippines | Online Bookstore PH/);
  
  // Clicking Log-in Button
  await page.getByLabel('Open my account').click();

  await page.goto('https://www.fullybookedonline.com/');

  await page.getByLabel('Open my account').click();

  await page.getByLabel('Go to Register page').click();

  await page.getByLabel('First Name*').fill('BT');

  await page.getByLabel('Last Name*').fill('ADMIN');
  
  await page.getByText('Select item... -- Select title -- Mr. Ms. Mrs. Select item...-- Select title --').click();
  await page.getByText('Select item... -- Select title -- Mr. Ms. Mrs. Select item...-- Select title --').click();
  await page.getByPlaceholder('MM/DD/YYYY').click();
  await page.locator('.FieldDate-Year > select').selectOption('1999');
  await page.getByLabel('Choose Sunday, August 1st,').click();
  await page.getByText('-- Select gender -- Male Female Other -- Select gender --MaleFemaleOther').click();
  await page.getByText('-- Select gender -- Male Female Other -- Select gender --MaleFemaleOther').click();
  await page.getByText('-- Select gender -- Male Female Other -- Select gender --MaleFemaleOther').click();
  await page.getByText('-- Select gender -- Male Female Other -- Select gender --MaleFemaleOther').click();
  await page.getByPlaceholder('Enter your phone number').click();
  await page.getByText('-- Select gender -- Male Female Other -- Select gender --MaleFemaleOther').click();
  await page.getByText('-- Select gender -- Male Female Other -- Select gender --MaleFemaleOther').click();
  await page.getByText('-- Select gender -- Male Female Other -- Select gender --MaleFemaleOther').click();
  await page.getByText('-- Select gender -- Male Female Other -- Select gender --MaleFemaleOther').click();
  await page.getByLabel('Create account page').locator('div').filter({ hasText: 'Create New AccountFill' }).first().click();
  await page.getByPlaceholder('Enter your phone number').click();
  await page.getByPlaceholder('Enter your phone number').fill('09076537325');
  await page.getByRole('textbox', { name: 'Enter your email' }).click();
  await page.getByRole('textbox', { name: 'Enter your email' }).click();
  await page.getByRole('textbox', { name: 'Enter your email' }).fill('btad@fullybookedonline.com');
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('test1234567');
  await page.getByRole('textbox', { name: 'Enter your password' }).press('Tab');
  await page.getByLabel('Toggle Password').nth(1).press('Tab');
  await page.getByPlaceholder('Retype your password').fill('test1234567');
  await page.getByLabel('Create account page').locator('div').filter({ hasText: 'Create New AccountFill' }).first().click();
  await page.locator('#province_wrapper').click();
  await page.locator('#province_wrapper').click();
  await page.locator('div').filter({ hasText: /^City\/Municipality\*$/ }).click();
  await page.getByText('-- Select the city/municipality -- -- Select the city/municipality --').click();
  await page.getByText('-- Select the barangay -- --').click();
  await page.getByPlaceholder('Enter your street address').click();
  await page.getByPlaceholder('Enter your street address').fill('TESTING ST. 123');
  await page.getByPlaceholder('Enter your postal code').click();
  await page.getByPlaceholder('Enter your postal code').fill('1603');
  await page.getByRole('button', { name: 'REGISTER' }).click();

  });


