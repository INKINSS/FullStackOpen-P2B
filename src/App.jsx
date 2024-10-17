import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [originalPersons, setOriginalPersons] = useState([...persons]);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} ya existe en la agenda`);
    } else if (persons.some((person) => person.number === newNumber)) {
      alert(`${newNumber} ya existe en la agenda`);
    } else {
      setPersons(persons.concat(personObject));
      setOriginalPersons(persons.concat(personObject));
      setNewName("");
      setNewNumber("");
    }
  };

  const handlePerson = (e) => {
    setNewName(e.target.value);
  };

  const handleNumber = (e) => {
    setNewNumber(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} setSearchTerm={setSearchTerm} originalPersons={originalPersons} setPersons={setPersons} />
      <PersonForm addPerson={addPerson} handleNumber={handleNumber} handlePerson={handlePerson} newName={newName} newNumber={newNumber} />
      <Persons persons={persons} />
    </div>
  );
};

export default App;