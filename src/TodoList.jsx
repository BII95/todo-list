import TodoListItem from "./TodoListItem";

function TodoList({todoList}){
    return(
           todoList.map(todo => (
                <TodoListItem
                    key={todo.id}
                    todo={todo}
                />)))
            }
export default TodoList;
