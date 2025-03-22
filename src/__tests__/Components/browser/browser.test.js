const { chromium, firefox, webkit } = require('playwright');

describe('Cross-Browser Testing with Playwright', () => {
  let browser;
  let page;

  beforeAll(async () => {
    const browserType = process.env.BROWSER || 'chromium'; // Use the matrix browser
    browser = await { chromium, firefox, webkit }[browserType].launch({
      headless: true,
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test('should load the page and check title', async () => {
    await page.goto('https://example.com'); // Navigate to the page
    const title = await page.title(); // Get page title
    expect(title).toBe('Example Domain'); // Check the title
  });
});
