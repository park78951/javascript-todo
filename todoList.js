const data = require('./todos')
const todos = data.todos;

const readline = require('readline');
const rl = readline.createInterface({
 input: process.stdin,
 output: process.stdout
});

rl.setPrompt('명령어를 입력하세요(종료하려면 q를 누르세요)');
rl.prompt();
rl.on('line', function (line) {
    
    if(line === "q") rl.close();
    checkcommand(line);

 })
 .on('close', function () {
   console.log('프로그램이 종료되었습니다.');
   process.exit();
});


const show = (todoList, status) => {
        if (status === `all`){
            const [todoCount, doingCount, doneCount] = getAllStatus(todoList);
            printAllCurrentStatus(todoCount, doingCount, doneCount);
            return
        }
            const [todoCount_, todo_result] = getTodoName(todoList, status);
            printSpecificStatusList(status, todoCount_, todo_result);
            return
    };

const getAllStatus = todoList => {
    let todoCount = 0
    let doingCount = 0
    let doneCount = 0
    todoList.forEach(function (obj) {
        if (obj.status === "todo") {
            todoCount++;
        }
        if (obj.status === "doing") {
            doingCount++;
        }
        if (obj.status === "done") {
            doneCount++;
        }
    })
    return [todoCount, doingCount, doneCount]
};

const getTodoName = (todoList, status) => {
    totalCount = 0;
    const done_result = todoList.filter(function (obj) {
        return obj.status === status;
    })
        .map(function (obj) {
            totalCount++;
            return obj.name
        })

    return [totalCount, done_result];

}


const creatNewID = (todos) => {
    const newID = Math.floor(Math.random()*10000) + 1;
    const checkDuplicatedID = checkID(newID);
    if(typeof checkDuplicatedID !== 'undefined') creatNewID(todos);

    return newID;
}

const addList = (addcommand, addName, addTag) =>{
    const id = creatNewID(todos);

    const newTodo = {
        'name' : addName,
        'tag' : addTag,
        'status' : "todo",
        'id' : id
    };
    todos.push(newTodo);
    printCommandResult(addcommand, newTodo);
}


const deleteList = (deletecommand, inputID) =>{
    const idToNumber = parseInt(inputID);
    const matchedListByID = checkID(idToNumber);
    if(matchedListByID === undefined) {
        errorForDuplicatedID();
        return;
    }
    
    const matchedIndex = todos.indexOf(matchedListByID)
    todos.splice(matchedIndex,1);
    printCommandResult(deletecommand, matchedListByID);
}


const updateList = (updatecommand, inputID, updateStatus) => {
    const idToNumber = parseInt(inputID);
    const matchedListByID = checkID(idToNumber)
    if(matchedListByID === undefined) {
        errorForDuplicatedID();
        return;
    }
    const matchedIndex = todos.indexOf(matchedListByID);
    todos[matchedIndex].status = updateStatus;
    printCommandResult(updatecommand, matchedListByID);
}

const printAllCurrentStatus = (todoCount, doingCount, doneCount) => {
    const result = `현재상태 : todo: ${todoCount}개, doing: ${doingCount}개, done: ${doneCount}개`;
    console.log(result)
}

const printSpecificStatusList = (status, Count, list) => {
    const result = `${status}리스트 : 총 ${Count}개: ${list.join(', ')}`;
    console.log(result);
}

const printCommandResult = (command, updatedList) => {
    if(command === "update") {
        setTimeout(() => {
            console.log(`${updatedList.name} ${updatedList.status}으로 상태가 변경되었습니다.`)
            setTimeout(() =>{
                show(todos, "all")
                rl.prompt();
            } ,1000);    
        }, 3000);
        
        return
    }
    if(command === "add") {
        console.log(`${updatedList.name} 1개가 추가됐습니다. (id : ${updatedList.id})`);
    }
    if(command === "delete") {
        console.log(`${updatedList.name} ${updatedList.status}가 목록에서 삭제됐습니다.`);
    }
    
    setTimeout(() => {
        show(todos, "all")
        rl.prompt();
    },1000);    
}

// show(todos, "all");
// show(todos, "todo");
// show(todos, "doing");
// show(todos, "done");
// addList('add$sleep$["favorite"]');
// deleteList('delete$12123123');
// updateList('update$12123123$done')


const checkcommand = (input) => {
    const [command, secondElment, thirdElement] = input.split('$');

    if (command === 'add'){

        addList(command, secondElment, thirdElement);
    }
    if(command === 'delete'){
        deleteList(command, secondElment);
    }
    if(command === 'update'){
        updateList(command, secondElment, thirdElement);
    }
    if(command === 'show'){
        show(todos, secondElment)
    }
}

const errorForDuplicatedID = () =>{
    console.log("존재하지 않는 id 입니다.");
    rl.prompt()
}

const checkID = (inputID) => {
    const [matchedListByID] = todos.filter(list => {
        return list.id == inputID
    })
    return matchedListByID;
}
