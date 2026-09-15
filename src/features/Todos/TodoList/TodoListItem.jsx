import { useState } from 'react';
import TextInputWithLabel from '../../../shared/TextInputWithLabel';
import { isValidTodoTitle } from '../../../utils/todoValidation';
import styles from '../../../styles/TodoList.module.css';

export default function TodoListItem({
  todo,
  onCompleteTodo,
  onUpdateTodo,
  elementId,
  onDeleteTodo
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [workingTitle, setWorkingTitle] = useState(todo.title);
  function handleCancel() {
    setWorkingTitle(todo.title);
    setIsEditing(false);
  }
  function handleEdit(event) {
    setWorkingTitle(event.target.value);
  }
  function handleUpdate(event) {
    if (isEditing === false) {
      return;
    }
    event.preventDefault();

    if (!isValidTodoTitle(workingTitle)) {
      return;
    }
    onUpdateTodo({ ...todo, title: workingTitle });
    setIsEditing(false);
  }

  return (
    <li
      className={`${styles.todo} ${todo.isCompleted ? styles.completed : ''}`}
    >
      <form onSubmit={handleUpdate}>
        {isEditing ? (
          <div className={styles.todoContent}>
            <TextInputWithLabel
              value={workingTitle}
              onChange={handleEdit}
              elementId={elementId}
            />
            <button type="button" onClick={() => handleCancel()}>
              Cancel
            </button>
            <button type="submit">Update</button>
          </div>
        ) : (
          <div className={styles.todoContent}>
            <label>
              <input
                className={styles.checkbox}
                type="checkbox"
                id={`checkbox${todo.id}`}
                checked={todo.isCompleted}
                onChange={() => onCompleteTodo(todo.id)}
              />
            </label>
            <span
              className={styles.todoTitle}
              onClick={() => setIsEditing(true)}
            >
              {todo.title}
            </span>
            <button
              type="button"
              className={styles.deleteButton}
              onClick={() => onDeleteTodo(todo.id)}
            >
              Delete
            </button>
          </div>
        )}
      </form>
    </li>
  );
}
