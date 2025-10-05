import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/libs/piza";

export async function GET() {
    try {
        const db = await pool.getConnection();
        const query = 'SELECT * FROM piza';
        const [rows] = await db.execute(query);
        db.release();

        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const db = await pool.getConnection();
        const imagesValue = data.image ?? data.images ?? null;
        const query = 'INSERT INTO piza (name, ingridients, price, images) VALUES (?, ?, ?, ?)';
        const [result] = await db.execute(query, [data.name, data.ingridients, data.price, imagesValue]);
        const insertId = (result as any).insertId;
        const querySelectCreated = 'SELECT * FROM piza WHERE id = ?';
        const [createdRows] = await db.execute(querySelectCreated, [insertId]);
        db.release();
        // @ts-ignore
        return NextResponse.json(createdRows[0]);
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}









// export async function PUT(
//     request:  NextRequest,
//     { params }: { params: { id: string } }
// ) {
//     const id = params.id // user id
//     try {

//         const requestData = await request.json()
//         const { name } = requestData

//         const db = await pool.getConnection()

//         const UPDATEquery = 'UPDATE piza SET name = ? WHERE id = ?'
//         const selectquery = 'select * from piza where id = ?'
//         await db.execute(UPDATEquery, [name, id ])
//         const [rows] = await db.execute(selectquery,[id])
//         db.release()
// // @ts-ignore
//         return NextResponse.json(rows[0])
//     } catch (error) {
//         return NextResponse.json({
//             error: error
//         }, { status: 500 })
//     }
// }



// export async function DELETE(
//     request: NextRequest,
//     { params }: { params: { id: string } }
// ) {
//     const nameToDelete = params.id

//     try {
        
//         const db = await pool.getConnection()
        
//         const query = 'DELETE FROM piza WHERE name = ?'
//         const [rows] = await db.execute(query, [nameToDelete])
//         db.release()
//         // @ts-ignore
//         return NextResponse.json({status:'ok',rows})
//     } catch (error) {
//         return NextResponse.json({
//             error: error
//         }, { status: 500 })
//     }
// }



































    
    
    
    
    
    
    
    
    
    
    













