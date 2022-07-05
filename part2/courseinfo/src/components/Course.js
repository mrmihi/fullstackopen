import React from 'react'

const Course = (props) => {
  return (
    <div>
        <Header head = {props.course.name}/>
        <Content parts = {props.course.parts}/>
        <Total parts = {props.course.parts}/>
    </div>
  )
}

const Header = ({head}) => {
  return (<h1>{head}</h1>)
}

const Content = (props) => {
  console.log(props.parts)
  return(
    <div>
      {props.parts.map(x => <Part key={x.id} value={x.name} exe={x.exercises} />)}
    </div>
  )
}

const Part = (props) => {
  return(
    <p> {props.value} {props.exe} </p>
  )
}

const Total = (props) => {
  return(
    <strong> total of {props.parts.reduce((total,value) => total+value.exercises, 0 )} exercises</strong>
  )
}


export default Course