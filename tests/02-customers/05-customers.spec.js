import { test, expect } from '@playwright/test';

  const baseURL = 'https://phone.cx.demo-octavebytes.com/campaign-manager/';
  const dashboardURL = 'https://phone.cx.demo-octavebytes.com/campaign-manager/main/customerlist';

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

  test('Customer List Panel >> Page Load Successfully', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    // await page.getByRole('link', { name: 'Customers' }).click();
  });

  test('Customer List Panel >> Create Customer', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    await page.getByRole('button', { name: 'Create Customer' }).click();
    await page.getByRole('button', { name: ' Clear' }).click();
    await page.getByText('Select Labels').click();
    await page.getByRole('checkbox', { name: 'PWL' }).check();
    await page.locator('input[type="tel"]').click();
    await page.locator('input[type="tel"]').fill('03347491839');
    await page.getByRole('textbox').nth(2).click();
    await page.getByRole('textbox').nth(2).fill('Employee');
    await page.getByRole('textbox').nth(3).click();
    await page.getByRole('textbox').nth(3).fill('playwright');
    await page.getByRole('textbox').nth(4).click();
    await page.getByRole('textbox').nth(4).fill('Kashaf');
    await page.getByRole('button', { name: ' Create Customer' }).click();
  });

  test('Customer List Panel >> Dupliacte Phone Number', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    await page.getByRole('button', { name: 'Create Customer' }).click();
    await page.getByRole('button', { name: ' Clear' }).click();
    await page.getByText('Select Labels').click();
    await page.getByRole('checkbox', { name: 'PWL' }).check();
    await page.locator('input[type="tel"]').click();
    await page.locator('input[type="tel"]').fill('03347491839');
    await page.getByRole('textbox').nth(2).click();
    await page.getByRole('textbox').nth(2).fill('Employee');
    await page.getByRole('textbox').nth(3).click();
    await page.getByRole('textbox').nth(3).fill('playwright');
    await page.getByRole('textbox').nth(4).click();
    await page.getByRole('textbox').nth(4).fill('Kashaf');
    await page.getByRole('button', { name: ' Create Customer' }).click();
  });

  test('Customer List Panel >> Edit Customer', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    await page.getByRole('button').nth(2).click();
    await page.locator('div').filter({ hasText: /^PWL$/ }).nth(1).click();
    await page.getByRole('checkbox', { name: 'Kashaf updatesSAa' }).check();
    await page.getByRole('button', { name: ' Update Customer' }).click();
    // await page.getByRole('link', { name: 'Customers' }).click();
    // await page.locator('tr:nth-child(9) > .truncate-text > .action-buttons > .icon-btn.edit-btn').click();
    // await page.getByRole('textbox').nth(2).click();
    // await page.getByRole('textbox').nth(2).fill('02222');
    // await page.getByRole('button', { name: ' Update Customer' }).click();
    // await page.getByRole('button').nth(1).click();
    // await page.getByRole('dialog', { name: 'Update Customer' }).getByRole('textbox').click();
    // await page.getByRole('dialog', { name: 'Update Customer' }).getByRole('textbox').fill('03456');
    // await page.getByRole('button', { name: ' Update Customer' }).click();
  });

  test('Customer List Panel >> Delete Customer', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    await page.getByRole('button').nth(3).click();
    await page.getByRole('button', { name: 'Delete' }).click();
    // await page.getByRole('link', { name: 'Customers' }).click();
    // await page.locator('tr:nth-child(4) > .truncate-text > .action-buttons > .icon-btn.delete-btn').click();
    // await page.getByRole('button', { name: 'Delete' }).click();
  });

  test('Customer List Panel >> Pagination', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    // await page.getByRole('link', { name: 'Customers' }).click();
    const paginationDropdown = page.locator('.p-paginator').locator('[role="button"]');
    await paginationDropdown.click();
    await page.getByRole('option', { name: '5', exact: true }).click();
  });

  test('Customer List Panel >> Sorting Customers', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    // await page.getByRole('link', { name: 'Customers' }).click();
    await page.getByText('Phone Number', { exact: true }).click();
    await page.getByText('Phone Number', { exact: true }).click();
    // await page.getByText('Name', { exact: true }).click();
    // await page.getByText('Name', { exact: true }).click();
  });

  test('Customer List Panel >> Customers List Display', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    // await page.getByRole('link', { name: 'Customers' }).click();
  });

  test('Customer List Panel >> Global Searching', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    // await page.getByRole('link', { name: 'Customers' }).click();
    await page.getByRole('textbox', { name: 'Search' }).click();
    await page.getByRole('textbox', { name: 'Search' }).fill('kashaf');
  });

  test('Customer List Panel >> Searching Filter', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    // await page.getByRole('link', { name: 'Customers' }).click();
    await page.locator('.pi.pi-filter').click();
    await page.getByRole('radio', { name: 'Phone Number' }).check();
    await page.getByRole('button', { name: 'Done' }).click();
    await page.getByRole('textbox', { name: 'Press Enter to search by' }).click();
    await page.getByRole('textbox', { name: 'Press Enter to search by' }).fill('0301');
  });

  test('Customer List Panel >> Colume Preference', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    // await page.getByRole('link', { name: 'Customers' }).click();
    await page.getByText('Column Preference').click();
    const checkbox = page.locator('#checkbox-phoneNumber');
    if (!(await checkbox.isChecked())) {
        await checkbox.click();
    }
    await page.getByRole('button', { name: 'Submit' }).click();
  });

  test('Customer List Panel >> Select Segments', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    await page.getByRole('combobox', { name: 'Select Segment' }).click();
    await page.getByText('Kashaf', { exact: true }).click();
    // await page.getByRole('link', { name: 'Customers' }).click();
    // await page.getByText('Select Segment').click();
    // await page.getByRole('combobox', { name: 'Select Segment' }).click();
    // await page.getByLabel('Option List').getByText('Kashaf').click();
    // await page.getByRole('combobox', { name: 'Select Segment' }).click();
    // await page.locator('#segment-p-select').getByRole('button', { name: 'dropdown trigger' }).click();
    // await page.getByRole('option', { name: 'Kashaf' }).click();
    // await page.getByRole('checkbox', { name: 'All items unselected' }).check();
  });

  test('Customer List Panel >> Select Labels', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    // await page.getByRole('link', { name: 'Customers' }).click();
    await page.getByText('Select Label').click();
    await page.getByRole('checkbox', { name: 'All items unselected' }).check();
  });
});