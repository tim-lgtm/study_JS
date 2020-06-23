'use strict';

const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed'),
    headerButton = document.querySelector('#add');

const todoData = [
    {
        value: 'сварить кофе',
        completed: false
    },
    {
        value: 'Помыть посуду',
        completed: true
    }
];
const readToLocalStorage = JSON.parse(localStorage.getItem('todoData')) || [];

const render = function(){
    console.log(readToLocalStorage);
    todoList.textContent = '';
    todoCompleted.textContent = '';
    
    readToLocalStorage.forEach(function(item){


        const li = document.createElement('li');
        li.classList.add('todo-item');

        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
            '<div class="todo-buttons">' +
                '<button class="todo-remove"></button>' +
                '<button class="todo-complete"></button>' +
            '</div>';
            
        
        if(item.completed){
            todoCompleted.append(li)
        } else{ 
            todoList.append(li);
        };

        const btnTodoCompete = li.querySelector('.todo-complete');

        btnTodoCompete.addEventListener('click', function(){
            item.completed = !item.completed;
            render();
        });

        const deleteTodo = li.querySelector('.todo-remove');
        deleteTodo.addEventListener('click', function(){
            
        todoData.splice(todoData.indexOf(item), 1);
    
        render();
        
    })
    localStorage.setItem('todoData', JSON.stringify(todoData))
    });
};
headerButton.disabled = true
headerInput.addEventListener('input', () => {
    headerButton.disabled = headerInput.value === '';
});
headerButton.addEventListener('click', render());

todoControl.addEventListener('submit', function(event){
    event.preventDefault();
    if(headerInput.value === ''){
        alert('строка пустая')
    }else{

        console.log('todoControl: ', todoControl);
    
        const newTodo = {
            value: headerInput.value,
            completed: false
        }
    
        headerInput.value = '';
    
    
        todoData.push(newTodo);
        render();
    }

});

render();