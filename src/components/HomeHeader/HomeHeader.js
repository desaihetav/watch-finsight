import styles from "./HomeHeader.module.css";

export default function HomeHeader() {
  return (
    <div>
      <div className={`${styles.image} flex items-center justify-center`}>
        <span className={`container ${styles.text}`}>
          Best Curated Content on Personal&nbsp;Finance and Wealth&nbsp;Building
        </span>
      </div>
    </div>
  );
}
