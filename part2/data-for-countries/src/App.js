import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';

function App() {
  const [filterName, setFilterName] = useState('');
  const [countries, setCountries] = useState([]);

  const filterNameChanged = (event) => {
    console.log(event.target.value)
    setFilterName(event.target.value)
  }

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(res => {
      if (res.data) {
        setCountries(res.data)
      }
    });
  }, []);

  const countriesToShow = filterName === '' ? countries : countries.filter(elem => elem.name.toUpperCase().includes(filterName.toUpperCase()));

  let result = "Too many matches, specify another filter"
  if (countriesToShow.length === 1) {
    console.log(countriesToShow[0]);
    result = (<h1>{countriesToShow[0].name}</h1>);
  } else if (countriesToShow.length <= 10) {
    result = countriesToShow.map(elem => <div key={elem.name}>{elem.name} </div>)
  }

  return (
    <div>
      <div>search countries <input value={filterName} onChange={filterNameChanged} /></div>
      <div>
        {result}
      </div>
    </div>
  );
}


export default App;
