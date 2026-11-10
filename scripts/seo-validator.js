import fs from 'node:fs';
import path from 'node:path';

console.log('--- STARTING TECHNICAL SEO VALIDATION ---');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`✓ PASS: ${message}`);
    passed++;
  } else {
    console.error(`✗ FAIL: ${message}`);
    failed++;
  }
}

// 1. Robots.txt
const robotsPath = path.resolve('public/robots.txt');
assert(fs.existsSync(robotsPath), 'public/robots.txt exists');
const robotsContent = fs.readFileSync(robotsPath, 'utf8');
assert(robotsContent.includes('Sitemap: https://lobbodrinks.com/sitemap.xml'), 'robots.txt references sitemap.xml');
assert(robotsContent.includes('Allow: /'), 'robots.txt allows crawling public routes');

// 2. Sitemap.xml
const sitemapPath = path.resolve('public/sitemap.xml');
assert(fs.existsSync(sitemapPath), 'public/sitemap.xml exists');
const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
assert(sitemapContent.includes('<loc>https://lobbodrinks.com/</loc>'), 'sitemap contains homepage');
assert(sitemapContent.includes('<loc>https://lobbodrinks.com/#products</loc>'), 'sitemap contains products section');
assert(sitemapContent.includes('<loc>https://lobbodrinks.com/#bulk</loc>'), 'sitemap contains bulk section');
assert(sitemapContent.includes('<loc>https://lobbodrinks.com/#faq</loc>'), 'sitemap contains FAQ section');
assert(sitemapContent.includes('<loc>https://lobbodrinks.com/#contact</loc>'), 'sitemap contains contact section');

// 3. OG Image & Webmanifest
const ogImagePath = path.resolve('public/og-image.jpg');
assert(fs.existsSync(ogImagePath), 'public/og-image.jpg exists');
const ogStats = fs.statSync(ogImagePath);
assert(ogStats.size > 10000, `og-image.jpg has valid size (${ogStats.size} bytes)`);

const manifestPath = path.resolve('public/site.webmanifest');
assert(fs.existsSync(manifestPath), 'public/site.webmanifest exists');

// 4. index.html Metadata & Schema validation
const indexPath = path.resolve('index.html');
const indexHtml = fs.readFileSync(indexPath, 'utf8');

assert(indexHtml.includes('<title>Lobbo Beverages | Refreshing Drinks in Ghana</title>'), 'Homepage title matches prompt');
assert(
  indexHtml.includes('Discover Lobbo Beverages and explore our refreshing drinks. Experience quality, great taste and convenient ordering in Ghana.'),
  'Homepage meta description matches prompt'
);
assert(indexHtml.includes('<link rel="canonical" href="https://lobbodrinks.com/" />'), 'Canonical URL matches prompt');
assert(indexHtml.includes('property="og:image" content="https://lobbodrinks.com/og-image.jpg"'), 'OpenGraph image set to og-image.jpg');
assert(indexHtml.includes('name="twitter:card" content="summary_large_image"'), 'Twitter card set to summary_large_image');
assert(indexHtml.includes('lang="en-GH"'), 'HTML lang set to en-GH for Ghanaian market');

// Validate JSON-LD Schema
const schemaMatch = indexHtml.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
assert(schemaMatch !== null, 'JSON-LD schema script found in index.html');

if (schemaMatch) {
  try {
    const jsonLd = JSON.parse(schemaMatch[1]);
    assert(jsonLd['@context'] === 'https://schema.org', 'Schema @context is https://schema.org');
    const graph = jsonLd['@graph'];
    assert(Array.isArray(graph) && graph.length >= 6, `Schema @graph contains ${graph?.length} entities`);

    const types = graph.map((e) => e['@type']);
    assert(types.includes('Organization'), 'Organization schema present');
    assert(types.includes('WebSite'), 'WebSite schema present');
    assert(types.includes('FoodEstablishment'), 'LocalBusiness (FoodEstablishment) schema present');
    assert(types.includes('Product'), 'Product schema present');
    assert(types.includes('FAQPage'), 'FAQPage schema present');
    assert(types.includes('BreadcrumbList'), 'BreadcrumbList schema present');
  } catch (err) {
    assert(false, `JSON-LD failed to parse: ${err.message}`);
  }
}

// 5. vercel.json
const vercelPath = path.resolve('vercel.json');
assert(fs.existsSync(vercelPath), 'vercel.json exists');
const vercelConfig = JSON.parse(fs.readFileSync(vercelPath, 'utf8'));
assert(Array.isArray(vercelConfig.headers), 'vercel.json has security headers');
assert(Array.isArray(vercelConfig.redirects), 'vercel.json has www redirect rule');
assert(Array.isArray(vercelConfig.rewrites), 'vercel.json has SPA rewrites rule');

// 6. .env.example
assert(fs.existsSync(path.resolve('.env.example')), '.env.example exists');

console.log(`\n========================================`);
console.log(`SEO Validation Complete: ${passed} Passed, ${failed} Failed`);
console.log(`========================================`);

if (failed > 0) {
  process.exit(1);
}

