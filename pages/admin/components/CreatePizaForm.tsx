import React, { useRef, useState } from 'react';

export interface ICreatePizaFormProps {
    addItem: (name: string, ingredients: string, price: number, image: string | null) => void;
}

export function CreatePizaForm(props: ICreatePizaFormProps) {
    const [nameInput, setNameInput] = useState('');
    const [ingredientsInput, setIngredientsInput] = useState('');
    const [priceInput, setPriceInput] = useState('');
    const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const allowedExt = /\.(png|jpe?g)$/i;

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (!file) {
            setSelectedFileName(null);
            return;
        }
        if (!allowedExt.test(file.name)) {
            alert('Доступні формати зображень: .png, .jpg, .jpeg');
            if (fileInputRef.current) fileInputRef.current.value = '';
            setSelectedFileName(null);
            return;
        }
        setSelectedFileName(file.name);
    };

    const onClickImageBox = () => {
        if (fileInputRef.current) fileInputRef.current.click();
    };

    const addItem = () => {
        if (!nameInput || !ingredientsInput || !priceInput) {
            alert('Please, fill all fields');
            return;
        }
        let parsedPrice = parseFloat(priceInput);
        if (isNaN(parsedPrice)) {
            alert('Wrong price');
            return;
        }
        props.addItem(nameInput, ingredientsInput, parsedPrice, selectedFileName);

        setNameInput('');
        setIngredientsInput('');
        setPriceInput('');
        setSelectedFileName(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const styles = {
        page: { maxWidth: 980, margin: '0 auto', padding: '24px 12px', fontFamily: 'Helvetica, Arial, sans-serif' },
        subtitle: { textAlign: 'center' as const, fontSize: '23px', fontWeight: 700, marginBottom: '22px', color: '#222' },
        formRow: { display: 'flex', alignItems: 'center', marginBottom: '12px' },
        label: { width: '80px', marginRight: '12px', fontSize: '1.05rem', color: '#222' },
        input: { fontSize: '1.1rem', padding: '10px 12px', borderRadius: '6px', border: '1px solid #e0e0e0', width: '492px', boxSizing: 'border-box' as const },
        imageBox: { fontSize: '1.1rem', padding: '10px 12px', borderRadius: '6px', border: '1px solid #e0e0e0', width: '467px', display: 'flex', alignItems: 'center', cursor: 'pointer', userSelect: 'none' as const, marginRight: '6px' },
        addButton: { fontSize: '1.05rem', padding: '10px 18px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' },
    };

    return (
        <div style={styles.page}>
            
            <div style={styles.subtitle}>Piza List</div>

            <div style={styles.formRow}>
                <label htmlFor="nameInput" style={styles.label}>Name:</label>
                <input
                    id="nameInput"
                    style={styles.input}
                    placeholder="Add name..."
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                />
            </div>

            <div style={styles.formRow}>
                <label htmlFor="ingredientsInput" style={styles.label}>Ingredients:</label>
                <input
                    id="ingredientsInput"
                    style={styles.input}
                    placeholder="Add ingredients..."
                    value={ingredientsInput}
                    onChange={(e) => setIngredientsInput(e.target.value)}
                />
            </div>
            <div style={styles.formRow}>
                <label htmlFor="priceInput" style={styles.label}>Price:</label>
                <input
                    id="priceInput"
                    style={styles.input}
                    placeholder="Add price..."
                    value={priceInput}
                    onChange={(e) => setPriceInput(e.target.value)}
                />
            </div>

            <div style={styles.formRow}>
                <label htmlFor="imageInput" style={styles.label}>Image:</label>
                <div
                    onClick={onClickImageBox}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClickImageBox(); }}
                    style={styles.imageBox}
                >
                    <span style={{ color: selectedFileName ? '#000' : '#666' }}>
                        {selectedFileName ? selectedFileName : 'Add image...'}
                    </span>
                </div>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    onChange={onFileChange}
                    style={{ display: 'none' }}
                />
                <button style={styles.addButton} onClick={addItem}>ADD</button>
            </div>
        </div>
    );
}