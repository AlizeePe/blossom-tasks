import styles from "./Header.module.scss";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.dots} aria-hidden="true">
        <span className={styles.dot} />
        <span className={`${styles.dot} ${styles.dotActive}`} />
        <span className={styles.dot} />
      </div>
      <h1 className={styles.title}>Blossom Tasks</h1>
      <p className={styles.subtitle}>what's on your mind today?</p>
    </header>
  );
}

export default Header;
