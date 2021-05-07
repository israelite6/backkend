const { VehicleService: getVehicle } = require("./../services");

const Vehicle = async (parent, { id }, context) => {
  console.log(id);
  const {
    last_updated,
    ttl,
    data: { bikes },
  } = await getVehicle();

  if (id) {
    return bikes.filter((bike) => bike.bike_id === id);
  }

  return bikes;
};

module.exports = Vehicle;
