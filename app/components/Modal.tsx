import React, { ReactNode } from "react";
import Image from "next/image";
import styles from "../page.module.css";
import catalogue from "../../data/catalogue.json";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  shoeId: string;
}

interface ShoeDetails {
  id: string;
  price: number;
  description: string;
  details: string[];
}

interface Catalogue {
  [key: string]: ShoeDetails;
}

const shoes: Catalogue = catalogue;

export const Modal = ({ isOpen, onClose, shoeId }: ModalProps) => {
  const shoeDetails = shoes[shoeId];

  if (!isOpen) return null;

  return (
    <div className={styles.modalContainer}>
      <Image
        className={styles.modalImage}
        src={`/images/${shoeId}_details.jpeg`}
        alt={`shoe ${shoeId}`}
        width={550}
        height={550}
      />
      <div className={styles.modalContent}>
        <h2>
          {shoeDetails.id} - {shoeDetails.price} USD
        </h2>
        <br />
        <p>{shoeDetails.description}</p>
        <br />
        <p>Details:</p>
        <ul className={styles.details}>
          {shoeDetails.details.map((detail, i) => (
            <li key={i}>- {detail}</li>
          ))}
        </ul>
        <br />
        <form>
          <select className={styles.input}>
            <option disabled selected>
              Size (EU)
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
          <br />
          <br />
          <label>Name: </label>
          <br />
          <input className={styles.input} type="text" name="name" />
          <br />
          <br />
          <label>Email: </label>
          <br />
          <input className={styles.input} type="email" name="email" />
          <br />
          <br />
          <label>Notes for SSO: </label>
          <br />
          <textarea className={styles.input} name="notes"></textarea>
          <br />
          <br />
          <button className={styles.preorder} type="submit">
            PREORDER
          </button>
        </form>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  );
};
