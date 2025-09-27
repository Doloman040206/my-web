import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/libs/piza";


// export async function GET(
//     request:  NextRequest,
//     { params }: { params: { id: string } }
// ) {
//     const id = params.id // user id
    
//     try {
//         const db = await pool.getConnection()        
        
//         const query = 'select * from piza where id = ?'
//         const [rows] = await db.execute(query,[id])
//         db.release()
        
//         return NextResponse.json(rows)
//     } catch (error) {
//         return NextResponse.json({
//             error: error
//         }, { status: 500 })
//     }
// }




// export async function POST(
//     request:  NextRequest,
    
// ) {
//     const data = await request.json();
    
//     try {
//         const db = await pool.getConnection()        
        
//         const query = 'Insert into piza (name,ingridients,price) VALUES(?,?,?)'
//         const [rows] = await db.execute(query,[data.name,data.ingridients,data.price]) 

//         const querySelectCreated = 'Select * from piza where id = ?'
//         // @ts-ignore
//         const [result] = await db.execute(querySelectCreated,[rows.insertId]) 

//         db.release() 
//         // @ts-ignore
//         return NextResponse.json(result [0])
        
//     } catch (error) {
//         return NextResponse.json({
//             error: error
//         }, { status: 500 })
//     }
// }




export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const id = params.id;

    try {
        const requestData = await request.json();
        const { name, ingridients, price } = requestData;
        // NOTE: Повністю видалено все що стосується image/images при оновленні.

        const db = await pool.getConnection();

        // Оновлюємо тільки name, ingridients, price — не чіпаємо колонку images
        const UPDATEquery = 'UPDATE piza SET name = ?, ingridients = ?, price = ? WHERE id = ?';
        const selectquery = 'SELECT * FROM piza WHERE id = ?';
        await db.execute(UPDATEquery, [name, ingridients, price, id]);
        const [rows] = await db.execute(selectquery, [id]);
        db.release();
        // @ts-ignore
        return NextResponse.json(rows[0]);
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const idToDelete = params.id;

    try {
        const db = await pool.getConnection();
        const query = 'DELETE FROM piza WHERE id = ?';
        const [rows] = await db.execute(query, [idToDelete]);
        db.release();
        // @ts-ignore
        return NextResponse.json({ status: 'ok', rows });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}






























