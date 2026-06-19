import { test, expect } from '@playwright/test';

const baseURL = 'https://phone.cx.demo-octavebytes.com/campaign-manager/';
const dashboardURL = 'https://phone.cx.demo-octavebytes.com/campaign-manager/main/campaign';

// reusable login function
async function login(page, email, password) {
  await page.getByRole('textbox', { name: 'email' }).fill(email);
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
    // await page.waitForURL(/dashboard|campaign|main/);
    // await page.goto(dashboardURL);
  });

    // ---------------- CAMPAIGNS TEST CASES ----------------

  test('Campaigns >> Page Loads Successfully', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
  });
  
  test('Campaigns >> Campaigns List', async ({ page }) => {
    await page.goto(dashboardURL);
  });

  test('Campaigns >> Create Campaigns with Retry Attempts', async ({ page }) => {
    await page.goto(dashboardURL);
    // await page.goto('https://phone.cx.demo-octavebytes.com/campaign-manager/main/campaign');
    await page.getByRole('button', { name: 'Create Campaign' }).click();
    await page.getByRole('textbox', { name: 'Enter name' }).click();
    await page.getByRole('textbox', { name: 'Enter name' }).fill('kashaf');
    await page.getByRole('combobox', { name: 'Select Type' }).click();
    await page.getByRole('option', { name: 'IVR' }).click();
    await page.getByRole('combobox', { name: 'Select Channel' }).click();
    await page.getByText('Voice').click();
    await page.getByRole('combobox', { name: 'Select Segment' }).click();
    await page.getByLabel('Amna').getByText('Amna').click();
    await page.getByRole('combobox', { name: 'Select Start Date' }).click();
    await page.locator('.p-ripple.p-button.p-button-icon-only.p-button-rounded.p-button-secondary.p-button-text.p-component.p-datepicker-increment-button').first().click();
    await page.locator('.p-datepicker-minute-picker > p-button > .p-ripple').first().click();
    await page.getByRole('combobox', { name: 'Select End Date' }).click();
    await page.locator('.p-ripple.p-button.p-button-icon-only.p-button-rounded.p-button-secondary.p-button-text.p-component.p-datepicker-increment-button').first().click();
    await page.locator('.p-ripple.p-button.p-button-icon-only.p-button-rounded.p-button-secondary.p-button-text.p-component.p-datepicker-increment-button').first().click();
    await page.getByRole('combobox', { name: 'Select IVR DN' }).click();
    await page.getByRole('option', { name: '111' }).click();
    await page.getByPlaceholder('Enter priority (1-10)').click();
    await page.getByPlaceholder('Enter priority (1-10)').fill('1');
    await page.getByRole('button', { name: 'Next ' }).click();
    await page.getByRole('combobox', { name: 'Select time' }).first().click();
    await page.locator('.p-datepicker-minute-picker > p-button:nth-child(3) > .p-ripple').click();
    await page.getByRole('combobox', { name: 'Select time' }).nth(1).click();
    await page.locator('.p-ripple.p-button.p-button-icon-only.p-button-rounded.p-button-secondary.p-button-text.p-component.p-datepicker-increment-button').first().click();
    await page.getByRole('checkbox', { name: 'Tue' }).check();
    await page.getByRole('checkbox', { name: 'Wed' }).check();
    await page.getByRole('button', { name: 'Next ' }).click();
    await page.getByRole('checkbox', { name: 'NO ANSWER   -   The call was' }).check();
    await page.getByPlaceholder('Duration').click();
    await page.getByPlaceholder('Duration').fill('1');
    await page.getByRole('combobox', { name: 'Unit' }).click();
    await page.getByText('minutes').click();
    await page.getByPlaceholder('Retry Attempts').click();
    await page.getByPlaceholder('Retry Attempts').fill('2');
    await page.getByRole('button', { name: ' Create Campaign' }).click();
  });

  test('Campaigns >> Create Campaign without Reattempt', async ({ page }) => {
    await page.goto(dashboardURL);
    await page.getByRole('button', { name: 'Create Campaign' }).click();
    await page.getByRole('textbox', { name: 'Enter name' }).click();
    await page.getByRole('textbox', { name: 'Enter name' }).fill('Eman');
    await page.getByRole('combobox', { name: 'Select Type' }).click();
    await page.getByRole('option', { name: 'IVR' }).click();
    await page.getByRole('combobox', { name: 'Select Channel' }).click();
    await page.getByRole('option', { name: 'Voice' }).click();
    await page.getByRole('combobox', { name: 'Select Segment' }).click();
    await page.getByLabel('Amna').getByText('Amna').click();
    await page.getByRole('combobox', { name: 'Select Start Date' }).click();
    await page.locator('.p-datepicker-minute-picker > p-button > .p-ripple').first().click();
    await page.getByRole('checkbox', { name: 'No End date' }).check();
    await page.getByRole('combobox', { name: 'Select IVR DN' }).click();
    await page.getByRole('option', { name: '111' }).click();
    await page.getByPlaceholder('Enter priority (1-10)').click();
    await page.getByPlaceholder('Enter priority (1-10)').fill('1');
    await page.getByRole('button', { name: 'Next ' }).click();
    await page.getByRole('combobox', { name: 'Select time' }).first().click();
    await page.locator('.p-datepicker-minute-picker > p-button > .p-ripple').first().click();
    await page.getByRole('combobox', { name: 'Select time' }).nth(1).click();
    await page.locator('.p-ripple.p-button.p-button-icon-only.p-button-rounded.p-button-secondary.p-button-text.p-component.p-datepicker-increment-button').first().click();
    await page.locator('.p-datepicker-minute-picker > p-button > .p-ripple').first().click();
    await page.getByRole('checkbox', { name: 'Tue' }).check();
    await page.getByRole('checkbox', { name: 'Wed' }).check();
    await page.getByRole('button', { name: 'Next ' }).click();
    await page.getByRole('button', { name: ' Create Campaign' }).click();
  });

  test('Campaigns >> Duplicate Campaign', async ({ page }) => {
    await page.goto(dashboardURL);
    // await page.goto('https://phone.cx.demo-octavebytes.com/campaign-manager/main/campaign');
    await page.getByRole('button', { name: 'Create Campaign' }).click();
    await page.getByRole('textbox', { name: 'Enter name' }).click();
    await page.getByRole('textbox', { name: 'Enter name' }).fill('Kashaf');
    await page.getByRole('combobox', { name: 'Select Type' }).click();
    await page.getByRole('option', { name: 'IVR' }).click();
    await page.getByRole('combobox', { name: 'Select Channel' }).click();
    await page.getByRole('option', { name: 'Voice' }).click();
    await page.getByRole('combobox', { name: 'Select Segment' }).click();
    await page.getByLabel('Amna').getByText('Amna').click();
    await page.getByRole('combobox', { name: 'Select Start Date' }).click();
    await page.locator('.p-datepicker-minute-picker > p-button > .p-ripple').first().click();
    await page.getByRole('checkbox', { name: 'No End date' }).check();
    await page.getByRole('combobox', { name: 'Select IVR DN' }).click();
    await page.getByRole('option', { name: '111' }).click();
    await page.getByPlaceholder('Enter priority (1-10)').click();
    await page.getByPlaceholder('Enter priority (1-10)').fill('1');
    await page.getByRole('button', { name: 'Next ' }).click();
    await page.getByRole('combobox', { name: 'Select time' }).first().click();
    await page.locator('.p-datepicker-minute-picker > p-button > .p-ripple').first().click();
    await page.getByRole('combobox', { name: 'Select time' }).nth(1).click();
    await page.locator('.p-ripple.p-button.p-button-icon-only.p-button-rounded.p-button-secondary.p-button-text.p-component.p-datepicker-increment-button').first().click();
    await page.locator('.p-datepicker-minute-picker > p-button > .p-ripple').first().click();
    await page.getByRole('checkbox', { name: 'Tue' }).check();
    await page.getByRole('checkbox', { name: 'Wed' }).check();
    await page.getByRole('button', { name: 'Next ' }).click();
    await page.getByRole('button', { name: ' Create Campaign' }).click();
  });  

  test('Campaigns >> Update Campaign', async ({ page }) => {
    await page.goto(dashboardURL);
    await page.getByRole('navigation').locator('div').filter({ hasText: /^Campaigns$/ }).click();
    await page.getByRole('button').nth(1).click();
    await page.getByRole('textbox', { name: 'Enter name' }).click();
    await page.getByRole('textbox', { name: 'Enter name' }).fill('Eman');
    await page.getByRole('checkbox', { name: 'No End date' }).check();
    await page.getByRole('button', { name: 'Next ' }).click();
    await page.getByRole('button', { name: 'Next ' }).click();
    await page.getByRole('button', { name: ' Update Campaign' }).click();


    // await page.waitForSelector('table tbody tr'); // table load hone ka wait
    // const firstRow = page.locator('table tbody tr').first(); // first row pick
    // await firstRow.locator('.edit-btn').click(); // edit button click from row
    // await page.getByRole('textbox', { name: 'Enter name' }).click(); // campaign name update
    // await page.getByRole('textbox', { name: 'Enter name' }).fill('kashaf update');
    // const clearNext = page.getByText('Clear Next'); // clear next if visible
    // if (await clearNext.isVisible()) {
    // await clearNext.click();
    // }
    // await page.getByRole('button', { name: 'Next ' }).click(); // click next button
    // await page.getByRole('combobox', { name: 'Select time' }).first().click(); // select time before
    // // await page.locator('.p-datepicker-minute-picker > p-button > .p-ripple').first().dblclick();
    
    // await page.getByPlaceholder('Duration').fill('1');
    // // open dropdown properly
    // await page.getByRole('combobox').nth(0).click();
    // // wait and select
    // await page.locator('.p-select-panel').getByRole('option', { name: 'minutes' }).click();

    // await page.getByRole('combobox', { name: 'Select time' }).nth(1).click(); // select time after
    // await page.locator('.p-datepicker-minute-picker > p-button > .p-ripple').first().click();
    // await page.getByRole('checkbox', { name: 'Thu' }).check(); // Select day
    // await page.getByRole('button', { name: 'Next ' }).click(); // click next button
    // await page.getByRole('checkbox', { name: 'NO ANSWER   -   The call was' }).check(); // if no answer click checkbox
    // await page.getByPlaceholder('Duration').click(); // click and set duration
    // await page.getByPlaceholder('Duration').fill('1');
    // await page.locator('span[aria-label="minutes"]').click(); // click and select option minutes/hours
    // await page.getByRole('option', { name: 'minutes' }).click();
    // await page.getByPlaceholder('Retry Attempts').click(); // set retry attempts number
    // await page.getByPlaceholder('Retry Attempts').fill('2');
    // await page.getByRole('button', { name: ' Update Campaign' }).click(); // update campaign
  });

  test('Campaigns >> Pagination', async ({ page }) => {
    await page.getByRole('button', { name: 'dropdown trigger' }).click();
    await page.getByRole('option', { name: '25' }).click();
  });

  test('Campaigns >> Search Campaigns', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Search campaigns...' }).click();
    await page.getByRole('textbox', { name: 'Search campaigns...' }).fill('Kashaf');
  });

  test('Campaigns >> Delete Campaigns', async ({ page }) => {
    const recordName = 'Eman'; // jis record ko delete karna hai
    // const row = page.locator('table tbody tr', { hasText: recordName });
    // await row.locator('.delete-btn').click();
    
    await page.waitForSelector('table tbody tr');
    const row = page.locator('table tbody tr', { hasText: 'Eman' });
    // ensure row exists
    await expect(row).toBeVisible({ timeout: 10000 });
    await row.locator('.delete-btn').click();

    await page.getByRole('button', { name: 'Delete' }).click();
    await expect(page.locator('text=Campaign deleted successfully')).toBeVisible();
  });

  test('Campaigns >> Campaign Preview', async ({ page }) => {
    await page.getByRole('button', { name: ' Preview' }).nth(1).click();
    //   const recordName = 'K1';
    //   await page.waitForSelector('table tbody tr');
    //   // const row = page.locator('table tbody tr', { hasText: recordName });
    //   // await row.getByRole('button', { name: 'Preview' }).click();

    //   const row = page.locator('table tbody tr', { hasText: 'K1' });
    //   await expect(row).toBeVisible();
    //   await row.getByRole('button', { name: /Preview/i }).click();

    //   await page.locator('text=Start').scrollIntoViewIfNeeded();
    //   // await page.locator('button:has-text("Start")').click();
    //   await page.getByTitle('Close').click();
  });

});