const fs = require('fs');
const path = require('path');
const jFile = require('jsonfile');
const filePath = path.join(__dirname, '../DATA/person.json');

const getAllPersonsP = async () => {
  try {
    const parsedData = await jFile.readFile(filePath);
    return parsedData;
  } catch (error) {
    console.log(error);
    return null; // or throw an error if needed
  }
};

const getPersonByIdP = async (ids) => {
  try {
    const parsedData = await jFile.readFile(filePath);
    const persons = parsedData.persons.filter((per) => per.id == ids);
    return persons;
  } catch (error) {
    console.log(error);
    return null; // or throw an error if needed
  }
};

const getPersonPermmisionsById = async (ids) => {
  try {
    const parsedData = await jFile.readFile(filePath);
    const person = parsedData.persons.find((per) => per.id == ids);
    return person.permissions;
  } catch (error) {
    console.log(error);
    return null; // or throw an error if needed
  }
};

const addPersonToJSONP = async (person) => {
  try {
    const parsedData = await jFile.readFile(filePath);

    // Add the received person object to the persons array
    parsedData.persons.push(person);

    // Write the updated data back to the JSON file
    await jFile.writeFile(filePath, parsedData);

    return "added";
  } catch (error) {
    console.log(error);
    throw error; // Throw the error to be caught by the calling function
  }
};

const deletePersonByIdP = async (id) => {
  try {
    const parsedData = await jFile.readFile(filePath);

    // Find the index of the person with the provided ID
    const index = parsedData.persons.findIndex((person) => person.id === id);

    // Remove the person object from the array if found
    if (index !== -1) {
      parsedData.persons.splice(index, 1);
      await jFile.writeFile(filePath, parsedData);
      return "delete";
    } else {
      throw new Error("Person not found.");
    }
  } catch (error) {
    console.log(error);
    throw error; // Throw the error to be caught by the calling function
  }
};

const updateMemberPermissionsById = async (id, permissions) => {
  try {
    const parsedData = await jFile.readFile(filePath);
    const persons = parsedData.persons;
    
    for (let i = 0; i < persons.length; i++) {
      const person = persons[i];
      if (person.id === id) {
        person.permissions = permissions;
        await jFile.writeFile(filePath, parsedData);
        return 'update';
      }
    }
    
    throw new Error('Member not found.');
  } catch (error) {
    console.log(error);
    throw error; // Throw the error to be caught by the calling function
  }
};













module.exports = {
  getAllPersonsP,
  getPersonByIdP,
  getPersonPermmisionsById,
  addPersonToJSONP,
  deletePersonByIdP,
  updateMemberPermissionsById
};
