const addTaskBtn = document.getElementById('addTask')
const taskTextField = document.getElementById('task')
const recordDisplay = document.getElementById('records')
const btnText = addTaskBtn.innerText
let taskArray = [];
let edit_id = null

//dataget_localstorage
let objStr = localStorage.getItem('tasks')
 //console.log(objStr)
if (objStr != null) {
   taskArray = JSON.parse(objStr) 
   //string to convert array

}    
// console.log(taskArray)
displayinfo()

addTaskBtn.onclick=()=>{
    const task = taskTextField.value;
    // alert(task)
    if (edit_id != null) {
       taskArray.splice(edit_id,1,{'taskname':task})
       edit_id = null
    } else {
        taskArray.push({'taskname':task})  
    }
    // console.log(taskArray)
    savetask(taskArray)
    taskTextField.value = ''
    addTaskBtn.innerText = btnText
}

function savetask(taskArray){
    //console.log(taskArray)
    let str = JSON.stringify(taskArray)
    //console.log(str)
    localStorage.setItem('tasks',str)
    displayinfo()
}

function displayinfo(){
    let data = ''
    taskArray.forEach((user,i)=>{
        //console.log(user)
        data += `<tr>
           <th scope="row">${i+1}</th>
           <td>${user.taskname}</td>
           <td><i class="btn text-white fa fa-edit btn-info mx-2" onclick='EditInfo(${i})'></i> <i class="btn btn-danger text-white fa fa-trash" onclick='DeleteInfo(${i})'></i></td>
         </tr>`;
    })
    //console.log(data)
    recordDisplay.innerHTML = data
}

function DeleteInfo(id){
    // alert(id)
    taskArray.splice(id,1)
    savetask(taskArray)
}

function EditInfo(id){
    // alert(id)
    edit_id = id 
    taskTextField.value = taskArray[id].taskname
    addTaskBtn.innerText = 'Update Task'
}