import piza from 'piza/promise'

const pool = piza.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "piza",
    waitForConnections: true
})

export default pool