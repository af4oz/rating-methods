import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("New Method", () => {
  test("can create/edit/fork a method", async ({ page }) => {
    // 1. Can create a method with name "Method"
    await page
      .getByRole("link", { name: "+ New rating method", exact: true })
      .click();
    await page.getByTestId("criterion-name").fill("Criterion 1");
    await page.getByRole("button", { name: "Save", exact: true }).click();
    await page
      .getByRole("dialog")
      .getByPlaceholder("Enter a name")
      .fill("Method1");
    await page
      .getByRole("dialog")
      .getByRole("button", { name: "Save", exact: true })
      .click();

    // 2. can edit a existing Method "Method1"
    await page.getByRole("link", { name: "Method1" }).click();
    await page.waitForTimeout(1000); // TODO why timeout needed
    await expect(page.getByRole("heading")).toContainText(
      "Rating Method Name: Method1"
    );
    await page.getByRole("button", { name: "Edit 📝" }).click();
    // Add a new criterion row
    await page.getByRole("button", { name: "➕" }).click();
    await page
      .getByRole("cell", { name: "Default" })
      .getByTestId("criterion-name")
      .fill("Criterion 2");
    await page
      .getByRole("row", { name: "Criterion 2" })
      .getByTestId("criterion-weight")
      .fill("1");
    await page.getByRole("button", { name: "Save edit", exact: true }).click();
    await expect(page.getByRole("main")).toContainText(
      "Error: All weights summed should be equal to 100"
    );
    // fix weight error by reducing previous criterion weight by 1
    await page
      .getByRole("row", { name: "Criterion 1" })
      .getByTestId("criterion-weight")
      .fill("99");
    await page.getByRole("button", { name: "Save edit", exact: true }).click();

    // 3. can fork a method
    await page.getByRole("link", { name: "Method1" }).click();
    await page.getByRole("button", { name: "Fork" }).click();
    await page.getByRole("button", { name: "➕" }).click();
    await page
      .getByRole("row", { name: "Default" })
      .getByTestId("criterion-name")
      .fill("Criterion 3");
    await page
      .getByRole("row", { name: "Criterion 3" })
      .getByTestId("criterion-weight")
      .fill("1");

    await page.getByRole("button", { name: "Save", exact: true }).click();
    await expect(page.getByRole("main")).toContainText(
      "Error: All weights summed should be equal to 100"
    );
    await page
      .getByRole("row", { name: "Criterion 1" })
      .getByTestId("criterion-weight")
      .fill("98");
    await page.getByRole("button", { name: "Save", exact: true }).click();
    await page.getByPlaceholder("Enter a name").fill("FokedMethod1");
    await page.getByRole("button", { name: "Save", exact: true }).click();

    await page.getByRole("link", { name: "FokedMethod1" }).click();
    await expect(page.getByRole("heading")).toContainText(
      "Rating Method Name: FokedMethod1"
    );
  });
});
