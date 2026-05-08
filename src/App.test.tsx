import { fireEvent, render, screen, within } from "@testing-library/react"
import { beforeEach, describe, expect, it } from "vitest"
import { App } from "./App"

const answerAllItems = () => {
  for (let item = 1; item <= 50; item += 1) {
    fireEvent.click(screen.getByRole("button", { name: "Human" }))
    if (item < 50) {
      fireEvent.click(screen.getByRole("button", { name: "Next" }))
    }
  }
}

describe("App", () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it("starts with an intro and the first unlabeled artwork", () => {
    render(<App />)

    expect(screen.getByRole("heading", { name: "AI art Turing test" })).toBeInTheDocument()
    expect(screen.getByText(/unofficial recreation/i)).toBeInTheDocument()
    expect(screen.getByText("Item 1 of 50")).toBeInTheDocument()
    expect(screen.queryByText("Angel Woman")).not.toBeInTheDocument()
  })

  it("records answers, navigates directly, and requires completion before scoring", () => {
    render(<App />)

    expect(screen.getByRole("button", { name: "See my score" })).toBeDisabled()

    fireEvent.click(screen.getByRole("button", { name: "AI" }))
    fireEvent.click(screen.getByRole("button", { name: "Go to item 2" }))

    expect(screen.getByText("Item 2 of 50")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "See my score" })).toBeDisabled()

    answerAllItems()

    expect(screen.getByRole("button", { name: "See my score" })).toBeEnabled()
  })

  it("shows locked results with grouped answer key details after scoring", () => {
    render(<App />)

    answerAllItems()
    fireEvent.click(screen.getByRole("button", { name: "See my score" }))

    expect(screen.getByRole("heading", { name: "Your score" })).toBeInTheDocument()
    expect(screen.getByText("24 / 50")).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "Human art" })).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "AI art" })).toBeInTheDocument()
    expect(screen.getAllByLabelText(/Incorrect answer/)).toHaveLength(26)

    fireEvent.click(
      within(screen.getByLabelText("AI art answer key")).getByRole("button", {
        name: /Girl In Field/,
      }),
    )

    expect(screen.getByRole("dialog", { name: "Girl In Field" })).toBeInTheDocument()
    expect(screen.getByText("Your answer: Human")).toBeInTheDocument()
    expect(screen.getByText("Correct answer: AI")).toBeInTheDocument()
  })
})
