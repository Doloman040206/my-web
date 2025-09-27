import React, { useEffect, useState } from 'react';
import { PizaObject } from '../admin/types';

export function PublicPizaList() {
  const [pizaList, setPizaList] = useState<PizaObject[]>([]);
  useEffect(() => {
    fetch('/api/piza')
      .then(res => res.json())
      .then(setPizaList);
  }, []);

  const imagesByName: Record<string, string> = {
    Margherita: './img/99.jpg',
    Hawai: './img/100.jpg',
    Pepperoni: './img/101.jpg',
  };

  return (
    <>
      {pizaList.length > 0 ? (
        pizaList.map((item, index) => {
          // Якщо в записі є поле images — підставляємо ./img/<images>
          const srcFromDb = (item as any).images ? `./img/${(item as any).images}` : undefined;
          const imageSrc = srcFromDb ?? (imagesByName as any)[item.name] ?? './img/99.jpg';

          return (
            <div key={index} style={{ marginBottom: '10px', marginLeft: '30px', fontSize: '1.2rem' }}>
              <div style={{ fontSize: '1.2rem', color: '#333' }}>
                Piza <b>"{item.name}"</b> with {item.ingridients} at <b>{item.price}</b>$
              </div>
              <div>
                <img
                  src={imageSrc}
                  alt={item.name}
                  style={{ width: '300px', marginLeft: '500px', marginTop: '20px' }}
                />
              </div>
            </div>
          );
        })
      ) : (
        <div style={{ textAlign: 'center', fontSize: '1.2rem', color: '#777' }}>No items in the list</div>
      )}
    </>
  );
}