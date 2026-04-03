const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 800 });

  try {
    // ── Login ──
    console.log('1. Going to login page...');
    await page.goto(process.env.APP_URL + '/login.html', { waitUntil: 'networkidle' });
    await page.screenshot({ path: 'screenshots/01-login-page.png' });

    await page.fill('input[type="email"]', process.env.APP_EMAIL);
    await page.fill('input[type="password"]', process.env.APP_PASS);
    await page.screenshot({ path: 'screenshots/02-login-filled.png' });

    await page.click('button[type="submit"]');
    await page.waitForTimeout(4000);
    await page.screenshot({ path: 'screenshots/03-after-login.png' });
    console.log('✓ Logged in');

    // ── Dashboard (auto-loads on login) ──
    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'screenshots/04-dashboard.png' });
    console.log('✓ Dashboard loaded');

    // ── History tab ──
    await page.click('[data-tab="history"]');
    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'screenshots/05-history.png' });
    console.log('✓ History tab loaded');

    // ── Vehicles tab ──
    await page.click('[data-tab="vehicles"]');
    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'screenshots/06-vehicles.png' });
    console.log('✓ Vehicles tab loaded');

    console.log('✅ All done — Supabase is alive!');

  } catch (err) {
    // Screenshot on failure too
    await page.screenshot({ path: 'screenshots/ERROR.png' });
    console.error('❌ Error:', err.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
