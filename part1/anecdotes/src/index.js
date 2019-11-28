import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ text, handler }) => {
  return <button onClick={handler}>{text}</button>;
};

const voteHandler = (selected, points, setPoints) => {
  const newPoints = [...points];
  newPoints[selected] += 1;
  setPoints(newPoints);
};

const Title = ({ text }) => {
  return <h1 style={{ fontWeight: "bold", fontSize: 22 }}>{text}</h1>;
};

//yes arr.indexOf(Math.max()) looks cooler but performance is much worse
const getMaxIndex = points => {
  let maxIndex = 0;
  let maxValue = 0;
  for (let i = 0; i < points.length; i++) {
    let curVal = points[i];
    if (curVal > maxValue) {
      maxValue = curVal;
      maxIndex = i;
    }
  }
  return maxIndex;
};

const App = props => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(
    new Array(props.anecdotes.length).fill(0)
  );
  let mostPopularAnecdote = getMaxIndex(points);
  return (
    <div>
      <Title text={"Anecdote of the day"} />
      <p>{props.anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>

      <Button
        text={"vote"}
        handler={() => voteHandler(selected, points, setPoints)}
      />
      <Button
        text={"next anecdote"}
        handler={() =>
          setSelected(Math.floor(Math.random() * props.anecdotes.length))
        }
      />
      <Title text={"Anecdote with most votes"} />
      <p>{props.anecdotes[mostPopularAnecdote]}</p>
      <p>has {points[mostPopularAnecdote]} votes</p>
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
