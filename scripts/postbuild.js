const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

// const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

console.log(process.env.BASE_URL);

function isPageFile(filename) {
  return (
    path.extname(filename) === '.html' &&
    !filename.startsWith('_') &&
    !filename.endsWith('404.html')
  );
}

// function getBuildId() {
//   return fs.readFileSync('./.next/BUILD_ID', 'utf8');
// }

function getPageFiles(directory, files = []) {
  const entries = fs.readdirSync(directory, { withFileTypes: true });
  entries.forEach(entry => {
    const absolutePath = path.resolve(directory, entry.name);
    if (entry.isDirectory()) {
      getPageFiles(absolutePath, files);
    } else if (isPageFile(absolutePath)) {
      files.push(absolutePath);
    }
  });
  return files;
}

// function buildSiteMap() {}
function buildRss(pageFiles, pagesDir) {
  const rssData = pageFiles.reduce(
    (data, file) => {
      const relativeUrl = path
        .relative(pagesDir, file)
        .slice(0, -'.html'.length);
      if (relativeUrl === 'index') {
        const htmlString = fs.readFileSync(file, 'utf8');
        const $ = cheerio.load(htmlString);
        data.title = $('title').text();
        data.home_page_url = $(`meta[property='og:url']`).attr('content');
        data.feed_url = $(
          `link[rel='alternate'][type='application/json']`
        ).attr('href');
        data.description = $(`meta[name='description']`).attr('content');
        data.icon = $(`link[sizes='256x256']`).attr('href');
        data.favicon = $(`link[sizes='64x64']`).attr('href');
        data.author = {
          name: $(`a[rel='author']`).text(),
          url: $(`a[rel='author']`).attr('href'),
          avatar: $(`img#Avatar`).attr('src'),
        };
      }
      if (relativeUrl.startsWith('blog')) {
        const htmlString = fs.readFileSync(file, 'utf8');
        const $ = cheerio.load(htmlString);
        data.items.push({
          url: $(`meta[property='og:url']`).attr('content'),
          id: relativeUrl.substring('blog/'.length),
          content_html: $('#Content').html(),
          title: $('h1').text(),
          summary: $(`meta[name='description']`).attr('content'),
          image: $(`meta[property='og:image']`).attr('content'),
          banner_image: $(`meta[property='og:image']`).attr('content'),
          date_published: $('time').attr('datetime'),
          author: {
            name: $(`a[rel='author']`).text(),
            url: $(`a[rel='author']`).attr('href'),
            avatar: $(`img#Avatar`).attr('src'),
          },
        });
      }
      return data;
    },
    {
      version: 'https://jsonfeed.org/version/1',
      items: [],
    }
  );
  fs.writeFileSync(
    path.join('./.next/static', 'feed.json'),
    JSON.stringify(rssData)
  );
}

// function filePathToUrl(file, pagesDir) {
//   const relativeUrl = path.relative(pagesDir, file).slice(0, -'.html'.length);
//   return relativeUrl === 'index' ? baseUrl : new URL(relativeUrl, baseUrl).href;
// }

async function main() {
  // const buildId = getBuildId();
  // const pagesDir = `./.next/server/static/${buildId}/pages`;
  const pagesDir = `./.next/serverless/pages`;
  const pageFiles = getPageFiles(pagesDir);
  // buildSiteMap(pageFiles, pagesDir);
  buildRss(pageFiles, pagesDir);
}

main();
