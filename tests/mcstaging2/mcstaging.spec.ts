import './mcstaging_setupEnv';
import { test, expect } from '@playwright/test';
import { elements, sleep, randomtext, logging_in, creds, next_page } from './mcstaging_elements';
import { title } from 'process';

test.setTimeout(45000);

test.beforeEach(async ({ page }, testInfo) => {

  if (testInfo.title.includes('skip setup')) {
    return;
  }
  const login = logging_in(page);

  await login;

  await expect(page).toHaveTitle(/Fully Booked Online Philippines | Online Bookstore PH/);

  });
test('register - skip setup', async ({ page }) => {

  const text = randomtext("10");

  await page.goto(elements.baseURL);
  // Clicking Log-in Button
  await page.getByLabel('Open my account').click();

  await page.getByLabel('Go to Register page').click();

  await page.getByLabel('First Name*').fill('BT');

  await page.getByLabel('Last Name*').fill('ADMIN');
  // Title
  await page.getByText('Select item... -- Select title -- Mr. Ms. Mrs. Select item...-- Select title --').click();

  // await title.click();

  // await sleep(2000);

  const title1 = await page.locator('li').filter({ hasText: 'Mr.' } );

  await title1.nth(0).click();

  //Birthdate
  await page.getByPlaceholder('MM/DD/YYYY').click();

  await page.locator('.FieldDate-Year > select').selectOption('1999');

  await page.getByLabel('Choose Sunday, August 1st,').click();
  // Gender
  const gender = await page.getByText('-- Select gender -- Male Female Other -- Select gender --MaleFemaleOther');
  
  await gender.click();

  const gender1 = await page.locator('li').filter({ hasText: 'Male' });
  await gender1.nth(0).click();
  // //Phone Number
  await page.getByPlaceholder('Enter your phone number').click();
  
  await page.getByPlaceholder('Enter your phone number').fill('09076537325');
  //Email
  await page.getByRole('textbox', { name: 'Enter your email' }).click();
  
  await page.getByRole('textbox', { name: 'Enter your email' }).fill( text + '@fullybookedonline.com');
  //Password
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('test1234567');
  //Retype Password
  await page.getByRole('textbox', { name: 'Enter your password' }).press('Tab');
  
  await page.getByLabel('Toggle Password').nth(1).press('Tab');
  
  await page.getByPlaceholder('Retype your password').fill('test1234567');
  //Address
  const province = await page.locator('//*[@id="province_wrapper"]/div');
  
  await province.click();
  
  // await sleep(2000);
  
  const province1 = await page.locator('li').filter({ hasText: 'Abra' } );
  
  await province1.click();
  
  // await sleep(2000);
  
  const city = await page.locator('//*[@id="city_wrapper"]');
  
  await city.click();
  
  const city1 = await page.locator('li').filter({ hasText: 'Boliney' } );
  
  await city1.click();
   
  const barangay = await page.locator('//*[@id="barangay_wrapper"]');
  
  await barangay.click();
  
  const barangay1 = await page.locator('li').filter({ hasText: 'Amti' } )
  
  await barangay1.click();
  
  await page.getByPlaceholder('Enter your street address').click();
  
  await page.getByPlaceholder('Enter your street address').fill('TESTING ST. 123');
  
  await page.getByPlaceholder('Enter your postal code').click();
  
  await page.getByPlaceholder('Enter your postal code').fill('1603');
  //Register
  await page.getByRole('button', { name: 'REGISTER' }).click();
  
  await expect(page).toHaveURL(elements.baseURL, {timeout: 40000});

  });
////////////////////////////////////////////////////////////////////////////////////
test('wishlist', async ({ page }) => {

  await expect(page.getByText('You are successfully logged in!')).toBeVisible();

  await sleep(10000);
  //Wishlist Button
  await page.getByRole('link', { name: ' Wishlist' }).click();
  //Expected result
  await expect(page).toHaveURL(elements.baseURL + '/wishlist');
});

