const subModel = require("../models/SubscribeModel");

const getAllsub = async () => {
  const subs = await subModel.find({});
  return subs;
};



const addsub = async (obj) => {
  const sub = new subModel(obj);
  await sub.save();
  return "created";
};

const deletesub = async (externalId) => {
  await subModel.deleteOne({ _id: externalId });
  return 'Deleted!';
};

const updatesub = async (externalId, obj) => {
  await subModel.updateOne({ _id: externalId }, obj);

  return 'Updated!';
};



module.exports = { getAllsub, addsub, deletesub, updatesub };
