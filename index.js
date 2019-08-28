const { parseNvdPage, nmapScan } = require("./src");

// Use domain
const domain = process.argv[2];

const filterObj = objectsArray => {
  var usedObjects = {};

  for (var i = objectsArray.length - 1; i >= 0; i--) {
    var so = JSON.stringify(objectsArray[i]);

    if (usedObjects[so]) {
      objectsArray.splice(i, 1);
    } else {
      usedObjects[so] = true;
    }
  }

  return objectsArray;
};

// TODO: Use nmap scan
const init = async domain => {
  // Nmap
  const serverUtils = await nmapScan(domain);

  // Find issues in NVD
  const result = [];
  for (let key in serverUtils) {
    const util = serverUtils[key];
    if (!util.service.cpe) continue;
    const res = await parseNvdPage(
      `https://nvd.nist.gov/vuln/search/results?adv_search=true&query=${util.service.cpe}&cvss_version=2`,
      util.service.product
    );
    result.push(res);
  }

  console.log(JSON.stringify(filterObj(result.filter(el => !!el.status))));
};

init(domain);
