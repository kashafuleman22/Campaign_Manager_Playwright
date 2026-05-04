import { test, expect } from '@playwright/test';

const baseURL = 'https://campaign.demo-octavebytes.com/campaign-manager-pg/';
const dashboardURL = 'https://campaign.demo-octavebytes.com/campaign-manager-pg/main/campaign';

// reusable login function
async function login(page, username, password) {
  await page.getByRole('textbox', { name: 'username' }).fill(username);
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle' }),
    page.getByRole('button', { name: 'Login' }).click()
  ]);
}

test.describe('Campaign Feature >> Campaigns', () => {

  // LOGIN RUNS BEFORE EVERY TEST (but written once)
  test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);
    await login(page, "hassan", "hassan");
  });

    // ---------------- CAMPAIGNS TEST CASES ----------------

  test('Campaigns >> Page Loads Successfully', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
  });
  
  test('Campaigns >> Camapigns List', async ({ page }) => {
    await page.goto(dashboardURL);
  });

  test('Campaigns >> Create Camapigns with Reattempts', async ({ page }) => {
    await page.goto(dashboardURL);
    await page.getByRole('navigation').locator('div').filter({ hasText: /^Campaigns$/ }).click();
    await page.getByRole('button', { name: 'Create Campaign' }).click();
    await page.getByRole('textbox', { name: 'Enter name' }).click();
    await page.getByRole('textbox', { name: 'Enter name' }).fill('kashaf');
    await page.getByRole('combobox', { name: 'Select Type' }).click();
    await page.getByRole('option', { name: 'IVR' }).click();
    await page.getByRole('combobox', { name: 'Select Channel' }).click();
    await page.getByText('Voice').click();
    await page.getByRole('combobox', { name: 'Select Segment' }).click();
    await page.getByRole('option', { name: 'Kashaf' }).click();
    // await page.getByText('Kashaf').click();
    await page.getByRole('combobox', { name: 'Select Start Date' }).click();
    await page.locator('.p-datepicker-minute-picker > p-button > .p-ripple').first().click();
    await page.locator('.p-datepicker-minute-picker > p-button > .p-ripple').first().click();
    await page.getByRole('combobox', { name: 'Select End Date' }).click();
    await page.locator('.p-datepicker-minute-picker > p-button > .p-ripple').first().click();
    await page.locator('.p-datepicker-minute-picker > p-button > .p-ripple').first().click();
    await page.getByRole('combobox', { name: 'Select IVR Menu' }).click();
    await page.getByRole('option', { name: '110' }).click();
    await page.getByPlaceholder('Enter priority (1-10)').click();
    await page.getByPlaceholder('Enter priority (1-10)').fill('1');
    await page.getByRole('button', { name: 'Next ' }).click();
    await page.getByRole('combobox', { name: 'Select time' }).first().click();
    await page.locator('.p-datepicker-minute-picker > p-button > .p-ripple').first().click();
    await page.getByRole('combobox', { name: 'Select time' }).nth(1).click();
    await page.locator('.p-ripple.p-button.p-component.p-button-rounded.p-button-text.p-button-sm').first().click();
    await page.locator('.p-datepicker-minute-picker > p-button > .p-ripple').first().click();
    await page.getByRole('checkbox', { name: 'Mon' }).check();
    await page.getByRole('checkbox', { name: 'Tue' }).check();
    await page.getByRole('checkbox', { name: 'Wed' }).check();
    await page.getByRole('checkbox', { name: 'Thu' }).check();
    await page.getByRole('checkbox', { name: 'Fri' }).check();
    await page.getByRole('button', { name: 'Next ' }).click();
    await page.getByRole('checkbox', { name: 'Busy   -   The number dialed' }).check();
    await page.getByRole('combobox', { name: 'Select Channel' }).click();
    await page.getByText('Voice Call').click();
    await page.getByPlaceholder('Duration').click();
    await page.getByPlaceholder('Duration').fill('1');
    await page.getByRole('combobox', { name: 'Unit' }).click();
    await page.getByText('hours').click();
    await page.getByPlaceholder('Retry Attempts').click();
    await page.getByPlaceholder('Retry Attempts').fill('1');
    await page.getByRole('button', { name: ' Create Campaign' }).click();
  });

  test('Campaigns >> Create Camapign without Reattempt', async ({ page }) => {
  await page.goto(dashboardURL);
  await page.getByRole('button', { name: 'Create Campaign' }).click();
  await page.getByRole('textbox', { name: 'Enter name' }).click();
  await page.getByRole('textbox', { name: 'Enter name' }).fill('ka');
  await page.getByRole('combobox', { name: 'Select Type' }).click();
  await page.getByText('IVR', { exact: true }).click();
  await page.getByRole('combobox', { name: 'Select Channel' }).click();
  await page.getByText('Voice').click();
  await page.getByRole('combobox', { name: 'Select Segment' }).click();
  await page.getByLabel('Amna').getByText('Amna').click();
  await page.getByRole('combobox', { name: 'Select Start Date' }).click();
  await page.getByText('22').click();
  await page.getByRole('combobox', { name: 'Select End Date' }).click();
  await page.getByText('28').click();
  // await page.getByRole('combobox', { name: 'Select Start Date' }).click();
  // await page.locator('.p-datepicker-minute-picker > p-button > .p-ripple').first().click();
  // await page.locator('.p-datepicker-minute-picker > p-button > .p-ripple').first().click();
  // await page.getByRole('combobox', { name: 'Select End Date' }).click();
  // await page.locator('.p-datepicker-minute-picker > p-button > .p-ripple').first().click();
  // await page.locator('.p-datepicker-minute-picker > p-button > .p-ripple').first().click();
  await page.getByRole('combobox', { name: 'Select IVR Menu' }).click();
  await page.getByRole('option', { name: '111' }).click();
  await page.getByPlaceholder('Enter priority (1-10)').click();
  await page.getByPlaceholder('Enter priority (1-10)').fill('1');
  await page.getByRole('button', { name: 'Next ' }).click();
  await page.getByRole('combobox', { name: 'Select time' }).first().click();
  await page.locator('.p-ripple.p-button.p-component.p-button-rounded.p-button-text.p-button-sm').first().click();
  await page.getByRole('combobox', { name: 'Select time' }).nth(1).click();
  await page.locator('.p-ripple.p-button.p-component.p-button-rounded.p-button-text.p-button-sm').first().click();
  await page.locator('.p-ripple.p-button.p-component.p-button-rounded.p-button-text.p-button-sm').first().click();
  await page.getByRole('checkbox', { name: 'Mon' }).check();
  await page.getByRole('checkbox', { name: 'Tue' }).check();
  await page.getByRole('checkbox', { name: 'Wed' }).check();
  await page.getByRole('checkbox', { name: 'Thu' }).check();
  await page.getByRole('checkbox', { name: 'Fri' }).check();
  await page.getByRole('button', { name: 'Next ' }).click();
  await page.getByRole('button', { name: ' Create Campaign' }).click();
  });

  test('Campaigns >> Search Campaigns', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Search campaigns...' }).click();
    await page.getByRole('textbox', { name: 'Search campaigns...' }).fill('Kashaf');
  });

  test('Campaigns >> Pagination', async ({ page }) => {
    await page.getByRole('button', { name: 'dropdown trigger' }).click();
    await page.getByRole('option', { name: '10' }).click();
  });

  test('Campaigns >> Campaign Preview', async ({ page }) => {
    await page.getByRole('button', { name: ' Preview' }).first().click();
    await page.getByRole('button', { name: ' Start' }).click();
    await page.getByRole('button', { name: ' Pause' }).click();
    await page.locator('div').filter({ hasText: 'Close' }).nth(5).click();
    await page.getByRole('button', { name: ' Close' }).click();
    // const recordName = 'Kashaf Preview';
    // await page.waitForSelector('table tbody tr');
    // // const row = page.locator('table tbody tr', { hasText: recordName });
    // // await row.getByRole('button', { name: 'Preview' }).click();

    // const row = page.locator('table tbody tr', { hasText: 'Kashaf Update' });
    // await expect(row).toBeVisible();
    // await row.getByRole('button', { name: /Preview/i }).click();

    // await page.locator('text=Start').scrollIntoViewIfNeeded();
    // // await page.locator('button:has-text("Start")').click();
    // await page.getByTitle('Close').click();
  });

  test('Campaigns >> Edited Camapign', async ({ page }) => {
    await page.goto(dashboardURL);
    await page.getByRole('navigation').locator('div').filter({ hasText: /^Campaigns$/ }).click();
    await page.getByRole('button').nth(1).click();
  await page.getByRole('textbox', { name: 'Enter name' }).click();
  await page.getByRole('textbox', { name: 'Enter name' }).fill('Kashaf update');
  await page.getByRole('button', { name: 'Next ' }).click();
  await page.getByRole('button', { name: 'Next ' }).click();
  await page.getByRole('button', { name: ' Update Campaign' }).click();
  });

  test('Campaigns >> Delete Campaigns', async ({ page }) => {
    const recordName = 'Kr'; // jis record ko delete karna hai
    // const row = page.locator('table tbody tr', { hasText: recordName });
    // await row.locator('.delete-btn').click();
    
    await page.waitForSelector('table tbody tr');
    const row = page.locator('table tbody tr', { hasText: 'Kashaf Update' });
    // ensure row exists
    await expect(row).toBeVisible({ timeout: 10000 });
    await row.locator('.delete-btn').click();

    await page.getByRole('button', { name: 'Delete' }).click();
    await expect(page.locator('text=Campaign deleted successfully')).toBeVisible();
  });

});