const { spawn } = require("child_process");
const jsonParser = require("xml2json");

const nmapWorker = async (domain, commandStr) => {
  const command = commandStr || "nmap -T4 -A -v -sV -oX";
  const spawnCommand = `${command} - ${domain}`;

  // Spawn new process
  const response = [];
  const operation = spawn(spawnCommand, {
    shell: true
  });

  const result = await new Promise((resolve, reject) => {
    operation.stdout.on("data", async data => {
      const dataStr = data.toString("utf-8");
      response.push({ data: dataStr });
    });

    operation.on("close", async code => {
      resolve(response.map(el => el.data).join(""));
    });
  });

  return result;
};

module.exports.nmapScan = async (domain, commandStr) => {
  const nmapRes = await nmapWorker(domain, commandStr);
  const jsonData = JSON.parse(jsonParser.toJson(nmapRes));

  const serverUtils = Array.isArray(jsonData.nmaprun.host.ports.port)
    ? jsonData.nmaprun.host.ports.port
    : [jsonData.nmaprun.host.ports.port];
  return serverUtils;
};
