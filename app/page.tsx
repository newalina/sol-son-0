"use client";

import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "./page.module.css";
import { Header } from "./components/Header";
import { Shoe } from "./components/Shoe";

export default function Home() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="newalina" />
      </Head>
      <main className={styles.main}>
        <div className={styles.header}>
          <Header></Header>
        </div>
        <div className={styles.body}>
          <Shoe id="ss0"></Shoe>
          <Shoe id="ss01"></Shoe>
        </div>
      </main>
    </>
  );
}
