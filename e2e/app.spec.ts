import { expect, test, type Page } from "@playwright/test"

const answerAllItems = async (page: Page) => {
  for (let item = 1; item <= 50; item += 1) {
    await page.getByRole("button", { name: item % 2 === 0 ? "AI" : "Human" }).click()
    if (item < 50) {
      await page.getByRole("button", { name: "Next" }).click()
    }
  }
}

test("completes a full attempt, locks results, reviews details, and starts over", async ({
  page,
}) => {
  await page.goto("/")

  await expect(page.getByRole("heading", { name: "AI art Turing test" })).toBeVisible()
  await expect(page.getByRole("button", { name: "See my score" })).toBeDisabled()

  await answerAllItems(page)
  await expect(page.getByRole("button", { name: "See my score" })).toBeEnabled()
  await page.getByRole("button", { name: "See my score" }).click()

  await expect(page.getByRole("heading", { name: "Your score" })).toBeVisible()
  await expect(page.getByText(/\/ 50/)).toBeVisible()
  await expect(page.getByRole("button", { name: "Human" })).toHaveCount(0)

  await page.getByRole("button", { name: /Girl In Field/ }).click()
  await expect(page.getByRole("dialog", { name: "Girl In Field" })).toBeVisible()
  await expect(page.getByText("Correct answer: AI")).toBeVisible()
  await page.getByRole("button", { name: "Close" }).click()

  await page.getByRole("button", { name: "Start over" }).click()
  await expect(page.getByText("Item 1 of 50")).toBeVisible()
  await expect(page.getByRole("button", { name: "See my score" })).toBeDisabled()
})

test("persists answers and submitted results across refresh", async ({ page }) => {
  await page.goto("/")
  await page.getByRole("button", { name: "AI" }).click()
  await page.getByRole("button", { name: "Go to item 2", exact: true }).click()
  await page.reload()

  await expect(page.getByText("Item 2 of 50")).toBeVisible()
  await page.getByRole("button", { name: "Go to item 1", exact: true }).click()
  await expect(page.getByRole("button", { name: "AI" })).toHaveClass(/bg-slate-950/)

  await answerAllItems(page)
  await page.getByRole("button", { name: "See my score" }).click()
  await page.reload()

  await expect(page.getByRole("heading", { name: "Your score" })).toBeVisible()
})

test("opens answer-key details with keyboard focus", async ({ page }) => {
  await page.goto("/")
  await answerAllItems(page)
  await page.getByRole("button", { name: "See my score" }).click()

  await page.getByRole("button", { name: /Angel Woman/ }).focus()
  await expect(page.getByRole("dialog", { name: "Angel Woman" })).toBeVisible()
})
