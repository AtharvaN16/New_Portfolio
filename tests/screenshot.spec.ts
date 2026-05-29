import { test } from '@playwright/test';
import * as path from 'path';

test('Capture Screenshot', async ({ page }) => {
  // Use TARGET_URL from environment, or default to google.com
  const url = process.env.TARGET_URL || 'https://google.com';
  
  // Set a standard desktop viewport size
  await page.setViewportSize({ width: 1280, height: 800 });
  
  console.log(`Navigating to: ${url}`);
  await page.goto(url, { waitUntil: 'networkidle' });
  
  // Custom name or default screenshot path
  const screenshotName = process.env.SCREENSHOT_NAME || 'screenshot.png';
  const outputPath = path.resolve(process.cwd(), screenshotName);
  
  console.log(`Taking screenshot and saving to: ${outputPath}`);
  await page.screenshot({
    path: outputPath,
    fullPage: process.env.FULL_PAGE === 'true',
  });
  
  console.log('Screenshot capture complete.');
});
