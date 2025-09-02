import React, { use, useEffect, useState } from 'react';
import { PizaObject } from '../admin/types';






export function PublicWeatherWidget() {
    const fetchWeather = async () => {
		const responce = await fetch('/api/weather');
		const data = (await responce.json())
		console.log('fetchWeather response', data)
		setWeather(data.weather)
	}

    const [weather, setWeather] = useState('');
	useEffect(() => {
		fetchWeather()
	}, [])

    
    return <>
        <div style={{fontSize:'1.2rem',marginLeft:'30px', marginTop:'20px', fontWeight: 'bold'}}>Weather is {weather}</div> 
		<img src="./img/103.jpg" alt="weather" style={{width:'300px', marginLeft:'530px', marginTop:'40px', marginBottom:'20px'}} />
    </>
   
}