import React, { useEffect, useState } from 'react';

export function PublicWeatherWidget() {
  const [w1, setW1] = useState('');
  const [w2, setW2] = useState('');
  const [w3, setW3] = useState('');

  useEffect(() => {
    fetch('/api/weather')
      .then(res => res.json())
      .then(data => setW1(data.weather));

    fetch('/api/weather/2')
      .then(res => res.json())
      .then(data => setW2(data.weather));

    fetch('/api/weather/3')
      .then(res => res.json())
      .then(data => setW3(data.weather));
  }, []);

  const imagesByWeather: Record<string, string> = {
    'Clear sky': './img/clear.jpg',
    'Rain showers: Slight, moderate, and violent': './img/103.jpg',
	'Rain: Slight, moderate and heavy intensity': './img/103.jpg',
    'Fog and depositing rime fog': './img/fog.jpg',
  };

  return (
    <>
      <div style={{ fontSize: '1.2rem', marginLeft: '30px', marginTop: '20px', fontWeight: 'bold' }}>
        Weather in City 1 is {w1}
      </div>
      <img
        src={imagesByWeather[w1]}
        alt={w1}
        style={{ width: '300px', marginLeft: '530px', marginTop: '40px', marginBottom: '20px' }}
      />

      <div style={{ fontSize: '1.2rem', marginLeft: '30px', marginTop: '20px', fontWeight: 'bold' }}>
        Weather in City 2 is {w2}
      </div>
      <img
        src={imagesByWeather[w2]}
        alt={w2}
        style={{ width: '300px', marginLeft: '530px', marginTop: '40px', marginBottom: '20px' }}
      />

      <div style={{ fontSize: '1.2rem', marginLeft: '30px', marginTop: '20px', fontWeight: 'bold' }}>
        Weather in City 3 is {w3}
      </div>
      <img
        src={imagesByWeather[w3]}
        alt={w3}
        style={{ width: '300px', marginLeft: '530px', marginTop: '40px', marginBottom: '20px' }}
      />
    </>
  );
}