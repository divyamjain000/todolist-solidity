pragma solidity ^0.8.14;

contract todolist{
    uint public count=0;

    struct Task{
        uint id;
        string content;
        bool completed;
    }
    mapping (uint => Task) public tasks;
    event TaskCreated(
        uint id,
        string content,
        bool completed
    );
    event TaskCompleted(
        uint id,
        bool completed
    );
    constructor() public{
        createTask("I am awesome");
    }
    function createTask(string memory _content) public {
        count++;
        tasks[count]=Task(count,_content,false);
        emit TaskCreated(count,_content,false);

    }
    function toggleCompleted(uint _id) public {
        Task memory _task =tasks[_id];
        _task.completed=!_task.completed;
        tasks[_id]=_task;
        emit TaskCompleted(_id,_task.completed);
    }
}