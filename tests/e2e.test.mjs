/*
  End-to-end test suite for the portfolio site.

  Runs against the production build (dist/) served by vite preview, driven in
  headless Microsoft Edge (system browser — no Playwright browser download).

    npm run test:e2e        (builds first, then runs this file)

  Each TC-XX maps to a specific fix from the July 2026 audit. The process
  exits non-zero if any test case fails.
*/
import { preview } from "vite";
import { chromium, devices } from "playwright";

const PORT = 4199;
const URL = `http://localhost:${PORT}/`;

let passed = 0, failed = 0;
function check(id, name, condition, detail = "") {
  const ok = !!condition;
  ok ? passed++ : failed++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${id}  ${name}${detail ? `  [${detail}]` : ""}`);
  return ok;
}

async function launch() {
  for (const channel of ["msedge", "chrome", undefined]) {
    try { return await chromium.launch({ channel, headless: true }); }
    catch { /* try next channel */ }
  }
  throw new Error("No Chromium-based browser available");
}

const server = await preview({ preview: { port: PORT, strictPort: true } });
const browser = await launch();

try {
  /* ════ Desktop, fresh visitor ════ */
  const errors = [];
  const failedRequests = [];
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("requestfailed", (r) => failedRequests.push(r.url()));

  // NOTE: check intro via body text, not getByText — the terminal section also
  // contains "Welcome to …" which collides with case-insensitive locators.
  const introInDom = () => page.evaluate(() => document.body.innerText.includes("WELCOME TO"));

  await page.goto(URL, { waitUntil: "load" });

  // TC-01 — intro shows on first visit, any key skips it
  const introBefore = await introInDom();
  await page.keyboard.press("KeyA");
  await page.waitForTimeout(1500);
  const introAfterSkip = await introInDom();
  const seen = await page.evaluate(() => localStorage.getItem("portfolio-intro-seen"));
  check("TC-01", "intro: shows on first visit, keypress skips, choice persisted",
    introBefore && !introAfterSkip && seen === "1",
    `before=${introBefore} afterSkip=${introAfterSkip} stored=${seen}`);

  // TC-02 — repeat visit skips the intro entirely
  await page.reload({ waitUntil: "load" });
  await page.waitForTimeout(600);
  check("TC-02", "intro: not shown again on repeat visit", !(await introInDom()));

  // TC-03 — footer year is the current year (was hardcoded 2025)
  const footer = await page.locator("footer p").first().innerText();
  check("TC-03", "footer: shows current year dynamically",
    footer.includes(String(new Date().getFullYear())), footer.trim());

  // TC-04 — 3D scene mounts on desktop (fine pointer, no reduced motion)
  await page.waitForTimeout(1500); // lazy chunk
  check("TC-04", "hero: 3D canvas mounts on desktop", (await page.locator("#hero canvas").count()) === 1);

  // TC-05 — Timeline "Career" badge has real background (var()+hex-alpha bug)
  await page.locator("#timeline").scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  const badge = await page.locator("#timeline span", { hasText: "Career" }).first()
    .evaluate((el) => getComputedStyle(el).backgroundColor);
  check("TC-05", "timeline: Career badge background renders",
    badge !== "rgba(0, 0, 0, 0)" && badge !== "transparent", badge);

  // TC-06 — every self-hosted logo file serves 200
  const logos = ["typescript","javascript","react","nodejs","tailwindcss","bootstrap","postgresql","mongodb","mysql","html5","css3","git","vscode","bitbucket"];
  const logoStatuses = await Promise.all(logos.map((l) => ctx.request.get(`${URL}logos/${l}.svg`).then((r) => r.status())));
  check("TC-06", "skills: all 14 self-hosted logos serve HTTP 200",
    logoStatuses.every((s) => s === 200), logoStatuses.join(","));

  // TC-07 — terminal: unknown command errors, whoami works, Tab autocompletes
  await page.locator("#terminal").scrollIntoViewIfNeeded();
  const term = page.getByLabel("Terminal command input");
  await term.click();
  await term.fill("foobar");
  await term.press("Enter");
  const notFound = await page.getByText("command not found: foobar").isVisible();
  await term.fill("who");
  await term.press("Tab");
  const completed = await term.inputValue();
  await term.press("Enter");
  await page.waitForTimeout(200);
  const whoamiOut = await page.locator("#terminal").innerText();
  check("TC-07", "terminal: error + Tab-complete + whoami output",
    notFound && completed === "whoami" && whoamiOut.includes("DigiMantra Labs"),
    `tab='${completed}'`);

  // TC-08 — contact form: labels associated, empty submit blocked by validation
  const labelsOk = await page.evaluate(() =>
    ["contact-name", "contact-email", "contact-phone", "contact-message"]
      .every((id) => document.getElementById(id) && document.querySelector(`label[for="${id}"]`)));
  const emptyFormBlocked = await page.evaluate(() => !document.querySelector("form").checkValidity());
  check("TC-08", "contact: labels associated + empty submit blocked", labelsOk && emptyFormBlocked);

  // TC-09 — theme toggle updates data-theme, meta theme-color, and persists
  await page.getByLabel("Toggle theme").click();
  await page.waitForTimeout(300);
  const light = await page.evaluate(() => ({
    theme: document.documentElement.dataset.theme,
    meta: document.querySelector('meta[name="theme-color"]')?.content,
  }));
  await page.reload({ waitUntil: "load" });
  const themeAfterReload = await page.evaluate(() => document.documentElement.dataset.theme);
  check("TC-09", "theme: toggle → light + meta sync + persists across reload",
    light.theme === "light" && light.meta === "#f8fafc" && themeAfterReload === "light",
    JSON.stringify(light));
  await page.getByLabel("Toggle theme").click(); // restore dark

  // TC-10 — navbar marks the section in view as active (IntersectionObserver)
  await page.locator("#projects").scrollIntoViewIfNeeded();
  await page.waitForTimeout(900);
  const activeBg = await page.locator("nav button", { hasText: "Projects" })
    .evaluate((el) => getComputedStyle(el).backgroundColor);
  check("TC-10", "navbar: Projects becomes active when scrolled to",
    activeBg !== "rgba(0, 0, 0, 0)" && activeBg !== "transparent", activeBg);

  // TC-11 — case study expands and collapses
  const toggleBtn = page.getByRole("button", { name: /Explore Case Study/ }).first();
  await toggleBtn.scrollIntoViewIfNeeded();
  await toggleBtn.click();
  await page.waitForTimeout(700);
  const problemShown = await page.getByText("Problem", { exact: true }).first().isVisible();
  await page.getByRole("button", { name: /Hide Case Study/ }).first().click();
  await page.waitForTimeout(700);
  const problemHidden = !(await page.getByText("Problem", { exact: true }).first().isVisible().catch(() => false));
  check("TC-11", "projects: case study expands and collapses", problemShown && problemHidden);

  // TC-12 — scroll-to-top button appears and works
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(700);
  const upBtn = page.locator("button", { hasText: "↑" }).last();
  const upVisible = await upBtn.isVisible();
  await upBtn.click();
  await page.waitForTimeout(1500);
  const backAtTop = await page.evaluate(() => window.scrollY < 50);
  check("TC-12", "scroll-top: appears after scroll, returns to top", upVisible && backAtTop);

  // TC-13 — critical static assets all serve 200
  const assets = ["assets/Eknoor_Singh_Full_Stack_Developer.pdf", "og-image.png", "sitemap.xml", "robots.txt", "favicon.svg"];
  const assetStatuses = await Promise.all(assets.map((a) => ctx.request.get(URL + a).then((r) => r.status())));
  check("TC-13", "assets: resume/og-image/sitemap/robots/favicon serve 200",
    assetStatuses.every((s) => s === 200), assetStatuses.join(","));

  // TC-14 — zero console errors, page errors, or failed requests in the whole flow
  check("TC-14", "no console/page errors or failed requests",
    errors.length === 0 && failedRequests.length === 0,
    errors.concat(failedRequests).slice(0, 3).join(" | ") || "clean");
  await ctx.close();

  /* ════ Mobile (coarse pointer) ════ */
  const mctx = await browser.newContext({ ...devices["iPhone 13"] });
  const mpage = await mctx.newPage();
  await mpage.goto(URL, { waitUntil: "load" });
  await mpage.tap("body");           // skip intro
  await mpage.waitForTimeout(1800);

  // TC-15 — no 3D on touch devices, chunk never downloaded
  const mCanvas = await mpage.locator("#hero canvas").count();
  const threeFetched = await mpage.evaluate(() =>
    performance.getEntriesByType("resource").some((r) => r.name.includes("ThreeScene")));
  check("TC-15", "mobile: no canvas and ThreeScene chunk never fetched",
    mCanvas === 0 && !threeFetched, `canvas=${mCanvas} fetched=${threeFetched}`);

  // TC-16 — labeled hamburger opens the menu; labeled close button closes it.
  // AnimatePresence keeps the overlay mounted until the staggered exit
  // animations finish (~0.7s), so wait for detach rather than a fixed sleep.
  await mpage.getByLabel("Open navigation menu").tap();
  const closeBtn = mpage.getByLabel("Close navigation menu");
  await closeBtn.waitFor({ state: "visible", timeout: 3000 });
  const menuOpened = await closeBtn.isVisible();
  await closeBtn.tap();
  const menuClosed = await closeBtn.waitFor({ state: "detached", timeout: 3000 })
    .then(() => true).catch(() => false);
  check("TC-16", "mobile: aria-labeled menu opens and closes", menuOpened && menuClosed);
  await mctx.close();

  /* ════ Reduced motion ════ */
  const rctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  const rpage = await rctx.newPage();
  await rpage.goto(URL, { waitUntil: "load" });
  await rpage.keyboard.press("KeyA");
  await rpage.waitForTimeout(1500);

  // TC-17 — reduced motion: no 3D scene, typed role shown as static text
  const rCanvas = await rpage.locator("#hero canvas").count();
  const roleText = await rpage.locator("#hero span.font-display").first().innerText();
  check("TC-17", "reduced motion: no canvas + role text rendered statically",
    rCanvas === 0 && roleText.includes("Full Stack Engineer"),
    `canvas=${rCanvas} role='${roleText.trim()}'`);
  await rctx.close();
} finally {
  await browser.close();
  await server.close();
}

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed === 0 ? 0 : 1);
