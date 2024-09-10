import './mcstaging_setupEnv';
import { defineConfig } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

export const creds = {

    admin_username: process.env.STAGING_ADMIN_USERNAME,
    admin_password: process.env.STAGING_ADMIN_PASSWORD,
    username: process.env.STAGING_FB_USERNAME,
    password: process.env.STAGING_FB_PASSWORD,
    BACKEND_URL: process.env.STAGING_BACKEND_URL,
    CP_NUMBER: process.env.STAGING_CP_NUMBER,
    
}

export const elements = {
    baseURL:  'https://mcstaging2.fullybookedonline.com',
    Main_AddToCart: 'xpath=//*[@id="root"]/div/div[2]/main/section[1]/div/article/div[5]/button',
    button_CART: 'xpath=//*[@id="root"]/div/section[1]/header/nav/div[4]/button',
    button_viewCART: 'xpath=//*[@id="root"]/div/section[1]/header/nav/div[4]/div/div/div[2]/div/a[1]',
}


export function sleep(ms: number): Promise<void> {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    async function nap(sleepDuration: number) {

        await sleep(sleepDuration);

    }

function generateRandomNumbers(): string[] {
    const numbers: string[] = [];
    for (let i = 0; i < 11; i++) {
        const randomNumber = Math.floor(Math.random() * 10000000000).toString().padStart(9, '0');
        numbers.push('09' + randomNumber);
    }
    return numbers;
}

export function randomtext(length: string) {
        const lengthNumber = parseInt(length, 10);
        return Math.random().toString(36).substring(2, 2 + lengthNumber);
    }


export function randompass(length: string) {
  const lengthNumber = parseInt(length, 10);
  const charset = '1234567890@#$%^&*()_+~`|}{[]:;?><,./-=';
  let result = '';
  for (let i = 0; i < lengthNumber; i++) {
  result += charset.charAt(Math.floor(Math.random() * charset.length));
}

return result; }

export async function logging_in(page: any) {

    await page.goto(elements.baseURL);
    await page.getByLabel('Open my account').click();
    await page.getByPlaceholder('Enter your email', { exact: true }).click();
    await page.getByPlaceholder('Enter your email', { exact: true }).fill(creds.username);
    await page.getByPlaceholder('Enter your password').click();
    await page.getByPlaceholder('Enter your password').fill(creds.password);
    await page.getByRole('button', { name: 'LOGIN' }).click();
}

export async function next_page(page: any): Promise<void> {

    let pageNumber = 1;
    const maxPage = 10;
    let random = randomtext("5");
    let url = page.url();
    const errorMessageLocator = page.getByText('Error fetching Product List!').first();

    const directory = './ErrorFetching_screenshots';
    const fileName = `${random}.png`; // dynamic file name
    const filePath = path.join(directory, fileName); // Combines directory & filename into a full path
    

    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory);
    }

    while (pageNumber <= maxPage) {

        const pageStr = `Page ${pageNumber}`;

        const element = page.locator(`a[aria-label="${pageStr}"]`);
        await element.waitFor({ state: 'visible' });

        await element.click();
        console.log(`Clicked page ${pageNumber}`);
        pageNumber++;
        
        }
        if (await errorMessageLocator.isVisible()) {
            console.log("Error Detected: " + url);
            await page.screenshot({ path: filePath,  fullPage: true });
            return;
        }
        // Check if max page has been reached
        if (pageNumber >= maxPage) {
            console.log(`Max page reached: ${maxPage}`);
            return; 
        }

        const nextElement = page.locator(`a[aria-label="Page ${pageNumber}"]`);
    
        if (!(await nextElement.isVisible({timeout: 3000}))) {
            console.log('There are no more pages');
            return;
        }
        
};

export async function BlogErrorChecker(page: any) {

    let random = randomtext("5");
    let url = page.url();

    const directory = './staging_screenshots';
    const fileName = `${random}.png`; // Your dynamic file name
    const filePath = path.join(directory, fileName); // Combine them into a full path
    

    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory);
      }

    const errorMessageLocator = page.getByText('Error fetching Blog!').first();

    if (await errorMessageLocator.isVisible()) {
        console.log("Error Detected: " + url);
        await page.screenshot({ path: filePath,  fullPage: true });
        return;
    }
};

export async function SortBy (page: any) {

    await page.locator('xpath=//*[@id="category-sort_wrapper"]/div').click();
    await page.locator('xpath=//*[@id="oASC newest"]').click();
}