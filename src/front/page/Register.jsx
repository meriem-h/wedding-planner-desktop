import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { KeyRound, KeySquare, User, Mail, Phone } from 'lucide-react'

import FormFieldIcon from '../component/FormFieldIcon'
import { useApi } from '../context/ApiContext'


export default function Register() {

    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [form, setForm] = useState({ role: 'planner' })

    const api = useApi()
    const fields = [
        { label: 'Nom', name: 'name', type: 'text', placeholder: 'John', icon: User },
        { label: 'Prénom', name: 'firstname', type: 'text', placeholder: 'Doe', icon: User },
        { label: 'Email', name: 'email', type: 'email', placeholder: 'john@gmail.com', icon: Mail },
        { label: 'Téléphone', name: 'phone', type: 'tel', placeholder: '0606060606', icon: Phone },
        { label: 'Mot de passe', name: 'password', type: 'password', icon: KeyRound },
        { label: 'Confirmer le mot de passe', name: 'ConfirmPassword', type: 'password', icon: KeySquare }
    ]



    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const handleClick = async (e) => {
        e.preventDefault()
        setError('')


        const errorListe = {}
        const missingFields = []

        if (!form.name) missingFields.push('name')
        if (!form.firstname) missingFields.push('firstname')
        if (!form.email) missingFields.push('email')
        if (!form.phone) missingFields.push('phone')
        if (!form.password) missingFields.push('password')
        if (!form.ConfirmPassword) missingFields.push('ConfirmPassword')

        if (missingFields.length > 0) {
            missingFields.forEach(field => errorListe[field] = true) // juste pour mettre en rouge
            errorListe.all = 'Tous les champs sont obligatoires'
        }

        // erreurs spécifiques seulement si le champ est rempli
        if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errorListe.email = 'Email invalide'
        if (form.phone && !/^[0-9]{10}$/.test(form.phone)) errorListe.phone = '10 chiffres requis'
        if (form.password && form.ConfirmPassword && form.password !== form.ConfirmPassword) errorListe.ConfirmPassword = 'Les mots de passe ne correspondent pas'

        if (Object.keys(errorListe).length > 0) {
            setError(errorListe)
            return
        }

        const result = await api('user:create', form)

        if (result.success) {
            navigate('/Dashboard')
        } else {
            console.log("register : ", result.message);
        }


    }

    useEffect(() => {
        console.log(form);
    }, [form]);



    return (
        <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center gap-4">
            <h1>Inscription</h1>


            <form className="max-w-sm mx-auto flex flex-col gap-4">


                <FormFieldIcon fields={fields} onChange={handleChange} errors={error} />

                {error?.all && (
                    <div className="bg-red-100 border border-red-500 text-red-700 px-4 py-3 rounded">
                        {error.all}
                    </div>
                )}

                <div>
                    <button onClick={handleClick} className='border rounded rounded-lg px-4 py-2  bg-fuchsia-300 text-white'>valider</button>
                </div>


            </form>


            <Link to="/Login">Deja un compte ? Connection</Link>
        </div>
    )
}