import styles from './Legend.module.css';

const ITEMS = [
  { label: 'Current',  bg: 'rgba(245,166,35,0.2)',   border: 'var(--roa-gold)'   },
  { label: 'Win',      bg: 'rgba(76,175,125,0.2)',    border: 'var(--roa-green)'  },
  { label: 'Loss',     bg: 'rgba(232,69,69,0.15)',    border: 'var(--roa-accent)' },
  { label: 'Upcoming', bg: 'var(--roa-card)',         border: 'var(--roa-border)', opacity: 0.5 },
];

export default function Legend() {
  return (
    <div className={styles.legend}>
      {ITEMS.map((item) => (
        <div key={item.label} className={styles.item}>
          <div
            className={styles.dot}
            style={{ background: item.bg, borderColor: item.border, opacity: item.opacity ?? 1 }}
          />
          {item.label}
        </div>
      ))}
    </div>
  );
}
