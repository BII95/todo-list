import { useRef,useState } from "react";
import TextInputWithLabel from "../shared/TextInputWithLabel";
import isValidTodoTitle from "../utils/todoValidation"

function TodoForm({onAddTodo}) {
    const inputRef = useRef();
    const [workingTodoTitle,setTodoTitle]=useState('');
    const handleInputChange = (event) => {
        setTodoTitle(event.target.value)
    }
    const handleAddTodo = (event) => {
        event.preventDefault();
        onAddTodo(workingTodoTitle);
        inputRef.current.focus();
        setTodoTitle('')
    }


    
    
    return (
        <form onSubmit={handleAddTodo}>
            <TextInputWithLabel
                elementId="todoTitle"
                ref={inputRef}
                value = {workingTodoTitle}
                onChange={handleInputChange}
                labelText="Todo"            
            />
            <button 
                type="submit"
                disabled={!isValidTodoTitle(workingTodoTitle)}
             >
                Add Todo
            </button>
        </form>
    );
}
export default TodoForm;