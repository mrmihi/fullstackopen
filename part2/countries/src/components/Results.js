import Country from "./Country"

const Results = ({countries, setCountries}) => {

    console.log(countries.length)
    if (countries.length === 0){
        return (<p>
            No Results
        </p>)
    }
    else if (countries.length > 10) {
        return (
            <p>
            Make the search more specific...
            </p>
        )
    } else if ((countries.length > 1 && countries.length < 11)) {
        return (
            <ul>
            {countries.map((country, i) =>
                <li key={i}> {country.name.common} <button onClick={() => setCountries([country])}>show</button></li>
            )}
            </ul>
        )
    } else {
        return (
            <Country country={countries[0]}/>
        )
    }
 
}

export default Results