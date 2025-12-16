import React, { useEffect, useState } from "react";
import { API_URL, SOCKET_URL } from "../config.js";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const ContactEdit = ({ contact, onCloseEditor }) => {
  const [name, setName] = useState("");
  const [app, setApp] = useState("");
  const [phone, setPhone] = useState("");
  const [handle, setHandle] = useState("");
  function handleSaveContact(contact) {
    console.log(JSON.stringify(contact));
    let url = `${API_URL}/contact/updateContact`;
    contact.pushName = name;
    let header = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };
    let data = contact;
    axios.put(url, data, header).then((response) => {
      console.log("Contato salvo: " + JSON.stringify(response.data));
    });
  }
  useEffect(() => {
    //console.log("Contact: " + JSON.stringify(contact));
    if (contact) {
      setName(contact.pushName);
      setPhone(contact.remoteJid);
    }
  }, [contact]);

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
            <label>Telefone</label>
            <input
              className="phone-input form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            ></input>
          </div>

          <button
            className="contact-save btn btn-success"
            onClick={() => handleSaveContact(contact)}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactEdit;
