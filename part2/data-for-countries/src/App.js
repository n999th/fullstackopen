import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';


const DetailedInfo = props => {
  let country = props.country;
  let weatherData = props.weatherData;
  console.log('detailedinfo', weatherData)
  let weather = '';
  if (weatherData) {
    weather = (<div><h3 style={{ display: 'inline' }}>temperature:</h3> {weatherData.current.temperature} celsius <br />
      <img src={weatherData.current.weather_icons[0]} alt={'no data'} /><br />
      <h3 style={{ display: 'inline' }}>wind:</h3>{weatherData.current.wind_speed} kph direction {weatherData.current.wind_dir} </div>)
  }
  return (<div><h1>{country.name}</h1>
    <div>capital {country.capital}</div>
    <div>population {country.population}</div>
    <h3>languages</h3>
    <ul>
      {country.languages.map(elem => <li key={elem.name}>{elem.name}</li>)}
    </ul>
    <img height={100} width={100} src={country.flag} alt={'no data'} />
    <h1>Weather in {country.capital}</h1>
    {weather}
  </div>);
}


function App() {
  const [filterName, setFilterName] = useState('');
  const [countries, setCountries] = useState([]);
  const [whichCountryToShow, setwhichCountryToShow] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  const filterNameChanged = (event) => {
    setFilterName(event.target.value)
  }

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(res => {
      if (res.data) {
        setCountries(res.data)
      }
    });
  }, []);

  useEffect(() => {
    console.log('changed country triggered useeffect', whichCountryToShow)
    if (whichCountryToShow === null) {
      return;
    }
    let access_key = process.env.REACT_APP_WEATHER_API_KEY;
    let weatherLink = `http://api.weatherstack.com/current?access_key=${access_key}&query=${whichCountryToShow.capital}`;
    console.log('calling axios')
    axios.get(weatherLink).then(res => {
      console.log(res.data)
      if (!res.data.error) {
        console.log('weather data changed')
        setWeatherData(res.data);
      }
    });


  }, [whichCountryToShow]);
  console.log('rerender')
  const showCountryHandler = (country) => {
    if (whichCountryToShow && whichCountryToShow.name === country.name) {
      console.log('country changed to {}')
      setwhichCountryToShow({})
    } else {
      console.log(`country changed to new ${country}`)
      setwhichCountryToShow(country)
    }
  }
  const countriesToShow = filterName === '' ? countries : countries.filter(elem => elem.name.toUpperCase().includes(filterName.toUpperCase()));

  if (countriesToShow.length === 1 && (!whichCountryToShow || countriesToShow[0].name !== whichCountryToShow.name)) {
    setwhichCountryToShow(countriesToShow[0]);
  }

  let result = "Too many matches, specify another filter"
  if (countriesToShow.length === 1) {
    result = <DetailedInfo country={whichCountryToShow} weatherData={weatherData} />;
  } else if (countriesToShow.length <= 10) {
    result = countriesToShow.map(elem => <div key={elem.name}>{elem.name} <button onClick={() => showCountryHandler(elem)}>show</button> {whichCountryToShow && whichCountryToShow.name === elem.name && <DetailedInfo country={elem} weatherData={weatherData} />} </div>)
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
