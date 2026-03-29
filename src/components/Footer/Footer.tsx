// Styles
import styles from "./Footer.module.scss";

type FooterProps = {
  pendingCount: number;
  onClearCompleted(): void;
};

function Footer({ pendingCount, onClearCompleted }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <span className={styles.count}>
        {pendingCount} task{pendingCount !== 1 ? "s" : ""} remaining
      </span>
      <button className={styles.clearButton} onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  );
}

export default Footer;
