const { parseNvdPage, nmapScan } = require("./src");

// Use domain
const domain = process.argv[2];

// TODO: Use nmap scan
const init = async domain => {
  // Nmap
  await nmapScan("fulcrum.rocks");

  // Parse
  parseNvdPage(
    "https://nvd.nist.gov/vuln/detail/CVE-2013-2070#vulnCurrentDescriptionTitle",
    "nginx"
  );
};

init(domain);
