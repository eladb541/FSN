const MemberModel = require("../models/MemberModel");

const getAllMembers = async () => {
  const members = await MemberModel.find({});
  return members;
};

const putMembersInDB = async (members) => {
  members.forEach(async (m) => {
    const newMember = {
      name: m.name,
      email: m.email,
      city: m.address.city
    };

    const finalMember = new MemberModel(newMember);
    await finalMember.save();
  });
};

const addMember = async (obj) => {
  const member = new MemberModel(obj);
  await member.save();
  return "created";
};

const deleteMember = async (externalId) => {
  await MemberModel.deleteOne({ _id: externalId });
  return 'Deleted!';
};

const updateMember = async (externalId, obj) => {
  await MemberModel.updateOne({ _id: externalId }, obj);

  return 'Updated!';
};



module.exports = { getAllMembers, putMembersInDB, addMember, deleteMember,updateMember };
