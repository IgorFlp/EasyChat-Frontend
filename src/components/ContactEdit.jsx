import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const ContactEdit = ({ contact, onCloseEditor }) => {
  const [name, setName] = useState("");
  const [app, setApp] = useState("");
  const [phone, setPhone] = useState("");
  const [handle, setHandle] = useState("");
  function handleSaveContact() {
    console.log(name, app, phone, handle);
  }
  useEffect(() => {
    console.log("Contact: " + JSON.stringify(contact));
    if (contact) {
      setName(contact.name);
      setApp(contact.source);
      setPhone(contact.number);
      setHandle(contact.handle);
    }
  }, [contact]);
  useEffect(() => {
    if (app == "Whatsapp" || app == "Telegram") {
      document.querySelector(".phone-input").disabled = false;
      document.querySelector(".handle-input").disabled = true;
    } else {
      document.querySelector(".phone-input").disabled = true;
      document.querySelector(".handle-input").disabled = false;
    }
  }, [app]);
  return (
    <div className="contact-editor-container hide">
      <div className="contact-editor">
        <div className="contact-editor-header">
          <label
            className="close-contacts contact-list-item-icons"
            onClick={onCloseEditor}
          >
            <i className="bi bi-x-lg"></i>
          </label>
        </div>
        <div className="contact-editor-fields">
          <div className="contact-editor-fields-groups">
            <label>Nome</label>
            <input
              className="name-input form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>

          <div className="contact-editor-fields-groups">
            <label>App</label>
            <select
              className="app-select form-control"
              value={app}
              onChange={(e) => {
                setApp(e.target.value);
              }}
            >
              <option>Whatsapp</option>
              <option>Instagram</option>
              <option>Telegram</option>
              <option>Facebook</option>
            </select>
          </div>

          <div className="contact-editor-fields-groups">
            <label>Telefone</label>
            <input
              className="phone-input form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            ></input>
          </div>

          <div className="contact-editor-fields-groups">
            <label>Nome de usuario</label>
            <input
              className="handle-input form-control"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
            ></input>
          </div>
          <button
            className="contact-save btn btn-success"
            onClick={handleSaveContact}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactEdit;
