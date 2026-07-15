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

test("server-renders the ZenduONE Academy curriculum", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>ZenduONE Academy<\/title>/i);
  assert.match(html, /Learn the work/);
  assert.match(html, /View vehicle trips/);
  assert.match(html, /Review exceptions from trips/);
  assert.match(html, /Find vehicle activity with Proximity Search/);
  assert.match(html, /Create locations and zones/);
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
