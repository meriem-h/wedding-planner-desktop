const { ipcMain } = require('electron')
const UserRepository = require('../database/UserRepository')

const userRepo = new UserRepository()

ipcMain.handle('user:create', async (event, data) => {
    try {
        const id = await userRepo.create(data)
        return { success: true, id }
    } catch (err) {
        return { success: false, message: err.message }
    }
})

ipcMain.handle('user:login', async (event, { email, password }) => {
    try {
        const user = await userRepo.findByEmail(email)
        if (!user) return { success: false, message: 'Utilisateur introuvable' }
        
        const isValid = await userRepo.verifyPassword(password, user.password)
        if (!isValid) return { success: false, message: 'Mot de passe incorrect' }
        
        return { success: true, user }
    } catch (err) {
        return { success: false, message: err.message }
    }
})