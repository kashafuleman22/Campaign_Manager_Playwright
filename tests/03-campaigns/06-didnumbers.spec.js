import { test, expect } from '@playwright/test';

const baseURL = 'https://phone.cx.demo-octavebytes.com/campaign-manager/';
const dashboardURL = 'https://phone.cx.demo-octavebytes.com/campaign-manager/main/did';

// reusable login function
async function login(page, email, password) {
  await page.getByRole('textbox', { name: 'Email' }).fill(email);
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
    await login(page, "nahmad@octavebytes.com", "octavebytes!123");
  });

    // ---------------- CAMPAIGNS TEST CASES ----------------

  test('DID Number >> Page Loads Successfully', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
  });

  test('DID Number >> DID Numbers list display', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
  });

  test('DID Number >> Create DID Number Active Status and IVR Toggle Handling', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByRole('button', { name: 'Create DID' }).click();
    await page.getByRole('textbox', { name: 'Enter DID number' }).click();
    await page.getByRole('textbox', { name: 'Enter DID number' }).fill('112');
    await page.getByRole('textbox', { name: 'Enter description (optional)' }).click();
    await page.getByRole('textbox', { name: 'Enter description (optional)' }).fill('Company Number');
    await page.getByRole('switch').first().check();
    await page.getByRole('button', { name: ' Create DID' }).click();
  });

  test('DID Number >> Duplicate DID Number', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByRole('button', { name: 'Create DID' }).click();
    await page.getByRole('textbox', { name: 'Enter DID number' }).click();
    await page.getByRole('textbox', { name: 'Enter DID number' }).fill('112');
    await page.getByRole('textbox', { name: 'Enter description (optional)' }).click();
    await page.getByRole('textbox', { name: 'Enter description (optional)' }).fill('Company Number');
    await page.getByRole('switch').first().check();
    await page.getByRole('button', { name: ' Create DID' }).click();
  });

  test('DID Number >> DID Number Searching Functionality', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByRole('textbox', { name: 'Search by Number' }).click();
    await page.getByRole('textbox', { name: 'Search by Number' }).fill('112');
  });

  test('DID Number >> DID Number Sorting Functionality', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByRole('columnheader', { name: 'Phone Number' }).click();
    await page.getByRole('columnheader', { name: 'Phone Number' }).click();
  });

  test('DID Number >> Pagination Control Functionality', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByRole('button', { name: 'dropdown trigger' }).click();
    await page.getByRole('option', { name: '5' }).click();
  });

  test('DID Number >> Actions Icons Visibility', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
  });

  test('DID Number >> Edit DID Number action', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByRole('button').nth(1).click();
    await page.getByRole('textbox', { name: 'Enter DID number' }).click();
    await page.getByRole('textbox', { name: 'Enter DID number' }).fill('113');
    await page.getByRole('switch').nth(1).check();
    await page.getByRole('button', { name: ' Update DID' }).click();
  });

  test('DID Number >> Delete DID Number action', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByRole('button').nth(2).click();
    await page.getByRole('button', { name: 'Delete' }).click();
  });

});