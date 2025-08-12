import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import axios from "axios";
import Persons from "./components/Persons";
import { Login } from "./components/Login";

const App = () => {

    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [error, setError] = useState(null);
    const [newNumber, setNewNumber] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [originalPersons, setOriginalPersons] = useState(persons);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const fetchPersons = async () => {
          try {
            const response = await axios.get("https://fullstackopen-back-ikel.onrender.com/api/persons");
            setPersons(response.data);
            setOriginalPersons(response.data);
          } catch (err) {
            console.error("Error en fetchPersons:", err);
          }
        };
        fetchPersons();
      }, []);

      const handleLogin = (e) => {
        e.preventDefault();
        console.log("Login:", username, password);
      }
      


  const addPerson = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        "https://node-express-6vxo.onrender.com/api/persons",
        {
          id: persons.length + 1,
          name: newName,
          number: newNumber,
        }
      );
      setPersons(persons.concat(response.data));
      setNewName("");
      setNewNumber("");
    } catch (error) {
      setError(error.response.data.message);
      console.log(error);
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
      <Login username={username} setUsername={setUsername} password={password} setPassword={setPassword} handleLogin={handleLogin}/>
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
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Persons persons={persons} />
    </div>
  );
};

export default App;
