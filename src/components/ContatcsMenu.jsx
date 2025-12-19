import React, { useEffect } from "react";
import { useState } from "react";
import ContactItem from "./ContactItem";
import ContactEdit from "./ContactEdit";
function closeContactsMenu() {
  document.querySelector(".contacts-menu-container").classList.add("hide");
}

const ContatcsMenu = ({ contacts, onOpenEditor, onOpenNewChat }) => {
  //console.log("contacs: " + contacts);
  return (
    <div className="contacts-menu-container hide">
      <div className="contacts-menu">
        <div className="contacts-search">
          <label
            className="close-contacts contact-list-item-icons"
            onClick={closeContactsMenu}
          >
            <i className="bi bi-x-lg"></i>
          </label>
        </div>
        <div className="contacts-list">
          {contacts.map((c, index) => {
            //console.log("map: " + c.name);
            return (
              <ContactItem
                key={index}
                contact={c}
                onOpen={() => onOpenEditor(c)}
                onChat={() => {
                  onOpenNewChat(c);
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ContatcsMenu;
