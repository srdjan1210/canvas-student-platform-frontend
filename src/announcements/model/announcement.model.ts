export type Announcement = {
    id: number
    professorName: string
    professorSurname: string
    title: string
    body: string
    createdAt: Date
    avatar?: string
    courseId?: number
    courseTitle: string
}
