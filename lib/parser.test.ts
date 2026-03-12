/**
 * Basic tests for the meta tag parser.
 * Run with: npx tsx lib/parser.test.ts
 */

import { fetchAndParseMeta } from "./parser";

async function test(name: string, fn: () => Promise<void>) {
  try {
    await fn();
    console.log(`  PASS: ${name}`);
  } catch (err) {
    console.error(`  FAIL: ${name}`);
    console.error(`    ${err instanceof Error ? err.message : err}`);
    process.exitCode = 1;
  }
}

function assert(condition: boolean, message: string) {
  if (!condition) throw new Error(message);
}

async function main() {
  console.log("Running parser tests...\n");

  await test("rejects invalid URLs", async () => {
    const result = await fetchAndParseMeta("not a url ][}{");
    assert(!result.success, "Should fail for invalid URL");
  });

  await test("rejects non-http protocols", async () => {
    const result = await fetchAndParseMeta("ftp://example.com");
    assert(!result.success, "Should fail for ftp");
    // ftp fails either at protocol check or at fetch — either way it's rejected
  });

  await test("auto-prepends https://", async () => {
    const result = await fetchAndParseMeta("example.com");
    // Should attempt to fetch, not fail on URL parsing
    assert(
      result.success || (result as { error: string }).error !== "Invalid URL",
      "Should not fail with 'Invalid URL' when missing protocol"
    );
  });

  await test("parses a real page (example.com)", async () => {
    const result = await fetchAndParseMeta("https://example.com");
    assert(result.success, "Should succeed for example.com");
    if (result.success) {
      assert(result.data.title !== null, "Should have a title");
      assert(result.data.fetchedUrl === "https://example.com", "Should track fetched URL");
      assert(typeof result.data.allMeta === "object", "Should have allMeta object");
    }
  });

  await test("handles timeout gracefully", async () => {
    // Use a non-routable IP to trigger timeout
    const result = await fetchAndParseMeta("https://192.0.2.1");
    assert(!result.success, "Should fail");
    if (!result.success) {
      assert(
        result.error.includes("timed out") || result.error.includes("connect"),
        `Error should be about timeout or connection, got: ${result.error}`
      );
    }
  });

  await test("rejects empty URL", async () => {
    const result = await fetchAndParseMeta("");
    assert(!result.success, "Should fail for empty URL");
  });

  console.log("\nDone.");
}

main();
