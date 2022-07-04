import { useState } from 'react'

const Button = ({onClick, text}) => {
    return(<button onClick={onClick}>
        {text}
    </button>)
}

const Statistic = (props) => {
  if( props.all === 0){
    return(
      <div>
        No feedback given
      </div>
    )
  }
  return(<table>
    <StatisticLine text="good" value = {props.good} />
    <StatisticLine text="neutral" value =  {props.neutral} />
    <StatisticLine text="bad" value = {props.bad} />
    <StatisticLine text="all" value = {props.all} />
    <StatisticLine text="average" value = {props.average} />
    <StatisticLine text="positive" value = {props.positive.toFixed(2)} sysmbol = "%" />
    </table>
  )
}

const StatisticLine = ({text, value, sysmbol}) => {
  return(
    <tr>
      <td>{text} </td> <td> {value} {sysmbol} </td>
    </tr>
  )
} 

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
 

  const all = good+bad+neutral
  const average = good - bad
  const positive = good/all*100

  const handleGood = () => {
        setGood(good + 1)
  
  }
  const handleBad = () => {
        setBad(bad + 1)

  }
  const handleNeutral = () => {
        setNeutral(neutral + 1)
  }

  return (
    <div>
        <h1>give feedback</h1>
        
        <Button onClick={handleGood} text="good"/>
        <Button onClick={handleNeutral} text="neutral"/>
        <Button onClick={handleBad} text="bad"/>
        
        <h1>statistic</h1>
        <Statistic good={good} bad={bad} neutral={neutral} all={all} average={average} positive={positive} />


    </div>
  )
}

export default App