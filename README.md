# ZenCam Academy

An internal product-training portal built from screenshots of the real ZenCam training account. It does not connect to ZenCam APIs or store login credentials.

## Current foundation

- Training homepage with Maps, Safety, Reports, and Admin sections
- Dynamic section and lesson routes
- Catalog showing available and planned workflows
- Nine recorded Maps lessons, including trips, exceptions, Proximity Search, assets, drivers, zones, video requests, assignments, and driver contact
- Recorded Safety lessons: Coach a driver and review safety performance
- Recorded Reports lesson: Schedule a report
- Recorded Admin lessons: users, groups, drivers, and rules
- Guided and automatic playback modes
- Responsive portal navigation
- Branded Open Graph/link-preview card

## Run locally

Use Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Project map

```text
app/
  page.tsx                              Training homepage
  training/[section]/page.tsx           Section curriculum
  training/[section]/[lesson]/page.tsx  Lesson page
components/
  training-shell.tsx                    Academy navigation
  lesson-card.tsx                       Catalog cards
  screenshot-workflow-demo.tsx          All recorded product walkthroughs
lib/
  training-catalog.ts                   Sections, lessons, objectives, status
```

## Add a lesson

1. Add a lesson entry to the correct section in `lib/training-catalog.ts`.
2. Use `status: "planned"` while its recorded walkthrough is being developed.
3. Add a unique recorded-demo variant when the lesson is interactive.
4. Capture each meaningful account state at the same 1280 × 720 viewport.
5. Store the images under `public/demo-screens/<lesson-slug>/` and define percentage-based hotspots in a screenshot workflow component.
6. Connect the variant in `app/training/[section]/[lesson]/page.tsx`.
7. Change the lesson to `status: "available"` after guided and autoplay testing pass.

Example catalog entry:

```ts
{
  slug: "review-exceptions-from-trips",
  title: "Review exceptions from trips",
  description: "Choose a trip-history date and review its exceptions.",
  duration: 5,
  level: "Intermediate",
  status: "planned",
  objectives: ["Open Trip History", "Choose a date", "Review exceptions"]
}
```

## Workflow-development checklist

1. Define one observable learning outcome.
2. Perform the task in the demo account and record every meaningful state.
3. Use a dedicated training account and remove or replace customer data before capture.
4. Crop all screens to the same viewport so hotspots remain consistent.
5. Keep the tour to roughly 4–10 steps.
6. Position each instruction card so it does not cover its target.
7. Test required clicks, Back, Next, Exit, autoplay, and completion.
8. Run the production build before publishing internally.

## Build a recorded workflow

Recorded workflows use PNG screenshots with a clickable hotspot layer. The product account is never connected to the training site, so lessons are fast, predictable, and cannot modify fleet data.

1. Perform the task in the dedicated demo account.
2. Capture one PNG before each learner action at 1280 × 720.
3. Save the sequence as `01-name.png`, `02-name.png`, and so on under `public/demo-screens/<lesson-slug>/`.
4. For each step, record the target rectangle as percentages of the screenshot: `x`, `y`, `width`, and `height`.
5. Add the image, hotspot, instruction title, and body to the lesson's step array.
6. The player places the instruction card on the opposite side of the target and aligns it vertically with the highlighted area.
7. Test the workflow at desktop and narrow widths, then mark its catalog entry `available`.

Percentage hotspots are calculated as `(pixel position ÷ screenshot dimension) × 100`. For example, a target beginning 128 pixels from the left of a 1280-pixel capture uses `x: 10`.

## Internal hosting

Deploy as a standalone internal application or embed lesson pages in an existing portal. If embedded, configure the host’s Content Security Policy and `frame-ancestors` directive for approved internal origins.

## GitHub Pages management preview

The repository includes `.github/workflows/pages.yml`. On every push to `main`, it type-checks the app, creates a static export with the correct repository base path, and deploys the `.next-pages` export to GitHub Pages.

Because the lessons contain screenshots from a real demo account, choose repository and Pages visibility deliberately before publishing. A public repository and public Pages site expose every committed screenshot.

After creating or connecting the approved repository:

1. Authenticate GitHub CLI with `gh auth login`.
2. Push the project to the repository's `main` branch.
3. In GitHub, open **Settings → Pages** and select **GitHub Actions** as the source.
4. Run the **Deploy management preview to GitHub Pages** workflow or push another commit.
5. Share the deployment URL shown in the workflow's `github-pages` environment.

## Build

```bash
npm run build
```
