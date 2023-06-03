import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { Announcement } from '../../announcements/model/announcement.model'
import { useApplicationStore } from '../../store/application.store'
import { Observable } from './observers/observable'
import { ClientToServerEvents, ServerToClientEvents } from './types'

export const useSocketConnection = () => {
    const user = useApplicationStore((state) => state.user)
    const token = useApplicationStore((state) => state.token)
    const url = process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:8000'
    const observable = new Observable<ServerToClientEvents>()

    const [client, setClient] = useState<Socket<
        ServerToClientEvents,
        ClientToServerEvents
    > | null>(null)

    useEffect(() => {
        const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
            url,
            { extraHeaders: { Authorization: `Bearer ${token}` } }
        )

        socket.on('connect', () => {
            console.log('Nice, we connected!')
        })

        socket.on('notification', (msg: Announcement) => {
            console.log('notification came')
            console.log(msg)
            observable.emit('notification', msg)
        })

        setClient(socket)
    }, [])

    return {
        client,
        observable,
    }
}
