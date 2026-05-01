

import React from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

import Header from './component/Header'
import Footer from './component/Footer'

import Home from './page/Home'
import Register from './page/Register'
import Login from './page/Login'
import Dashboard from './page/Dashboard'

export default function App() {

    const { user } = useAuth()


    if (!user) {
        return (

            <HashRouter>

                <Header />

                <Routes>
                    <Route path="*" element={<Navigate to="/" />} />
                    <Route path="/" element={<Login />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Register" element={<Register />} />
                </Routes>
            </HashRouter>


        )
    }

    return (

        <HashRouter>

            <Header />

            <Routes>

                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/" element={<Home />} />
                <Route path="/Dashboard" element={<Dashboard />} />
            </Routes>

        </HashRouter>


    )
}