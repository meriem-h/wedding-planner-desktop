import React from 'react'
import { Link } from 'react-router-dom'

export default function Register() {
    return (
        <div>
            <h1>Inscription</h1>
            <Link to="/Login">Deja de compte ? Connection</Link>
        </div>
    )
}