import * as styles from "./styles.css";

export function Container({ children }: { children: React.ReactNode }) {
  return <div className={styles.container}>{children}</div>;
}
