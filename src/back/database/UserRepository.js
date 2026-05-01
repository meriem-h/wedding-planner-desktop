const BaseRepository = require('./BaseRepository')
const bcrypt = require('bcryptjs')
const db = require('./db')

class UserRepository extends BaseRepository {
    constructor() {
        super('user')
    }

    async findByEmail(email) {
        const [rows] = await db.query(
            `SELECT * FROM user WHERE email = ?`,
            [email]
        )
        return rows[0] || null
    }

    async verifyPassword(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword)
    }

    async create(data) {
        const hashedPassword = await bcrypt.hash(data.password, 10)
        data.password = hashedPassword
        return super.create(data)
    }


}

module.exports = UserRepository