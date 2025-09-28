import React, { useEffect, useState } from 'react';

export function PublicWeatherWidget() {
  const [w1, setW1] = useState('');
  const [w2, setW2] = useState('');
  const [w3, setW3] = useState('');

  useEffect(() => {
    fetch('/api/weather').then(res => res.json()).then(d => setW1(d.weather));
    fetch('/api/weather/2').then(res => res.json()).then(d => setW2(d.weather));
    fetch('/api/weather/3').then(res => res.json()).then(d => setW3(d.weather));
  }, []);


  const imagesByWeather: Record<string, string[]> = {
    'Clear sky': ['./img/102.jpg', './img/103.jpg'],
    'Mainly clear, partly cloudy, and overcast': ['./img/102.jpg', './img/103.jpg'],
    'Rain showers: Slight, moderate, and violent': ['./img/104.jpg', './img/105.jpg'],
    'Rain: Slight, moderate and heavy intensity': ['./img/104.jpg', './img/105.jpg'],
    'Fog and depositing rime fog': ['./img/106.jpg', './img/107.jpg'],
  };

  
  function getImage(weather: string, index: number) {
    const imgs = imagesByWeather[weather] || [];
    if (imgs.length === 0) return '';
    return imgs[index % imgs.length]; 
  }

  return (
    <>
      <div style={{ fontSize: '1.2rem', marginLeft: '30px', marginTop: '20px', fontWeight: 'bold' }}>
        Weather in Kyiv is {w1}.
      </div>
      <div className="site-img-wrap">
        <img
          src={getImage(w1, 0)}
          alt={w1}
          style={{ width: '300px', marginLeft: '530px', marginTop: '40px', marginBottom: '20px' }}
        />
      </div>

      <div style={{ fontSize: '1.2rem', marginLeft: '30px', marginTop: '20px', fontWeight: 'bold' }}>
        Weather in Dnipro is {w2}.
      </div>
      <div className="site-img-wrap">
        <img
          src={getImage(w2, 1)}
          alt={w2}
          style={{ width: '300px', marginLeft: '530px', marginTop: '40px', marginBottom: '20px' }}
        />
      </div>

      <div style={{ fontSize: '1.2rem', marginLeft: '30px', marginTop: '20px', fontWeight: 'bold' }}>
        Weather in Zaporizhzhia is {w3}.
      </div>
      <div className="site-img-wrap">
        <img
          src={getImage(w3, 2)}
          alt={w3}
          style={{ width: '300px', marginLeft: '530px', marginTop: '40px', marginBottom: '20px' }}
        />
      </div>
    </>
  );
}