const Search = (props) => {
    return(
        <div>
           Enter Country Name:<input value={props.value} onChange={props.onChange}/>
        </div>
    )
}

export default Search