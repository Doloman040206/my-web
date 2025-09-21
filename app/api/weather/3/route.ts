import { NextRequest, NextResponse } from "next/server";

import pool from "@/app/libs/mysql";
import { create } from "domain";
import { request } from "http";


function weatherCodeToText(weather_code: number) {
    switch (weather_code) {
        case 0:
          return 'Clear sky'
        case 1:
        case 2:
        case 3:
            return 'Rain: Slight, moderate and heavy intensity'
        case 45:
        case 48:
          return 'Fog and depositing rime fog'
        case 51: 
        case 53: 
        case 55:
            return 'Drizzle: Light, moderate, and dense intensity'
        case 60: 
        case 61:
        case 62: 
        return 'Mainly clear, partly cloudy, and overcast'
        case 80: 
        case 81:
        case 82: 
            return 'Rain showers: Slight, moderate, and violent'
        default:
          return `Unknown weather code ${weather_code}`
      }
    // 51, 53, 55	Drizzle: Light, moderate, and dense intensity
    // 56, 57	Freezing Drizzle: Light and dense intensity
    // 61, 63, 65	Rain: Slight, moderate and heavy intensity
    // 66, 67	Freezing Rain: Light and heavy intensity
    // 71, 73, 75	Snow fall: Slight, moderate, and heavy intensity
    // 77	Snow grains
    // 80, 81, 82	Rain showers: Slight, moderate, and violent
    // 85, 86	Snow showers slight and heavy
    // 95 *	Thunderstorm: Slight or moderate
    // 96, 99 *	Thunderstorm with slight and heavy hail
}

export async function GET() {
    const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=47.8388&longitude=35.139567&daily=weather_code&timezone=auto&forecast_days=1")
    const data = await response.json()
    const weather_code = data.daily.weather_code[0]
    return NextResponse.json({
        apiOpenMeteioResponseData: data,
        weather_code: weather_code,
        weather: weatherCodeToText(weather_code),
    }) 
}















   
















