import { test, expect } from '@playwright/test';

  const baseURL = 'https://campaign.demo-octavebytes.com/campaign-manager-pg/';
  const dashboardURL = 'https://campaign.demo-octavebytes.com/campaign-manager-pg/main/customerSchema';

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

  test('Schema Management >> Page Loads Successfully', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    await page.getByRole('link', { name: 'Schema' }).click();
  });

  test('Schema Management >> Schema List Display', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    await page.getByRole('link', { name: 'Schema' }).click();
  });

  test('Schema Management >> Craete Schema attribute Country', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    await page.getByRole('button', { name: 'Create Schema' }).click();
    await page.getByRole('textbox', { name: 'Enter Display Name' }).click();
    await page.getByRole('textbox', { name: 'Enter Display Name' }).fill('Country');
    await page.getByRole('textbox', { name: 'Precise Description' }).click();
    await page.getByRole('textbox', { name: 'Precise Description' }).fill('Personal country');
    await page.getByRole('button', { name: 'dropdown trigger' }).click();
    await page.getByRole('option', { name: 'STRING' }).click();
    await page.getByRole('checkbox', { name: 'Mandatory Field' }).check();
    await page.getByRole('textbox', { name: 'Enter default value' }).click();
    await page.getByRole('textbox', { name: 'Enter default value' }).fill('Pakistan');
    await page.getByRole('button', { name: 'Create' }).click();
  });

  test('Schema Management >> Craete Schema attribute Phone Number', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    await page.getByRole('button', { name: 'Create Schema' }).click();
    await page.getByRole('textbox', { name: 'Enter Display Name' }).click();
    await page.getByRole('textbox', { name: 'Enter Display Name' }).fill('Phone Number');
    await page.getByRole('textbox', { name: 'Precise Description' }).click();
    await page.getByRole('textbox', { name: 'Precise Description' }).fill('Personal Number');
    await page.getByRole('button', { name: 'dropdown trigger' }).click();
    await page.getByRole('option', { name: 'PHONENUMBER' }).click();
    await page.getByRole('checkbox', { name: 'Mandatory Field' }).check();
    await page.getByRole('textbox', { name: 'Enter default value' }).click();
    await page.getByRole('textbox', { name: 'Enter default value' }).fill('03039070064');
    await page.getByRole('button', { name: 'Create' }).click();
  });

  test('Schema Management >> Duplicate Schema', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    await page.getByRole('button', { name: 'Create Schema' }).click();
    await page.getByRole('textbox', { name: 'Enter Display Name' }).click();
    await page.getByRole('textbox', { name: 'Enter Display Name' }).fill('name');
    await page.getByRole('textbox', { name: 'Precise Description' }).click();
    await page.getByRole('textbox', { name: 'Precise Description' }).fill('personal name');
    await page.getByRole('button', { name: 'dropdown trigger' }).click();
    await page.getByRole('option', { name: 'NAME' }).click();
    await page.getByRole('checkbox', { name: 'Mandatory Field' }).check();
    await page.getByRole('textbox', { name: 'Enter default value' }).click();
    await page.getByRole('textbox', { name: 'Enter default value' }).fill('Kashaf');
    await page.getByRole('button', { name: ' Create' }).click();
  });

  test('Schema Management >> Search Schema', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    await page.getByRole('textbox', { name: 'Search schemas...' }).click();
    await page.getByRole('textbox', { name: 'Search schemas...' }).fill('Name');
  });

  test('Schema Management >> Schema Attributes Count', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    await page.getByRole('link', { name: 'Schema' }).click();
    await page.getByText('4 attributes').click();
  });

  test('Schema Management >> Actions Icons Visibility', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    await page.getByRole('link', { name: 'Schema' }).click();
    await expect(page.getByRole('heading', { name: 'Schema Management' })).toBeVisible();
    // more specific: cards with exactly 2 buttons
    const cards = page.locator('div').filter({
      has: page.locator('button')
    });

    const count = await cards.count();
    console.log('Total Cards:', count);
  
    for (let i = 0; i < count; i++) {
      const card = cards.nth(i);
      const buttons = card.locator(':scope > div button'); // get ONLY direct buttons inside this card (not nested)
      const btnCount = await buttons.count();
      // only validate cards that actually have 2 buttons
      if (btnCount === 2) {
        await expect(buttons.nth(0)).toBeVisible(); // Edit
        await expect(buttons.nth(1)).toBeVisible(); // Delete
      }
    }
  });

  test('Schema Management >> Edit Schema', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    await page.getByRole('link', { name: 'Schema' }).click();
    await page.getByRole('button').nth(1).click();
    await page.getByRole('textbox', { name: 'Enter Display Name' }).click();
    await page.getByRole('textbox', { name: 'Enter Display Name' }).fill('city');
    await page.getByRole('textbox', { name: 'Precise Description' }).click();
    await page.getByRole('textbox', { name: 'Precise Description' }).fill('city playwright');
    await page.getByRole('checkbox', { name: 'Mandatory Field' }).check();
    await page.getByRole('textbox', { name: 'Enter default value' }).click();
    await page.getByRole('textbox', { name: 'Enter default value' }).fill('playwright');
    await page.getByRole('button', { name: 'Update' }).click();
  });

  test('Schema Management >> Delete Schema', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    await page.getByRole('link', { name: 'Schema' }).click();
    await page.getByRole('button').nth(2).click();
    await page.getByRole('button', { name: 'Delete' }).click();
  });

});