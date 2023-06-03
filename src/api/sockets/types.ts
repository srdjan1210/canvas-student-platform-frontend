import { Announcement } from '../../announcements/model/announcement.model'

export interface ServerToClientEvents {
    noArg: () => void
    basicEmit: (a: number, b: string, c: Buffer) => void
    withAck: (d: string, callback: (e: number) => void) => void
    notification: (msg: Announcement) => void
}

export interface ClientToServerEvents {
    register: (data: number) => void
}

export interface InterServerEvents {
    ping: () => void
}

export interface SocketData {
    name: string
    age: number
}
