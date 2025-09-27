import React, { useRef, useState } from 'react';

export interface ICreatePizaFormProps {
    // Четвертий параметр image: string | null — ім'я файлу (наприклад "5.jpg")
    addItem: (name: string, ingredients: string, price: number, image: string | null) => void;
}

export function CreatePizaForm(props: ICreatePizaFormProps) {
    const [nameInput, setNameInput] = useState('');
    const [ingredientsInput, setIngredientsInput] = useState('');
    const [priceInput, setPriceInput] = useState('');
    const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // допустимі розширення
    const allowedExt = /\.(png|jpe?g)$/i;

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (!file) {
            setSelectedFileName(null);
            return;
        }

        if (!allowedExt.test(file.name)) {
            alert('Доступні формати зображень: .png, .jpg, .jpeg');
            // скидаємо вибір
            if (fileInputRef.current) fileInputRef.current.value = '';
            setSelectedFileName(null);
            return;
        }

        // зберігаємо тільки ім'я файлу (наприклад "5.jpg")
        setSelectedFileName(file.name);
    };

    const onClickImageBox = () => {
        if (fileInputRef.current) fileInputRef.current.click();
    };

    const addItem = () => {
        // 1. перевірка усіх основних полів
        if (!nameInput || !ingredientsInput || !priceInput) {
            alert('Please, fill all fields');
            return;
        }
        let parsedPrice = parseFloat(priceInput);
        if (isNaN(parsedPrice)) {
            alert('Wrong price');
            return;
        }

        // 2. виклик props.addItem() з четвертим параметром image (ім'я файлу або null)
        props.addItem(nameInput, ingredientsInput, parsedPrice, selectedFileName);

        // 3. скидання полів
        setNameInput('');
        setIngredientsInput('');
        setPriceInput('');
        setSelectedFileName(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    // Стилі — ті ж візуальні характеристики, що й у інших полів
    const commonInputStyle: React.CSSProperties = {
        fontSize: '1.2rem',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    };

    return (
        <div>
            <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                <label htmlFor="nameInput" style={{ marginRight: '12px', fontSize: '1.2rem' }}>Name:</label>
                <input
                    id="nameInput"
                    style={{
                        ...commonInputStyle,
                        width: '492px',
                        marginRight: '10px',
                    }}
                    placeholder="Add name..."
                    value={nameInput}
                    onChange={(event) => setNameInput(event.target.value)}
                />
            </div>

            <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                <label htmlFor="ingredientsInput" style={{ marginRight: '10px', fontSize: '1.2rem', marginLeft: '-35px' }}>Ingridients:</label>
                <input
                    id="ingredientsInput"
                    style={{
                        ...commonInputStyle,
                        width: '492px',
                        marginRight: '10px',
                    }}
                    placeholder="Add ingridients..."
                    value={ingredientsInput}
                    onChange={(event) => setIngredientsInput(event.target.value)}
                />
            </div>
            {/* Price — окремий рядок (така ж ширина як name/ingredients) */}
            <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                <label htmlFor="priceInput" style={{ marginRight: '20px', fontSize: '1.2rem' }}>Price:</label>
                <input
                    id="priceInput"
                    style={{
                        ...commonInputStyle,
                        width: '492px',
                        marginRight: '10px',
                    }}
                    placeholder="Add price..."
                    value={priceInput}
                    onChange={(event) => setPriceInput(event.target.value)}
                />
            </div>

            {/* Image — окремий рядок, рамка як у name/ingredients, клікабельний текст 'Add image' або ім'я файлу */}
            <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                <label htmlFor="imageInput" style={{ marginRight: '12px', fontSize: '1.2rem' }}>Image:</label>

                <div
                    onClick={onClickImageBox}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClickImageBox(); }}
                    style={{
                        ...commonInputStyle,
                        width: '492px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        cursor: 'pointer',
                        marginRight: '12px',
                        userSelect: 'none',
                    }}
                >
                    <span style={{ fontSize: '1.2rem', color: selectedFileName ? '#000' : '#666', marginLeft: '4px' }}>
                        {selectedFileName ? selectedFileName : 'Add image...'}
                    </span>
                </div>

                {/* Ховаємо реальний input[type=file] */}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    onChange={onFileChange}
                    style={{ display: 'none' }}
                />

                {/* Кнопка ADD поруч з image-рамкою */}
                <button
                    style={{
                        fontSize: '1.2rem',
                        padding: '10px 20px',
                        backgroundColor: '#4caf50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                    }}
                    onClick={addItem}
                >
                    ADD
                </button>
            </div>
        </div>
    );
}