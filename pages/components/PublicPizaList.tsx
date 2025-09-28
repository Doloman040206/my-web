import React, { useEffect, useState, useCallback } from 'react';
import { PizaObject } from '../admin/types';

export function PublicPizaList() {
  const [pizaList, setPizaList] = useState<PizaObject[]>([]);

  const fetchPizaList = useCallback(async () => {
    try {
      const res = await fetch('/api/piza');
      if (!res.ok) throw new Error('Fetch failed');
      const data = await res.json();
      setPizaList(data);
    } catch (err) {
      console.error(err);
      setPizaList([]);
    }
  }, []);

  useEffect(() => {
    // початковий запит
    fetchPizaList();

    // підписка на storage події від інших вкладок
    function onStorage(e: StorageEvent) {
      if (e.key === 'piza-updated') {
        fetchPizaList();
      }
    }
    window.addEventListener('storage', onStorage);

    return () => {
      window.removeEventListener('storage', onStorage);
    };
  }, [fetchPizaList]);

  const imagesByName: Record<string, string> = {
    Margherita: './img/99.jpg',
    Hawai: './img/100.jpg',
    Pepperoni: './img/101.jpg',
  };

  return (
    <>
      {pizaList.length > 0 ? (
        pizaList.map((item, index) => {
          // виправлений шлях з БД (якщо є)
          const srcFromDb =
            (item as any).images && (item as any).images.length
              ? `./img/${(item as any).images}`
              : undefined;
          const imageSrc = srcFromDb ?? (imagesByName as any)[item.name] ?? './img/99.jpg';

          return (
            <div key={index} style={{ marginBottom: '10px', marginLeft: '30px', fontSize: '1.2rem' }}>
              <div style={{ fontSize: '1.2rem', color: '#333' }}>
                Piza <b>"{item.name}"</b> with {item.ingridients} at <b>{item.price}</b>$
              </div>
              <div className="site-img-wrap">
                <img
                  className="site-img"
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