import React from "react";
const Persons = ({ person, handleDelete }) => (
  <span>
    <p>
      {person.name} {person.number}
    </p>
    <button onClick={handleDelete}>delete</button>
  </span>
);

export default Persons;