test ('payment', async ({ page }) => {

  await expect(page.getByText('You are successfully logged in!')).toBeVisible();

  await page.getByPlaceholder('Search Fully Booked').click();

  await page.getByPlaceholder('Search Fully Booked').fill('fall the 4th');
  
  await page.getByPlaceholder('Search Fully Booked').press('Enter');

  await page.getByRole('link', { name: 'Falls The 4th Product price:' }).click();

  await page.locator(elements.Main_AddToCart).click();

  await expect(page.getByText('Product was added to cart!')).toBeVisible( { timeout: 30000 });

  await sleep(1000);
  //Cart Button
  await page.locator(elements.button_CART).click();
  //View Cart Button
  await page.locator(elements.button_viewCART).click();
  await sleep(3000);
  //Expected result
  await expect(page).toHaveURL(elements.baseURL + '/cart');

  await page.getByLabel('Order Summary').getByRole('button', { name: ' Checkout' }).click();

  await expect(page).toHaveTitle('Checkout', { timeout: 5000 });

  await page.locator('textarea').fill('For Testing, Disregard this order. Thank you');

  await page.getByRole('button', { name: 'Store Pick-up ₱' }).click();

  await sleep (2000);
  
  await page.waitForSelector('xpath=//*[@id="_wrapper"]/div', { state: 'attached' });

  await page.locator('xpath=//*[@id="_wrapper"]/div').click();
  await sleep(1000);
  
  const store = await page.locator('li').filter({ hasText: 'Alabang Town Center' } );

  await store.nth(0).click()

  await sleep(3000);

  await page.getByRole('button', { name: 'PROCEED TO BILLING' }).click();

  await sleep(5000);

  await page.getByText('Debit/Credit Card').click();

  await page.getByText('I have fully read and agreed').click();

  await page.getByRole('button', { name: 'Place Order' }).click();

  await page.frameLocator('iframe[title="Card Holder Name"]').getByLabel('Card Holder Name').click();

  await page.frameLocator('iframe[title="Card Holder Name"]').getByLabel('Card Holder Name').fill('BT ADMIN');

  await page.frameLocator('iframe[title="Card Number"]').getByLabel('Card Number').click();

  await page.frameLocator('iframe[title="Card Number"]').getByLabel('Card Number').fill('5123450000000008');

  await page.frameLocator('iframe[title="Expiry Date Month"]').getByPlaceholder('MM').click();

  await page.frameLocator('iframe[title="Expiry Date Month"]').getByPlaceholder('MM').fill('01');

  await page.frameLocator('iframe[title="Expiry Date Year"]').getByPlaceholder('YY').fill('39');

  await page.frameLocator('iframe[title="Security Code"]').getByLabel('Security Code').click();

  await page.frameLocator('iframe[title="Security Code"]').getByLabel('Security Code').fill('100');

  await sleep(1000);

  await page.getByRole('button', { name: 'A secure padlock icon. Pay' }).click();

  await page.frameLocator('iframe[name="challengeFrame"]').locator('table').filter({ hasText: 'Authentication Result: (Y)' }).click();

  await page.frameLocator('iframe[name="challengeFrame"]').getByRole('button', { name: 'Submit' }).click();


  await expect(page.getByText('Thank you for your Order!')).toHaveText('Thank you for your Order!', { timeout: 50000});

});
test ('backend admin login - skip setup', async ({ page }) => {
  
  await page.goto(creds.BACKEND_URL!);
  await page.getByPlaceholder('user name').click();
  await page.getByPlaceholder('user name').fill(creds.admin_username!); 
  await page.getByPlaceholder('password').click();
  await page.getByPlaceholder('password').fill(creds.admin_password!);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await sleep(3000);
  await expect(page).toHaveTitle('Dashboard /');

});

test ('company and service pages - skip setup', async ({ page }) => {
  
  await page.goto(elements.baseURL);
  await page.getByRole('link', { name: 'About Us' }).click();
  await expect(page).toHaveURL(elements.baseURL + '/about-us');
  await page.getByLabel('Footer').getByRole('link', { name: 'Blog' }).click();
  await expect(page).toHaveURL(elements.baseURL + '/blog');
  await page.getByRole('link', { name: 'Careers' }).click();
  await expect(page).toHaveURL(elements.baseURL + '/careers');
  await page.getByRole('link', { name: 'Events' }).click();
  await expect(page).toHaveURL(elements.baseURL + '/events');
  await page.getByRole('link', { name: 'Featured Authors' }).click();
  await expect(page).toHaveURL(elements.baseURL + '/featured-authors');
  await page.getByRole('link', { name: 'Fully Booked Foundation' }).click();
  await expect(page).toHaveURL(elements.baseURL + '/fully-booked-foundation');
  await sleep(1000);
  await page.getByLabel('Footer').getByRole('link', { name: 'Store Locator' }).getByText('Store Locator').click();
  await expect(page).toHaveURL(elements.baseURL + '/store-locator');
  await page.getByRole('link', { name: 'Contact Us' }).click();
  await expect(page).toHaveURL(elements.baseURL + '/contact');
  await page.getByRole('link', { name: 'Direct Sales' }).click();
  await expect(page).toHaveURL(elements.baseURL + '/bulk-purchase');
  await page.getByLabel('Footer').getByRole('link', { name: 'Discount Card' }).getByText('Discount Card').click();
  await expect(page).toHaveURL(elements.baseURL + '/discount-card');
  await page.getByRole('link', { name: 'FAQs' }).click();
  await expect(page).toHaveURL(elements.baseURL + '/faqs');
  await page.getByRole('link', { name: 'Privacy and Cookie Policy' }).click();
  await expect(page).toHaveURL(elements.baseURL + '/privacy-and-cookie-policy');

});

test ('blogs - skip setup', async ({page}) => {

  await page.goto(elements.baseURL);
  await page.getByLabel('Default Category').getByRole('link', { name: 'Blog' }).click();
  await expect(page).toHaveURL(elements.baseURL + '/blog');
  
});

test ('Error Fetching checker - skip setup', async ({page}) => {

  await page.goto(elements.baseURL);

  await page.getByText('BESTSELLERS').click();

  const n_page = next_page(page);

  await n_page;

});