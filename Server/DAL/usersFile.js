const fs = require('fs');
const path = require('path')
const jFile = require("jsonfile")
const filePath = path.join(__dirname, '../DATA/person.json')



const getAllPersons = async () => {
  try {
    const data = await fs.promises.readFile(filePath, 'utf8');
    const parsedData = JSON.parse(data);
    return parsedData.persons;
  } catch (error) {
    console.log(error);
    return null; // or throw an error if needed
  }
};
const getPersonById = async (ids) => {
  try {
    const parsedData = await jFile.readFile(filePath);

    const persons = parsedData.persons.filter((person) => ids.includes(person.id));
    return persons;
  } catch (error) {
    console.log(error);
    return null; // or throw an error if needed
  }
};
const getPersonPermmisionsById = async (ids) => {
  try {
    const parsedData = await jFile.readFile(filePath);
   
    const person = parsedData.persons.find((per) => per.id == ids );
    return person.permissions;
  } catch (error) {
    console.log(error);
    return null; // or throw an error if needed
  }
};










module.exports = { getAllPersons,getPersonById ,getPersonPermmisionsById};