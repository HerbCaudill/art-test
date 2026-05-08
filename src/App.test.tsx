import { fireEvent, render, screen, within } from "@testing-library/react"
import { beforeEach, describe, expect, it } from "vitest"
import { App } from "./App"

/** Start the test from the intro screen. */
const startTest = () => {
  fireEvent.click(screen.getByRole("button", { name: "Start" }))
}

/** Answer every artwork in the test with Human. */
const answerAllItems = () => {
  for (let item = 1; item <= 50; item += 1) {
    fireEvent.click(screen.getByRole("button", { name: /Human/ }))
  }
}

describe("App", () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it("starts with the introduction on its own start screen", () => {
    render(<App />)

    expect(screen.getByRole("heading", { name: "AI art Turing test" })).toBeInTheDocument()
    expect(screen.getByText(/unofficial recreation/i)).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Start" })).toBeInTheDocument()
    expect(screen.queryByText(/don.t download, zoom/i)).not.toBeInTheDocument()
    expect(screen.queryByText("Item 1 of 50")).not.toBeInTheDocument()
  })

  it("starts the test with Enter from the start screen", () => {
    render(<App />)

    fireEvent.keyDown(window, { key: "Enter" })

    expect(screen.getByRole("img", { name: "Artwork 1" })).toBeInTheDocument()
  })

  it("starts the test without showing the introduction beside the artwork", () => {
    render(<App />)

    startTest()

    expect(screen.queryByText("Item 1 of 50")).not.toBeInTheDocument()
    expect(screen.getByRole("banner")).toContainElement(screen.getByRole("group", { name: "Vote" }))
    expect(screen.getByRole("contentinfo")).toContainElement(
      screen.getByRole("group", { name: "Artwork progress" }),
    )
    expect(screen.getByRole("button", { name: /Human/ })).toHaveTextContent("🧑‍🎨 HumanH")
    expect(screen.getByRole("button", { name: /AI/ })).toHaveTextContent("🤖 AIA")
    expect(screen.getByRole("button", { name: /Previous/ })).toHaveTextContent("PreviousP / ←")
    expect(screen.getByRole("button", { name: /Next/ })).toHaveTextContent("NextN / →")
    expect(screen.queryByRole("heading", { name: "AI art Turing test" })).not.toBeInTheDocument()
    expect(screen.queryByText("Angel Woman")).not.toBeInTheDocument()
  })

  it("records answers, advances automatically, and does not show a score button", () => {
    render(<App />)

    startTest()

    expect(screen.queryByRole("button", { name: "See my score" })).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole("button", { name: /AI/ }))

    expect(screen.getByRole("img", { name: "Artwork 2" })).toBeInTheDocument()
    expect(screen.queryByRole("button", { name: "See my score" })).not.toBeInTheDocument()
  })

  it("supports keyboard shortcuts for navigation and voting", () => {
    render(<App />)

    startTest()
    fireEvent.keyDown(window, { key: "n" })
    expect(screen.getByRole("img", { name: "Artwork 2" })).toBeInTheDocument()

    fireEvent.keyDown(window, { key: "ArrowLeft" })
    expect(screen.getByRole("img", { name: "Artwork 1" })).toBeInTheDocument()

    fireEvent.keyDown(window, { key: "a" })
    expect(screen.getByRole("img", { name: "Artwork 2" })).toBeInTheDocument()
    fireEvent.click(screen.getByRole("button", { name: "Go to item 1" }))
    expect(screen.getByRole("button", { name: /AI/ })).toHaveClass("bg-slate-950")

    fireEvent.keyDown(window, { key: "ArrowRight" })
    fireEvent.keyDown(window, { key: "h" })
    expect(screen.getByRole("img", { name: "Artwork 3" })).toBeInTheDocument()
  })

  it("ignores keyboard shortcuts while a text input has focus", () => {
    render(<App />)

    startTest()

    const input = document.createElement("input")
    document.body.append(input)
    input.focus()
    fireEvent.keyDown(window, { key: "h" })
    input.remove()

    expect(screen.getByRole("img", { name: "Artwork 1" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /Human/ })).not.toHaveClass("bg-slate-950")
  })

  it("shows grouped results with a fixed detail panel after the final vote", () => {
    render(<App />)

    startTest()
    answerAllItems()

    expect(screen.getByRole("heading", { name: "Your score" })).toBeInTheDocument()
    expect(screen.queryByText("48% correct")).not.toBeInTheDocument()
    expect(screen.getByText("your result: 48%")).toBeInTheDocument()
    expect(screen.getByText("all wrong")).toBeInTheDocument()
    expect(screen.getByText("random chance")).toBeInTheDocument()
    expect(screen.getByText("mean result")).toBeInTheDocument()
    expect(screen.getByText("all correct")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "original test" })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "results post" })).toBeInTheDocument()
    expect(
      screen.queryByText("Answers are locked. Start over to try again."),
    ).not.toBeInTheDocument()
    expect(screen.getAllByRole("heading", { name: "🧑‍🎨 Human art" }).length).toBeGreaterThan(0)
    expect(screen.getByRole("heading", { name: "🤖 AI art" })).toBeInTheDocument()
    expect(screen.getAllByLabelText(/Incorrect answer/)).toHaveLength(26)
    expect(screen.queryByText(/1\. Angel Woman/)).not.toBeInTheDocument()

    const girlInField = within(screen.getByLabelText("AI art answer key")).getByRole("button", {
      name: /Girl In Field/,
    })

    fireEvent.click(girlInField)

    const panel = screen.getByRole("complementary", { name: "Artwork details" })

    expect(screen.queryByRole("tooltip", { name: "Artwork details" })).not.toBeInTheDocument()
    expect(within(panel).getByRole("img", { name: "Selected artwork" })).toBeInTheDocument()
    expect(within(panel).queryByText("Girl In Field")).not.toBeInTheDocument()
    expect(within(panel).queryByText("Item 4")).not.toBeInTheDocument()
    expect(within(panel).getByRole("heading", { name: "🤖 AI art" })).toBeInTheDocument()
    expect(within(panel).getByRole("button", { name: "Previous artwork" })).toBeInTheDocument()
    expect(within(panel).getByRole("button", { name: "Next artwork" })).toBeInTheDocument()
    expect(within(panel).getByText(/This image was generated by Ryan Wise/)).toBeInTheDocument()

    fireEvent.click(within(panel).getByRole("button", { name: "Next artwork" }))
    expect(within(panel).getByRole("heading", { name: "🧑‍🎨 Human art" })).toBeInTheDocument()
    expect(within(panel).getByText(/This is “Malabar”, by Wojtek Kapusta/)).toBeInTheDocument()

    fireEvent.keyDown(window, { key: "ArrowLeft" })
    expect(within(panel).getByRole("heading", { name: "🤖 AI art" })).toBeInTheDocument()
    expect(within(panel).getByText(/This image was generated by Ryan Wise/)).toBeInTheDocument()
  })
})
