// src/back/database/BaseRepository.js
const db = require('./db')

class BaseRepository {
    constructor(table) {
        this.table = table
    }

    async findAll() {
        const [rows] = await db.query(`SELECT * FROM ${this.table}`)
        return rows
    }

    async findById(id) {
        const [rows] = await db.query(
            `SELECT * FROM ${this.table} WHERE id = ?`,
            [id]
        )
        return rows[0] || null
    }

    async create(data) {
        const [result] = await db.query(
            `INSERT INTO ${this.table} SET ?`,
            [data]
        )
        return result.insertId
    }

    async update(id, data) {
        const [result] = await db.query(
            `UPDATE ${this.table} SET ? WHERE id = ?`,
            [data, id]
        )
        return result.affectedRows
    }

    async delete(id) {
        const [result] = await db.query(
            `DELETE FROM ${this.table} WHERE id = ?`,
            [id]
        )
        return result.affectedRows
    }
}

module.exports = BaseRepository