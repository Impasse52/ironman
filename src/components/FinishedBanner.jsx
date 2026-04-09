import styles from './FinishedBanner.module.css';

export default function FinishedBanner({ leader }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.inner}>
        <h2 className={styles.title}>🏆 Ironman Complete</h2>
        <p className={styles.sub}>
          Overall leader: {leader.name} with {leader.wins} win{leader.wins !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  );
}
