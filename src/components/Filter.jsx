import React from 'react'

const Filter = ({ searchTerm, setSearchTerm, originalPersons, setPersons }) => {

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
    <main>
         <h3>buscqueda por persona</h3>
         <input type="text" placeholder="busqueda por persona" onChange={searchPerson} value={searchTerm} />
    </main>
  )
}

export default Filter