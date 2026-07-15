import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

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

test("server-renders the ZenCam Academy curriculum", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>ZenCam Academy<\/title>/i);
  assert.match(html, /Build confidence/);
  assert.match(html, /Traxxis customer support/);
  assert.match(html, /View vehicle trips/);
  assert.match(html, /Request video from a trip/);
  assert.match(html, /Expanding across ZenCam/);
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

  assert.match(nextConfig, /output: "export"/);
  assert.match(pagesWorkflow, /actions\/deploy-pages@v4/);
  assert.match(pagesWorkflow, /path: \.next-pages/);
});
