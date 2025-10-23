import React, { useEffect, useState } from 'react';
import { CreatePizaForm } from './components/CreatePizaForm';
import { PizaListItem } from './components/PizaListItem';
import { PizaObject } from './types';
import './components/style.css';

const App: React.FC = () => {
  const [pizaList, setPizaList] = useState<PizaObject[]>([]);

  async function apiCreatePiza(name: string, ingridients: string, price: number, image: string | null) {
    const res = await fetch('/api/piza', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, ingridients, price, image })
    });
    if (!res.ok) throw new Error('Create request failed: ' + res.status);
    return await res.json();
  }

  async function apiEditPiza(id: number, name: string, ingridients: string, price: number) {
    const res = await fetch(`/api/piza/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, ingridients, price })
    });
    if (!res.ok) throw new Error('Edit request failed: ' + res.status);
    return await res.json();
  }

  async function apiDeletePiza(id: number) {
    const res = await fetch(`/api/piza/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Delete request failed: ' + res.status);
    return await res.json();
  }

  const fetchPizaList = async () => {
    try {
      const res = await fetch('/api/piza');
      if (!res.ok) throw new Error('Fetch list failed: ' + res.status);
      const data = await res.json();
      setPizaList(data);
    } catch (err) {
      console.error('fetchPizaList error', err);
      setPizaList([]);
    }
  };

  useEffect(() => {
    fetchPizaList();
  }, []);

  async function addItem(name: string, ingridients: string, price: number, image: string | null) {
    try {
      await apiCreatePiza(name, ingridients, price, image);
      await fetchPizaList();
      try { localStorage.setItem('piza-updated', String(Date.now())); } catch (e) { /* ignore */ }
    } catch {
      alert('Create failed. See console.');
    }
  }

  async function deleteItem(id: number) {
    try {
      await apiDeletePiza(id);
      await fetchPizaList();
      try { localStorage.setItem('piza-updated', String(Date.now())); } catch (e) { /* ignore */ }
    } catch {
      alert('Delete failed. See console.');
    }
  }

  async function editItem(id: number, name: string, ingridients: string, price: number) {
    try {
      await apiEditPiza(id, name, ingridients, price);
      await fetchPizaList();
      try { localStorage.setItem('piza-updated', String(Date.now())); } catch (e) { /* ignore */ }
    } catch (err) {
      console.error('editItem error', err);
      alert('Edit failed. See console.');
    }
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '900px', margin: '20px auto', padding: '10px' }}>
      <h1 style={{ textAlign: 'center', color: 'green', fontSize: '2.2rem', marginBottom: '18px' }}>Admin</h1>

      <div style={{ marginBottom: '18px' }}>
        <CreatePizaForm addItem={addItem} />
      </div>

      <div>
        {pizaList.length > 0 ? (
          pizaList.map((item) => (
            <PizaListItem key={item.id} piza={item} onDelete={deleteItem} onEdit={editItem} />
          ))
        ) : (
          <div style={{ textAlign: 'center', fontSize: '1.1rem', color: '#777' }}>No items in the list</div>
        )}
      </div>
    </div>
  );
};

export default App;