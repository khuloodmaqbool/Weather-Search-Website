"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoMdCloudOutline } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { TbTemperature } from "react-icons/tb";

export  const WeatherData = ()=> {
  const [apiData, setData] = useState<any>(null);
  const [cityName, setCityName] = useState<string>("");
  const [temperature, setTemperature] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const Weather = async () => {
    setLoading(true); 
    setError(null); 
    setTemperature(""); 
    setData(null); 
  
    const inpVal = cityName.trim(); 
    if (!inpVal) {
      alert("Please enter a valid city name."); 
      setLoading(false); 
      return; 
    }
  
    setLoading(true); 
    setError(null); 

    try {
      const APIKey = `2ccfd2d2679b517eda1e1ee585be3889`;
      const api = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}&units=metric`;
      const response = await fetch(api);
      
      if (!response.ok) {
        throw new Error("City not found!"); 
      }

      const data = await response.json();
      setData(data);

      if (data.main.temp < 0) {
        setTemperature(`Brrr, it's freezing at ${data.main.temp}°C! Make sure to layer up!`);
      } else if (data.main.temp < 10) {
        setTemperature(`Chilly weather ahead! It's ${data.main.temp}°C. Keep yourself warm.`);
      } else if (data.main.temp < 20) {
        setTemperature(`The temperature is a cool ${data.main.temp}°C. A light jacket should do the trick.`);
      } else if (data.main.temp < 30) {
        setTemperature(`It's a pleasant ${data.main.temp}°C. Perfect for enjoying the outdoors!`);
      } else {
        setTemperature(`It's scorching hot at ${data.main.temp}°C! Stay cool and drink lots of water!`);
      }
    } catch (error: any) {
      setError(error.message); 
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="max-w-96 shadow-lg rounded-lg mx-auto mt-8 p-5 bg-white">
        <h1 className="font-bold mb-1">Current Weather Update</h1>
        <p className="text-slate-500">Stay prepared and make the best of your day, no matter what the skies bring!</p>
        <div className="flex items-center">
          <Input
            type="text"
            className="my-2"
            value={cityName}
            onChange={(event) => setCityName(event.target.value)}
            placeholder="Enter city name"
          />
          <Button variant="outline" className="bg-black text-white my-3 ms-2" onClick={Weather}>
            {loading ? "Loading..." : "Get Weather"}
          </Button>
        </div>

        {loading ? <div className="loader mx-auto"></div> : error ? <p className="text-red-500">{error}</p> : apiData && 
          <>
            <div className="flex items-center">
              <TbTemperature className="w-8 h-8" />
              <p className="ms-4 text-slate-500">{temperature}</p>
            </div>
            <div className="flex">
              <IoMdCloudOutline className="w-10 h-10" />
              <p className="ms-4 text-slate-500">{`The current weather is ${apiData.weather[0].description}. Whatever the weather, make the most of your day!`}</p>
            </div>
            <div className="flex items-center">
              <IoLocationOutline className="w-6 h-6" />
              <p className="ms-4 text-slate-500">{`In ${cityName.toUpperCase()}`}</p>
            </div>
          </>}
        
      </div>
    </>
  );
}
