import { useRef,useState } from "react";
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
            <label htmlFor="todoTitle">Todo</label>
            <input 
                ref={inputRef}
                type="text" 
                id="todoTitle"
                name="todoTitle"
                value = {workingTodoTitle}
                onChange={handleInputChange}
                placeholder={'Todo text'}
                required/>
            <button 
                type="submit"
                disabled=
                {!workingTodoTitle.trim()}
             >
                Add Todo
            </button>
        </form>
    );
}
export default TodoForm;