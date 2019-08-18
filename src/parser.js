const cheerio = require("cheerio");
const fetch = require("node-fetch");

module.exports.parseNvdPage = async (url, tool) => {
  // Get html
  const res = await fetch(url);
  const html = await res.text();

  // Init cheerio
  const $ = cheerio.load(html);

  // Parse result
  const title = `Issue with ${tool}`;
  const statusRes = $(
    "span[data-testid=vuln-cvssv2-base-score-severity]"
  ).text();
  const status = `${statusRes[0]}${statusRes.substring(1).toLocaleLowerCase()}`;
  const description = $("p[data-testid=vuln-description]").text();

  const result = {
    title,
    status,
    description,
    solution: `Update or replace ${tool}. More info: ${url}`
  };
  console.log(result);
  return result;
};
