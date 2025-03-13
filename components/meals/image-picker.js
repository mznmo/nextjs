"use client";
import { useRef, useState } from "react";
import style from "./image-picker.module.css";
import Image from "next/image";

export default function ImagePicker({ label, name }) {
  const image = useRef();
  const [imagePreview, setImagePreview] = useState();

  function handlePick() {
    image.current.click();
  }

  function handleImageChange(event) {
    const file = event.target.files[0];

    if (!file) {
      setImagePreview(null);
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      //runs when reading is complete
      setImagePreview(fileReader.result);
    };

    fileReader.readAsDataURL(file); //reading the file as data URL
  }

  return (
    <div className={style.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={style.controls}>
        <div className={style.preview}>
          {!imagePreview && <p>No image picked yet</p>}
          {imagePreview && (
            <Image src={imagePreview} alt="Image selected" fill />
          )}
        </div>
        <input
          className={style.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={image}
          onChange={handleImageChange}
          required
        />
        <button className={style.button} type="button" onClick={handlePick}>
          Pick an Image
        </button>
      </div>
    </div>
  );
}
