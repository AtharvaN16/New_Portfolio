const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const urls = {
  '1password': 'https://www.rachelchen.tech/projects/1password',
  'figma': 'https://www.rachelchen.tech/projects/figma',
  'openai': 'https://www.rachelchen.tech/projects/openai',
  'pokergpt': 'https://www.rachelchen.tech/projects/pokergpt',
  'earth': 'https://www.rachelchen.tech/projects/earth'
};

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 900 });

  for (const [key, url] of Object.entries(urls)) {
    console.log(`Visiting ${url}...`);
    try {
      await page.goto(url, { waitUntil: 'networkidle' });
      
      // Save screenshot
      const imgPath = path.join(process.cwd(), `public/${key}_rachel.png`);
      await page.screenshot({ path: imgPath, fullPage: false });
      console.log(`Saved screenshot to ${imgPath}`);

      // Extract HTML text and structure to analyze it
      const data = await page.evaluate(() => {
        // Find headings, list items, structure, and text content
        const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).map(h => `${h.tagName}: ${h.innerText}`);
        const paragraphs = Array.from(document.querySelectorAll('p')).map(p => p.innerText);
        const lists = Array.from(document.querySelectorAll('li')).map(l => l.innerText);
        return {
          title: document.title,
          headings,
          paragraphs: paragraphs.slice(0, 30),
          lists: lists.slice(0, 30)
        };
      });

      const textPath = path.join(process.cwd(), `scripts/${key}_extracted.json`);
      fs.writeFileSync(textPath, JSON.stringify(data, null, 2));
      console.log(`Saved extracted data to ${textPath}`);
    } catch (err) {
      console.error(`Error processing ${key}:`, err);
    }
  }

  await browser.close();
}

main().catch(console.error);
