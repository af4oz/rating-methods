import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("New Rating", () => {
  test("can create a new rating", async ({ page }) => {
    // 1. can create a empty rating
    await page.getByRole("link", { name: "+ New rating", exact: true }).click();
    await page.getByRole("button", { name: "Calculate" }).click();
    await page.getByRole("button", { name: "Save" }).click();

    // 2. can edit a rating
    await page.getByRole("link", { name: "Untitled" }).click();
    await expect(page.getByRole("heading")).toContainText(
      "Rating Name: Untitled"
    );
    await page.getByRole("button", { name: "Edit 📝" }).click();
    await page.getByRole("button", { name: "➕" }).click();
    await page
      .getByRole("row", { name: "Default 0 5 ❌" })
      .getByRole("textbox")
      .fill("Default1");
    await page
      .getByRole("row", { name: "Default1 0 5 ❌" })
      .getByPlaceholder("0")
      .fill("1");
    await page
      .getByRole("cell", { name: "100" })
      .getByPlaceholder("0")
      .fill("98");
    await page.getByRole("button", { name: "Calculate" }).click();
    await expect(page.getByRole("main")).toContainText(
      "Error: All weights summed should be equal to 100"
    );
    await page
      .getByRole("cell", { name: "98" })
      .getByPlaceholder("0")
      .fill("99");
    await page.getByRole("button", { name: "Calculate" }).click();
    // TODO check final rating
    await page.getByRole("button", { name: "Save" }).click();

    // 3. can fork a rating
    await page.getByRole("link", { name: "Untitled" }).click();
    await page.getByRole("button", { name: "Fork" }).click();
    await page.getByRole("button", { name: "➕" }).click();
    await page
      .getByRole("row", { name: "Default 0 5 ❌" })
      .getByRole("textbox")
      .fill("Default123");
    await page
      .getByRole("cell", { name: "Default123" })
      .getByRole("textbox")
      .fill("New criterion");
    await page.getByRole("cell", { name: "0" }).getByPlaceholder("0").fill("1");
    await page
      .getByRole("row", { name: "Default1 1 5 ❌" })
      .getByRole("button")
      .click();
    await page
      .getByRole("row", { name: "New criterion 1 5 ❌" })
      .getByRole("slider")
      .fill("7");
    await page.getByRole("button", { name: "Calculate" }).click();
    // TODO check final rating
    await page.getByRole("button", { name: "Save" }).click();
  });
});

// const RATING_ITEMS = [
//   {
//     id: 0,
//     name: "Rating 0",
//     criteria: [
//       {
//         id: "1",
//         name: "Criterion 1",
//         value: 5,
//         weight: 5,
//       },
//       {
//         id: "2",
//         name: "Criterion 2",
//         value: 5,
//         weight: 5,
//       },
//     ],
//   },
//   {
//     id: 1,
//     name: "Rating 1",
//     criteria: [
//       {
//         id: "1",
//         name: "Criterion 1",
//         value: 5,
//         weight: 5,
//       },
//       {
//         id: "2",
//         name: "Criterion 2",
//         value: 5,
//         weight: 5,
//       },
//     ],
//   },
// ] as T_Rating[];

// async function createDefaultRatings(page: Page) {
//     await page.getByRole("link", { name: "+ New rating", exact: true }).click();
//     await page.getByRole("button", { name: "Calculate" }).click();
//     await page.getByRole("button", { name: "Save" }).click();
// }
