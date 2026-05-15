import { test, expect } from '@playwright/test';

const baseURL = 'https://ucm.demo-octavebytes.com/unified-campaign-manager/';
// const dashboardURL = 'https://ucm.demo-octavebytes.com/unified-campaign-manager/main';

// reusable login function
async function login(page, username, password) {
  await page.getByRole('textbox', { name: 'username' }).fill(username);
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
}

test.describe('Campaign Feature >> Login Campaign', () => {

  // ---------------- LOGIN TEST CASES ----------------

  test('Login >> User can login with valid credentials', async ({ page }) => {
    await page.goto(baseURL);
    await login(page,"hassan","hassan");
    // await expect(page).toHaveURL(dashboardURL);
  });

  test('Login >> User cannot login with invalid credentials', async ({ page }) => {
    await page.goto(baseURL);
    await login(page,"kashaf","kashaf");
    await expect(page.getByText(/Invalid username or password/i)).not.toBeVisible();
  });

  test('Login >> User cannot login with invalid username', async ({ page }) => {
    await page.goto(baseURL);
    await login(page,"kashaf","hassan");
    await expect(page.getByText(/Invalid username or password/i)).not.toBeVisible();
  });

  test('Login >> User cannot login with invalid password', async ({ page }) => {
    await page.goto(baseURL);
    await login(page,"hassan","kashaf");
    await expect(page.getByText(/Invalid username or password/i)).not.toBeVisible();
  });

  test('Login >> fails when username is empty', async ({ page }) => {
    await page.goto(baseURL);
    await login(page,"","hassan");
    await expect(page.getByText(/Please enter both username and password/i)).toBeVisible();
  });

  test('Login >> fails when password is empty', async ({ page }) => {
    await page.goto(baseURL);
    await login(page,"hassan","");
    await expect(page.getByText(/Please enter both username and password/i)).toBeVisible();
  });

  test('Login >> fails when both username and password are empty', async ({ page }) => {
    await page.goto(baseURL);
    await login(page,"","");
    await expect(page.getByText(/Please enter both username and password/i)).toBeVisible();
  });
});