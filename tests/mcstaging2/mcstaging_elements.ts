import './mcstaging_setupEnv';
import { Page } from '@playwright/test';

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
    try {

        let pageNumber = 1;
        let maxPage = 10;

        while (pageNumber <= maxPage) {

            const pageStr = `Page ${pageNumber}`;
            const errorMessageLocator = page.getByText('Error fetching Product List!');

            try {

                if (await errorMessageLocator.isVisible({ timeout: 5000 })) {
                    await page.screenshot({ path: `error_page_${pageNumber}.png` });
                    console.log("Error Detected");
                    console.error(`Error occurred on page ${pageNumber}`);
                    page.close();
                    break;
                }
                else {
                // Wait for the element to be visible
                const element = page.locator(`a[aria-label="${pageStr}"]`);
                await element.waitFor({ state: 'visible', timeout: 40000 });
                
                await element.click();
                console.log(`Clicked page ${pageNumber}`);
                pageNumber++;
                }
            } catch (error) {
                console.log("Element not found, stopping pagination.");
                break;
            }
        }
    } catch (error) {
        console.error("Error occurred during pagination:", error);
    }
}