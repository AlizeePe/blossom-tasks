// Library
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import clsx from "clsx";

// Types
import type { Task } from "../../types";

// Styles
import styles from "./TaskItem.module.scss";

type TaskItemProps = {
  task: Task;
  onComplete(id: number): void;
  onRemove(id: number): void;
  onEdit(id: number, newText: string): void;
};

function TaskItem({ task, onComplete, onRemove, onEdit }: TaskItemProps) {
  // Local state — editing mode and current edit text
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  function handleSave() {
    if (!editText.trim()) {
      return;
    }
    onEdit(task.id, editText.trim());
    setIsEditing(false);
  }

  function handleEditChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEditText(e.target.value);
  }

  // Save on Enter, cancel on Escape
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleSave();
    }
    if (e.key === "Escape") {
      setEditText(task.text); // reset to original text
      setIsEditing(false);
    }
  }

  return (
    <li className={clsx(styles.item, task.completed && styles.itemCompleted)}>
      <button
        className={clsx(
          styles.checkbox,
          task.completed && styles.checkboxChecked,
        )}
        onClick={() => onComplete(task.id)}
        aria-label={task.completed ? "Mark as active" : "Mark as completed"}
        aria-pressed={task.completed}
        disabled={isEditing}
      />

      {isEditing ? (
        <input
          className={styles.editInput}
          type="text"
          value={editText}
          onChange={handleEditChange}
          onKeyDown={handleKeyDown}
          autoFocus
          autoComplete="off"
        />
      ) : (
        <span
          className={clsx(styles.text, task.completed && styles.textCompleted)}
        >
          {task.text}
        </span>
      )}

      {/* Actions */}
      <div className={styles.actions}>
        {isEditing ? (
          <button className={styles.saveButton} onClick={handleSave}>
            Save
          </button>
        ) : (
          <>
            <button
              className={styles.editButton}
              onClick={() => setIsEditing(true)}
              aria-label="Edit task"
            >
              <Pencil size={14} />
            </button>
            <button
              className={styles.deleteButton}
              onClick={() => onRemove(task.id)}
              aria-label="Delete task"
            >
              <Trash2 size={14} />
            </button>
          </>
        )}
      </div>
    </li>
  );
}

export default TaskItem;
