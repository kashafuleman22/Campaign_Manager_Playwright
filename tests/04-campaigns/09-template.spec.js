import { test, expect } from '@playwright/test';

const baseURL = 'https://ucm.demo-octavebytes.com/unified-campaign-manager/';
const dashboardURL = 'https://ucm.demo-octavebytes.com/unified-campaign-manager/main/sms-templates';
const whatsappTemplateName = 'personalized_template';
const whatsappTemplateNameUpdate = 'whatsapp_template_for_hubspot';

// reusable login function
async function login(page, username, password) {
  await page.getByRole('textbox', { name: 'username' }).fill(username);
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle' }),
    page.getByRole('button', { name: 'Login' }).click()
  ]);
}

async function isVisible(locator, timeout = 1000) {
  try {
    await expect(locator).toBeVisible({ timeout });
    return true;
  } catch {
    return false;
  }
}

async function selectWhatsAppTemplate(page, templateName) {
  const dropdown = page.getByRole('combobox').first();
  const option = page.getByText(templateName, { exact: true });

  await expect(dropdown).toBeVisible();
  await dropdown.click();

  if (!(await isVisible(option))) {
    await dropdown.locator('xpath=..').getByRole('button', { name: 'dropdown trigger' }).click();
  }
  if (!(await isVisible(option))) {
    await dropdown.press('ArrowDown');
  }

  await option.click();
}

async function getTemplateRow(page, templateName) {
  const searchBox = page.getByRole('textbox', { name: 'Search by Name' });
  await expect(searchBox).toBeVisible();
  await searchBox.fill(templateName);

  const row = page.locator('table tbody tr', { hasText: templateName }).first();
  await expect(row).toBeVisible({ timeout: 10000 });
  return row;
}

async function clickTemplateAction(page, templateName, actionIndex) {
  const row = await getTemplateRow(page, templateName);
  await row.locator('button').nth(actionIndex).click();
}

