import { useState, useEffect } from "react";
import personService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");

  useEffect(() => {
    console.log("effect");
    personService.getAll().then((initialPersons) => {
      console.log("promise fulfilled");
      setPersons(initialPersons);
    });
  }, []);

  const addName = (event) => {
    event.preventDefault();
    const personObj = {
      name: newName,
      number: newNumber,
    };

    personService.create(personObj).then((returnedContact) => {
      setPersons(persons.concat(returnedContact));

      // check if name exists
      const found = persons.find(
        (person) => person.name === newName || person.number === newNumber
      );
      console.log(found);
      console.log(persons);
      if (!found) {
        setPersons(persons.concat(returnedContact));
      } else {
        alert(`${newName} or ${newNumber} is already added to the phonebook`);
        setNewName("");
        setNewNumber("");
      }
    });
  };
  const handleNewName = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };
  const handleNewNumber = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };
  const handleSearch = (event) => {
    console.log(event.target.value);
    setNewSearch(event.target.value);
  };

  //filtering persons for search results
  const searchResult = persons.filter(
    (person) => person.name.toUpperCase() === newSearch.toUpperCase()
  );
  const gettingDeleted = (person) => {
    console.log(person.id);
    if (window.confirm(`delete ${person.name}?`)) {
      personService.remove(person.id);
      setPersons(persons.filter((p) => p.id !== person.id));
    }
  };

  console.log("render", persons.length, "persons");

  return (
    <div>
      <div>debug: {newName}</div>
      <h2>Phonebook</h2>

      <div>
        Filter shown with <input value={newSearch} onChange={handleSearch} />
      </div>

      {searchResult.map((person) => (
        <Filter
          key={person.id}
          person={person}
          newSearch={newSearch}
          handleSearch={handleSearch}
        />
      ))}
      <h3>Add a new</h3>

      <PersonForm
        addName={addName}
        newNumber={newNumber}
        newName={newName}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
      />

      <h2>Numbers</h2>

      {persons.map((person) => (
        <Persons
          key={person.id}
          person={person}
          handleDelete={() => gettingDeleted(person)}
        />
      ))}
    </div>
  );
};

export default App;
