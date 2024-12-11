import { useEffect, useState } from "react"

const WeatherApp = () => {

    type Weather = {
        cityName : string
        temperature : number
        weather : string
        icon : string
    }

    const [search, setSearch] = useState('')
    const [weathers, setWeathers] = useState<Weather[]>()
    const [weather, setWeather] = useState<Weather |null>()
    const [error, setError] = useState('')


    const handleSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const fetchWeather = async () => {
        try {
            const response = await fetch('/Weather.json')

            if(!response.ok){ throw new Error}
            const data = await response.json()
            
            setWeathers(data.weather)
            console.log(weathers)
        } 
        catch (error) 
        {
            console.error(error)
        }   
    }

    const findCity = () =>{
        const found = weathers?.find(x =>
            x.cityName.toLowerCase().includes(search.toLowerCase())
        )

        if(found){
            setWeather(found)
            setError('')
        }        
        else{
            setWeather(null)
            setError('The given city was not found')
        }
    }

    useEffect(() =>{
        fetchWeather()
    },[])


  return (
    <div id="container">
        <div className="search-area">
            <input type="text" value={search} onChange={handleSearch}></input>
            <button onClick={findCity}>Search</button>
        </div>

        <div className="result-area">
            {error && <p>{error}</p>}
            {weather && (
                <div className="weather-info">
                    <img src={weather.icon} className="weather-icon"></img>

                    <div className="weather-details">
                        <p>City: <b>{weather.cityName}</b></p>
                        <p>Temperature: <b>{weather.temperature}</b>°C</p>
                        <p>Weather: <b>{weather.weather}</b></p>
                    </div>
                </div>
            )}
        </div>
    </div>
  )
}

export default WeatherApp