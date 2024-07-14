"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  // const [modalOpen, setModalOpen] = useState(false);
  // const [selectedShoe, setSelectedShoe] = useState<string | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    const shoeImage = e.currentTarget;
    const rect = shoeImage.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const canvas = document.createElement("canvas");
    canvas.width = shoeImage.naturalWidth;
    canvas.height = shoeImage.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(shoeImage, 0, 0, canvas.width, canvas.height);

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const pixel = ctx.getImageData(x * scaleX, y * scaleY, 1, 1).data;
    const alpha = pixel[3];

    shoeImage.style.cursor = alpha > 0 ? "pointer" : "default";
  };

  // const handleShoeSelect = (id: string) => {
  //   setSelectedShoe(id);
  //   setModalOpen(true);
  // };

  // const closeModal = () => {
  //   setModalOpen(false);
  // };

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <Image
          className={styles.logo}
          src="/logos/logo black.png"
          alt="ss0 logo black"
          width={330}
          height={58}
        />
      </div>

      <div className={styles.body}>
        <Image
          id="ss0"
          className={styles.shoe}
          src="/images/ss0.png"
          alt="ss0 shoe 0"
          width={2717}
          height={3153}
          onMouseMove={handleMouseMove}
          // onClick={() => handleShoeSelect("ss0")}
        />
        <Image
          id="ss01"
          className={styles.shoe}
          src="/images/ss01.png"
          alt="ss0 shoe 01"
          width={2748}
          height={2641}
          onMouseMove={handleMouseMove}
          // onClick={() => handleShoeSelect("ss01")}
        />
        {/* {modalOpen && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <span className={styles.close} onClick={closeModal}>
                &times;
              </span>
              <p>You clicked on image: {selectedShoe}</p>
            </div>
          </div>
        )}

        {modalOpen && (
          <div id="modal" className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <h2 id="id"></h2>
              <h2 id="price"></h2>
              <select>
                <option disabled selected>
                  SIZE (EU)
                </option>
                <option>35</option>
                <option>36</option>
                <option>37</option>
                <option>38</option>
                <option>39</option>
                <option>40</option>
                <option>41</option>
                <option>42</option>
              </select>
              <textarea placeholder="NAME"></textarea>
              <textarea placeholder="EMAIL"></textarea>
              <textarea placeholder="NOTES FOR SS0"></textarea>
              <button onClick={closeModal}>PREORDER</button>
            </div>
          </div>
        )} */}
      </div>

      {/* <div className={styles.footer}>
        <a href="https://www.instagram.com/_sol_son_0/" target="_blank">
          <i className="icon fa-brands fa-instagram"></i>
        </a>
        <a href="mailto: tommy@solson0.com">
          <i className="icon fa-regular fa-envelope"></i>
        </a>
      </div> */}

      {/* <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>app/page.tsx</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore starter templates for Next.js.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div> */}
    </main>
  );
}
