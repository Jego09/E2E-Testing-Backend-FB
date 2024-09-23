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
    const errorMessageLocator = page.getByText('Error fetching Product List!').first();

    while (pageNumber <= maxPage) {
        const pageStr = `Page ${pageNumber}`;

        const element = page.locator(`a[aria-label="${pageStr}"]`);

        // Start polling for both the error and the page link
        let isErrorVisible = false;
        const startTime = Date.now();
        const maxWaitTime = 10000; // Wait up to 10 seconds for the element or error

        // Polling loop
        while (Date.now() - startTime < maxWaitTime) {
            // Check if the error message is visible
            if (await errorMessageLocator.isVisible()) {
                isErrorVisible = true;
                console.error('Error detected: Error fetching Product List!');
                throw new Error(`Error found while navigating to page ${pageNumber}`);
            }

            // Check if the page link is visible
            if (await element.isVisible()) {
                break; // Exit the polling loop once the element is found
            }

            // Optional: Wait briefly before the next poll (avoid tight loops)
            await page.waitForTimeout(200);
        }

        // If the error was detected, the function will have thrown an error already
        if (isErrorVisible) break;

        // Click the page navigation link
        try {
            await element.click();
            console.log(`Clicked page ${pageNumber}`);
        } catch (error) {
            console.error(`Error clicking page ${pageNumber}:`, error);
            throw new Error(`Failed to navigate to page ${pageNumber}`);
        }

        // Increment page number for the next iteration
        pageNumber++;

        // Wait for the page to fully load after the click (removed: unstable)
        // await page.waitForLoadState('networkidle');
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