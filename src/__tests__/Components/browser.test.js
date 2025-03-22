const puppeteer = require('puppeteer');  // Import Puppeteer for browser automation
const { jest } = require('@jest/globals');

describe('Cross-Browser Testing with Jest and Puppeteer', () => {
  let browser;

  beforeAll(async () => {
    // Set up the browser instance for Chrome (can also use Firefox or Edge)
    browser = await puppeteer.launch({
      headless: true,  // Run in headless mode (no UI)
      executablePath: '/usr/bin/google-chrome-stable',  // For Chrome
      // Alternatively, use Firefox or Edge if you prefer
    });
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
