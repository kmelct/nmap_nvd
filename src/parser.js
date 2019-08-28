const cheerio = require("cheerio");
const fetch = require("node-fetch");

module.exports.parseNvdPage = async (url, tool) => {
  // Get html
  const res = await fetch(url);
  const html = await res.text();

  // Init cheerio
  let $ = cheerio.load(html);
  const linkToIssue = $("a[data-testid=vuln-detail-link-0]").attr("href");
  if (!linkToIssue) return [];

  const pageUrl = `https://nvd.nist.gov${linkToIssue}`;
  const page = await fetch(pageUrl);
  const pageHtml = await page.text();

  // Parse result
  $ = cheerio.load(pageHtml);
  const title = `Issue with ${tool}`;
  const statusRes = $(
    "span[data-testid=vuln-cvssv2-base-score-severity]"
  ).text();

  const status = `${statusRes[0]}${statusRes.substring(1).toLocaleLowerCase()}`;
  const description = $("p[data-testid=vuln-description]").text();

  const result = {
    title,
    status: status,
    description,
    solution: `Update or replace ${tool}. More info: ${pageUrl}`
  };

  return result;
};
