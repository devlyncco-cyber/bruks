import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

// 1. Create a pristine 512x512 Square Favicon SVG
// Designed to look stunning at 16x16, 24x24, 32x32, 48x48, 96x96, 180x180, and 512x512
// High-contrast on both Google Search Light Mode (white) and Dark Mode (black/charcoal).

const squareFaviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <filter id="badgeShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#191513" flood-opacity="0.18" />
    </filter>
    <radialGradient id="bgGlow" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#FFFDF9" />
      <stop offset="100%" stop-color="#FFF2E0" />
    </radialGradient>
  </defs>

  <circle cx="256" cy="256" r="240" fill="url(#bgGlow)" stroke="#EF4329" stroke-width="24" filter="url(#badgeShadow)" />
  <circle cx="256" cy="256" r="222" fill="none" stroke="#F2C7A9" stroke-width="4" stroke-dasharray="8 6" />

  <ellipse cx="256" cy="275" rx="165" ry="72" fill="#FFF8EF" stroke="#EF4329" stroke-width="12" />

  <path d="M254 185 C246 160 216 146 198 158 C185 168 190 190 216 190 C238 190 252 185 254 185 Z" fill="#EF4329" />
  <path d="M258 185 C266 160 296 146 314 158 C327 168 322 190 296 190 C274 190 260 185 258 185 Z" fill="#EF4329" />
  <circle cx="256" cy="186" r="8" fill="#EF4329" />

  <text x="256" y="286" fill="#EF4329" font-family="'Plus Jakarta Sans', 'Arial Black', sans-serif" font-weight="900" font-size="74" letter-spacing="3" text-anchor="middle">LOBBO</text>

  <text x="256" y="324" fill="#512719" font-family="'Inter', 'Arial', sans-serif" font-weight="800" font-size="24" letter-spacing="3.5" text-anchor="middle">BEVERAGES</text>

  <circle cx="132" cy="275" r="5" fill="#EF4329" />
  <circle cx="380" cy="275" r="5" fill="#EF4329" />
</svg>`;

async function generateFavicons() {
  const publicDir = path.resolve('public');
  const svgBuffer = Buffer.from(squareFaviconSvg);

  console.log('Generating Google-compliant square favicons...');

  // 1. Save square favicon.svg
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), squareFaviconSvg);
  console.log('✓ Created public/favicon.svg (512x512 square vector)');

  // 2. Generate PNG sizes required by Google Search and modern devices
  const sizes = [
    { name: 'favicon-48x48.png', size: 48 },   // Google Search exact base size
    { name: 'favicon-96x96.png', size: 96 },   // Google Search 2x retina
    { name: 'favicon-144x144.png', size: 144 }, // Google Search 3x retina
    { name: 'favicon-192x192.png', size: 192 }, // Android / Chrome PWA
    { name: 'favicon-512x512.png', size: 512 }, // PWA splash / High-res
    { name: 'favicon-32x32.png', size: 32 },   // Desktop browser tab
    { name: 'favicon-16x16.png', size: 16 },   // Desktop browser small
    { name: 'apple-touch-icon.png', size: 180 }, // iOS home screen
  ];

  for (const { name, size } of sizes) {
    const outPath = path.join(publicDir, name);
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(outPath);
    console.log(`✓ Created public/${name} (${size}x${size})`);
  }

  // 3. Generate multi-resolution favicon.ico (16, 32, 48)
  // Standard ICO format contains 48x48, 32x32, and 16x16
  // We can write a 48x48 PNG wrapped into ICO or using standard ICO binary structure
  const png48Buffer = await sharp(svgBuffer).resize(48, 48).png().toBuffer();
  const png32Buffer = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
  const png16Buffer = await sharp(svgBuffer).resize(16, 16).png().toBuffer();

  // ICO header for 3 images
  const icoHeader = Buffer.alloc(6);
  icoHeader.writeUInt16LE(0, 0); // reserved
  icoHeader.writeUInt16LE(1, 2); // ICO type
  icoHeader.writeUInt16LE(3, 4); // 3 images

  const images = [
    { width: 48, height: 48, buffer: png48Buffer },
    { width: 32, height: 32, buffer: png32Buffer },
    { width: 16, height: 16, buffer: png16Buffer },
  ];

  let offset = 6 + (16 * images.length);
  const directoryEntries = [];

  for (const img of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(img.width === 256 ? 0 : img.width, 0);
    entry.writeUInt8(img.height === 256 ? 0 : img.height, 1);
    entry.writeUInt8(0, 2); // color palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(img.buffer.length, 8); // size of image data
    entry.writeUInt32LE(offset, 12); // offset of image data
    directoryEntries.push(entry);
    offset += img.buffer.length;
  }

  const icoBuffer = Buffer.concat([
    icoHeader,
    ...directoryEntries,
    ...images.map(img => img.buffer)
  ]);

  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  console.log('✓ Created public/favicon.ico (Multi-size: 48x48, 32x32, 16x16)');

  console.log('\nAll favicons generated successfully!');
}

generateFavicons().catch(err => {
  console.error('Error generating favicons:', err);
  process.exit(1);
});
