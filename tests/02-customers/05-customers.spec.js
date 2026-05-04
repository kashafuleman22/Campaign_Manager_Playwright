import { test, expect } from '@playwright/test';

  const baseURL = 'https://campaign.demo-octavebytes.com/campaign-manager-pg/';
  const dashboardURL = 'https://campaign.demo-octavebytes.com/campaign-manager-pg/main/customerlist';

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

  test('Customer List Panel >> Page Load Successfully', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    await page.getByRole('link', { name: 'Customers' }).click();
  });

  test('Customer List Panel >> Customers List Display', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    await page.getByRole('link', { name: 'Customers' }).click();
  });

  test('Customer List Panel >> Create Customer', async ({ page }) => {
  await page.goto(dashboardURL);
  await expect(page).toHaveURL(dashboardURL);
  await page.getByRole('button', { name: 'Create Customer' }).click();
  await page.getByRole('textbox').nth(1).click();
  await page.getByRole('textbox').nth(1).fill('kas');
  await page.getByRole('textbox').nth(2).click();
  await page.getByRole('textbox').nth(2).fill('22');
  await page.getByRole('button', { name: ' Create Customer' }).click();
  });

  test('Customer List Panel >> Dupliacte Customer Number', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    await page.getByRole('link', { name: 'Customers' }).click();
    await page.locator('tr:nth-child(9) > .truncate-text > .action-buttons > .icon-btn.edit-btn').click();
    await page.getByRole('textbox').nth(2).click();
    await page.getByRole('textbox').nth(2).fill('0307');
    await page.getByRole('button', { name: ' Update Customer' }).click();
  });

  test('Customer List Panel >> Searching Functionality', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    await page.getByRole('link', { name: 'Customers' }).click();
    await page.getByRole('textbox', { name: 'Search' }).click();
    await page.getByRole('textbox', { name: 'Search' }).fill('0303');
  });

  test('Customer List Panel >> Searching with Filter', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    await page.getByRole('link', { name: 'Customers' }).click();
    await page.locator('.pi.pi-filter').click();
    await page.getByRole('radio', { name: 'Phone number' }).check();
    await page.getByRole('textbox', { name: 'Search', exact: true }).click();
    await page.getByRole('textbox', { name: 'Search', exact: true }).fill('0301');
    await page.getByRole('button', { name: 'Done' }).click();
  });

  test('Customer List Panel >> Select Segments', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    await page.getByRole('link', { name: 'Customers' }).click();
    // await page.getByText('Select Segment').click();
    await page.getByRole('combobox', { name: 'Select Segment' }).click();
    await page.getByLabel('Option List').getByText('Kashaf').click();
    // await page.getByRole('combobox', { name: 'Select Segment' }).click();
    // await page.locator('#segment-p-select').getByRole('button', { name: 'dropdown trigger' }).click();
    // await page.getByRole('option', { name: 'Kashaf' }).click();
    // await page.getByRole('checkbox', { name: 'All items unselected' }).check();
  });

  test('Customer List Panel >> Select Labels', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    await page.getByRole('link', { name: 'Customers' }).click();
    await page.getByText('Select Label').click();
    await page.getByRole('checkbox', { name: 'green' }).check();
    await page.getByRole('checkbox', { name: 'blue' }).check();
    await page.getByRole('checkbox', { name: 'gold' }).check();
  });

  test('Customer List Panel >> Sorting Customers', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    await page.getByRole('link', { name: 'Customers' }).click();
    await page.getByText('Phone Number', { exact: true }).click();
    await page.getByText('Phone Number', { exact: true }).click();
    await page.getByText('Name', { exact: true }).click();
    await page.getByText('Name', { exact: true }).click();
  });

  test('Customer List Panel >> Pagination', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    await page.getByRole('link', { name: 'Customers' }).click();
    const paginationDropdown = page.locator('.p-paginator').locator('[role="button"]');
    await paginationDropdown.click();
    await page.getByRole('option', { name: '5', exact: true }).click();
  });

  test('Customer List Panel >> Colume Preference', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    await page.getByRole('link', { name: 'Customers' }).click();
    await page.getByText('Column Preference').click();
    const checkbox = page.locator('#checkbox-phoneNumber');
    if (!(await checkbox.isChecked())) {
        await checkbox.click();
    }
    await page.getByRole('button', { name: 'Submit' }).click();
  });

  test('Customer List Panel >> Edit Customer', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    await page.getByRole('link', { name: 'Customers' }).click();
    await page.locator('tr:nth-child(9) > .truncate-text > .action-buttons > .icon-btn.edit-btn').click();
    await page.getByRole('textbox').nth(2).click();
    await page.getByRole('textbox').nth(2).fill('02222');
    await page.getByRole('button', { name: ' Update Customer' }).click();
    // await page.getByRole('button').nth(1).click();
    // await page.getByRole('dialog', { name: 'Update Customer' }).getByRole('textbox').click();
    // await page.getByRole('dialog', { name: 'Update Customer' }).getByRole('textbox').fill('03456');
    // await page.getByRole('button', { name: ' Update Customer' }).click();
  });

  test('Customer List Panel >> Delete Customer', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    await page.getByRole('link', { name: 'Customers' }).click();
    await page.locator('tr:nth-child(4) > .truncate-text > .action-buttons > .icon-btn.delete-btn').click();
    await page.getByRole('button', { name: 'Delete' }).click();
  });

});