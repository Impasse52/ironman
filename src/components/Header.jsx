import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        <span className={styles.rivals}>Rivals</span> of Aether{' '}
        <em className={styles.two}>II</em>
      </h1>
      <p className={styles.subtitle}>Iron Man — Random Sequence Generator</p>
    </header>
  );
}
