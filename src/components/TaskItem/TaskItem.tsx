// Library
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

// Types
import type { Task } from "../../types";

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
    <li>
      <button
        onClick={() => onComplete(task.id)}
        aria-label={task.completed ? "Mark as active" : "Mark as completed"}
        aria-pressed={task.completed}
        disabled={isEditing}
      />

      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={handleEditChange}
          onKeyDown={handleKeyDown}
          autoFocus
          autoComplete="off"
        />
      ) : (
        <span>{task.text}</span>
      )}

      {/* Actions */}
      <div>
        {isEditing ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)} aria-label="Edit task">
              <Pencil size={14} />
            </button>
            <button onClick={() => onRemove(task.id)} aria-label="Delete task">
              <Trash2 size={14} />
            </button>
          </>
        )}
      </div>
    </li>
  );
}

export default TaskItem;
