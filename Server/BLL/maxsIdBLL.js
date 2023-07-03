const MaxsidModel = require("../models/MaxSIdModel");

const getAllmaxsid = async () => {
  const maxsid = await MaxsidModel.findOne({});
  return maxsid;
};

// PUT - Update
const updateallmax = async (obj) => {
  await MaxsidModel.findOneAndUpdate({ _id: obj._id }, obj);
  return 'Updated maxsid!';
};


module.exports = { getAllmaxsid ,updateallmax};
