import { test, expect } from '@playwright/test';

const baseURL = 'https://campaign.demo-octavebytes.com/campaign-manager-pg/';
// const dashboardURL = 'https://campaign.demo-octavebytes.com/campaign-manager-pg/main';

// reusable login function
async function login(page, username, password) {
  await page.getByRole('textbox', { name: 'username' }).fill(username);
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
}

test.describe('Campaign Feature >> Customers', () => {
  // ---------------- UPLOAD CONTACT TEST CASES ----------------

  test('Upload Contacts >> Page Load Successfully', async ({ page }) => {
    await page.goto(baseURL);
    await login(page,"hassan","hassan");

    await page.getByText('Customers').first().click();
    await page.getByRole('link', { name: 'Customers' }).click();
    await page.getByRole('link', { name: 'Upload Contacts' }).click();

    // await expect(page.getByText(/Upload Contacts/i)).toBeVisible();
  });

  test('Upload Contacts >> Download CSV template', async ({ page }) => {
    await page.goto(baseURL);
    await login(page,"hassan","hassan");

    await page.getByText('Customers').first().click();
    await page.getByRole('link', { name: 'Upload Contacts' }).click();

    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();
    await downloadPromise;
  });

  test('Upload Contacts >> Upload Valid CSV file', async ({ page }) => {
    await page.goto(baseURL);
    await login(page,"hassan","hassan");

    await page.getByText('Customers').first().click();
    await page.getByRole('link', { name: ' Customers' }).click();
    await page.getByRole('link', { name: ' Upload Contacts' }).click();

    await page.getByRole('button', { name: 'Upload' }).click();
    await page.getByRole('button', { name: ' Choose Files' }).click();
    await page.locator('input[type="file"]').setInputFiles('C:/Users/BAHU Computers/Downloads/KashafulEman.csv');
    // await page.getByRole('button', { name: ' Choose Files' }).setInputFiles('C:/Users/BAHU Computers/Downloads/Kashaf_PW.csv');
    await page.getByRole('button', { name: ' Upload Files' }).click();

    // await page.locator('div').filter({ hasText: 'Upload Contacts (Upload Your' }).nth(3).click();
    // await page.getByRole('button', { name: 'Upload' }).click();

    //await page.locator('input[type="file"]').setInputFiles('C:/Users/BAHU Computers/Downloads/Kashaf_PW');
    // await page.getByRole('button', { name: 'Upload Files' }).click();

  });

  test('Upload Contacts >> Upload Empty CSV file', async ({ page }) => {
      await page.goto(baseURL);
      await login(page,"hassan","hassan");

      await page.getByText('Customers').first().click();
      await page.getByRole('link', { name: ' Customers' }).click();
      await page.getByRole('link', { name: ' Upload Contacts' }).click();

      await page.getByRole('button', { name: 'Upload' }).click();
      await page.getByRole('button', { name: ' Choose Files' }).click();
      await page.locator('input[type="file"]').setInputFiles('C:/Users/BAHU Computers/Downloads/Empty file.csv');
      // await page.getByRole('button', { name: ' Choose Files' }).setInputFiles('C:/Users/BAHU Computers/Downloads/Empty file.csv');
      await page.getByRole('button', { name: ' Upload Files' }).click();

      // await page.locator('div').filter({ hasText: 'Upload Contacts (Upload Your' }).nth(3).click();
      // await page.getByRole('button', { name: 'Upload' }).click();

      //await page.locator('input[type="file"]').setInputFiles('C:/Users/BAHU Computers/Downloads/Kashaf_PW');
      // await page.getByRole('button', { name: 'Upload Files' }).click();

  });

  test('Upload Contacts >> Duplicate uploaded file', async ({ page }) => {
    await page.goto(baseURL);
    await login(page,"hassan","hassan");
    await page.getByText('Customers').first().click();
    await page.getByRole('link', { name: 'Upload Contacts' }).click();
    await page.getByRole('button', { name: 'Upload' }).click();
    await page.getByRole('button', { name: ' Choose Files' }).click();
    await page.locator('input[type="file"]').setInputFiles('C:/Users/BAHU Computers/Downloads/schema_keys (17).csv');
    // await page.getByRole('button', { name: ' Choose Files' }).setInputFiles('C:/Users/BAHU Computers/Documents/CSV_Upload/Kashaf_PW.csv');
    await page.getByRole('button', { name: ' Upload Files' }).click();
  });

  test('Upload Contacts >> Search by Name', async ({ page }) => {
    await page.goto(baseURL);
    await login(page,"hassan","hassan");

    await page.getByText('Customers').first().click();
    await page.getByRole('link', { name: 'Upload Contacts' }).click();

    await page.getByRole('textbox', { name: 'Search by Name' }).fill('KashafulEman');
  });


  test('Upload Contacts >> Sorting functionality', async ({ page }) => {
    await page.goto(baseURL);
    await login(page,"hassan","hassan");

    await page.getByText('Customers').first().click();
    await page.getByRole('link', { name: 'Upload Contacts' }).click();

    await page.getByRole('columnheader', { name: 'File Name' }).click();
  });


  test('Upload Contacts >> Pagination', async ({ page }) => {
    await page.goto(baseURL);
    await login(page,"hassan","hassan");

    await page.getByText('Customers').first().click();
    await page.getByRole('link', { name: 'Upload Contacts' }).click();

    await page.getByRole('button', { name: 'dropdown trigger' }).click();
    await page.getByRole('option', { name: '5' }).click();
  });


  test('Upload Contacts >> Download Uploaded file', async ({ page }) => {
    await page.goto(baseURL);
    await login(page,"hassan","hassan");

    await page.getByText('Customers').first().click();
    await page.getByRole('link', { name: 'Upload Contacts' }).click();
    
    // Wait for the download button to be enabled
    const downloadBtn = page.getByRole('button', { name: 'Download' }); // use exact name if possible
    // Start download and wait for event together
    const [downloadFile] = await Promise.all([
    page.waitForEvent('download'),
    downloadBtn.click(), // now button is enabled
    ]);
    // Optional: save download to file
    const path = await downloadFile.path();
    console.log('Downloaded file saved at:', path);

    // await page.getByText('Customers').first().click();
    // await page.getByRole('link', { name: 'Upload Contacts' }).click();

    // const downloadFile = page.waitForEvent('download');
    // await page.getByRole('button').nth(2).click();
    // await downloadFile;
  });

  test('Upload Contacts >> Delete uploaded file without Delete Associated Customers', async ({ page }) => {
    await page.goto(baseURL);
    await login(page,"hassan","hassan");
    await page.getByText('Customers').first().click();
    await page.getByRole('link', { name: 'Upload Contacts' }).click();
    await page.locator('table tbody tr').first().click();
    await page.getByRole('button').nth(3).click();
    await page.getByRole('button', { name: 'Delete' }).click();
  });

  test('Upload Contacts >> Delete uploaded file with Delete Associated Customers', async ({ page }) => {
    await page.goto(baseURL);
    await login(page,"hassan","hassan");
    await page.getByText('Customers').first().click();
    await page.getByRole('link', { name: 'Upload Contacts' }).click();
    await page.locator('table tbody tr').first().click();
    await page.getByRole('button').nth(3).click();
    await page.getByRole('checkbox', { name: 'Delete associated customers.' }).check();
    await page.getByRole('button', { name: 'Delete' }).click();
  });

});