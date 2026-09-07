import { expect, test } from "@playwright/test";

test("home page renders its heading", async ({ page }) => {
  await page.goto("/en");
  await expect(
    page.getByRole("heading", { name: "Product Design Craft" }),
  ).toBeVisible();
});

test("a locale-less path redirects to a locale", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/(en|nl)$/);
  await expect(page.locator("html")).toHaveAttribute("lang", /en|nl/);
});
