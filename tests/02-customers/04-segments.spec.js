import { test, expect } from '@playwright/test';

  const baseURL = 'https://campaign.demo-octavebytes.com/campaign-manager-pg/';
  const dashboardURL = 'https://campaign.demo-octavebytes.com/campaign-manager-pg/main/customerSegmnent';

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

  test('Segments(filters) >> Page Loads Successfully', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    await page.getByRole('link', { name: 'Customers' }).click(); 
    await page.getByRole('link', { name: ' Segments' }).click();
  });

  test('Segments(filters) >> Create Segments with OR condition', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'Create Segment' }).click();
    await page.getByRole('textbox', { name: 'Enter segment name' }).click();
    await page.getByRole('textbox', { name: 'Enter segment name' }).fill('KS');
    await page.locator('#attribute0').getByRole('button', { name: 'dropdown trigger' }).click();
    await page.getByRole('option', { name: 'Name' }).click();
    await page.getByRole('textbox', { name: 'Value *' }).click();
    await page.getByRole('textbox', { name: 'Value *' }).fill('amna');
    await page.getByRole('button', { name: ' Add Filter' }).click();
    await page.locator('#condition1').getByRole('button', { name: 'dropdown trigger' }).click();
    await page.getByRole('option', { name: 'OR' }).click();
    await page.locator('#attribute1').getByRole('button', { name: 'dropdown trigger' }).click();
    await page.getByRole('option', { name: 'Phone Number' }).click();
    await page.locator('#value1').click();
    await page.locator('#value1').fill('0308');
    await page.getByRole('button', { name: ' Create Segment' }).click();
  });

  test('Segments(filters) >> Create Segments with And condition', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'Create Segment' }).click();
    await page.getByRole('textbox', { name: 'Enter segment name' }).click();
    await page.getByRole('textbox', { name: 'Enter segment name' }).fill('KF');
    await page.locator('#attribute0').getByRole('button', { name: 'dropdown trigger' }).click();
    await page.getByRole('option', { name: 'Name' }).click();
    await page.getByRole('textbox', { name: 'Value *' }).click();
    await page.getByRole('textbox', { name: 'Value *' }).fill('kashaF');
    await page.getByRole('button', { name: ' Add Filter' }).click();
    await page.locator('#condition1').getByRole('button', { name: 'dropdown trigger' }).click();
    await page.getByRole('option', { name: 'And' }).click();
    await page.locator('#attribute1').getByRole('button', { name: 'dropdown trigger' }).click();
    await page.getByText('Phone Number').click();
    await page.locator('#value1').click();
    await page.locator('#value1').fill('0307');
    await page.getByRole('button', { name: ' Create Segment' }).click();
  });

  test('Segments(filters) >> Duplicate Segemnts Creation', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'Create Segment' }).click();
    await page.getByRole('textbox', { name: 'Enter segment name' }).click();
    await page.getByRole('textbox', { name: 'Enter segment name' }).fill('KF');
    await page.locator('#attribute0').getByRole('button', { name: 'dropdown trigger' }).click();
    await page.getByRole('option', { name: 'Name' }).click();
    await page.getByRole('textbox', { name: 'Value *' }).click();
    await page.getByRole('textbox', { name: 'Value *' }).fill('kashaF');
    await page.getByRole('button', { name: ' Add Filter' }).click();
    await page.locator('#condition1').getByRole('button', { name: 'dropdown trigger' }).click();
    await page.getByRole('option', { name: 'And' }).click();
    await page.locator('#attribute1').getByRole('button', { name: 'dropdown trigger' }).click();
    await page.getByText('Phone Number').click();
    await page.locator('#value1').click();
    await page.locator('#value1').fill('0307');
    await page.getByRole('button', { name: ' Create Segment' }).click();
  });

  test('Segments(filters) >> Sorting', async ({ page }) => {
    await page.goto(dashboardURL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('columnheader', { name: 'Name' }).getByRole('img').click();
  });

  test('Segments(filters) >> Searching by name', async ({ page }) => {
    await page.goto(dashboardURL);
    await page.getByRole('textbox', { name: 'Search by Name' }).click();
    await page.getByRole('textbox', { name: 'Search by Name' }).fill('kashaf');
  });

  test('Segments(filters) >> Valid Filters', async ({ page }) => {
    await page.goto(dashboardURL);
    await page.getByRole('columnheader', { name: 'Filters' }).click();
  });

  test('Segments(filters) >> Timestamp display', async ({ page }) => {
    await page.goto(dashboardURL);
    await page.getByRole('columnheader', { name: 'Created At' }).click();
  });

  test('Segments(filters) >> Name display', async ({ page }) => {
    await page.goto(dashboardURL);
    await page.getByRole('columnheader', { name: 'Name' }).click();
  });

  test('Segments(filters) >> Pagination', async ({ page }) => {
    await page.goto(dashboardURL);
    await page.getByRole('button', { name: 'dropdown trigger' }).click();
    await page.getByRole('option', { name: '5' }).click();
  });

  test('Segments(filters) >> Action Icons', async ({ page }) => {
    await page.goto(dashboardURL);
    await page.getByRole('columnheader', { name: 'Action' }).click();
  });

  test('Segments(filters) >> Edit Segments', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.waitForLoadState('networkidle');
    await page.getByRole('button').nth(5).click();
    await page.locator('#operator0').getByRole('button', { name: 'dropdown trigger' }).click();
    await page.getByRole('option', { name: 'Starts With' }).click();
    await page.getByRole('textbox', { name: 'Value *' }).click();
    await page.getByRole('textbox', { name: 'Value *' }).fill('eM');
    await page.getByRole('button', { name: ' Update Segment' }).click();
  });

  test('Segments(filters) >> Delete', async ({ page }) => {
    await page.goto(dashboardURL);
    await page.locator('table tbody tr').first().click();
    await page.getByRole('button').nth(2).click();
    await page.getByRole('button', { name: 'Delete' }).click();
  });

});