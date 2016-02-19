var todoInput = document.getElementById("todo-input"),
    todoList = document.getElementById("todo-list"),
    persistedTodo = [];


  if(localStorage.todoData){
      persistedTodo = localStorage.todoData.split(",");

      for(var i = 0; i< persistedTodo.length; i++){
          addItem(persistedTodo[i]);
      }

  }


todoInput.onkeypress = function(e){
  
  if(!e) e = window.event;
  
  if(e.keyCode != "13"){  
    return;
  }
  
  if(todoInput.value === ""){
    return;
  }

  addItem(todoInput.value);

  persistedTodo.push(todoInput.value);
  localStorage.setItem('todoData',persistedTodo);

  todoInput.value = "";
  
};


function addItem(data){
  var li = document.createElement("li"),
      closeBtn = document.createElement("span"),
      p = document.createElement("p"),
      refChild;

  closeBtn.className = "close-btn";
  closeBtn.innerHTML = "x";
  li.className = "todo-item";
  li.appendChild(closeBtn);
  li.appendChild(p);
  
  p.innerHTML = data;
  
  refChild = todoList.firstChild;
 
  todoList.insertBefore(li,refChild);

}


todoList.addEventListener("click",function(evt){

  var deletedItem;

  if(evt.target.innerHTML != "x"){
    return;
  }

  deletedItem = persistedTodo.indexOf(evt.target.nextSibling.innerText);

  persistedTodo.splice(deletedItem,1);
  evt.target.parentNode.parentNode.removeChild(evt.target.parentNode);
  localStorage.setItem('todoData',persistedTodo);
   
});