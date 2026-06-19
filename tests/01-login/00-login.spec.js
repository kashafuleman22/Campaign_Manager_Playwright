import { test, expect } from '@playwright/test';

const baseURL = 'https://phone.cx.demo-octavebytes.com/campaign-manager/login';
// const dashboardURL = 'https://phone.cx.demo-octavebytes.com/campaign-manager/main';

// reusable login function
async function login(page, email, password) {
  await page.getByRole('textbox', { name: 'Email' }).fill(email);
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
}

test.describe('Campaign Feature >> Login Campaign', () => {

  // ---------------- LOGIN TEST CASES ----------------

  test('Login >> User can login with valid credentials', async ({ page }) => {
    await page.goto(baseURL);
    await login(page,"nahmad@octavebytes.com","octavebytes!123");
    // await expect(page).toHaveURL(dashboardURL);
  });

  test('Login >> User cannot login with invalid credentials', async ({ page }) => {
    await page.goto(baseURL);
    await login(page,"keman@octavebytes.com","kashaf");
    await expect(page.getByText(/Invalid email or password/i)).not.toBeVisible();
  });

  test('Login >> User cannot login with invalid email', async ({ page }) => {
    await page.goto(baseURL);
    await login(page,"keman@octavebytes.com","octavebytes!123");
    await expect(page.getByText(/Invalid email or password/i)).not.toBeVisible();
  });

  test('Login >> User cannot login with invalid password', async ({ page }) => {
    await page.goto(baseURL);
    await login(page,"nahmad@octavebytes.com","kashaf");
    await expect(page.getByText(/Invalid email or password/i)).not.toBeVisible();
  });

  test('Login >> fails when email is empty', async ({ page }) => {
    await page.goto(baseURL);
    await login(page,"","octavebytes!123");
    await expect(page.getByText(/Please enter both email and password/i)).toBeVisible();
  });

  test('Login >> fails when password is empty', async ({ page }) => {
    await page.goto(baseURL);
    await login(page,"nahmad@octavebytes.com","");
    await expect(page.getByText(/Please enter both email and password/i)).toBeVisible();
  });

  test('Login >> fails when both email and password are empty', async ({ page }) => {
    await page.goto(baseURL);
    await login(page,"","");
    await expect(page.getByText(/Please enter both email and password/i)).toBeVisible();
  });
});