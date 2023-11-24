import React, {  useEffect } from "react";
import { createPortal } from "react-dom";
import { ModalStyle, Overlay } from "./Modal.styled";

const modalRoot = document.querySelector("#root-modal");

export default function Modal({ onClose, urlImage, tags }) {
  useEffect(() => {
      const closeByEsc = (event) => {
        if (event.code !== "Escape") {
          return;
        }
        console.log("close");
        onClose();
      };
    window.addEventListener("keydown", closeByEsc);
    return () => {
      window.removeEventListener("keydown", closeByEsc);
    };
  },[onClose]);
  // useEffect(() => {
  //   return () => {
  //     window.removeEventListener("keydown", closeByEsc);
  //   };
  // }, []);


  // const handleBackDropClick = (event) => {
  //   if (event.target === event.currentTarget) {
  //     onClose();
  //   }
  // };

  return createPortal(
    <Overlay onClick={onClose}>
      <ModalStyle>
        <img src={urlImage} alt={tags} />
      </ModalStyle>
    </Overlay>,
    modalRoot
  );
}
