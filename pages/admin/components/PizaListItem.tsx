import React from 'react';
import { PizaObject } from '../types';

export interface PizaListItemProps {
  piza: PizaObject;
  onDelete: (id: number) => void;
  onEdit: (id: number, name: string, ingridients: string, price: number) => void;
}

export function PizaListItem(props: PizaListItemProps) {
  function onClickEdit() {
    let newName = prompt('Pizza name', props.piza.name);
    if (newName == null) return;

    let newIngridients = prompt('Pizza ingridients', props.piza.ingridients);
    if (newIngridients == null) return;

    let newPrice;
    while (true) {
      let priceInput = prompt('Pizza price', '' + props.piza.price);
      if (priceInput == null) return;
      newPrice = parseFloat(priceInput);
      if (isNaN(newPrice)) {
        alert('Wrong price');
      } else {
        break;
      }
    }

    props.onEdit(props.piza.id, newName, newIngridients, newPrice!);
  }

  const imageName = (props.piza as any).images ?? null;

  // Ваші стилі кнопок (взято з прикладу)
  const buttonStyleBase: React.CSSProperties = {
    fontSize: '1.2rem',
    padding: '10px 20px',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    width: '110px',
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start', // вирівнюємо кнопки по верхньому краю тексту
        padding: '16px',
        background: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
        marginBottom: '18px',
      }}
    >
      {/* Ліва колонка: текст (Name / Ingredients / Price) */}
      <div style={{ flex: '1 1 auto', paddingRight: '20px' }}>
        <div style={{ marginBottom: '12px' }}>
          <label style={{ marginRight: '10px', fontSize: '1.2rem', color: '#333' }}>Name:</label>
          <span style={{ fontWeight: '700', fontSize: '1.2rem' }}>{props.piza.name}</span>
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label style={{ marginRight: '10px', fontSize: '1.2rem', color: '#333' }}>Ingredients:</label>
          <span style={{ fontWeight: '700', fontSize: '1.2rem' }}>{props.piza.ingridients}</span>
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label style={{ marginRight: '10px', fontSize: '1.2rem', color: '#333' }}>Price:</label>
          <span style={{ fontWeight: '700', fontSize: '1.2rem' }}>{props.piza.price}</span>
        </div>

        {imageName && (
          <div style={{ marginTop: '4px' }}>
            <label style={{ marginRight: '10px', fontSize: '1.05rem', color: '#666' }}>Image:</label>
            <span style={{ fontWeight: '600', fontSize: '1.05rem' }}>{imageName}</span>
          </div>
        )}
      </div>

      {/* Права колонка: одна пара кнопок (Edit над Delete), вирівняна по верхньому краю */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-end' }}>
        <button
          style={{ ...buttonStyleBase, backgroundColor: 'blue' }}
          onClick={onClickEdit}
        >
          Edit
        </button>

        <button
          style={{ ...buttonStyleBase, backgroundColor: 'green' }}
          onClick={() => {
            const ok = window.confirm('Ви дійсно бажаєте видалити піцу "' + props.piza.name + '"?');
            if (ok) props.onDelete(props.piza.id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}