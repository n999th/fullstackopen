import React from 'react'


const Header = props =>
<h1>{props.course}</h1>

const Total = props => {
const total = props.parts.reduce((accum,cur) => accum + cur.exercises,0)
return <p>Total of {total} exercises</p>
}


const Part = props =>
<p>{props.part.name} {props.part.exercises}</p>

const Content = props => {
  return (props.parts.map(elem=><Part part={elem} key={elem.id}/>))
}

const Course = props =>{
  return (
      <div>
          <Header course={props.course.name}/>
          <Content parts = {props.course.parts}/>
          <Total parts = {props.course.parts}/>
      </div>
  );
} 

export default Course