test.describe('Campaign Feature >> Campaigns', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);
    await login(page, "hassan", "hassan");
  });

    // ---------------- SMS-Template TEST CASES ----------------

  test('Templates >> Page Loads Successfully', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
  });
  
  test('Templates >> SMS-Template List display', async ({ page }) => {
    await page.goto(dashboardURL);
  });

  test('Templates >> Create Template with Delivery mode SMS', async ({ page }) => {
    await page.goto(dashboardURL);
    await page.getByRole('button', { name: 'Create Template' }).click();
    await page.getByRole('textbox', { name: 'My_Message_Template' }).click();
    await page.getByRole('textbox', { name: 'My_Message_Template' }).fill('Update_CNIC');
    await page.getByRole('textbox', { name: 'Description of template' }).click();
    await page.getByRole('textbox', { name: 'Description of template' }).fill('Personal Name');
    await page.getByRole('textbox', { name: 'Sms message body here.' }).click();
    await page.getByRole('textbox', { name: 'Sms message body here.' }).fill('Please update your CNIC details');
    await page.getByRole('button', { name: ' Submit' }).click();
  });

  test('Templates >> Duplicate Templates in SMS Mode', async ({ page }) => {
    await page.goto(dashboardURL);
    await page.getByRole('button', { name: 'Create Template' }).click();
    await page.getByRole('textbox', { name: 'My_Message_Template' }).click();
    await page.getByRole('textbox', { name: 'My_Message_Template' }).fill('Update_CNIC');
    await page.getByRole('textbox', { name: 'Description of template' }).click();
    await page.getByRole('textbox', { name: 'Description of template' }).fill('Personal Name');
    await page.getByRole('textbox', { name: 'Sms message body here.' }).click();
    await page.getByRole('textbox', { name: 'Sms message body here.' }).fill('Please update your CNIC details');
    await page.getByRole('button', { name: ' Submit' }).click();
  });
  
  test('Templates >> Create Template with Delivery mode Whatsapp new', async ({ page }) => {
    await page.goto(dashboardURL);
    await page.getByRole('button', { name: 'Create Template' }).click();
    await page.getByRole('radio', { name: /WhatsApp/i }).check();
    await selectWhatsAppTemplate(page, whatsappTemplateName);
    await page.getByRole('button', { name: /Submit/i }).click();
  });

  test('Templates >> Created Template Date format', async ({ page }) => {
    await page.goto(dashboardURL);
  });

  test('Templates >> Duplicate Templates in Whatsapps Mode', async ({ page }) => {
    await page.goto(dashboardURL);
    await page.getByRole('button', { name: 'Create Template' }).click();
    await page.getByRole('radio', { name: 'WhatsApp Engage your' }).check();
    await selectWhatsAppTemplate(page, whatsappTemplateName);
    await page.getByRole('button', { name: ' Submit' }).click();
    await page.getByRole('button', { name: ' Back' }).click();
  });

  test('Templates >> Search Templates Functionality', async ({ page }) => {
    await page.goto(dashboardURL);
    await page.getByRole('textbox', { name: 'Search by Name' }).click();
    await page.getByRole('textbox', { name: 'Search by Name' }).fill('Update_CNIC');
  });

  test('Templates >> Pagination', async ({ page }) => {
    await page.goto(dashboardURL);
    await page.getByRole('button', { name: 'dropdown trigger' }).click();
    await page.getByRole('option', { name: '5' }).click();
  });

  test('Templates >> Sorting Template Name', async ({ page }) => {
    await page.goto(dashboardURL);
    await page.getByRole('columnheader', { name: 'Name' }).click();
    await page.getByRole('columnheader', { name: 'Name' }).click();
  });

  test('Templates >> Update Templates in SMS Mode', async ({ page }) => {
    await page.goto(dashboardURL);
    await clickTemplateAction(page, 'Update_CNIC', 0);
    await page.getByRole('textbox', { name: 'My_Message_Template' }).click();
    await page.getByRole('textbox', { name: 'My_Message_Template' }).fill('UpdateDOB');
    await page.getByRole('button', { name: ' Update' }).click();
    
  });

  test('Templetes >> Update Templates in Whatsapps Mode', async ({ page}) => {
    await page.goto(dashboardURL);
    await clickTemplateAction(page, whatsappTemplateName, 0);
    await selectWhatsAppTemplate(page, whatsappTemplateNameUpdate);
    await page.getByRole('button', { name: /Update/i }).click();

    // await page.getByRole('button', { name: ' Update' }).click();
  });

  test('Templates >> Delete Templates in SMS Mode', async ({ page }) => {
    await page.goto(dashboardURL);
    const recordName = 'UpdateDOB'; // jis record ko delete karna hai
    // const row = page.locator('table tbody tr', { hasText: recordName });
    // await row.locator('.delete-btn').click();
    
    await clickTemplateAction(page, recordName, 1);

    await page.getByRole('button', { name: 'Delete' }).click();
    await expect(page.locator('text=Template "UpdateDOB" deleted successfully')).toBeVisible();
  });

  test('Templates >> Delete Templates in Whatsapps Mode', async ({ page }) => {
    await page.goto(dashboardURL);
    const recordName = whatsappTemplateNameUpdate; // jis record ko delete karna hai
    // const row = page.locator('table tbody tr', { hasText: recordName });
    // await row.locator('.delete-btn').click();
    
    await clickTemplateAction(page, recordName, 1);

    await page.getByRole('button', { name: 'Delete' }).click();
    await expect(page.locator(`text=Template "${recordName}" deleted successfully`)).toBeVisible();
  });

  // test('Templates >> Create Template with SMS', async ({ page }) => {
  //   await page.goto(dashboardURL);
  //   await page.getByRole('button', { name: 'Create Template' }).click();
  //   await page.getByRole('textbox', { name: 'My_Message_Template' }).click();
  //   await page.getByRole('textbox', { name: 'My_Message_Template' }).fill('Update_CNIC');
  //   await page.getByRole('textbox', { name: 'Description of template' }).click();
  //   await page.getByRole('textbox', { name: 'Description of template' }).fill('Personal Name');
  //   await page.getByRole('textbox', { name: 'Sms message body here.' }).click();
  //   await page.getByRole('textbox', { name: 'Sms message body here.' }).fill('Please update your CNIC details');
  //   await page.getByRole('button', { name: ' Submit' }).click();
  // });
  
  // test('Templates >> Create Template with Whatsapp', async ({ page }) => {
  //   await page.goto(dashboardURL);
  //   await page.getByRole('button', { name: 'Create Template' }).click();
  //   await page.getByRole('radio', { name: /WhatsApp/i }).check();
  //   await selectWhatsAppTemplate(page, whatsappTemplateName);
  //   await page.getByRole('button', { name: /Submit/i }).click();
  // });
});
