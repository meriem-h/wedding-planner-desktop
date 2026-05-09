const BaseRepository = require('./BaseRepository')
const db = require('./db')

class WeddingRepository extends BaseRepository {
    constructor() {
        super('wedding')
    }
}

module.exports = WeddingRepository