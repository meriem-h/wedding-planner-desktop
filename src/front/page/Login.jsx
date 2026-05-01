import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { KeyRound, Mail } from 'lucide-react'


import FormFieldIcon from '../component/FormFieldIcon'
import { useAuth } from '../context/AuthContext'
import { useApi } from '../context/ApiContext'

export default function Login() {

    const { login } = useAuth()
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [form, setForm] = useState({ role: 'planner' })

    const api = useApi()

    const fields = [
        { label: 'Email', name: 'email', type: 'email', placeholder: 'john@gmail.com', icon: Mail },
        { label: 'Mot de passe', name: 'password', type: 'password', icon: KeyRound },
    ]


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const handleClick = async (e) => {
        e.preventDefault()
        setError('')


        const errorListe = {}
        const missingFields = []

        if (!form.email) missingFields.push('email')
        if (!form.password) missingFields.push('password')

        if (missingFields.length > 0) {
            missingFields.forEach(field => errorListe[field] = true) // juste pour mettre en rouge
            errorListe.all = 'Tous les champs sont obligatoires'
        }

        // erreurs spécifiques seulement si le champ est rempli
        if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errorListe.email = 'Email invalide'

        const result = await api('user:login', form)

        if (result.success) {
            login(result.user)
            navigate('/Dashboard')
        } else {
            errorListe[result.type] = result.message
        }


        if (Object.keys(errorListe).length > 0) {
            setError(errorListe)
            return
        }


    }


    return (
        <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center gap-4">
            <h1>Connexion</h1>


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


            <Link to="/Register">Pas encore de compte ? S'inscrire</Link>
        </div>
    )


}