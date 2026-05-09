const { ipcMain } = require('electron')
const WeddingRepository = require('../database/WeddingRepository')

const weddingRepo = new WeddingRepository()

ipcMain.handle('wedding:create', async (event, data) => {
    try {
        const id = await weddingRepo.create(data)
        return { success: true, id }
    } catch (err) {
        return { success: false, message: err.message }
    }
})

ipcMain.handle('wedding:findAll', async (event) => {
    try {
        const data = await weddingRepo.findAll()
        return { success: true, data }
    } catch (err) {
        return { success: false, message: err.message }
    }
})



ipcMain.handle('wedding:findById', async (event, id) => {
    try {
        const data = await weddingRepo.findById(id)
        return { success: true, data }
    } catch (err) {
        return { success: false, message: err.message }
    }
})

ipcMain.handle('wedding:findBy', async (event, conditions) => {
    try {
        const data = await weddingRepo.findBy(conditions)
        return { success: true, data }
    } catch (err) {
        return { success: false, message: err.message }
    }
})


// ipcMain.handle('wedding:findBy', async (event, field, value) => {
//     try {
//         const data = await weddingRepo.findBy(field, value)
//         return { success: true, data }
//     } catch (err) {
//         return { success: false, message: err.message }
//     }
// })

