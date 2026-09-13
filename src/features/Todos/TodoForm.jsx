import { useRef, useState } from 'react';
import TextInputWithLabel from '../../shared/TextInputWithLabel';
import { isValidTodoTitle } from '../../utils/todoValidation';
import styles from '../../styles/TodoForm.module.css'

function TodoForm({ onAddTodo }) {
  const inputRef = useRef();
  const [workingTodoTitle, setTodoTitle] = useState('');
  const handleInputChange = (event) => {
    setTodoTitle(event.target.value);
  };
  const handleAddTodo = (event) => {
    event.preventDefault();
    onAddTodo(workingTodoTitle);
    inputRef.current.focus();
    setTodoTitle('');
  };

  return (
    
    <div className={styles.formCard}>
    <h2 className={styles.formTitle}>Add a Task...</h2>

    <form onSubmit={handleAddTodo}className={styles.formRow}>
      <TextInputWithLabel
        elementId="todoTitle"
        ref={inputRef}
        value={workingTodoTitle}
        onChange={handleInputChange}
        labelText="Todo"
        className={styles.input}
      />
      <button type="submit" disabled={!isValidTodoTitle(workingTodoTitle)}className={styles.addButton}>
        Add Todo
      </button>
    </form>
    </div>
   
  );
}
export default TodoForm;
