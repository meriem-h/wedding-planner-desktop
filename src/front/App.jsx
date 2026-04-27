

import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

import Header from './component/Header'
import Footer from './component/Footer'

import Home from './page/Home'
import Register from './page/Register'
import Login from './page/Login'

export default function App() {

    const { user } = useAuth()


    if (!user) {
        return (
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Register" element={<Register />} />
                </Routes>
            </HashRouter>
        )
    }

    return (
        <ApiProvider>

            {/* <Header /> */}

            <HashRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Register" element={<Register />} />
                    <Route path="/Login" element={<Login />} />
                </Routes>
            </HashRouter>

            {/* <Footer /> */}

        </ApiProvider>
    )
}