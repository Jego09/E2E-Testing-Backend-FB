import { test, expect, defineConfig } from '@playwright/test';
import { elements, sleep } from './elements'
// import { defineConfig } from './playwright.config.ts';

test('login', async ({ page }) => {

  await page.goto(elements.baseURL);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Fully Booked Online Philippines | Online Bookstore PH/);
  
  // Clicking Log-in Button
  await page.getByLabel('Open my account').click();

  // Enter Email and Password
  await page.getByPlaceholder('Enter your email', { exact: true }).click();
  await page.getByPlaceholder('Enter your email', { exact: true }).fill('btad@fullybookedonline.com');
  await page.getByPlaceholder('Enter your password').click();
  await page.getByPlaceholder('Enter your password').fill('@HOsOCRmzkt4ngZ0YIaKj');

  // Click Login button
  await page.getByRole('button', { name: 'LOGIN' }).click();

  await sleep(6000);

  // Click My Account Button
  await page.getByLabel('Open my account').click();

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("My account");

  });

  test('register', async ({ page }) => {

    await page.goto(elements.baseURL);
  
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Fully Booked Online Philippines | Online Bookstore PH/);
    
    // Clicking Log-in Button
    await page.getByLabel('Open my account').click();
  
    await page.goto('https://www.fullybookedonline.com/');
  
    await page.getByLabel('Open my account').click();
  
    await page.getByLabel('Go to Register page').click();

    await page.getByLabel('First Name*').fill('BT');
  
    await page.getByLabel('Last Name*').fill('ADMIN');
    // Title
    const title = await page.getByText('Select item... -- Select title -- Mr. Ms. Mrs. Select item...-- Select title --');
    await title.click();
    await sleep(2000);
    const title1 = await page.locator('li').filter({ hasText: 'Mr.' } );
    await title1.nth(0).click();
    //Birthdate
    await page.getByPlaceholder('MM/DD/YYYY').click();
    await page.locator('.FieldDate-Year > select').selectOption('1999');
    await page.getByLabel('Choose Sunday, August 1st,').click();
    // Gender
    const gender =   await page.getByText('-- Select gender -- Male Female Other -- Select gender --MaleFemaleOther');
    await gender.click();
    await sleep(2000);
    const gender1 = await page.locator('li').filter({ hasText: 'Male' } );
    await gender1.nth(0).click();
    // //Phone Number
    await page.getByPlaceholder('Enter your phone number').click();
    await page.getByPlaceholder('Enter your phone number').fill('09076537325');
    //Email
    await page.getByRole('textbox', { name: 'Enter your email' }).click();
    await page.getByRole('textbox', { name: 'Enter your email' }).fill('btad@fullybookedonline.com');
    //Password
    await page.getByRole('textbox', { name: 'Enter your password' }).click();
    await page.getByRole('textbox', { name: 'Enter your password' }).fill('test1234567');
    //Retype Password
    await page.getByRole('textbox', { name: 'Enter your password' }).press('Tab');
    await page.getByLabel('Toggle Password').nth(1).press('Tab');
    await page.getByPlaceholder('Retype your password').fill('test1234567');
    //Address
    const province = await page.locator('//*[@id="province_wrapper"]/div');
    province?.selectOption("01");
    const city = await page.locator('//*[@id="city_wrapper"]'); 
    city?.selectOption("01");
    const barangay = await page.locator('//*[@id="barangay_wrapper"]')
    barangay?.selectOption("01");
    await page.getByPlaceholder('Enter your street address').click();
    await page.getByPlaceholder('Enter your street address').fill('TESTING ST. 123');
    await page.getByPlaceholder('Enter your postal code').click();
    await page.getByPlaceholder('Enter your postal code').fill('1603');
    //Register
    await page.getByRole('button', { name: 'REGISTER' }).click();
    });


