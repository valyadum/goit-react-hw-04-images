import React, {useState } from "react";
import { GalleryItem, GalleryItemImage } from "./ImageGalleryItem.styled";
import Modal from "../Modal/Modal";

export default function ImageGalleryItem({
  id,
  webformatURL,
  largeImageURL,
  tags,
}) {
  const [showModal, setShowModal] = useState(false);
  const showModalToggle = () => {
    setShowModal(!showModal);
  };

  return (
    <GalleryItem key={id}>
      <GalleryItemImage
        src={webformatURL}
        alt={tags}
        onClick={showModalToggle}
      />
      {showModal && (
        <Modal onClose={showModalToggle} urlImage={largeImageURL} tags={tags} />
      )}
    </GalleryItem>
  );
}