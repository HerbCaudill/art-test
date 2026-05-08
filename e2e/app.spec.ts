import { expect, test, type Page } from "@playwright/test"

/** Start the test from the intro screen. */
const startTest = async (page: Page) => {
  await page.getByRole("button", { name: "Start" }).click()
}

/** Answer a number of visible artwork prompts. */
const answerItems = async (page: Page, count: number) => {
  for (let item = 1; item <= count; item += 1) {
    await page.getByRole("button", { name: item % 2 === 0 ? /AI/ : /Human/ }).click()
  }
}

test("completes a full attempt, locks results, reviews details, and starts over", async ({
  page,
}) => {
  await page.goto("/")

  await expect(page.getByRole("heading", { name: "AI art Turing test" })).toBeVisible()
  await expect(page.getByRole("button", { name: "Start" })).toBeVisible()
  await expect(page.getByText("Item 1 of 50")).toHaveCount(0)

  await startTest(page)
  await expect(page.getByRole("img", { name: "Artwork 1" })).toBeVisible()
  await expect(page.getByRole("button", { name: "See my score" })).toHaveCount(0)

  await answerItems(page, 50)

  await expect(page.getByRole("heading", { name: "Your score" })).toBeVisible()
  await expect(page.getByText(/% correct/)).toBeVisible()
  await expect(page.getByRole("button", { name: "Human" })).toHaveCount(0)

  await page.getByRole("button", { name: /Girl In Field/ }).focus()
  await expect(page.getByRole("tooltip", { name: "Girl In Field" })).toBeVisible()
  await expect(page.getByText("Correct answer: AI")).toBeVisible()

  await page.getByRole("button", { name: "Start over" }).click()
  await expect(page.getByRole("button", { name: "Start" })).toBeVisible()
  await expect(page.getByText("Item 1 of 50")).toHaveCount(0)
})

test("persists answers and submitted results across refresh", async ({ page }) => {
  await page.goto("/")
  await startTest(page)
  await page.getByRole("button", { name: "AI" }).click()
  await page.reload()

  await expect(page.getByRole("img", { name: "Artwork 2" })).toBeVisible()
  await page.getByRole("button", { name: "Go to item 1", exact: true }).click()
  await expect(page.getByRole("button", { name: /AI/ })).toHaveClass(/bg-slate-950/)
  await page.getByRole("button", { name: "Go to item 2", exact: true }).click()

  await answerItems(page, 49)
  await page.reload()

  await expect(page.getByRole("heading", { name: "Your score" })).toBeVisible()
})

test("opens answer-key details with keyboard focus", async ({ page }) => {
  await page.goto("/")
  await startTest(page)
  await answerItems(page, 50)

  await page.getByRole("button", { name: /Angel Woman/ }).focus()
  await expect(page.getByRole("tooltip", { name: "Angel Woman" })).toBeVisible()
})
