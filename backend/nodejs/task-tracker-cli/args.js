const TaskManager = require("./task-manager");
const taskManager = new TaskManager();


function parseArg(op, data) {
  try{
  switch (op) {
    case "add":
      taskManager.add(data[3]);
      break;

    case "delete":
      taskManager.delete(data[3]);
      break;

    case "update":
      taskManager.update(data[3],data[4]);
      break;

    case "mark-done":
      taskManager.markDone(data[3]);    
      break;
      
    case "mark-in-progress":
      taskManager.markInProgress(data[3]);
      break;
      
    case "mark-todo":
      taskManager.markTodo(data[3]);
      break;
      
    case "list-all":
      taskManager.listAll();
      break;

    case "list-in-progress":
      taskManager.listInProgress();
      break;

    case "list-done":
      taskManager.listDone();
      break;

    case "list-todo":
      taskManager.listTodo();
      break;
      
    default:
      help();
      break;
  }
  }catch(err){
    console.error(err.message);
  }
}

function help(){
  const help={
    add:"description",
    delete:"id",
    update:"id description",
    "list-all":"",
    "list-todo":"",
    "list-in-progress":"",
    "list-done":"",
    "mark-done":"id",
    "mark-in-progress":"id",
    "mark-todo":"id",
  }
  console.log("\tTask-CLI Commands");
  for(let key of Object.keys(help)){
    console.log("\t\t",key + " " +help[key]);
  }
}

module.exports={parseArg};
