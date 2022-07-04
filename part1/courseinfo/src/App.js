const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
      <div>
        <Header course={course} />
        <Content parts={course} />
        <Total parts={course} />
      </div>
    )
}

const Header = (props) => {
  return(<h1>{props.course.name}</h1>)
} 

const Content = (props) => {
  return(
    <div>
      <Part name = {props.parts.parts[0]}  />
      <Part name = {props.parts.parts[1]}  />
      <Part name = {props.parts.parts[2]}  />
    </div>
  )
}

const Total = (props) => {
 return( <>
    <p>Number of exercises {props.parts.parts[0].exercises+props.parts.parts[1].exercises+props.parts.parts[2].exercises}</p>
  </>)
}

const Part = (props) => {
  return(<p>
    {props.name.name} {props.name.exercises}
  </p>)
}

export default App
