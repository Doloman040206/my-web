import React, { useEffect, useState } from 'react';
import { CreatePizaForm } from './components/CreatePizaForm';
import { PizaListItem } from './components/PizaListItem';
import { PizaObject } from './types';

const App: React.FC = () => {
  const [pizaList, setPizaList] = useState<PizaObject[]>([]);

  // --- API helpers ---

  // Create (POST) — залишено без змін (може приймати image)
  async function apiCreatePiza(name: string, ingridients: string, price: number, image: string | null) {
    try {
      const res = await fetch('/api/piza', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, ingridients, price, image })
      });
      if (!res.ok) throw new Error('Create request failed: ' + res.status);
      return await res.json();
    } catch (err) {
      console.error('apiCreatePiza error', err);
      throw err;
    }
  }

  // Edit (PUT) — ТЕРМІНОВО: більше не відсилаємо image
  async function apiEditPiza(id: number, name: string, ingridients: string, price: number) {
    try {
      const res = await fetch(`/api/piza/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, ingridients, price })
      });
      if (!res.ok) throw new Error('Edit request failed: ' + res.status);
      return await res.json();
    } catch (err) {
      console.error('apiEditPiza error', err);
      throw err;
    }
  }

  // Delete (DELETE)
  async function apiDeletePiza(id: number) {
    try {
      const res = await fetch(`/api/piza/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Delete request failed: ' + res.status);
      return await res.json();
    } catch (err) {
      console.error('apiDeletePiza error', err);
      throw err;
    }
  }

  // Fetch list
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

  // --- Handlers used by children ---

  // addItem: Create new pizza (passes image as string|null)
  async function addItem(name: string, ingridients: string, price: number, image: string | null) {
    try {
      const created = await apiCreatePiza(name, ingridients, price, image);
      console.log('Created:', created);
      await fetchPizaList();
    } catch (err) {
      alert('Create failed. See console.');
    }
  }

  // deleteItem
  async function deleteItem(id: number) {
    try {
      const deleted = await apiDeletePiza(id);
      console.log('Deleted:', deleted);
      await fetchPizaList();
    } catch (err) {
      alert('Delete failed. See console.');
    }
  }

  // editItem: більше не приймає image — лише id, name, ingridients, price
  async function editItem(id: number, name: string, ingridients: string, price: number) {
    try {
      const edited = await apiEditPiza(id, name, ingridients, price);
      console.log('Edited:', edited);
      await fetchPizaList();
    } catch (err) {
      console.error('editItem error', err);
      alert('Edit failed. See console.');
    }
  }

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          fontSize: '2.5rem',
          fontWeight: 'bold',
          marginBottom: '20px',
          color: 'green',
        }}
      >
        Admin
      </div>

      <div
        style={{
          textAlign: 'center',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          marginBottom: '20px',
        }}
      >
        Piza List
      </div>

      <CreatePizaForm addItem={addItem} />
	  <div
        style={{
          background: '#f9f9f9',
          padding: '20px',
          borderRadius: '8px'
        }}
      >
        {pizaList.length > 0 ? (
          pizaList.map((item) => (
            <PizaListItem
              key={item.id}
              piza={item}
              onDelete={deleteItem}
              onEdit={editItem} // onEdit тепер (id,name,ingridients,price)
            />
          ))
        ) : (
          <div
            style={{
              textAlign: 'center',
              fontSize: '1.2rem',
              color: '#777'
            }}
          >
            No items in the list
          </div>
        )}
      </div>
    </div>
  );
};

export default App;