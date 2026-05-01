import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LogOut } from 'lucide-react'



export default function Header() {

    const { logout } = useAuth()

    return (
        <div className="">
            <h1 className="">
                💍 header
            </h1>
            <nav>
                <li><Link to="/Register">Register</Link></li>
                <li><Link to="/Login">Login</Link></li>
                <li><Link to="/Home">Home</Link></li>
                <li><Link to="/Dashboard">Dashboard</Link></li>
            </nav>


            <button onClick={logout}>
                <LogOut />
            </button>


        </div>
    )
}