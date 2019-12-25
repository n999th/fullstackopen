import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => {
  return (<div>filter by names:<input value={props.filterName} onChange={props.filterChanged} /></div>)
}


const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        name: <input value={props.newName} onChange={(event) => props.setNewName(event.target.value)} />
      </div>
      <div>number: <input value={props.newNumber} onChange={(event) => props.setNewNumber(event.target.value)} /></div>

      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = (props) => {
  const result = props.filteredPersons.map(elem => <div key={elem.name}>{elem.name}  {elem.number}</div>);
  return result
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')


  useEffect(() => {
    axios.get("http://localhost:3001/persons").then(res => {
      console.log(res);
      if (res.data) {
        setPersons(res.data);
      }
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.findIndex(elem => elem.name.toUpperCase() === newName.toUpperCase()) !== -1) {
      alert(`${newName} is already in the phonebook`);
      return;
    }
    setPersons(persons.concat({ name: newName, number: newNumber }));
  }

  const filterChanged = (event) => {
    console.log(event.target.value)
    setFilterName(event.target.value)
  }
  const filteredPersons = filterName === '' ? persons : persons.filter((elem) => elem.name.toLowerCase().includes(filterName.toLowerCase()))



  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} filterChanged={filterChanged} setNewName={setNewName} />
      <h2>Add a new person</h2>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} setNewNumber={setNewNumber} setNewName={setNewName} />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} />
    </div>
  )
}

export default App