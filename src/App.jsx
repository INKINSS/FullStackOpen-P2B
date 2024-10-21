import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import axios from "axios";
import Persons from "./components/Persons";

const App = () => {

  useEffect(() => {
    axios.get("http://localhost:5000/persons").then((response) => {
      const dataPersons = response.data;
      setPersons(dataPersons);
      setOriginalPersons(dataPersons)
      console.log(persons);
    });
  }, []);

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [originalPersons, setOriginalPersons] = useState(persons);

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
      <Filter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        originalPersons={originalPersons}
        setPersons={setPersons}
      />
      <PersonForm
        addPerson={addPerson}
        handleNumber={handleNumber}
        handlePerson={handlePerson}
        newName={newName}
        newNumber={newNumber}
      />
      <Persons persons={persons} />
    </div>
  );
};

export default App;
