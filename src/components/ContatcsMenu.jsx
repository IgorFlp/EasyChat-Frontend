import React from "react";
import ContactItem from "./ContactItem";
function closeContactsMenu() {
  document
    .querySelector(".contacts-menu-container")
    .setAttribute("style", "visibility: hidden");
}
const ContatcsMenu = ({ contacts }) => {
  console.log("contacs: " + contacts);
  return (
    <div className="contacts-menu-container">
      <div className="contacts-menu">
        <div className="contacts-search">
          <label
            className="close-contacts contact-list-item-icons"
            onClick={closeContactsMenu}
          >
            <i class="bi bi-x-lg"></i>
          </label>
        </div>
        <div className="contacts-list">
          {contacts.map((c, index) => {
            console.log("map: " + c.name);
            return <ContactItem key={index} contact={c} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default ContatcsMenu;
