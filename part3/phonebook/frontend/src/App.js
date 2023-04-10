import phonebookService  from './services/phonebook'
import { useEffect, useState } from 'react'

const Contact = ({name, number , erase}) => {
 
  return(<>{name} : {number}
            <button onClick={erase}>Delete</button>
            <br/>
        </>)
}

const Search = (props) => {
  return(<input value={props.keyword} onChange={props.handleKeywordChange}/>)
}

const PersonForm = (props) => {
  return(<form onSubmit={props.addPerson}>
  <div>
    name: <input  value={props.newName} onChange={props.handleNameChange}/>
  </div>
  <div>
    number: <input value={props.newNumber} onChange={props.handleNumberChange} />
  </div>
  <div>
    <button type="submit">add</button>
  </div>
</form>)
}

const Book = ({searchResult, erasePerson}) => {
  
  return( <div>
    {searchResult.map(contact => <Contact 
    key = {contact.id} 
    name = {contact.name} 
    number = {contact.number} 
    erase = {() => erasePerson(contact.id,contact.name)}
    />)}
  </div>)
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

// App Component

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('add name ...')

  const [newNumber,setNewNumber] = useState('119')

  const [keyword, setKeyword] = useState("")

  const [errorMessage, setErrorMessage] = useState('')

// Get data from the server
  useEffect( () => {
    phonebookService.getAll()
    .then(response => setPersons(response))
  },[])
  
  // Add new data to the server
  const addPerson = (event) => {
    event.preventDefault()
    if (handleDuplicate(newName, newNumber)){
      return 0
    }
    phonebookService.create({name:newName , number:newNumber})
      .then( response => {
        setPersons(persons.concat(response))
        setErrorMessage(
          `Added ${newName}`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNewName("")
        setNewNumber("")
      })
      .catch(error => {
        setErrorMessage(error.response.data.error)
      })
    
  }

  //Delete data from the server
  const erasePerson = (id,name) => {
    if(window.confirm(`Delete ${name}`))
    {phonebookService.erase(id)
    .then( () =>
       {setPersons(persons.filter(x => {if(x.id !== id)return x
      else{return false}}))
       console.log(persons)}
    )
    .catch(error => {
      setErrorMessage(
        `Information about ${newName} does not exist in the server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setPersons(persons.filter(n => n.id !== id))
    })}
  }


  // Check if new data already exists
  const handleDuplicate = (name) =>{
    const nameOnlyArr = persons.map(obj => obj.name)
    const idOnlyArr = persons.map(obj => obj.id)
    console.log(nameOnlyArr);
    const alreadyExists = nameOnlyArr.findIndex(element => element == name)
    if (alreadyExists == -1){return 0} // Doesn't exists
    if (window.confirm(`${newName} is already added to the phonebook, change the old number to a new one ?`)){
      const contact = persons.find(n => n.id === idOnlyArr[alreadyExists])
      const updatedContact = { ...contact , number: newNumber }

      phonebookService.update(idOnlyArr[alreadyExists],updatedContact)
      .then(updated => {
       setPersons(persons.map(person => person.id !== idOnlyArr[alreadyExists]? person : updated ))
      })
      .catch(error => {
        setErrorMessage(
          `Information about ${newName} does not exist in the server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setPersons(persons.filter(n => n.id !== idOnlyArr[alreadyExists]))
      })
      
      return 1
    } // User wants to replace the number
    else{return 1} // Don't replace number 
  }



  // Search Functionality
  let searchResult
  if ( keyword === ""){searchResult = persons.map(x => x)}
  
  else{
    searchResult = persons.filter(contact => {
      const re = new RegExp(`${keyword}`, 'i')
      console.log(contact.name.match(re))
      if (contact.name.match(re) === null ){ return false}
      else { return true}
  })
  }




  // Handling input values {start}
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value)
  }
  //Handling input values {end}

 
  return (
    <div>
      <Notification message={errorMessage}/>
      <h2>Phonebook 📞</h2>
      <h3>Search 🔍</h3>
      <Search keyword={keyword} handleKeywordChange={handleKeywordChange}/>
      <h3>Add New Contact 📱</h3>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Book searchResult={searchResult} erasePerson = {erasePerson}/>
    </div>
  )
}

export default App