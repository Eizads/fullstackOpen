const Person = ({ person, handleClick }) => (
  <div>
    <p>
      {person.name} {person.number}{" "}
      <button onClick={handleClick}>delete</button>
    </p>
  </div>
);
export default Person;
