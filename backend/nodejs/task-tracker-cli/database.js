const fs = require("node:fs");
const path = require("path");

const dbPath = path.join(__dirname, "tasks-db.json");
let db = {
  length: 0,
  counter: 0,
  tasks: {}
}
db = JSON.stringify(db);

function readDb() {
  return fs.readFileSync(dbPath, "utf-8");
}

function createDb() {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, db);
  }
}

function writeDb(data) {
  fs.writeFileSync(dbPath, data);
}

function isIdExist(id) {
  let counter = 1;
  let db = readDb();
  db=JSON.parse(db);
  while (counter <= db.counter) {
    //console.log(db.tasks[`tasks${counter}`]?.id);
    if (id == db.tasks[`task${counter}`]?.id) {
      return true;
    }
    counter++;
  }
  return false;
}
module.exports = { writeDb, readDb, createDb, isIdExist };
