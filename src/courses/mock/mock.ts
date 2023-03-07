import { Announcement } from '../model/announcement.model'
import { CourseFile } from '../model/course-file.model'

export const ANNOUNCEMENTS_MOCK: Announcement[] = [
    {
        id: 1,
        title: 'Popravni kolokvijum',
        body: 'Zdravo svima!\n Popravni kolokvijum ce se odrzati u terminu vjezbi 27.1.2029',
        professorName: 'Nikola',
        professorSurname: 'Luburic',
    },
    {
        id: 2,
        title: 'Popravni kolokvijum',
        body: 'Zdravo svima!\n Popravni kolokvijum ce se odrzati u terminu vjezbi 27.1.2029',
        professorName: 'Nikola',
        professorSurname: 'Luburic',
    },
    {
        id: 3,
        title: 'Popravni kolokvijum',
        body:
            'Zdravo svima!\n Popravni kolokvijum ce se odrzati u terminu vjezbi 27.1.2029.\n' +
            'Zdravo svima!\n Popravni kolokvijum ce se odrzati u terminu vjezbi 27.1.2029',
        professorName: 'Nikola',
        professorSurname: 'Luburic',
    },
    {
        id: 4,
        title: 'Popravni kolokvijum',
        body:
            'Zdravo svima!\n Popravni kolokvijum ce se odrzati u terminu vjezbi 27.1.2029.\n' +
            'Zdravo svima!\n Popravni kolokvijum ce se odrzati u terminu vjezbi 27.1.2029',
        professorName: 'Nikola',
        professorSurname: 'Luburic',
    },
    {
        id: 5,
        title: 'Popravni kolokvijum',
        body:
            'Zdravo svima!\n Popravni kolokvijum ce se odrzati u terminu vjezbi 27.1.2029.\n' +
            'Zdravo svima!\n Popravni kolokvijum ce se odrzati u terminu vjezbi 27.1.2029',
        professorName: 'Nikola',
        professorSurname: 'Luburic',
    },
    {
        id: 6,
        title: 'Popravni kolokvijum',
        body:
            'Zdravo svima!\n Popravni kolokvijum ce se odrzati u terminu vjezbi 27.1.2029.\n' +
            'Zdravo svima!\n Popravni kolokvijum ce se odrzati u terminu vjezbi 27.1.2029',
        professorName: 'Nikola',
        professorSurname: 'Luburic',
    },
    {
        id: 7,
        title: 'Popravni kolokvijumPopravni kolokvijumPopravni kolokvijumPopravni kolokvijumPopravni kolokvijum',
        body:
            'Zdravo svima!\n Popravni kolokvijum ce se odrzati u terminu vjezbi 27.1.2029.\n' +
            'Zdravo svima!\n Popravni kolokvijum ce se odrzati u terminu vjezbi 27.1.2029',
        professorName: 'Nikola',
        professorSurname: 'Luburic',
    },
]

export const FILES_MOCK: CourseFile[] = [
    {
        type: 'folder',
        filename: 'Vezbe',
        metadata: null,
    },
    {
        type: 'file',
        filename: 'vezba1.pdf',
        metadata: null,
    },
]
