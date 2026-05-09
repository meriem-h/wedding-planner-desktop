import React, { useState, useEffect } from 'react'
import Layout from '../component/Layout'
import { useApi } from '../context/ApiContext'
import { useAuth } from '../context/AuthContext'

import DashboardAll from '../component/DashboardAll';
import DashboardId from '../component/DashboardId';
import Modal from '../component/modal/Modal'


export default function Dashboard() {

    const api = useApi()
    const { user } = useAuth()

    const [weddingListe, setWeddingListe] = useState(null)
    const [weddingSelected, setWeddingSelected] = useState(null)
    const [isOpen, setIsOpen] = useState(false)



    useEffect(() => {

        if (weddingListe) {
            console.log("weddingListe => ", weddingListe.data)
        }

    }, [weddingListe]);

    useEffect(() => {
        const fetchWeddings = async () => {
            const result = await api('wedding:findBy', "planner_id", user.id)
            setWeddingListe(result)
        }
        fetchWeddings()
    }, [])



    const selectWedding = async (e) => {
        let id = e.target.value
        const result = await api('wedding:findById', id)
        setWeddingSelected(result)
    }

    const addWedding = (e) => {

        setIsOpen(true)
    }

    return (
        <div className="min-h-screen bg-purple-100 ">

            {/* menu burger */}
            <Layout>

                <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Créer un mariage">
                    {/* <FormulaireMariage /> */}
                </Modal>

                <div className=''>

                    {/* titre */}
                    <h1 className="text-4xl text-center mb-8 font-bold text-purple-300">
                        💍 Tous les marriage 💍

                    </h1>
                    {/* content */}
                    <div>

                        <section className='flex justify-between'>
                            {/* menue */}
                            <div className='flex gap-2'>

                                {weddingListe && weddingListe.data &&
                                    <>
                                        <p>Voir le marriage :</p>
                                        <select>
                                            {weddingListe?.data?.map((wedding) => (
                                                <option key={wedding.id} value={wedding.id}>{wedding.name}</option>
                                            ))}
                                        </select>
                                    </>
                                }

                            </div>

                            <div>
                                <button onClick={addWedding} className='border rounded rounded-lg px-4 py-2  bg-purple-300 text-white'>ajouter un marriage</button>
                            </div>
                        </section>

                        {/* dashboard */}
                        <section className='mt-10'>




                            {weddingSelected ?
                                <>
                                    <DashboardId id={weddingSelected} />
                                </>
                                :
                                <>
                                    <DashboardAll />
                                </>
                            }


                            {/* task fini et en cours */}
                            {/* marriage en cours */}
                            {/* marriage archivé */}



                        </section>
                    </div>

                </div>
            </Layout>

        </div>
    )
}