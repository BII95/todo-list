import { useState } from 'react';
import TextInputWithLabel from '../../../shared/TextInputWithLabel';
import { isValidTodoTitle } from '../../../utils/todoValidation';
import styles from '../../../styles/TodoList.module.css';

export default function TodoListItem({
  todo,
  onCompleteTodo,
  onUpdateTodo,
  elementId,
  onDeleteTodo,
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
          <div className={styles.editRow}>
            <TextInputWithLabel
              value={workingTitle}
              onChange={handleEdit}
              elementId={elementId}
              labelText="Todo title"
            />
            <div className={styles.editActions}>
              <button
                type="button"
                className={styles.actionButton}
                onClick={() => handleCancel()}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`${styles.actionButton} ${styles.actionButtonPrimary}`}
                disabled={!isValidTodoTitle(workingTitle)}
              >
                Update
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.todoContent}>
            <label>
              <input
                className={styles.checkbox}
                type="checkbox"
                id={`checkbox${todo.id}`}
                checked={todo.isCompleted}
                onChange={() => onCompleteTodo(todo.id, !todo.isCompleted)}
              />
            </label>
            <button
              type="button"
              className={styles.todoTitle}
              onClick={() => setIsEditing(true)}
              aria-label={`Edit "${todo.title}"`}
            >
              {todo.title}
            </button>
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
