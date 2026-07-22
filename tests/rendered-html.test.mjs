import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const lessonRoutes = [
  "/training/maps/view-trips",
  "/training/maps/review-exceptions-from-trips",
  "/training/maps/proximity-search",
  "/training/maps/manage-assets",
  "/training/maps/manage-drivers",
  "/training/maps/manage-locations",
  "/training/maps/request-trip-video",
  "/training/maps/assign-trip-driver",
  "/training/maps/contact-driver",
  "/training/safety/coach-driver",
  "/training/safety/review-scorecards",
  "/training/safety/manage-event-status",
  "/training/safety/configure-rules",
  "/training/reports/schedule-report",
  "/training/reports/run-report",
  "/training/reports/saved-views",
  "/training/reports/export-distribute",
  "/training/admin/users-permissions",
  "/training/admin/groups-assets",
  "/training/admin/manage-drivers",
  "/training/admin/notifications",
];

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the ZenduONE Academy curriculum", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>ZenduONE Academy<\/title>/i);
  assert.match(html, /Build confidence/);
  assert.match(html, /Welcome to ZenduONE Academy by Traxxis GPS/);
  assert.match(html, /Choose a helpful starting point/);
  assert.doesNotMatch(html, /Start with a popular task/);
  assert.match(html, /Traxxis customer support/);
  assert.match(html, /View vehicle trips/);
  assert.match(html, /Request video from a trip/);
  assert.match(html, /Expanding across ZenduONE/);
  assert.doesNotMatch(html, /<h3>Work<\/h3>/);
});

test("keeps real-screen workflows and Pages publishing configured", async () => {
  const [catalog, workflows, pagesWorkflow, nextConfig] = await Promise.all([
    readFile(new URL("../lib/training-catalog.ts", import.meta.url), "utf8"),
    readFile(new URL("../components/screenshot-workflow-demo.tsx", import.meta.url), "utf8"),
    readFile(new URL("../.github/workflows/pages.yml", import.meta.url), "utf8"),
    readFile(new URL("../next.config.mjs", import.meta.url), "utf8"),
  ]);

  assert.match(catalog, /title: "Review exceptions from trips"/);
  assert.match(catalog, /demo: "proximity-search"/);
  assert.match(catalog, /demo: "manage-assets"/);
  assert.match(catalog, /demo: "map-manage-drivers"/);
  assert.match(catalog, /demo: "manage-locations"/);

  assert.match(workflows, /05-trip-hover-camera\.png/);
  assert.match(workflows, /03-nearby-assets\.png/);
  assert.match(workflows, /06-request-submitted\.png/);
  assert.match(workflows, /Video request submitted/);
  assert.match(
    workflows,
    /title: "Open exceptions for the trip"[\s\S]*?hotspot: \{ x: 8\.5, y: 54, width: 32, height: 7 \}/,
  );
  assert.match(
    workflows,
    /title: "Select a No Seatbelt exception"[\s\S]*?hotspot: \{ x: 10\.5, y: 61\.5, width: 29, height: 10 \}/,
  );
  assert.doesNotMatch(
    workflows,
    /title: "Select an exception to review"[\s\S]*?hotspot: \{ x: 8, y: 45/,
  );

  const hotspots = [...workflows.matchAll(
    /hotspot: \{ x: ([\d.]+), y: ([\d.]+), width: ([\d.]+), height: ([\d.]+) \}/g,
  )];
  assert.ok(hotspots.length >= 50, "the guided lessons should retain their targeted highlights");
  for (const [, xValue, yValue, widthValue, heightValue] of hotspots) {
    const [x, y, width, height] = [xValue, yValue, widthValue, heightValue].map(Number);
    assert.ok(x >= 0 && y >= 0 && width > 0 && height > 0, "hotspot values should be positive");
    assert.ok(x + width <= 100 && y + height <= 100, "hotspots should stay inside the captured screen");
  }

  assert.match(nextConfig, /output: "export"/);
  assert.match(pagesWorkflow, /actions\/deploy-pages@v4/);
  assert.match(pagesWorkflow, /path: \.next-pages/);
});

test("renders camera education and health resources", async () => {
  const [howItWorks, cameraHealth] = await Promise.all([
    render("/training/how-it-works"),
    render("/training/camera-health"),
  ]);

  assert.equal(howItWorks.status, 200);
  assert.equal(cameraHealth.status, 200);

  const howHtml = await howItWorks.text();
  const healthHtml = await cameraHealth.text();
  assert.match(howHtml, /24–72 hours/);
  assert.match(howHtml, /Requested clips move to the cloud/);
  assert.match(howHtml, /Coaching can happen in real time/);
  assert.match(howHtml, /Moving/);
  assert.match(howHtml, /Idling/);
  assert.match(howHtml, /Cam On/);
  assert.match(howHtml, /Cam Sleep/);
  assert.match(howHtml, /Cam Off/);
  assert.match(healthHtml, /No lights with ignition on/);
  assert.match(healthHtml, /Recording Health/);
  assert.match(healthHtml, /Email Traxxis Support/);
});

test("renders every customer lesson with clear guided controls", async () => {
  for (const route of lessonRoutes) {
    const response = await render(route);
    assert.equal(response.status, 200, `${route} should render`);
    const html = await response.text();
    assert.match(html, /What you’ll learn/, `${route} should explain the outcome`);
    assert.match(html, /Start guided lesson/, `${route} should offer guided practice`);
    assert.match(html, /Watch step by step/, `${route} should offer an automatic walkthrough`);
    assert.match(html, /Nothing in this lesson changes your fleet data/, `${route} should explain that practice is safe`);
  }
});

test("keeps every lesson screenshot available and completion navigation wired", async () => {
  const workflows = await readFile(new URL("../components/screenshot-workflow-demo.tsx", import.meta.url), "utf8");
  const imagePaths = [...workflows.matchAll(/image: "([^"]+)"/g)].map((match) => match[1]);
  assert.ok(imagePaths.length >= 40, "the curriculum should retain its captured ZenduONE screens");

  for (const imagePath of new Set(imagePaths)) {
    await access(new URL(`../public${imagePath}`, import.meta.url));
  }

  assert.match(workflows, /Lesson complete/);
  assert.match(workflows, /Next: \{nextLesson\.label\}/);
  assert.match(workflows, /5000/);
});
