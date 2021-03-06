const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");

function isPageFile(filename) {
  return path.extname(filename) === ".html" && !filename.endsWith("404.html");
}

function getBuildId() {
  return fs.readFileSync("./.next/BUILD_ID", "utf8");
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

function buildSiteMap(pageFiles) {
  const urls = pageFiles.map(file => {
    const htmlString = fs.readFileSync(file, "utf8");
    const $ = cheerio.load(htmlString);
    return $(`meta[property='og:url']`).attr("content");
  });
  const sitemap = `
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
  xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" 
  xmlns:xhtml="http://www.w3.org/1999/xhtml" 
  xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" 
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" 
  xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  ${urls
    .map(
      url => `
    <url>
      <loc>${url}</loc>
      <changefreq>daily</changefreq>
      <priority>0.7</priority>
    </url>
    `,
    )
    .join("")}  
</urlset>
`;
  fs.writeFileSync(path.join("./.next/static", "sitemap.xml"), sitemap);
}

function byDateDesc(a, b) {
  const date1 = new Date(a.date_published);
  const date2 = new Date(b.date_published);
  if (date1 > date2) return -1;
  if (date1 < date2) return 1;
  return 0;
}

function buildRss(pageFiles, pagesDir) {
  const rssData = pageFiles.reduce(
    (data, file) => {
      const pathname = path.relative(pagesDir, file).slice(0, -".html".length);
      if (pathname === "index") {
        const htmlString = fs.readFileSync(file, "utf8");
        const $ = cheerio.load(htmlString);
        data.title = $("title").text();
        data.home_page_url = $(`meta[property='og:url']`).attr("content");
        data.feed_url = $(
          `link[rel='alternate'][type='application/json']`,
        ).attr("href");
        data.description = $(`meta[name='description']`).attr("content");
        data.icon = $(`link[sizes='512x512']`).attr("href");
        data.favicon = $(`link[sizes='64x64']`).attr("href");
        data.author = {
          name: $(`a[rel='author']`).text(),
          url: $(`a[rel='author']`).attr("href"),
          avatar: $(`img#Avatar`).attr("src"),
        };
      }
      if (pathname.startsWith("blog")) {
        const htmlString = fs.readFileSync(file, "utf8");
        const $ = cheerio.load(htmlString);
        $(`#Content img[aria-hidden='true']`).remove();
        data.items.push({
          url: $(`meta[property='og:url']`).attr("content"),
          id: pathname.substring("blog/".length),
          content_html: $("#Content").html(),
          title: $("article h1").text(),
          summary: $(`meta[name='description']`).attr("content"),
          image: $(`meta[property='og:image']`).attr("content"),
          banner_image: $(`meta[property='og:image']`).attr("content"),
          date_published: $("time").attr("datetime"),
          author: {
            name: $(`a[rel='author']`).text(),
            url: $(`a[rel='author']`).attr("href"),
            avatar: $(`img#Avatar`).attr("src"),
          },
        });
      }
      return data;
    },
    {
      version: "https://jsonfeed.org/version/1",
      items: [],
    },
  );
  rssData.items.sort(byDateDesc);
  fs.writeFileSync(
    path.join("./.next/static", "feed.json"),
    JSON.stringify(rssData, null, 2),
  );
}

function main() {
  // 'pages' location in Vercel environment
  let pagesDir = "./.next/serverless/pages";
  if (!fs.existsSync(pagesDir)) {
    // 'pages' location in local environment
    pagesDir = `./.next/server/static/${getBuildId()}/pages`;
  }
  const pageFiles = getPageFiles(pagesDir);
  buildRss(pageFiles, pagesDir);
  buildSiteMap(pageFiles);
}

main();
