import { writeFileSync } from 'fs';
import { SitemapStream, streamToPromise } from 'sitemap';
import path from 'path';
import fs from 'fs';

const hostname = 'https://theater-grosskirchheim.at';

const dataPath = path.resolve('./src/data/vorstellungen.json');
const vorstellungenData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

const urls = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/kontakt', changefreq: 'weekly', priority: 0.8 },
  { url: '/vorstellungen', changefreq: 'daily', priority: 0.9 },
];

Object.keys(vorstellungenData).forEach(id => {
  urls.push({
    url: `/vorstellungen/${id}`,
    changefreq: 'weekly',
    priority: 0.7
  });
});

const sitemap = new SitemapStream({ hostname });
urls.forEach(u => sitemap.write(u));
sitemap.end();

streamToPromise(sitemap).then(sm => {
  writeFileSync('public/sitemap.xml', sm);
  console.log('Sitemap erfolgreich erstellt: public/sitemap.xml');
});

