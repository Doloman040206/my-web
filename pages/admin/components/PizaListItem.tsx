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

  const imageName = (props.piza as any).image ?? (props.piza as any).images ?? null;

  const styles = {
    card: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '28px 30px', background: '#f6f6f6', borderRadius: '8px', marginBottom: '20px' },
    left: { flex: '1 1 auto', paddingRight: '20px' },
    row: { marginBottom: '16px', display: 'flex', alignItems: 'center' },
    label: { width: '100px', fontSize: '1.05rem', color: '#333', marginRight: '8px' },
    value: { fontWeight: 700, fontSize: '1.2rem', color: '#111' },
    actions: { display: 'flex', flexDirection: 'column' as const, gap: '12px', alignItems: 'flex-end' },
    btn: { width: '110px', fontSize: '1.05rem', padding: '8px 14px', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' },
    btnDelete: { backgroundColor: '#11820b' },
    btnEdit: { backgroundColor: '#0839ff' },
  };

  return (
    <div style={styles.card}>
      <div style={styles.left}>
        <div style={styles.row}>
          <label style={styles.label}>Name:</label>
          <div style={styles.value}>{props.piza.name}</div>
        </div>

        <div style={styles.row}>
          <label style={styles.label}>Ingredients:</label>
          <div style={styles.value}>{props.piza.ingridients}</div>
        </div>

        <div style={styles.row}>
          <label style={styles.label}>Price:</label>
          <div style={styles.value}>{props.piza.price}</div>
        </div>

        {imageName && (
          <div style={styles.row}>
            <label style={{ ...styles.label, fontSize: '1.0rem', color: '#666' }}>Image:</label>
            <div style={{ ...styles.value, fontWeight: 600, fontSize: '1.05rem' }}>{imageName}</div>
          </div>
        )}
      </div>

      <div style={styles.actions}>
        <button
          style={{ ...styles.btn, ...styles.btnDelete }}
          onClick={() => {
            const ok = window.confirm('Ви дійсно бажаєте видалити піцу "' + props.piza.name + '"?');
            if (ok) props.onDelete(props.piza.id);
          }}
        >
          Delete
        </button>

        <button
          style={{ ...styles.btn, ...styles.btnEdit }}
          onClick={onClickEdit}
        >
          Edit
        </button>
      </div>
    </div>
  );
}