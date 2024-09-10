import './prod_setupEnv';
import { test, defineConfig } from '@playwright/test';
import { elements, sleep, next_page, SortBy } from './prod_elements';

test('Error Fetching / Sonny Angels & Smiski', async ({page}) => {

    await page.goto('https://www.fullybookedonline.com/non-books/character/sonny-angels-and-the-smiskis.html?ref=cat_shopby_link');
  
    const sort = SortBy(page);
  
    await sort;
  
    const n_page = next_page(page);
  
    await n_page;
    
  });