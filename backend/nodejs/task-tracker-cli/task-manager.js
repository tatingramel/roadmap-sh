const { writeDb, readDb, createDb, isIdExist } = require("./database");
const Task = require("./task");
const status = require("./status");

class TaskManager {
  constructor() {
    createDb();
    const db = readDb();
    this.db = JSON.parse(db);
  }

  add(description) {
    this.db.length++;
    this.db.counter++;
    const task = new Task(this.db.counter, description, status.todo);
    this.db.tasks[`task${task.id}`] = task.data();
    writeDb(JSON.stringify(this.db));
    console.log(this.db);
  }

  delete(id) {
    this.isExist(id, "failed to delete: id not on database");
    delete this.db.tasks[`task${id}`];
    this.db.length--;
    writeDb(JSON.stringify(this.db));
    console.log(this.db);
  }

  update(id, description) {
    this.isExist(id, "id not in the database");
    this.db.tasks[`task${id}`].description = description;
    this.db.tasks[`task${id}`].updatedAt = new Date(Date.now()).toLocaleString();
    writeDb(JSON.stringify(this.db));
    console.log(this.db);
  }

  isExist(id, errorMsg = "[!]", isOperational = false) {
    if (!isIdExist(id)) {
      if (!isOperational) {
        throw Error(errorMsg);
      } else {
        return false;
      }
    }
    return true;
  }

  //mark a task as in-progress or done  
  markInProgress(id) {
    this.mark(id,status.pending);
  }
  markTodo(id) {
    this.mark(id,status.todo);
      }
  markDone(id){
    this.mark(id,status.done);
  }

  mark(id,stats) {
    this.isExist(id, "id not in database");
    this.db.tasks[`task${id}`].updatedAt = new Date(Date.now()).toLocaleString();
    this.db.tasks[`task${id}`].status = stats;
    writeDb(JSON.stringify(this.db))
    console.log(this.db);
  }
  //list all task
  listAll() {
    let counter = 1;
    let length = this.db.counter;
    const db = this.db.tasks;
    while (counter <= length) {
      if (this.isExist(counter, "", true)) {
        console.log(db[`task${counter}`].description, " === ", db[`task${counter}`].status, " === ", db[`task${counter}`].id);
      }
      counter++;
    }
  }


  list(status) {
    let counter = 1;
    let length=this.db.counter;
    const db = this.db.tasks;
    while (counter <= length) {
      if (this.isExist(counter, "", true)) {
        if (db[`task${counter}`].status == status) {
          console.log(db[`task${counter}`].description, " === ", db[`task${counter}`].status, " === ", db[`task${counter}`].id);
        }
      }
      counter++;
    }
  }

  listDone() {
    this.list(status.done);
  }

  listInProgress() {
    this.list(status.pending);
  }

  listTodo() {
    this.list(status.todo);
  }

}

if (require.main === module) {
  const taskManager = new TaskManager();
  try {
    //taskManager.add("task1")
    //taskManager.delete(5);
    //taskManager.update(8, status.done);
    //taskManager.markInProgress(10);
    //taskManager.markDone(2);
    taskManager.update(2,"task2");
    taskManager.markInProgress(4);
    taskManager.listAll();
  } catch (err) {
    console.error(err.message);
  }
}
module.exports=TaskManager;
