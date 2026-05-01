

import React from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

import { publicRoutes, privateRoutes } from './routes'

import ProtectedRoute from './component/ProtectedRoute'
import Header from './component/Header'

export default function App() {

    const { user } = useAuth()

    if (!user) {
        return (

            <HashRouter>

                <Header />

                <Routes>
                    {publicRoutes.map(({ path, component: Component }) => (
                        <Route key={path} path={path} element={<Component />} />
                    ))}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>


            </HashRouter>


        )
    }

    return (

        <HashRouter>

            <Header />

            <Routes>

                {privateRoutes.map(({ path, component: Component, roles }) => (
                    <Route key={path} path={path} element={
                        <ProtectedRoute roles={roles}>
                            <Component />
                        </ProtectedRoute>
                    } />
                ))}
                <Route path="*" element={<Navigate to="/" />} />

            </Routes>

        </HashRouter>


    )
}