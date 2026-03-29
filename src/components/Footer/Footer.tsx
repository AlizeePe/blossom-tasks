type FooterProps = {
  pendingCount: number;
  onClearCompleted(): void;
};

function Footer({ pendingCount, onClearCompleted }: FooterProps) {
  return (
    <footer>
      <span>
        {pendingCount} task{pendingCount !== 1 ? "s" : ""} remaining
      </span>
      <button onClick={onClearCompleted}>Clear completed</button>
    </footer>
  );
}

export default Footer;
