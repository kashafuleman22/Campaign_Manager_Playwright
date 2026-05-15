import { test, expect } from '@playwright/test';

  const baseURL = 'https://ucm.demo-octavebytes.com/unified-campaign-manager/';
  const dashboardURL = 'https://ucm.demo-octavebytes.com/unified-campaign-manager/main/label';

  // reusable login function
  async function login(page, username, password) {
  await page.getByRole('textbox', { name: 'username' }).fill(username);
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle' }),
    page.getByRole('button', { name: 'Login' }).click()
  ]);
  }

  test.describe('Campaign Feature >> Customers', () => {

  // LOGIN RUNS BEFORE EVERY TEST (but written once)
  test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);
    await login(page, "hassan", "hassan");
  });

  test('Labels >> Page Loads Successfully', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    await page.getByRole('link', { name: ' Labels' }).click();
  });

  test('Labels >> Labels List Display', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    await page.getByRole('link', { name: ' Labels' }).click();
  });

  test('Labels >> Craete Labels', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    await page.getByRole('button', { name: 'Create Label' }).click();
    await page.getByRole('textbox', { name: 'Enter label name' }).click();
    await page.getByRole('textbox', { name: 'Enter label name' }).fill('Playwright-L');
    await page.getByRole('textbox', { name: 'Select a color' }).click();
    await page.locator('.p-colorpicker-hue').click();
    await page.getByRole('button', { name: ' Create Label' }).click();
  });

  test('Labels >> Duplicate Labels', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    await page.getByRole('link', { name: ' Labels' }).click();
    await page.getByRole('button', { name: 'Create Label' }).click();
    await page.getByRole('textbox', { name: 'Enter label name' }).click();
    await page.getByRole('textbox', { name: 'Enter label name' }).fill('Playwright-L');
    await page.getByRole('button', { name: ' Create Label' }).click(); 
  });

  test('Labels >> Search Labels', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    await page.getByRole('textbox', { name: 'Search by Name' }).click();
    await page.getByRole('textbox', { name: 'Search by Name' }).fill('Playwright-L');
  });

  test('Labels >> Actions Icons Visibility', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    await page.getByRole('link', { name: ' Labels' }).click();
    await expect(page.getByRole('heading', { name: 'Labels' })).toBeVisible();

    // ✅ more specific: cards with exactly 3 buttons
    const cards = page.locator('div').filter({
    has: page.locator('button')
    });

    const count = await cards.count();
    console.log('Total Cards:', count);

    for (let i = 0; i < count; i++) {
    const card = cards.nth(i);

    // 🔍 get ONLY direct buttons inside this card (not nested)
    const buttons = card.locator(':scope > div button');

    const btnCount = await buttons.count();

    // ✅ only validate cards that actually have 3 buttons
    if (btnCount === 3) {
      await expect(buttons.nth(0)).toBeVisible(); // Edit
      await expect(buttons.nth(1)).toBeVisible(); // Delete
      await expect(buttons.nth(2)).toBeVisible(); // View
    }
  }
  });

  test('Labels >> View Labels', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    await page.getByRole('link', { name: ' Labels' }).click();
    await page.getByRole('button').nth(3).click(); // click view button
  });

  test('Labels >> Edit Labels', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    await page.getByRole('link', { name: ' Labels' }).click();
    await page.getByRole('button').nth(1).click();
    await page.getByRole('textbox', { name: 'Enter label name' }).click();
    await page.getByRole('textbox', { name: 'Enter label name' }).fill('PWL'); // Update Name
    await page.getByRole('button', { name: ' Update Label' }).click();
  });

  test('Labels >> Delete Labels', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    await page.getByRole('link', { name: ' Labels' }).click();
    const cards = page.locator('div:has(button)'); // wait for cards
    await expect(cards.first()).toBeVisible();
    const firstCard = cards.first(); // pick first card
    await firstCard.locator('button').nth(1).click(); // click DELETE icon (2nd button)
    await page.getByRole('button', { name: 'Delete' }).click(); // confirm delete
  });

});