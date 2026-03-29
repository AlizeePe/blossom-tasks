type TaskFormProps = {
  text: string;
  onTextChange(value: string): void;
  onSubmit(): void;
};

function TaskForm({ text, onTextChange, onSubmit }: TaskFormProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onTextChange(e.target.value);
  }

  function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    if (text.trim()) {
      onSubmit();
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="task-input" className="sr-only">
        Add a Task
      </label>
      <input
        id="task-input"
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="Add a task..."
        autoComplete="off"
      />
      <button type="submit" disabled={!text.trim()}>
        Add
      </button>
    </form>
  );
}

export default TaskForm;
