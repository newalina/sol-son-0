import React, { useState, useRef } from "react";
import Image from "next/image";
import styles from "../page.module.css";
import { Modal } from "./Modal";

interface ShoeProps {
  id: string;
}

export const Shoe = ({ id }: ShoeProps) => {
  const [isPointer, setIsPointer] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const alphaRef = useRef(0);

  const handleImageClick = () => {
    if (isPointer) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
    alphaRef.current = alpha;

    if (alpha > 0) {
      shoeImage.style.cursor = "pointer";
      setIsPointer(true);
    } else {
      shoeImage.style.cursor = "default";
      setIsPointer(false);
    }
  };

  return (
    <>
      <Image
        id={id}
        className={styles.shoe}
        src={`/images/${id}.png`}
        alt={`shoe ${id}`}
        width={id === "ss0" ? 2717 : 2748}
        height={id === "ss0" ? 3153 : 2641}
        onMouseMove={handleMouseMove}
        onClick={() => handleImageClick()}
      />
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} shoeId={id} />
      )}
    </>
  );
};
