const MaxsidModel = require("../models/MaxSIdModel");

const getAllmaxsid = async () => {
  const maxsid = await MaxsidModel.find({});
  return maxsid;
};

module.exports = { getAllmaxsid };
