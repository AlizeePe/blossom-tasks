// Types
import type { Task } from "../../types";

// Components
import TaskItem from "../TaskItem/TaskItem";

// Styles
import styles from "./TaskList.module.scss";

type TaskListProps = {
  items: Task[];
  onComplete(id: number): void;
  onRemove(id: number): void;
  onEdit(id: number, newText: string): void;
};

function TaskList({ items, onComplete, onRemove, onEdit }: TaskListProps) {
  return (
    <ul className={styles.list}>
      {items.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onComplete={onComplete}
          onRemove={onRemove}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}

export default TaskList;
