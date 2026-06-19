import { test, expect } from '@playwright/test';

  const baseURL = 'https://phone.cx.demo-octavebytes.com/campaign-manager/';
  const dashboardURL = 'https://phone.cx.demo-octavebytes.com/campaign-manager/main/listcontacts';

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
  // ---------------- UPLOAD CONTACT TEST CASES ----------------

  test('Upload Contacts >> Page Load Successfully', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    // await page.getByRole('link', { name: ' Upload Contacts' }).click();
  });

  test('Upload Contacts >> Download CSV template', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();
    const download = await downloadPromise;
  });

  test('Upload Contacts >> Upload CSV file', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    await page.getByRole('button', { name: 'Upload' }).click();
    await page.getByRole('button', { name: ' Choose Files' }).click();
    await page.locator('input[type="file"]').setInputFiles('C:/Users/BAHU Computers/Downloads/Finalfile.csv');
    await page.getByRole('button', { name: ' Upload Files' }).click();
  });

  test('Upload Contacts >> Upload Empty CSV file', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    await page.getByRole('button', { name: 'Upload' }).click();
    await page.getByRole('button', { name: ' Choose Files' }).click();
    await page.locator('input[type="file"]').setInputFiles('C:/Users/BAHU Computers/Downloads/Empty file.csv');
    await page.getByRole('button', { name: ' Upload Files' }).click();
  });

  test('Upload Contacts >> Duplicate uploaded file', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    // await page.getByRole('link', { name: 'Upload Contacts' }).click();
    await page.getByRole('button', { name: 'Upload' }).click();
    await page.getByRole('button', { name: ' Choose Files' }).click();
    await page.locator('input[type="file"]').setInputFiles('C:/Users/BAHU Computers/Downloads/Finalfile.csv');
    await page.getByRole('button', { name: ' Upload Files' }).click();
  });

  test('Upload Contacts >> Search by Name', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    // await page.getByRole('link', { name: 'Upload Contacts' }).click();
    await page.getByRole('textbox', { name: 'Search by Name' }).click();
    await page.getByRole('textbox', { name: 'Search by Name' }).fill('finalfile');
    // await page.getByRole('textbox', { name: 'Search by Name' }).fill('Finalfile');
  });

  test('Upload Contacts >> Sorting files', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    await page.getByRole('columnheader', { name: 'File Name' }).click();
    await page.getByRole('columnheader', { name: 'File Name' }).click();
  });

  test('Upload Contacts >> Pagination', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    // await page.getByRole('link', { name: 'Upload Contacts' }).click();
    await page.getByRole('button', { name: 'dropdown trigger' }).click();
    await page.getByRole('option', { name: '5' }).click();
  });

  test('Upload Contacts >> Download Uploaded file', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    const downloadBtn = page.getByRole('button', { name: 'Download' }); // use exact name if possible
    const [downloadFile] = await Promise.all([
    page.waitForEvent('download'),
    downloadBtn.click(), // now button is enabled
    ]);
    // Optional: save download to file
    const path = await downloadFile.path();
    console.log('Downloaded file saved at:', path);
  });

  test('Upload Contacts >> Delete uploaded file without Delete Associated Customers', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    // await page.getByRole('link', { name: 'Upload Contacts' }).click();
    await page.locator('table tbody tr').first().click();
    await page.getByRole('button').nth(3).click();
    await page.getByRole('button', { name: 'Delete' }).click();
  });

  test('Upload Contacts >> Delete uploaded file with Delete Associated Customers', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
    await page.getByText('Customers').first().click();
    // await page.getByRole('link', { name: 'Upload Contacts' }).click();
    await page.locator('table tbody tr').first().click();
    await page.getByRole('button').nth(3).click();
    await page.getByRole('checkbox', { name: 'Delete associated customers.' }).check();
    await page.getByRole('button', { name: 'Delete' }).click();
  });

});