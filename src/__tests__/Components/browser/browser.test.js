const puppeteer = require('puppeteer');  // Import Puppeteer for browser automation
const { jest } = require('@jest/globals');

describe('Cross-Browser Testing with Jest and Puppeteer', () => {
  let browser;

  beforeAll(async () => {
    // Set up Puppeteer browser instance based on the matrix (Chrome, Firefox, WebKit)
    if (process.env.BROWSER === 'firefox') {
      browser = await puppeteer.launch({
        headless: true,
        executablePath: '/usr/bin/firefox',  // Path for Firefox
        args: ['--no-sandbox', '--disable-setuid-sandbox'],  // Firefox requires these args in CI
      });
    } else {
      browser = await puppeteer.launch({
        headless: true,
        executablePath: '/usr/bin/google-chrome-stable',  // Path for Chrome
        args: ['--no-sandbox', '--disable-setuid-sandbox'],  // Required in CI
      });
    }
  });

  afterAll(async () => {
    await browser.close();  // Close the browser after tests
  });

  test('should load the page and check title', async () => {
    const page = await browser.newPage();
    await page.goto('https://example.com');  // Navigate to the page
    const title = await page.title();  // Get the title of the page
    expect(title).toBe('Example Domain');  // Check the title
  });
});
