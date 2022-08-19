import { useState } from "react";
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);
const Display = ({ text }) => <h1>{text}</h1>;

// console.log(getRandomInt(0, 7));
const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];

  const [selected, setSelected] = useState(0);
  const [voted, setVoted] = useState([0, 0, 0, 0, 0, 0, 0]);

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  };
  const copyVotes = [...voted];
  const handleVotes = () => {
    copyVotes[selected] += 1;
    console.log(copyVotes);
    return setVoted(copyVotes);
  };
  const highest = copyVotes.reduce((acc, cur) => {
    return acc > cur ? acc : cur;
  }, 0);
  const currentHighest = copyVotes.indexOf(highest);

  return (
    <div>
      <Display text="Anecdote of the day" />
      <p>{anecdotes[selected]}</p>
      <p>has {copyVotes[selected]} votes</p>
      <Button
        handleClick={() => {
          setSelected(getRandomInt(0, 7));
        }}
        text="next anecdote"
      />

      <Button handleClick={handleVotes} text="vote" />
      <Display text="Anecdote with most votes" />
      <p>{anecdotes[currentHighest]}</p>
      <p>has {copyVotes[currentHighest]} votes</p>
    </div>
  );
};

export default App;
