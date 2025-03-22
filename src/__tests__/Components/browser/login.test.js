const puppeteer = require('puppeteer');  // Import Puppeteer

describe('Sign-Up Flow', () => {
  let browser;
  let page;

  beforeAll(async () => {
    // Launch Puppeteer browser instance
    browser = await puppeteer.launch({
      headless: true,  // Running the browser in headless mode (no UI)
      executablePath: '/usr/bin/google-chrome-stable',  // Use the path for Chrome, or adjust for other browsers
    });
    page = await browser.newPage();  // Open a new page
  });

  afterAll(async () => {
    await browser.close();  // Close the browser instance after tests
  });

  test('should sign up successfully', async () => {
    await page.goto('https://example.com/signup');  // Navigate to the signup page

    // Fill out the sign-up form
    await page.type('#username', 'testuser');  // Type into the username field
    await page.type('#email', 'testuser@example.com');  // Type into the email field
    await page.type('#password', 'securepassword123');  // Type into the password field

    // Click the submit button
    await page.click('button[type="submit"]');

    // Wait for navigation (if there’s a page change)
    await page.waitForNavigation();

    // Check if the URL changed (indicating successful sign-up)
    const currentURL = page.url();
    expect(currentURL).toBe('https://example.com/welcome');  // Expected URL after successful sign-up

    // Optionally, check if a success message appears
    const successMessage = await page.$eval('.success-message', el => el.textContent);
    expect(successMessage).toContain('Welcome, testuser!');
  });
});




// 
const puppeteer = require('puppeteer');  // Import Puppeteer

describe('Login and Create Post Flow', () => {
  let browser;
  let page;

  beforeAll(async () => {
    // Launch Puppeteer browser instance
    browser = await puppeteer.launch({
      headless: true,
    });
    page = await browser.newPage();  // Open a new page
  });

  afterAll(async () => {
    await browser.close();  // Close the browser after tests
  });

  test('should log in and create a post', async () => {
    // Navigate to the login page
    await page.goto('https://example.com/login');

    // Log in by filling out the form
    await page.type('#username', 'testuser');
    await page.type('#password', 'securepassword123');
    await page.click('button[type="submit"]');
    await page.waitForNavigation();  // Wait for login to complete

    // Verify the user is logged in by checking the URL
    expect(page.url()).toBe('https://example.com/dashboard');

    // Navigate to create post page
    await page.goto('https://example.com/create-post');

    // Create a new post
    await page.type('#post-title', 'My First Post');
    await page.type('#post-content', 'This is the content of my first post.');
    await page.click('button[type="submit"]');
    await page.waitForNavigation();  // Wait for post submission

    // Verify the post is created by checking for the post's title
    const postTitle = await page.$eval('.post-title', el => el.textContent);
    expect(postTitle).toBe('My First Post');
  });
});
