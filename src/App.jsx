import { useState } from "react";

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

  const searchPerson = (e) => {
    const search = e.target.value;
    setSearchTerm(search);
    if (search === "") {
      setPersons(originalPersons);
    } else {
      const filtered = originalPersons.filter((person) => {
        return person.name.toLowerCase().includes(search.toLowerCase());
      });
      setPersons(filtered);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <h3>buscqueda por persona</h3>
      <input type="text" placeholder="busqueda por persona" onChange={searchPerson} value={searchTerm} />
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={handlePerson} value={newName} />
          number: <input type="number" onChange={handleNumber} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.id}>{person.name}: {person.number}</p>
      ))}
    </div>
  );
};

export default App;