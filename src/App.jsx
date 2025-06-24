import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import axios from "axios";
import Persons from "./components/Persons";

const App = () => {
  useEffect(() => {
    axios
      .get("https://node-express-6vxo.onrender.com/api/persons")
      .then((response) => {
        const dataPersons = response.data;
        setPersons(dataPersons);
        setOriginalPersons(dataPersons);
        console.log(persons);
      });
  }, []);

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [error, setError] = useState(null)
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [originalPersons, setOriginalPersons] = useState(persons);

  const addPerson = async(e) => {
    try {
      e.preventDefault();
      const response = await axios.post("https://node-express-6vxo.onrender.com/api/persons", {
        id: persons.length + 1,
        name: newName,
        number: newNumber,
      });
      setPersons(persons.concat(response.data));
      setNewName("");
      setNewNumber("");
    } catch (error) {
      setError(error.response.data.error)
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
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default App;
