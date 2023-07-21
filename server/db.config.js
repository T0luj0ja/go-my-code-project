const dbName = 'food-ordering-app';
const dbHost = 'localhost';
const dbPort = 27017;


module.export = {
    url : `mongodb:// ${dbHost}: ${dbPort}/${dbName}`
}