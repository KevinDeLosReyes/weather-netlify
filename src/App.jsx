import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import WeatherCard from './components/WeatherCard'
function App() {

  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temp, setTemp] = useState()
const [isLoading, setIsLoading] = useState(true)


  const success= position => {
   
   const obj = {
    lat: position.coords.latitude,
    lon: position.coords.longitude
   }
   setCoords(obj)

  }
  useEffect(() => {
    setIsLoading(true)
    navigator.geolocation.getCurrentPosition(success)

  }, [])
  useEffect(() => {
    if (coords) {
      const APIKEY = 'c2c36d3b4c8de26ac09ac01cfc05bb7b'
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${APIKEY}`
      
      axios.get(url)
      .then(res => {
        const celsius = (res.data.main.temp -273.15).toFixed(1)
        const fahrenheit = (celsius * 9/5 + 32).toFixed(1)
        setTemp({celsius, fahrenheit})
        setWeather(res.data)} )
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
    }
  }, [coords])
  
  return (
    <div className='app'>
      
      {
        isLoading
        ? <h2 className='app__loader'> loading...</h2>
        : (
        <WeatherCard
      weather ={weather}
      temp = {temp}
      />)}

    </div>
  )
}

export default App
