import React from 'react'

const PersonForm = ({ addPerson, handlePerson, handleNumber, newName, newNumber }) => {
  return (
    <main>
        <form onSubmit={addPerson}>
        <div>
          name: <input onChange={handlePerson} value={newName} />
          number: <input type="number" onChange={handleNumber} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </main>
  )
}

export default PersonForm