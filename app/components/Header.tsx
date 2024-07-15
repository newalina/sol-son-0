import React from "react";
import Image from "next/image";
import styles from "../page.module.css";

export const Header = (): JSX.Element => {
  return (
    <Image
      className={styles.logo}
      src="/logos/logo black.png"
      alt="ss0 logo black"
      width={330}
      height={58}
    />
  );
};
