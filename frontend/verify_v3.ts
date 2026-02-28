import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  const routes = [
    { name: 'login', path: '/login' },
    { name: 'register', path: '/register' },
    { name: 'dashboard', path: '/dashboard' },
    { name: 'strategies', path: '/strategies' },
    { name: 'positions', path: '/positions' },
    { name: 'history', path: '/history' },
    { name: 'settings', path: '/settings' },
    { name: 'profile', path: '/profile' },
    { name: 'plans', path: '/plans' }
  ];

  const outputDir = path.join(process.cwd(), 'verification_v3');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  for (const route of routes) {
    console.log(`Capturing ${route.name}...`);
    try {
      await page.goto(`http://localhost:3001${route.path}`, { waitUntil: 'networkidle' });
      // Wait for any animations
      await page.waitForTimeout(1000);
      await page.screenshot({ path: path.join(outputDir, `route_${route.name}.png`), fullPage: true });
    } catch (e) {
      console.error(`Failed to capture ${route.name}: ${e.message}`);
    }
  }

  await browser.close();
}

run();
