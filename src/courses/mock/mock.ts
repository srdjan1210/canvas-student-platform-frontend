import { Announcement } from '../model/announcement.model'
import { CourseFile } from '../model/course-file.model'
import { Student } from '../../users/model/student.model'

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

export const STUDENTS_MOCK: Student[] = [
    { id: 1, name: 'Alice', surname: 'Adams', fullIndex: 'A001' },
    { id: 2, name: 'Bob', surname: 'Baker', fullIndex: 'B002' },
    { id: 3, name: 'Charlie', surname: 'Chaplin', fullIndex: 'C003' },
    { id: 4, name: 'David', surname: 'Dawson', fullIndex: 'D004' },
    { id: 5, name: 'Emily', surname: 'Edwards', fullIndex: 'E005' },
    { id: 6, name: 'Frank', surname: 'Fitzgerald', fullIndex: 'F006' },
    { id: 7, name: 'Grace', surname: 'Gibson', fullIndex: 'G007' },
    { id: 8, name: 'Henry', surname: 'Hart', fullIndex: 'H008' },
    { id: 9, name: 'Isabella', surname: 'Ingram', fullIndex: 'I009' },
    { id: 10, name: 'Jack', surname: 'Johnson', fullIndex: 'J010' },
    { id: 11, name: 'Kate', surname: 'Kramer', fullIndex: 'K011' },
    { id: 12, name: 'Leo', surname: 'Lee', fullIndex: 'L012' },
    { id: 13, name: 'Mia', surname: 'Morgan', fullIndex: 'M013' },
    { id: 14, name: 'Nate', surname: 'Nguyen', fullIndex: 'N014' },
    { id: 15, name: 'Olivia', surname: "O'Connell", fullIndex: 'O015' },
]

export const STUDENTS_MOCK_2: Student[] = [
    { id: 111, name: 'Alice', surname: 'Adams', fullIndex: 'A001' },
    { id: 112, name: 'Bob', surname: 'Baker', fullIndex: 'B002' },
    { id: 113, name: 'Charlie', surname: 'Chaplin', fullIndex: 'C003' },
    { id: 114, name: 'David', surname: 'Dawson', fullIndex: 'D004' },
    { id: 115, name: 'Emily', surname: 'Edwards', fullIndex: 'E005' },
    { id: 116, name: 'Frank', surname: 'Fitzgerald', fullIndex: 'F006' },
    { id: 117, name: 'Grace', surname: 'Gibson', fullIndex: 'G007' },
    { id: 118, name: 'Henry', surname: 'Hart', fullIndex: 'H008' },
    { id: 119, name: 'Isabella', surname: 'Ingram', fullIndex: 'I009' },
    { id: 1110, name: 'Jack', surname: 'Johnson', fullIndex: 'J010' },
    { id: 1111, name: 'Kate', surname: 'Kramer', fullIndex: 'K011' },
    { id: 1112, name: 'Leo', surname: 'Lee', fullIndex: 'L012' },
    { id: 1113, name: 'Mia', surname: 'Morgan', fullIndex: 'M013' },
    { id: 1114, name: 'Nate', surname: 'Nguyen', fullIndex: 'N014' },
    { id: 1115, name: 'Olivia', surname: "O'Connell", fullIndex: 'O015' },
]
