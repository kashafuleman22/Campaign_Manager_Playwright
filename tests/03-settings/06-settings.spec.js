import { test, expect } from '@playwright/test';

const baseURL = 'https://campaign.demo-octavebytes.com/campaign-manager-pg/';
const dashboardURL = 'https://campaign.demo-octavebytes.com/campaign-manager-pg/main/settings';
const logoPath = 'C:/Users/BAHU Computers/Downloads/ob_logo.png';
const faviconPath = 'C:/Users/BAHU Computers/Downloads/favIcon.png';
const backgroundPath = 'C:/Users/BAHU Computers/Downloads/bg4.jpg';

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

async function clickSettingsSubmit(page) {
  const submit = page.getByRole('button', { name: /(?:Add|Update) settings/i });
  await expect(submit).toBeVisible();
  await submit.click();
  await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
}

async function waitForDomainControl(page) {
  const removeBtn = page.getByRole('button', { name: /Remove/i }).first();
  const domainDropdown = page.getByRole('combobox', { name: /Select Domain/i }).first();

  await Promise.race([
    removeBtn.waitFor({ state: 'visible', timeout: 15000 }),
    domainDropdown.waitFor({ state: 'visible', timeout: 15000 })
  ]).catch(() => {});
}

async function removeDomainIfPresent(page) {
  const removeBtn = page.getByRole('button', { name: /Remove/i }).first();
  const domainDropdown = page.getByRole('combobox', { name: /Select Domain/i }).first();

  await waitForDomainControl(page);

  if (await isVisible(removeBtn, 5000)) {
    await removeBtn.click().catch(() => removeBtn.click({ force: true }));
    await expect(removeBtn).toBeHidden({ timeout: 10000 }).catch(() => {});
    await expect(domainDropdown).toBeVisible({ timeout: 10000 });
  }
}

async function selectDomain(page, domainName) {
  const dropdown = page.getByRole('combobox', { name: /Select Domain/i }).first();
  const roleOption = page.getByRole('option', { name: domainName });
  const textOption = page.getByText(domainName, { exact: true });

  await waitForDomainControl(page);

  if (!(await isVisible(dropdown, 1000))) {
    if (await isVisible(textOption, 1000)) {
      return;
    }
    await removeDomainIfPresent(page);
  }

  await expect(dropdown).toBeVisible({ timeout: 15000 });
  await dropdown.click({ force: true });

  if (!(await isVisible(roleOption)) && !(await isVisible(textOption))) {
    await page.getByRole('button', { name: 'dropdown trigger' }).first().click();
  }
  if (!(await isVisible(roleOption)) && !(await isVisible(textOption))) {
    await dropdown.press('ArrowDown');
  }

  if (await isVisible(roleOption)) {
    await roleOption.click();
  } else {
    await textOption.click();
  }
}

async function uploadSettingsFile(page, index, filePath) {
  await page.getByRole('button', { name: 'Choose File' }).nth(index).setInputFiles(filePath);
}

test.describe('Campaign Feature >> Settings', () => {
  // test.describe.configure({ mode: 'serial' });

  test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);
    await login(page, 'hassan', 'hassan');
  });

  test('Settings Page >> Page load successfully', async ({ page }) => {
    await page.goto(dashboardURL);
    await expect(page).toHaveURL(dashboardURL);
  });

  test('Settings Reset >> Revoke Successfully', async ({ page }) => {
    await page.goto(dashboardURL);
    await page.getByRole('button', { name: /Revoke to default/i }).click();
  });

  test('Domain Management >> Create Domain and Add Successfully', async ({ page }) => {
    await page.goto(dashboardURL);
    await removeDomainIfPresent(page);
    await selectDomain(page, 'bgmc');
    await clickSettingsSubmit(page);
  });

  test('Domain Management >> Update Domain Successfully', async ({ page }) => {
    await page.goto(dashboardURL);
    await removeDomainIfPresent(page);
    await selectDomain(page, 'octavebytes');
    await clickSettingsSubmit(page);
  });

  test('Upload Channel Logo >> Valid Image Upload Successfully', async ({ page }) => {
    await page.goto(dashboardURL);
    await uploadSettingsFile(page, 0, logoPath);
    await clickSettingsSubmit(page);
  });

  test('Upload Channel Favicon >> Valid Image Upload Successfully', async ({ page }) => {
    await page.goto(dashboardURL);
    await uploadSettingsFile(page, 1, faviconPath);
    await clickSettingsSubmit(page);
  });

  test('Upload Background Image >> Valid Image Upload Successfully', async ({ page }) => {
    await page.goto(dashboardURL);
    await uploadSettingsFile(page, 2, backgroundPath);
    await clickSettingsSubmit(page);
  });

  test('Channel Branding >> Upload All Assets Successfully Without Domain', async ({ page }) => {
    await page.goto(dashboardURL);
    await uploadSettingsFile(page, 0, logoPath);
    await uploadSettingsFile(page, 1, faviconPath);
    await uploadSettingsFile(page, 2, backgroundPath);
    await removeDomainIfPresent(page);
    await clickSettingsSubmit(page);
  });

  test('Channel Branding >> Upload All Assets Successfully With Domain', async ({ page }) => {
    await page.goto(dashboardURL);
    await uploadSettingsFile(page, 0, logoPath);
    await uploadSettingsFile(page, 1, faviconPath);
    await uploadSettingsFile(page, 2, backgroundPath);
    await selectDomain(page, 'octavebytes');
    await clickSettingsSubmit(page);
  });

  test('Channel Logo >> Update Existing Logo Only', async ({ page }) => {
    await page.goto(dashboardURL);
    await uploadSettingsFile(page, 0, backgroundPath);
    await clickSettingsSubmit(page);
  });

  test('Channel Favicon >> Update Existing Favicon Only', async ({ page }) => {
    await page.goto(dashboardURL);
    await uploadSettingsFile(page, 1, faviconPath);
    await clickSettingsSubmit(page);
  });

  test('Background Image >> Update Existing Background Only', async ({ page }) => {
    await page.goto(dashboardURL);
    await uploadSettingsFile(page, 2, backgroundPath);
    await clickSettingsSubmit(page);
  });

  test('Channel Branding >> Update All Images Successfully', async ({ page }) => {
    await page.goto(dashboardURL);
    await uploadSettingsFile(page, 0, logoPath);
    await uploadSettingsFile(page, 1, faviconPath);
    await uploadSettingsFile(page, 2, backgroundPath);
    await clickSettingsSubmit(page);
  });

  test('Settings Action >> Cancel Discards Changes Successfully', async ({ page }) => {
    await page.goto(dashboardURL);
    await page.getByRole('button', { name: /Cancel/i }).click();
  });

  test('Settings Reset >> Revoke to Default Successfully', async ({ page }) => {
    await page.goto(dashboardURL);
    await page.getByRole('button', { name: /Revoke to default/i }).click();
  });

  test('Settings Submission >> Revoke Settings When No Image Uploaded', async ({ page }) => {
    await page.goto(dashboardURL);
    await clickSettingsSubmit(page);
  });

  test('Domain Management >> Final Domain Set to octavebytes', async ({ page }) => {
    await page.goto(dashboardURL);
    await removeDomainIfPresent(page); 
    await selectDomain(page, 'octavebytes');
    await clickSettingsSubmit(page);
  });
});
