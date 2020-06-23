const fs = require('fs');
const path = require('path');

const baseUrl = 'http://localhost:3000';

function isPageFile(filename) {
  return (
    path.extname(filename) === '.html' &&
    !filename.startsWith('_') &&
    !filename.endsWith('404.html')
  );
}

function getBuildId() {
  return fs.readFileSync('./.next/BUILD_ID', 'utf8');
}

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

function printDir(dir) {
  try {
    console.log(`Checking ${dir}:`);
    console.log(fs.readdirSync(dir));
  } catch (e) {
    console.log('Not found');
  }
}

async function main() {
  // fs.writeFileSync(
  //   path.join('./.next/static', 'feed.json'),
  //   JSON.stringify({ test: 'ing' })
  // );
  const buildId = getBuildId();
  console.log(buildId);
  // const pagesDir = `./.next/serverless/static/${buildId}`;

  printDir(`./.next/serverless/${buildId}`);
  printDir(`./.next/static/${buildId}`);
  printDir(`./.next/serverless/${buildId}/static`);
  printDir(`./.next/serverless/${buildId}/static/pages`);
  printDir(`./.next/serverless/${buildId}/pages`);
  printDir(`./.next/static/${buildId}/pages`);
  // const pageFiles = getPageFiles(pagesDir);
  // const data = pageFiles.map(file => {
  //   const relativeUrl = path.relative(pagesDir, file).slice(0, -'.html'.length);
  //   const url =
  //     relativeUrl === 'index' ? baseUrl : new URL(relativeUrl, baseUrl).href;
  //   // let rssItem;
  //   // if (relativeUrl.startsWith('blog')) {
  //   // }
  //   return {
  //     url,
  //     // rssItem,
  //   };
  // });

  // console.log(data);
}

main();
