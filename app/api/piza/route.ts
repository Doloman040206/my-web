import { NextRequest, NextResponse } from "next/server";

import pool from "@/app/libs/piza";
import { create } from "domain";
import { request } from "http";

export async function GET() {
    try {
        const db = await pool.getConnection()
        const query = 'select * from piza'
        const [id] = await db.execute(query)
        db.release()
        
        return NextResponse.json(id)
    } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 500 })
    }
}




export async function POST(
    request:  NextRequest,
    
) {
    const data = await request.json();
    const db = await pool.getConnection()        
    
    const query = 'Insert into piza (name,ingridients,price) VALUES(?,?,?)'
    const [rows] = await db.execute(query,[data.name,data.ingridients,data.price]) 

    const querySelectCreated = 'Select * from piza where id = ?'
    // @ts-ignore
    const [result] = await db.execute(querySelectCreated,[rows.insertId]) 

    db.release() 
    // @ts-ignore
    return NextResponse.json(result[0])
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



































    
    
    
    
    
    
    
    
    
    
    













