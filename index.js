const { parseNvdPage, nmapScan } = require("./src");

// Use domain
const domain = process.argv[2];

// TODO: Use nmap scan
const init = async domain => {
  // Nmap
  const serverUtils = await nmapScan(domain);

  // Find issues in NVD
  const result = [];
  for (let key in serverUtils) {
    const util = serverUtils[key];
    const res = await parseNvdPage(
      `https://nvd.nist.gov/vuln/search/results?adv_search=true&cpe=${
        util.service.cpe
      }`,
      util.service.product
    );
    result.push(res);
  }

  console.log(result);
};

init(domain);
