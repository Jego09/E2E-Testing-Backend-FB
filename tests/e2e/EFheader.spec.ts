import './prod_setupEnv';
import { test, defineConfig } from '@playwright/test';
import { elements, sleep, next_page, SortBy } from './prod_elements';

// const config = defineConfig();

// config.use();


test('Error Fetching / Bestsellers', async ({page}) => {

  await page.goto(elements.baseURL);

  await page.getByText('BESTSELLER').click();

  console.log("-----BESTSELLER-----");

  await sleep(5000);

  const sort = SortBy(page);

  await sort;

  const n_page = next_page(page);

  await n_page;
  
});

test('Error Fetching / Collections', async ({page}) => {

  await page.goto(elements.baseURL);

  await page.getByRole('link', { name: 'COLLECTIONS', exact: true }).click();

  console.log("-----COLLECTIONS-----");

  await sleep(5000);

  const sort = SortBy(page);

  await sort;

  const n_page = next_page(page);

  await n_page;
  
});

test('Error Fetching / New', async ({page}) => {

  await page.goto(elements.baseURL);

  await page.getByRole('link', { name: 'NEW!' }).click();

  console.log("-----NEW-----");

  await sleep(5000);

  const sort = SortBy(page);

  await sort;

  const n_page = next_page(page);

  await n_page;
  
});

test('Error Fetching / Pre-Order', async ({page}) => {

  await page.goto(elements.baseURL);

  await page.getByRole('link', { name: 'PRE-ORDERS' }).click();

  console.log("-----PRE-ORDERS-----");

  await sleep(5000);

  const sort = SortBy(page);

  await sort;

  const n_page = next_page(page);

  await n_page;
  
});

test('Error Fetching / Sale', async ({page}) => {

  await page.goto(elements.baseURL);

  await page.getByRole('link', { name: 'SALE', exact: true }).click();

  console.log("-----SALE-----");

  await sleep(5000);

  const sort = SortBy(page);

  await sort;

  const n_page = next_page(page);

  await n_page;
  
});


