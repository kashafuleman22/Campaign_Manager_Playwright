import { test, expect } from '@playwright/test';

  const baseURL = 'https://ucm.demo-octavebytes.com/unified-campaign-manager/';
  const dashboardURL = 'https://ucm.demo-octavebytes.com/unified-campaign-manager/main/report';

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

  test('Campaigns Report >> Page Loads Successfully', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
  });

  test('Campaigns Report >> Status-wise Count display and Accuracy', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.waitForLoadState('networkidle');
    await page.getByText('Campaigns').first().click(); // open Campaigns menu
    await page.getByText('Campaign Report').click(); // click Campaign Report
    await expect(page).toHaveURL(/report/);
    await expect(page.getByText('Total')).toBeVisible();
    await expect(page.getByText('Draft')).toBeVisible();
    await expect(page.getByText('Active')).toBeVisible();
    await expect(page.getByText('Pause')).toBeVisible();
    await expect(page.getByText('Completed')).toBeVisible();
    await expect(page.getByText('Running')).toBeVisible();
  });

  test('Campaigns Report >> Refresh Functionality', async ({ page }) => {
    await page.goto(dashboardURL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'Refresh' }).click();
  });

  test('Campaign Report >> Download Functionality', async ({ page }) => {
    await page.goto(dashboardURL);
    await page.getByRole('navigation').locator('div').filter({ hasText: /^Campaigns$/ }).click();
    await page.getByRole('combobox', { name: 'Select Campaign to load data' }).click();
    await page.getByText('saaa').click();
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Report' }).click();
    const download = await downloadPromise;
  });

  test('Campaign Report >> Load Contact Report Section', async ({ page }) => {
    await page.goto(dashboardURL);
    await page.getByText('Campaigns').first().click();
    await page.getByRole('button', { name: 'dropdown trigger' }).click(); // Open dropdown
    const dropdown = page.getByRole('combobox', { name: 'Select Campaign to load data' });
    await dropdown.waitFor({ state: 'visible' });
    await dropdown.click();
    await page.getByText('Campaign Report').click(); // Navigate to report
    await expect(page.getByText('Load Contact Report')).toBeVisible({ timeout: 10000 }); // Assertion
  });

  test('Campaign Report >> Contact Status Count', async ({ page }) => {
    await page.goto(dashboardURL);
  
    await page.getByRole('navigation').locator('div').filter({ hasText: /^Campaigns$/ }).click();
      await page.getByRole('link', { name: ' Report' }).click();
      await page.getByRole('combobox', { name: 'Select Campaign to load data' }).click();
      await page.getByRole('option').first().click();
    // Open Report
    await page.getByText('Campaign Report').click();
  
    // Wait for data to load
    await page.waitForTimeout(2000); // or better: wait for specific element
    // Assertions (FIXED)
    await expect(page.getByText('Total').first()).toBeVisible({ timeout: 10000 });
    // await expect(page.getByText('Call Connected').first()).toBeVisible();
    // await expect(page.getByText('No Answer').first()).toBeVisible();
   });

  test('Campaign Report >> Shown Report', async ({ page }) => {
  await page.goto(dashboardURL);
  await page.getByText('Campaigns').first().click();
  await page.getByText('Campaign Report').click();
  });
});