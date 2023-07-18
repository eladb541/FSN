const sessionK = require("../models/sessionKey");

const getsessioonkey = async () => {
try{
const sk = await sessionK.findOne({});
return sk;
}
  catch (error) {
    console.error(error);
    return { status: 500, msg: 'Server error' };
  }
};




module.exports = { getsessioonkey };
