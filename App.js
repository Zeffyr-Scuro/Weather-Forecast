import React from 'react'


export default function App() {
    
    const [location, setLocation] = React.useState()
    const [country, setCountry] = React.useState("")
    const celsius = "C"
    const fahrenheit = "F"
    const [tempScales, setTempScales] = React.useState(celsius)
    const [currentTemp, setCurrentTemp] = React.useState({
        min: 0,
        curr: 0,
        max: 0
    })

    
     React.useEffect(() => {
        navigator.geolocation.getCurrentPosition(async function(position) {  
            const response = await fetch(`https://weather-proxy.freecodecamp.rocks/api/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}`)
            response.ok
            response.error
            const data = await response.json()
            setLocation(data)
            setCountry(data.sys.country) 
            setCurrentTemp(state =>({
            min: data.main.temp_min,
            curr: data.main.temp,
            max: data.main.temp_max
            }))
          })
    }, [])
    
   if (location === undefined){
       return(
           <div id="load">Loading...</div>
       )
   }
   
   const temperature = (id, min, curr, max) => {
       console.log(id)
       if (id === "C"){
            setCurrentTemp(({
                min: Math.round(((min * 9/5) + 32) * 100) /100,
                curr: Math.round(((curr * 9/5) + 32) * 100) /100,
                max: Math.round(((max * 9/5) + 32) * 100) /100
                }))
            setTempScales(fahrenheit)
      }
      if (id === "F"){
          setCurrentTemp(({
                min: Math.round(((min - 32) * 5/9) * 100) /100,
                curr: Math.round(((curr - 32) * 5/9) * 100) /100,
                max: Math.round(((max - 32) * 5/9) * 100) /100
                }))
          setTempScales(celsius)
      }
   }

    
    return(
        <div>
            <h1>Weather Forecast</h1>
            <h2>{location.name}</h2>
            <img id="flag" src={`https://countryflagsapi.com/png/${country.toLowerCase()}`} alt="Country flag"/>
            <h3>{location.weather[0].main}</h3>
            <img src={location.weather[0].icon} alt={location.weather[0].main} />
            <div id="temp-box">
                <p className="temp min">Min temp: {currentTemp.min} °
                <span onClick={() => temperature(tempScales,currentTemp.min, currentTemp.curr, currentTemp.max)}> {tempScales}</span>
                </p> 
                <p className="temp current">Current temp: {currentTemp.curr} °
                <span onClick={() => temperature(tempScales,currentTemp.min, currentTemp.curr, currentTemp.max)}>{tempScales}</span>
                </p> 
                <p className="temp max">Max temp: {currentTemp.max} °
                <span onClick={() => temperature(tempScales,currentTemp.min, currentTemp.curr, currentTemp.max)}> {tempScales}</span>
                </p> 
            </div> 
            <p>Humidity: {location.main.humidity}</p>
        </div>
    )
}