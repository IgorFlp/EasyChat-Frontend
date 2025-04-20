import React from "react";

const ContactItem = () => {
  return (
    <>
      <div className="contact_item">
        <img
          src="src\assets\contact-img.svg"
          alt=""
          className="contact_item_img"
        />
        <div className="contact_item_texts">
          <label className="contact_item_texts-name">Nome do contato</label>
          <div className="contact_item_texts_preview">
            <label className="contact_item_texts_preview-status">OK</label>
            <label className="contact_item_texts_preview-message">
              Ultima mensagem asdouahsoduiashdoaidhaodisaho
              aiosjdhioashdoashdoiashdoiashdoaidho
            </label>
            <label className="contact_item_texts_preview-time">12:00</label>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactItem;
