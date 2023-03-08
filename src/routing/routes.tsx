import { RouteObject } from 'react-router-dom'
import App from '../App'
import { LoginPage } from '../auth/pages/login.page'
import { RegistrationPage } from '../auth/pages/registration.page'
import { Dashboard } from '../dashboad/pages/dashboard.page'
import StudentCoursesPage from '../courses/pages/student-courses.page'
import { CoursePage } from '../courses/pages/course.page'
import StudentPage from '../shared/pages/student.page'
import ProfessorCoursesPage from '../courses/pages/professor-courses.page'
import ProfessorPage from '../shared/pages/professor.page'

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: 'login',
                element: <LoginPage />,
            },
            {
                path: 'dashboard',
                element: <Dashboard />,
                children: [
                    {
                        path: 'student',
                        element: <StudentPage />,
                        children: [
                            {
                                path: '',
                                element: <StudentCoursesPage />,
                            },
                            {
                                path: 'course/:name',
                                element: <CoursePage />,
                            },
                        ],
                    },
                    {
                        path: 'professor',
                        element: <ProfessorPage />,
                        children: [
                            {
                                path: '',
                                element: <ProfessorCoursesPage />,
                            },
                        ],
                    },
                    {
                        path: 'registration',
                        element: <RegistrationPage />,
                    },
                ],
            },
        ],
    },
]
