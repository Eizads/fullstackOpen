import { useState } from "react";
const StatisticLine = ({ text, value }) => (
  <tr>
    <td> {text} </td>
    <td> {value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = good - bad / total;
  const percentage = (good * 100) / total + " %";
  if (total !== 0) {
    return (
      <tbody>
        <StatisticLine text="total" value={total} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="percentage" value={percentage} />
      </tbody>
    );
  } else
    return (
      <tbody>
        <tr>
          <td>No given feedback</td>
        </tr>
      </tbody>
    );
};

const Display = ({ text, value, layout }) => {
  if (layout === 1) {
    return (
      <h1>
        {" "}
        {text} {value}
      </h1>
    );
  } else if (layout === 2) {
    return (
      <tr>
        <td> {text} </td>
        <td> {value}</td>
      </tr>
    );
  }
};
const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  console.log(good);
  console.log(neutral);
  console.log(bad);

  return (
    <div>
      <Display layout={1} text="Give feedback" />

      <Button
        handleClick={() => {
          setGood(good + 1);
        }}
        text="good"
      />
      <Button
        handleClick={() => {
          setNeutral(neutral + 1);
        }}
        text="neutral"
      />
      <Button
        handleClick={() => {
          setBad(bad + 1);
        }}
        text="bad"
      />
      <Display layout={1} text="Statistics" />
      <table>
        <thead>
          <Display layout={2} text="good" value={good} />
          <Display layout={2} text="neutral" value={neutral} />
          <Display layout={2} text="bad" value={bad} />
        </thead>

        <Statistics good={good} neutral={neutral} bad={bad} />
      </table>
    </div>
  );
};

export default App;
