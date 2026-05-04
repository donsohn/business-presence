const puppeteer = require('puppeteer');
const path = require('path');

const mockups = [
  { file: 'chatbot', out: 'chatbot.png' },
  { file: 'mortgage', out: 'mortgage.png' },
  { file: 'lighting', out: 'lighting.png' },
  { file: 'invoice', out: 'invoice.png' },
];

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 750, deviceScaleFactor: 2 });

  for (const { file, out } of mockups) {
    const url = `file://${path.join(__dirname, 'mockups', file + '.html')}`;
    const outPath = path.join(__dirname, 'assets', out);
    await page.goto(url, { waitUntil: 'networkidle0' });
    await page.screenshot({ path: outPath, clip: { x: 0, y: 0, width: 1200, height: 750 } });
    console.log(`✓ ${out}`);
  }

  await browser.close();
})();
