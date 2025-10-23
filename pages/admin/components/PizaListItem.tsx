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
    if (!/^[1-9]\d*$/.test(priceInput)) {
    alert('Price must be a positive integer');
    continue;
}
    newPrice = Number(priceInput);
    break;
}
    props.onEdit(props.piza.id, newName, newIngridients, newPrice!);
}

  const imageName = (props.piza as any).image ?? (props.piza as any).images ?? null;

  return (
    <div className="piza-card">
      <div className="piza-left">
        <div className="piza-row">
          <label className="piza-label">Name:</label>
          <div className="piza-value">{props.piza.name}</div>
        </div>

        <div className="piza-row">
          <label className="piza-label">Ingredients:</label>
          <div className="piza-value">{props.piza.ingridients}</div>
        </div>

        <div className="piza-row">
          <label className="piza-label">Price:</label>
          <div className="piza-value">{props.piza.price}</div>
        </div>

        {imageName && (
          <div className="piza-row">
            <label className="piza-label" style={{ fontSize: '1.0rem', color: '#666' }}>Image:</label>
            <div className="piza-value" style={{ fontWeight: 600, fontSize: '1.05rem' }}>{imageName}</div>
          </div>
        )}
      </div>

      <div className="piza-actions">
        <button
          className="piza-btn piza-btn-delete"
          onClick={() => {
            const ok = window.confirm('Ви дійсно бажаєте видалити піцу "' + props.piza.name + '"?');
            if (ok) props.onDelete(props.piza.id);
          }}
          type="button"
        >
          Delete
        </button>

        <button className="piza-btn piza-btn-edit" onClick={onClickEdit} type="button">Edit</button>
      </div>
    </div>
  );
}