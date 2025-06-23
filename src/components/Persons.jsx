import React from "react";

const Persons = ({ persons }) => {
  return (
    <main>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person._id}>
          {person.name} {person.number}
        </p>
      ))}
    </main>
  );
};

export default Persons;
