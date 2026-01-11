import { ReactNode } from "react";

import { Header } from "./header";
import { Sidebar } from "./SideBar";

import * as styles from "./styles.css";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={` ${styles.container}`}>
      <Header />
      <Sidebar />
      {children}
    </div>
  );
}
