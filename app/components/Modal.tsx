import React, { useState } from "react";
import axios from "axios";
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
  const [formData, setFormData] = useState({
    id: shoeId,
    size: "",
    name: "",
    email: "",
    notes: "",
  });

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {
      id: shoeId,
      size: formData.get("size") as string,
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      notes: formData.get("notes") as string,
    };

    try {
      const response = await axios.post("/api/submit", data);
      console.log("Form submitted successfully:", response.data);
      alert("Form submitted successfully");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form");
    }
  };

  return (
    <div className={styles.modal}>
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
        <form onSubmit={handleSubmit}>
          <select
            className={styles.input}
            name="size"
            value={formData.size}
            onChange={handleChange}
            required
          >
            <option value="" selected disabled>
              Size (EU)
            </option>
            <option value="35">35</option>
            <option value="36">36</option>
            <option value="37">37</option>
            <option value="38">38</option>
            <option value="39">39</option>
            <option value="40">40</option>
            <option value="41">41</option>
            <option value="42">42</option>
          </select>
          <br />
          <br />
          <label>Name: </label>
          <br />
          <input
            className={styles.input}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <br />
          <br />
          <label>Email: </label>
          <br />
          <input
            className={styles.input}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <br />
          <br />
          <label>Notes for SSO: </label>
          <br />
          <textarea
            className={styles.notes}
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          ></textarea>
          <br />
          <br />
          <button className={styles.preorder} type="submit">
            PREORDER
          </button>
        </form>
        <button className={styles.close} onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  );
};
