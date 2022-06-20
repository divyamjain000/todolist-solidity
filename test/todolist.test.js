const todolist=artifacts.require('./todolist.sol');

contract('todolist',(accounts)=>{
    before(async()=>{
        this.todolist=await todolist.deployed();
    })
    it('deploys a contract',async()=>{
        const address = await this.todolist.address
        assert.notEqual(address, 0x0)
        assert.notEqual(address, '')
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
    })
    it('list tasks',async()=>{
        const count=await this.todolist.count();
        const task=await this.todolist.tasks(count);
        assert.equal(task.id.toNumber(),count.toNumber());
        assert.equal(task.content,'I am awesome');
        assert.equal(task.completed,false);
        assert.equal(count.toNumber(),1);

    })
    it('create tasks', async()=>{
        const result=await this.todolist.createTask('I am awesome');
        const taskCount=await this.todolist.count();
        assert.equal(taskCount,2);
        console.log(result);
        const event=result.logs[0].args;
        assert.equal(event.id.toNumber(),2);
        assert.equal(event.content,'I am awesome');
        assert.equal(event.completed,false);
    }) 
    it('toggles task completion', async () => {
        const result = await this.todolist.toggleCompleted(1)
        const task = await this.todolist.tasks(1)
        assert.equal(task.completed, true)
        const event = result.logs[0].args
        assert.equal(event.id.toNumber(), 1)
        assert.equal(event.completed, true)
      })
})