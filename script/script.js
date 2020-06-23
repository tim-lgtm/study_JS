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

const render = function(){
    
    todoList.textContent = '';
    todoCompleted.textContent = '';
    
    todoData.forEach(function(item){


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
        console.log('btnTodoCompete: ', btnTodoCompete);

        btnTodoCompete.addEventListener('click', function(){
            item.completed = !item.completed;
            render()
        });

        const deleteTodo = li.querySelector('.todo-remove');
        deleteTodo.parentNode.parentNode;
        console.log('deleteTodo: ', deleteTodo);
        

        deleteTodo.addEventListener('click', function(){
        
        })

    });
};
headerButton.disabled = true
headerInput.addEventListener('input', () => {
    headerButton.disabled = headerInput.value === '';
});
headerButton.addEventListener('click', render());

todoControl.addEventListener('submit', function(event){
    event.preventDefault();

    const newTodo = {
        value: headerInput.value,
        completed: false
    }

    todoData.push(newTodo);

    render();
});

render();