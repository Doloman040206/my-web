import React from 'react';
import { PizaObject } from '../types';

export interface PizaListItemProps {
    piza: PizaObject;
    onDelete: (id: number) => void;
    // onEdit тепер без image-параметра
    onEdit: (id: number, name: string, ingridients: string, price: number) => void;
}

export function PizaListItem(props: PizaListItemProps) {

    async function onClickEdit() {
        // 1) name
        let newName = prompt('Pizza name', props.piza.name)
        if (newName == null) return;

        // 2) ingridients
        let newIngridients = prompt('Pizza ingridients', props.piza.ingridients)
        if (newIngridients == null) return;
        
        // 3) price (з перевіркою у циклі)
        let newPrice;
        while (true) {
            let priceInput = prompt('Pizza price', '' + props.piza.price)
            if (priceInput == null) return;
            newPrice = parseFloat(priceInput)
            if (isNaN(newPrice)) {
                alert('Wrong price');
            } else {
                break;
            }
        }

        // Більше не робимо жодних операцій з файлами/зображеннями під час редагування.
        props.onEdit(props.piza.id, newName, newIngridients, newPrice!);
    }

    const imageName = (props.piza as any).images ?? null;
    return (
        <div style={{ marginBottom: '30px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginTop: '0px' }}>
                <button
                    type="button"
                    style={{
                        fontSize: '1.2rem',
                        padding: '10px 20px',
                        backgroundColor: 'blue',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        width: '110px',
                        marginBottom: '10px'
                    }}
                    onClick={onClickEdit}
                >
                    Edit
                </button>

                <button
                    type="button"
                    style={{
                        fontSize: '1.2rem',
                        padding: '10px 20px',
                        backgroundColor: 'green',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        width: '110px',
                    }}
                    onClick={() => {
                        const ok = window.confirm('Ви дійсно бажаєте видалити піцу "' + props.piza.name + '"?');
                        if (ok) props.onDelete(props.piza.id);
                    }}
                >
                    Delete
                </button>
            </div>

            <div style={{ marginBottom: '10px', marginTop: '10px' }}>
                <label style={{ marginRight: '10px', fontSize: '1.2rem' }}>Name:</label>
                <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{props.piza.name}</span>
            </div>

            <div style={{ marginBottom: '10px' }}>
                <label style={{ marginRight: '10px', fontSize: '1.2rem' }}>Ingredients:</label>
                <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{props.piza.ingridients}</span>
            </div>

            <div style={{ marginBottom: '10px' }}>
                <label style={{ marginRight: '10px', fontSize: '1.2rem' }}>Price:</label>
                <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{props.piza.price}</span>
            </div>

            {imageName && (
                <div style={{ marginBottom: '10px' }}>
                    <label style={{ marginRight: '10px', fontSize: '1.2rem' }}>Image:</label>
                    <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{imageName}</span>
                </div>
            )}
        </div>
    );
}