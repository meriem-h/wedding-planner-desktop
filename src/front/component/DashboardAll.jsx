import React, { useState, useEffect } from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'
import { useApi } from '../context/ApiContext'
import { useAuth } from '../context/AuthContext'
import { formatDate } from '../utils/helpers'
import { ASSETS } from '../config'
import { Smile, Meh, Frown, UserRound, Mail, MessageSquareText, UserPen } from 'lucide-react'


export default function DashboardAll() {

    const api = useApi()
    const { user } = useAuth()

    // const [data, setData] = useState([])
    const [weddingListe, setWeddingListe] = useState([])
    const [statistique, setStatistique] = useState([])


    // celle que je recupere depuis la table kanban
    // const data = [
    //     { name: 'À faire', value: 10, color: '#ef4444' },
    //     { name: 'En cours', value: 5, color: '#f59e0b' },
    //     { name: 'Terminé', value: 15, color: '#22c55e' },
    // ]

    const data = [
        { name: 'aucune tâche restante', value: 1, color: '#e9d4ff' },
    ]



    useEffect(() => {
        const fetchWeddings = async () => {

            const onGoing = await api('wedding:findBy', {
                planner_id: user.id,
                status: 1
            })

            const ended = await api('wedding:findBy', {
                planner_id: user.id,
                status: 0
            })


            setStatistique(prev => ({
                ...prev,
                onGoing: onGoing.success ? onGoing.data.length : 0,
                ended: ended.success ? ended.data.length : 0
            }))
        }
        fetchWeddings()
    }, [])

    // const onClick = (e) => { }

    useEffect(() => {
        console.log('statistique => ', statistique);
    }, [statistique])

    return (
        <div className=' flex flex-col gap-8'>

            


            <section className='flex items-stretch gap-8 w-full'>

                {/* logo entreprise */}
                <div className='flex-1 flex items-center justify-center gap-4 rounded-lg p-3 bg-purple-50'>
                    <img src={ASSETS.logo} className='max-h-36' />
                </div>


                {/* fiche user */}
                <div className='flex items-center gap-4 rounded-lg p-6 bg-purple-50'>
                    <UserPen size={100} />
                    <div>
                        <p>Nom : {user.name}</p>
                        <p>Prenom : {user.firstname}</p>
                        <p>Inscrit depuis le  : {formatDate(user.creationDateTime)}</p>
                    </div>

                </div>


                {/* wedding en cours */}
                <div className='inline-flex flex-col items-center gap-2  rounded-lg p-6 bg-purple-50'>
                    <p>Marriage en cours</p>
                    <p className='flex flex-1 items-center justify-center'>{statistique.onGoing}</p>
                </div>


                {/* wedding archivé */}
                <div className='inline-flex flex-col items-center gap-2  rounded-lg p-6 bg-purple-50'>
                    <p>Marriage terminé</p>
                    <p className='flex flex-1 items-center justify-center'>{statistique.ended}</p>
                </div>


                {/* message et email */}
                <div className='inline-flex flex-col gap-4'>

                    <div className='flex justify-between gap-6  rounded-lg p-6 bg-purple-50 '>
                        <div className='inline-flex items-center gap-2'>
                            <MessageSquareText size={25} />
                            <p>Messages</p>
                        </div>
                        <div className='inline-flex items-center gap-2'>
                            0
                        </div>
                    </div>
                    <div className='flex justify-between gap-6  rounded-lg p-6 bg-purple-50 '>
                        <div className='inline-flex items-center gap-2'>
                            <Mail size={25} />
                            <p>Emails</p>
                        </div>
                        <div className='inline-flex items-center gap-2'>
                            4
                        </div>
                    </div>
                </div>
            </section>


            <section className='flex items-stretch gap-8 w-full'>

                {/* taches */}
                <div className='inline-flex flex-col items-center gap-2  rounded-lg p-3 bg-purple-50'>
                    <div>
                        <h1>Tâches</h1>
                    </div>
                    <div className='flex flex-1 items-center justify-center'>

                        <PieChart width={350} height={300}>
                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                innerRadius={60}   // ← ça creuse le milieu
                                outerRadius={100}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={index} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>

                    </div>
                </div>

                {/* satisfaction client */}
                <div className='inline-flex flex-col items-center gap-2  rounded-lg p-3 bg-purple-50'>

                    <div>
                        <h1>Satisfaction client</h1>
                    </div>
                    <div className='flex flex-1 flex-col justify-center gap-2 px-8 py-4'>

                        <div className='flex items-center gap-2'>
                            <Smile size={60} className='text-green-500 bg-green-200 rounded-full ' />
                            <p>50% Satisfait</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Meh size={60} className='text-yellow-500 bg-yellow-200 rounded-full ' />
                            <p>25% Moyenement satisfait </p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Frown size={60} className='text-red-500 bg-red-200 rounded-full ' />
                            <p>25% Pas Satisfait</p>
                        </div>
                    </div>
                </div>

                {/* commentaire */}
                <div className='flex flex-1 flex-col items-center gap-2  rounded-lg p-3 bg-purple-50'>
                    <div>
                        <h1>Commentaire</h1>
                    </div>

                    {/* contenue commentaire */}
                    <div className='flex flex-col gap-4 p-4 overflow-y-auto max-h-80'>

                        {/* faire une boucle */}
                        <div className='border-2 border-green-300 rounded-lg p-6'>
                            <div className='flex items-center gap-2 text-green-500'>
                                <Smile size={50} className='bg-green-200 rounded-full ' />
                                <p>Name firstname</p>
                            </div>
                            <div className='p-4'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In quis cursus sem. Pellentesque quis ipsum sed risus pulvinar ornare. Ut in mauris at ligula condimentum sodales.
                            </div>
                        </div>
                        <div className='border-2 border-red-300 rounded-lg p-6'>
                            <div className='flex items-center gap-2 text-red-500'>
                                <Frown size={50} className='bg-red-200 rounded-full ' />
                                <p>Name firstname</p>
                            </div>
                            <div className='p-4'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In quis cursus sem. Pellentesque quis ipsum sed risus pulvinar ornare. Ut in mauris at ligula condimentum sodales.
                            </div>
                        </div>
                        <div className='border-2 border-yellow-500 rounded-lg p-6'>
                            <div className='flex items-center gap-2 text-yellow-500'>
                                <Meh size={50} className='bg-yellow-200 rounded-full ' />
                                <p>Name firstname</p>
                            </div>
                            <div className='p-4'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In quis cursus sem. Pellentesque quis ipsum sed risus pulvinar ornare. Ut in mauris at ligula condimentum sodales.
                            </div>
                        </div>

                    </div>


                    {/* trie affichage */}
                    <div>
                        <p>Trier les commentaires : </p>

                        <select name="" id="">
                            <option value="0" >--</option>
                            <option value="1" >Par client</option>
                            <option value="2" >Par prestataire</option>
                            <option value="3" >Par inviter</option>
                            <option value="4" >Positive</option>
                            <option value="5" >Neutre</option>
                            <option value="6" >Negative</option>
                        </select>

                    </div>
                </div>

            </section>



        </div>
    )
}