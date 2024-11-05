import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("New Rating", () => {
  test("can create/edit/fork a rating", async ({ page }) => {
    // 1. Can create a rating with name "Rating1"
    await page.getByRole("link", { name: "+ New rating", exact: true }).click();
    await page.getByTestId("criterion-name").fill("Criterion 1");
    await page.getByRole("button", { name: "Calculate" }).click();
    await expect(page.getByTestId("final-rating")).toContainText(
      "Final Rating: 5"
    );
    await page.getByRole("button", { name: "Save" }).click();
    await page
      .getByRole("dialog")
      .getByPlaceholder("Enter a name")
      .fill("Rating1");
    await page
      .getByRole("dialog")
      .getByRole("button", { name: "Save" })
      .click();

    // 2. can edit a existing rating "Rating1"
    await page.getByRole("link", { name: "Rating1" }).click();
    await page.waitForTimeout(1000); // TODO why timeout needed
    await expect(page.getByRole("heading")).toContainText(
      "Rating Name: Rating1"
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
      .getByTestId("criterion-rating")
      .fill("7");
    await page
      .getByRole("row", { name: "Criterion 2" })
      .getByTestId("criterion-weight")
      .fill("1");
    await page.getByRole("button", { name: "Calculate" }).click();
    await expect(page.getByRole("main")).toContainText(
      "Error: All weights summed should be equal to 100"
    );
    // fix weight error by reducing previous criterion weight by 1
    await page
      .getByRole("row", { name: "Criterion 1" })
      .getByTestId("criterion-weight")
      .fill("99");
    await page.getByRole("button", { name: "Calculate" }).click();
    // TODO check final rating
    await expect(page.getByTestId("final-rating")).toContainText(
      "Final Rating: 5.02"
    );
    await page.getByRole("button", { name: "Save edit", exact: true }).click();

    // 3. can fork a rating
    await page.getByRole("link", { name: "Rating1" }).click();
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

    await page.getByRole("button", { name: "Calculate" }).click();
    await expect(page.getByRole("main")).toContainText(
      "Error: All weights summed should be equal to 100"
    );
    await page
      .getByRole("row", { name: "Criterion 1" })
      .getByTestId("criterion-weight")
      .fill("98");
    // TODO check final rating
    await page.getByRole("button", { name: "Calculate" }).click();
    await expect(page.getByTestId("final-rating")).toContainText(
      "Final Rating: 5.02"
    );
    await page.getByRole("button", { name: "Save" }).click();
    await page.getByPlaceholder("Enter a name").fill("FokedRating1");
    await page.getByRole("button", { name: "Save" }).click();

    await page.getByRole("link", { name: "FokedRating1" }).click();
    await expect(page.getByRole("heading")).toContainText(
      "Rating Name: FokedRating1"
    );
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
