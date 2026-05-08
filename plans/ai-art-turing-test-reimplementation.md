# AI Art Turing Test reimplementation plan

## Goal

Build an unofficial, self-scoring recreation of Scott Alexander's AI Art Turing Test. The app should present the original 50 images one at a time, collect Human/AI guesses, score the attempt, and let users review the answer key with attribution and Scott's item commentary.

## Decisions

1. Scope is only the 50 Human/AI decisions. Do not include the original survey's confidence, favorite, demographic, or opinion questions.
2. Present one image at a time with previous/next navigation.
3. Require all 50 answers before enabling an explicit “See my score” action.
4. Include a plain numbered progress grid during the test for direct navigation.
5. Persist answers, current item, and submitted state in localStorage. Provide a clear “Start over” action.
6. Lock answers after scoring. Starting over clears the saved attempt.
7. Serve images locally from the app rather than hotlinking Substack/Form URLs.
8. During the test, show only item position, not image titles or metadata.
9. Intro copy should be short: unofficial recreation, credits/links to original form/results, and the original “don’t download, zoom, or use tools” instruction.
10. Do not show Scott's aggregate results or comparisons.
11. Do not add sharing, analytics, or score collection.
12. Results page shows two side-by-side thumbnail grids grouped by true answer: Human art and AI art. Sort each group by original item order. Mark thumbnails the user got wrong with a red X.
13. Thumbnail hover/focus shows a full image and metadata on desktop; click/tap opens the same detail view for mobile and keyboard users.
14. The detail view includes original item number, title, user's answer, correct answer, attribution/source links, and Scott's commentary as-is.
15. Use clean, neutral styling with out-of-the-box shadcn components.

## Implementation outline

1. Extract the authoritative 50-item dataset from Scott's results post, using the Google Form only to verify item order/images.
2. Download and store all 50 test images under `public/art/` with stable filenames.
3. Model test items in TypeScript with id, title, true label, local image path, attribution/commentary content, and links.
4. Add pure scoring and persistence helpers with unit tests.
5. Build the test flow: intro, one-at-a-time artwork view, Human/AI choices, previous/next navigation, progress grid, and disabled scoring until complete.
6. Build the results flow: score summary, grouped thumbnail answer key, wrong-answer markers, and accessible detail dialog/popover.
7. Add end-to-end coverage for a full attempt, persistence across refresh, locked results, start over, and mobile/tap detail review.
8. Run typecheck, unit tests, Playwright tests, formatting, then commit and push.

## Unresolved questions

None.
