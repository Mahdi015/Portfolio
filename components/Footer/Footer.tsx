import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <p>Copyright © {year} Mahdi | All Rights Reserved</p>
    </footer>
  );
}
