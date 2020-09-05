import React, { useState } from 'react'
import './SearchBar.css'

function SearchBar(props){
  const[term,setTerm] = useState('')

  const search = () => {
    props.onSearch(term)
  }

  const handleTermChange = event => {
    setTerm(event.target.value)
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      search()
    }
  }

  return(
    <div className="SearchBar">
      <input placeholder="Enter A Song, Album, or Artist"
            onChange={handleTermChange} onKeyPress={handleKeyPress} />
      <button className="SearchButton" onClick={search}>SEARCH</button>
    </div>
  )
}

export default SearchBar
