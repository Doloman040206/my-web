import React, { useState } from 'react';
import { PizaObject } from '../types';
export interface PizaListItemProps {
    piza: PizaObject
    onDelete: (id: number) => void
    onEdit: (id: number, name: string, ingridients: string , price: number ) => void
}





export function PizaListItem(props: PizaListItemProps) { 

    function onClickEdit() {
        let newName = prompt('Pizza name', props.piza.name)
        if (newName == null) {
            return;
        }

        let newIngridients = prompt('Pizza ingridients', props.piza.ingridients)
        if (newIngridients == null) {
            return;
        }
        
        let newPrice;
        while (true) {
            let priceInput = prompt('Pizza price', ''+props.piza.price)
            if (priceInput == null) {
                return;
            }
            newPrice = parseFloat(priceInput)
            if (isNaN(newPrice)) {
                alert('Wrong price');
            } else {
                break;
            }
        }

        
        props.onEdit(props.piza.id, newName, newIngridients, newPrice!)
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '50px' }}>
                <button
                    style={{
                        fontSize: '1.2rem',
                        padding: '10px 20px',
                        backgroundColor: 'green',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        width: '110px',
                        marginRight: '10px'


                    }}

                onClick={() => {
                const ok = window.confirm('Ви дійсно бажаєте видалити піцу "' + props.piza.name + '"?');
                if (ok) props.onDelete(props.piza.id);
                }}
                >
                    Delete
                </button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button
                    style={{
                        fontSize: '1.2rem',
                        padding: '10px 20px',
                        backgroundColor: 'blue',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        width: '110px',
                        marginRight: '10px',

                    }}
                    onClick={onClickEdit}
                >
                    Edit
                </button>
            </div>
            <div style={{ marginBottom: '20px', marginTop: '-90px' }}>
                <label htmlFor="nameInput" style={{ marginRight: '10px', fontSize: '1.2rem' }}>Name:</label>
                <p style={{ display: 'inline-block', fontWeight: 'bold', fontSize: '1.2rem' }}>{props.piza.name}</p>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <label htmlFor="ingredientsInput" style={{ marginRight: '10px', fontSize: '1.2rem' }}>Ingredients:</label>
                <p style={{ display: 'inline-block', fontWeight: 'bold', fontSize: '1.2rem' }}>{props.piza.ingridients}</p>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <label htmlFor="priceInput" style={{ marginRight: '10px', fontSize: '1.2rem' }}>Price:</label>
                <p style={{ display: 'inline-block', fontWeight: 'bold', fontSize: '1.2rem' }}>{props.piza.price}</p>
            </div>
        </div>
    );
}