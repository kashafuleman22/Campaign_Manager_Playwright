import { test, expect } from '@playwright/test';

  const baseURL = 'https://phone.cx.demo-octavebytes.com/campaign-manager/';
  const dashboardURL = 'https://phone.cx.demo-octavebytes.com/campaign-manager/main/customerSchema';

  // reusable login function
  async function login(page, email, password) {
  await page.getByRole('textbox', { name: 'email' }).fill(email);
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
    await login(page, "nahmad@octavebytes.com", "octavebytes!123");
  });

  test('Schema Management >> Page Loads Successfully', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    // await page.getByRole('link', { name: 'Schema' }).click();
  });

  test('Schema Management >> Schema List Display', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    // await page.getByRole('link', { name: 'Schema' }).click();
    // await page.getByRole('link', { name: ' Schema' }).click();
  });

  test('Schema Management >> Create Schema attribute Name', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    await page.getByRole('button', { name: 'Create Schema' }).click();
    await page.getByRole('textbox', { name: 'Enter Display Name' }).click();
    await page.getByRole('textbox', { name: 'Enter Display Name' }).fill('Name');
    await page.getByRole('textbox', { name: 'Precise Description' }).click();
    await page.getByRole('textbox', { name: 'Precise Description' }).fill('Personal Name');
    await page.getByRole('combobox', { name: 'Select Field Type' }).click();
    await page.getByText('TEXT', { exact: true }).click();
    await page.getByRole('checkbox', { name: 'Mandatory Field' }).check();
    await page.getByRole('textbox', { name: 'Enter default value' }).click();
    await page.getByRole('textbox', { name: 'Enter default value' }).fill('Kashaf');
    await page.getByRole('button', { name: 'Create' }).click();
  });

  test('Schema Management >> Create Schema attribute Phone Number', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    await page.getByRole('button', { name: 'Create Schema' }).click();
    await page.getByRole('textbox', { name: 'Enter Display Name' }).click();
    await page.getByRole('textbox', { name: 'Enter Display Name' }).fill('Phone Number');
    await page.getByRole('textbox', { name: 'Precise Description' }).click();
    await page.getByRole('textbox', { name: 'Precise Description' }).fill('Personal Number');
    await page.getByRole('combobox', { name: 'Select Field Type' }).click();
    await page.getByRole('option', { name: 'TEL' }).click();
    await page.getByRole('checkbox', { name: 'Mandatory Field' }).check();
    await page.getByRole('textbox', { name: 'Enter default value' }).click();
    await page.getByRole('textbox', { name: 'Enter default value' }).fill('03039070064');
    await page.getByRole('button', { name: ' Create' }).click();
  });

  // test('Schema Management >> Actions Icons Visibility', async ({ page }) => {
  //   await page.goto(dashboardURL);
  //   await expect(page).toHaveURL(dashboardURL);
  //   await page.getByText('Customers').first().click();
  //   await page.getByRole('link', { name: 'Schema' }).click();
  //   await expect(page.getByRole('heading', { name: 'Schema Management' })).toBeVisible();
  //   // more specific: cards with exactly 2 buttons
  //   const cards = page.locator('div').filter({
  //     has: page.locator('button')
  //   });

  //   const count = await cards.count();
  //   console.log('Total Cards:', count);
  
  //   for (let i = 0; i < count; i++) {
  //     const card = cards.nth(i);
  //     const buttons = card.locator(':scope > div button'); // get ONLY direct buttons inside this card (not nested)
  //     const btnCount = await buttons.count();
  //     // only validate cards that actually have 2 buttons
  //     if (btnCount === 2) {
  //       await expect(buttons.nth(0)).toBeVisible(); // Edit
  //       await expect(buttons.nth(1)).toBeVisible(); // Delete
  //     }
  //   }
  // });

  test('Schema Management >> Duplicate Schema', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    await page.getByRole('button', { name: 'Create Schema' }).click();
    await page.getByRole('textbox', { name: 'Enter Display Name' }).click();
    await page.getByRole('textbox', { name: 'Enter Display Name' }).fill('name');
    await page.getByRole('textbox', { name: 'Precise Description' }).click();
    await page.getByRole('textbox', { name: 'Precise Description' }).fill('personal name');
    await page.getByRole('combobox', { name: 'Select Field Type' }).click();
    await page.getByText('TEXT', { exact: true }).click();
    await page.getByRole('checkbox', { name: 'Mandatory Field' }).check();
    await page.getByRole('textbox', { name: 'Enter default value' }).click();
    await page.getByRole('textbox', { name: 'Enter default value' }).fill('Kashaf');
    await page.getByRole('button', { name: 'Create' }).click();
  });

  test('Schema Management >> Search Schema', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    await page.getByRole('textbox', { name: 'Search schemas...' }).click();
    await page.getByRole('textbox', { name: 'Search schemas...' }).fill('Name');
  });

  test('Schema Management >> Delete Schema', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    await page.getByRole('link', { name: 'Schema' }).click();
    await page.getByRole('button').nth(2).click();
    await page.getByRole('button', { name: 'Delete' }).click();
  });

  test('Schema Management >> Edit Schema', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    // await page.getByRole('link', { name: 'Schema' }).click();
    await page.getByRole('button').nth(1).click();
    await page.getByRole('textbox', { name: 'Enter Display Name' }).click();
    await page.getByRole('textbox', { name: 'Enter Display Name' }).fill('company');
    await page.getByRole('textbox', { name: 'Precise Description' }).click();
    await page.getByRole('textbox', { name: 'Precise Description' }).fill('company playwright');
    await page.getByRole('checkbox', { name: 'Mandatory Field' }).check();
    await page.getByRole('textbox', { name: 'Enter default value' }).click();
    await page.getByRole('textbox', { name: 'Enter default value' }).fill('playwright');
    await page.getByRole('button', { name: 'Update' }).click();
  });

  test('Schema Management >> Schema Attributes Count', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    // await page.getByRole('link', { name: 'Schema' }).click();
    await page.getByText('4 attributes').click();
  });

  test('Schema Management >> Create Schema attribute Labels', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    await page.getByRole('button', { name: 'Create Schema' }).click();
    await page.getByRole('textbox', { name: 'Enter Display Name' }).click();
    await page.getByRole('textbox', { name: 'Enter Display Name' }).fill('Labels');
    await page.getByRole('combobox', { name: 'Select Field Type' }).click();
    await page.getByText('MULTISELECT', { exact: true }).click();
    await page.getByRole('button', { name: 'Create' }).click();
  });
});