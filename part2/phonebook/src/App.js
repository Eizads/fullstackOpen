import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Person from "./components/Person";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState([]);
  const [newNumber, setNewNumber] = useState([]);
  const [newSearch, setNewSearch] = useState([]);
  const [foundSearch, setFoundSearch] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  //getting data from json server
  useEffect(() => {
    console.log("effect");
    personService
      .getAll()
      .then((initialppl) => {
        console.log("promise fullfiled");
        setPersons(initialppl);
      })
      .catch((error) => console.log("its not working"));
  }, []);
  console.log("render", persons.length, "people");

  // Helper function for filtering persons by name
  const filterPersonsByName = (personsList, searchName) => {
    return personsList.filter((person) => {
      const searchingFor = person.name.toString().toUpperCase();
      return searchingFor.includes(searchName.toString().toUpperCase());
    });
  };

  //adding ppl
  const addPerson = (event) => {
    event.preventDefault();
    console.log(event.target);
    const personObj = {
      name: newName,
      number: newNumber,
    };

    // Check if person with this name already exists
    const foundPerson = filterPersonsByName(persons, newName);

    // if name of person found
    if (foundPerson.length === 1) {
      console.log("the person found is", foundPerson);

      window.confirm(
        `${newName} is already added to phonebook replace the old number with the new one?`
      );

      const changeNumber = { ...foundPerson[0], number: newNumber };
      // update number
      personService
        .update(foundPerson[0].id, changeNumber)
        .then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id !== foundPerson[0].id ? person : returnedPerson
            )
          );
        })
        .catch((error) => {
          setErrorMsg(
            `information on ${foundPerson[0].name} has already been removed from the server.`
          );
          setTimeout(() => {
            setErrorMsg(null);
          }, 5000);
        });
      setNewName("");
      setNewNumber("");
    } else {
      //if not found person add person
      console.log("person not found");
      personService.create(personObj).then((updatedppl) => {
        setPersons(
          persons.concat(updatedppl),
          setSuccessMsg(`Added ${personObj.name}`),
          setTimeout(() => {
            setSuccessMsg(null);
          }, 5000)
        );
      });

      setNewName("");
      setNewNumber("");
    }
  };

  // Finding person based on search field
  const filteredPerson = filterPersonsByName(persons, newSearch);

  //event handler for search
  const handleNewSearch = (event) => {
    console.log("new search", event.target.value);
    setNewSearch(event.target.value);
    if (filteredPerson.length === 1) {
      setFoundSearch(!foundSearch);
    } else {
      setFoundSearch(foundSearch);
    }
  };

  //event handler for new name
  const handleNewName = (event) => {
    console.log("new name", event.target.value);
    setNewName(event.target.value);
  };

  //event handler for new number
  const handleNewNumber = (event) => {
    console.log("new number", event.target.value);
    setNewNumber(event.target.value);
  };

  //deleting ppl
  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      console.log(`person erased has id ${id}`);
      // const person = persons.find((p) => p.id === id);
      personService.erase(id);
      setPersons(persons.filter((p) => p.id !== id));
    }
  };

  //showing content based on search or all ppl
  const result = foundSearch ? filteredPerson : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMsg} msgClass={"success"} />
      <Notification message={errorMsg} msgClass={"fail"} />
      <Filter newSearch={newSearch} handleNewSearch={handleNewSearch} />
      {/* <div>
        Filter shown with <input value={newSearch} onChange={handleNewSearch} />
      </div> */}
      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
      />
      {/* <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          number <input value={newNumber} onChange={handleNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form> */}
      <h2>Numbers</h2>
      {result.map((person) => (
        <Person
          key={person.id}
          person={person}
          handleClick={() => deletePerson(person.id, person.name)}
        />
        // <p key={person.id}>
        //   {person.name} {person.number}
        // </p>
      ))}
    </div>
  );
};

export default App;
