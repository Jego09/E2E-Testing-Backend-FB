Pre-requisites/Steps to Run Playwright

1. Install Node.js: Playwright requires Node.js (version 12 or later). 
2. Download NPM (Node.js comes with NPM) to check the version. Type npm -v in cmd.
3. Download Visual Studio Code 
4. Install Git
5. In VS Code, download the extension "Playwright Test in VS Code."
6. "npm install playwright": Install Playwright by typing on the vscode terminal.
7. "npx playwright install": Install required browsers by typing on the vscode terminal.


After doing everything. Clone the E2E-Testing-FB repository on my GitHub: https://github.com/Jego09/E2E-Testing-Fullybooked.

8. After cloning, check sampleEnvFile, create 2 files named ".env.production" and ".env.staging". Copy the format inside the sample and fill it with required information (Note: Do not enclose data in apostrophe).

You can run my test by using the extension that you downloaded earlier.

Note: Some tests might fail due to the test cases being run simultaneously; if this happens, you can use the debug test option for an alternative. Though the test will take long since it will be run 1 by 1. 