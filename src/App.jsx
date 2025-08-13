import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import axios from "axios";
import Persons from "./components/Persons";
import { Login } from "./components/Login";
import { loginServices } from "./services/login";
import { setToken } from "./services/login";
import { LoginButton } from './components/LoginButton'
import { CreateContactButton } from './components/CreateContactButton'

const App = () => {

    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [error, setError] = useState(null);
    const [newNumber, setNewNumber] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [originalPersons, setOriginalPersons] = useState(persons);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [loginVisible, setLoginVisible] = useState(false);
    const [createContactVisible, setCreateContactVisible] = useState(false);

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

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('user');
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON);
          setUser(user);
          setToken(user.token);
        }
      }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const user = await loginServices({ username, password });
            window.localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
            console.log('este es el token',user.token)
            setToken(user.token);
            console.log("Login exitoso:", user);
        } catch (error) {
            console.error("Error en login:", error);
        }
    }



  const addPerson = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        "https://fullstackopen-back-ikel.onrender.com/api/contacts",
        {
          id: persons.length + 1,
          name: newName,
          number: newNumber,
        }
      );
      setPersons(persons.concat(response.data));
      setNewName("");
      setNewNumber("");
      setError(null);
      setCreateContactVisible(false);
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
{user ? (
  <div>
    <p>Persona logueada: {user.username}</p>
    <button
      onClick={() => {
        window.localStorage.removeItem('user');
        setUser(null);
        setToken(null);
      }}
    >
      Logout
    </button>
  </div>
) : (
  <>
    {!loginVisible && (
      <LoginButton onClick={() => setLoginVisible(true)} />
    )}
    {loginVisible && (
      <Login
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
        onCancel={() => setLoginVisible(false)}
      />
    )}
  </>
)}

      <Filter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        originalPersons={originalPersons}
        setPersons={setPersons}
      />
      {createContactVisible && (
        <PersonForm
          addPerson={addPerson}
          handleNumber={handleNumber}
          handlePerson={handlePerson}
          newName={newName}
          newNumber={newNumber}
          onCancel={() => setCreateContactVisible(false)}
        />
      )}
      <CreateContactButton createContactVisible={createContactVisible} onClick={() => setCreateContactVisible(true)} />
      {error && <p style={{ color: "red" }}>{error}</p>}
    {user ? <Persons persons={persons} /> : null}
    </div>
  );
};

export default App;
