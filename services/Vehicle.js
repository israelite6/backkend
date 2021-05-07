const fetch = require("node-fetch");

const getVehicle = async () => {
  const rawResponse = await fetch(
    "https://api.helbiz.com/admin/reporting/arlington/gbfs/free_bike_status.json"
  );
  const jsonResponse = await rawResponse.json();
  return jsonResponse;
};

module.exports = getVehicle;
