
const jwt = require('jsonwebtoken');

const checkgene = async (obj) => {
  const { secretKeyToCompare, mysession } = obj;

  try {
    const decoded = jwt.verify(mysession, secretKeyToCompare);
    if (decoded) {
      return { status: 202,  isauto:true };
    }
    else{
        return { status: 404, isauto:false ,msg:"the session does not correct"};
    }

  } catch (error) {
    console.error(error);
    return { status: 500, isauto:false ,msg:"server  error"};
  }
};


const checkmovies = async (obj) => {
  try{
  const { secretKeyToCompare, mysession } = obj;
  const decodedToken = jwt.verify(mysession, secretKeyToCompare, { algorithms: ['HS256'] });
  const { permissions } = decodedToken;
  const permissionsArray = Object.entries(permissions);
  const firstFourPermissions = permissionsArray.slice(8, 12);
  const result = Object.fromEntries(firstFourPermissions);
  return result;
} catch (error) {
  // If there's an error during decoding or verification, return null or handle the error as needed
  console.error('Error decoding token:', error.message);
  return null;
}
}

const checkmembers = async (obj) => {
  try{
  const { secretKeyToCompare, mysession } = obj;
  const decodedToken = jwt.verify(mysession, secretKeyToCompare, { algorithms: ['HS256'] });
  const { permissions } = decodedToken;
  const permissionsArray = Object.entries(permissions);
  const firstFourPermissions = permissionsArray.slice(0, 4);
  const result = Object.fromEntries(firstFourPermissions);
  return result;
} catch (error) {
  // If there's an error during decoding or verification, return null or handle the error as needed
  console.error('Error decoding token:', error.message);
  return null;
}
}

const checksub = async (obj) => {
  try{
  const { secretKeyToCompare, mysession } = obj;
  const decodedToken = jwt.verify(mysession, secretKeyToCompare, { algorithms: ['HS256'] });
  const { permissions } = decodedToken;
  const permissionsArray = Object.entries(permissions);
  const firstFourPermissions = permissionsArray.slice(4, 8);
  const result = Object.fromEntries(firstFourPermissions);
  return result;
} catch (error) {
  // If there's an error during decoding or verification, return null or handle the error as needed
  console.error('Error decoding token:', error.message);
  return null;
}
}

const checkadmin = async (obj) => {
  try {
    const { secretKeyToCompare, mysession } = obj;
    const decodedToken = jwt.verify(mysession, secretKeyToCompare, { algorithms: ['HS256'] });
    const { permissions } = decodedToken;
    const isAdmin =  permissions.Admin === true;
    return isAdmin;
  } catch (error) {
    // If there's an error during decoding or verification, return false or handle the error as needed
    console.error('Error decoding token:', error.message);
    return false;
  }
};


const checkaddmember = async (obj) => {
  try {
    const { secretKeyToCompare, mysession } = obj;
    const decodedToken = jwt.verify(mysession, secretKeyToCompare, { algorithms: ['HS256'] });
    const { permissions } = decodedToken;
    const isAdmin =  permissions.creatM === true;
    return isAdmin;
  } catch (error) {
    // If there's an error during decoding or verification, return false or handle the error as needed
    console.error('Error decoding token:', error.message);
    return false;
  }
};

const checkaddmovie = async (obj) => {
  try {
    const { secretKeyToCompare, mysession } = obj;
    const decodedToken = jwt.verify(mysession, secretKeyToCompare, { algorithms: ['HS256'] });
    const { permissions } = decodedToken;
    const isAdmin =  permissions.creatMo === true;
    return isAdmin;
  } catch (error) {
    // If there's an error during decoding or verification, return false or handle the error as needed
    console.error('Error decoding token:', error.message);
    return false;
  }
};

const checkaddsub = async (obj) => {
  try {
    const { secretKeyToCompare, mysession } = obj;
    const decodedToken = jwt.verify(mysession, secretKeyToCompare, { algorithms: ['HS256'] });
    const { permissions } = decodedToken;
    const isAdmin =  permissions.subC === true;
    return isAdmin;
  } catch (error) {
    // If there's an error during decoding or verification, return false or handle the error as needed
    console.error('Error decoding token:', error.message);
    return false;
  }
};


const namecoded = async (obj) => {
  try {
    const { secretKeyToCompare, mysession } = obj;
    const decodedToken = jwt.verify(mysession, secretKeyToCompare, { algorithms: ['HS256'] });
    const { username } = decodedToken;
    
    return {username:username};
  } catch (error) {
    // If there's an error during decoding or verification, return false or handle the error as needed
    console.error('Error decoding token:', error.message);
    return {username:null};
  }
};




module.exports = { checkgene,checkmovies,checkmembers,checksub,checkadmin,checkaddmember,checkaddmovie,checkaddsub,namecoded };

