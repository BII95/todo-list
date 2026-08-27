import { useState } from "react";
import TextInputWithLabel from "../../../shared/TextInputWithLabel";
import { isValidTodoTitle } from "../../../utils/todoValidation";

export default function TodoListItem({todo,onCompleteTodo,onUpdateTodo,elementId}){
    const [isEditing,setIsEditing]=useState(false)
    const [workingTitle,setWorkingTitle]=useState(todo.title)
    function handleCancel(){
        setWorkingTitle(todo.title);
        setIsEditing(false);
    }
    function handleEdit(event){
        setWorkingTitle(event.target.value)
    }
    function handleUpdate(event){
        if (isEditing === false){
            return;
        }
        event.preventDefault();

        if (!isValidTodoTitle(workingTitle)) {
            return;
            }
        onUpdateTodo({...todo, title: workingTitle});
        setIsEditing(false)
    }

    return(
        <li>
            <form onSubmit={handleUpdate}>
                {isEditing ? ( 
                    <>
                    <TextInputWithLabel
                        value = {workingTitle}
                        onChange={handleEdit}  
                        labelText="Todo"
                        elementId={elementId}
                        
                    />
                    <button type="button"
                            onClick={() => handleCancel()}
                    >
                        Cancel
                    </button>
                    <button type="submit"
                            >
                        Update
                    </button>
                    </>
                ) : (
                        <>
                            <label>
                                <input
                                    type="checkbox"
                                    id={`checkbox${todo.id}`}
                                    checked={todo.isCompleted}
                                    onChange={() => onCompleteTodo(todo.id)}
                                />
                            </label>
                            <span onClick={() => setIsEditing(true)}>
                                    {todo.title}
                            </span>
                        </>
                )}
            </form>
        </li>           
        );
}