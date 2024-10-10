
class Task{
  constructor(id,description,status){
    this.id=id;
    this.description=description;
    this.status=status;
    this.createdAt=new Date(Date.now()).toLocaleString();
    this.updatedAt="Not updated";
  }

  changeStatus(status){
    this.status=status;
    this.updatedAt=new Date(Date.now()).toLocaleString();
  }
  data(){
    return {
      id:this.id,
      description:this.description,
      status:this.status,
      createdAt:this.createdAt,
      updatedAt:this.updatedAt
    }
  }
}

if(require.main===module){
  const task1=new Task(1,"task1","todo",Date.now());
  task1.changeStatus("done");
  console.log("created at ",task1.createdAt);
  console.log("status ",task1.status);
  console.log("updated at ",task1.updatedAt);
}
module.exports=Task;
