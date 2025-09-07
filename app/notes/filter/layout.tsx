import styles from "./layout.module.css";

export default function Layout({
  children,
  sidebar
}: Readonly<{
    children: React.ReactNode,
    sidebar: React.ReactNode
  }>) {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>{sidebar}</aside>
      <div className={styles.notesWrapper}>{children}</div>
    </div>
  );
}