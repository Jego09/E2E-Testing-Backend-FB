export const elements = {
    baseURL:  'https://www.fullybookedonline.com',
}


export function sleep(ms: number): Promise<void> {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    async function nap(sleepDuration: number) {

        await sleep(sleepDuration);
 
    }
