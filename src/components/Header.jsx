import styles from './Header.module.css';

export default function Header({ mode, setMode }) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        Ironman Generator
      </h1>
      <h1 
        className={`${styles.gametitle} ${mode === 0 ? styles.active : ''}`}
       onClick = {() => setMode(0)}
      >
        Rivals of Aether II
      </h1>
      <h1 
        className={`${styles.gametitle} ${mode === 1 ? styles.active : ''}`}
        onClick = {() => setMode(1)}
      >
        Super Smash Bros Melee
      </h1>
    </header>
  );
}
