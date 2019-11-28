import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = props => {
  return <button onClick={props.handler}>{props.text}</button>;
};

const Title = ({ text }) => {
  return <h1 style={{ fontWeight: "bold" }}>{text}</h1>;
};

const Statistic = ({ text, value, children }) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>{text}</td>
          <td>
            {value}
            {children}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  let all = good + neutral + bad;
  let average = (good - bad) / all;
  let positive = (good / all) * 100;
  if (all === 0) {
    return <p>No feedback given</p>;
  }
  return (
    <div>
      <Statistic text={"good"} value={good} />
      <Statistic text={"neutral"} value={neutral} />

      <Statistic text={"bad"} value={bad} />

      <Statistic text={"all"} value={all} />
      <Statistic text={"average"} value={average} />
      <Statistic text={"positive"} value={positive}>
        %
      </Statistic>
    </div>
  );
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Title text={"give feedback"} />

      <Button handler={() => setGood(good + 1)} text={"good"} />
      <Button handler={() => setNeutral(neutral + 1)} text={"neutral"} />
      <Button handler={() => setBad(bad + 1)} text={"bad"} />
      <Title text={"statistics"} />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
