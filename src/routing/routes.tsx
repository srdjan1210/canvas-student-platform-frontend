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
import { AuthWrapper } from '../auth/components/auth.wrapper'
import { StudentDashboardPage } from '../users/pages/student-dashboard.page'
import React from 'react'
import { CourseTransferStudentsPage } from '../courses/pages/course-transfer-students.page'

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
                element: (
                    <AuthWrapper
                        roles={['ADMINISTRATOR', 'PROFESSOR', 'STUDENT']}
                    >
                        <Dashboard />
                    </AuthWrapper>
                ),
                children: [
                    {
                        path: 'students',
                        element: (
                            <AuthWrapper roles={['ADMINISTRATOR']}>
                                <StudentDashboardPage />
                            </AuthWrapper>
                        ),
                    },
                    {
                        path: 'student',
                        element: (
                            <AuthWrapper roles={['STUDENT']}>
                                <StudentPage />
                            </AuthWrapper>
                        ),
                        children: [
                            {
                                path: '',
                                element: <StudentCoursesPage />,
                            },
                        ],
                    },
                    {
                        path: 'professor',
                        element: (
                            <AuthWrapper roles={['PROFESSOR']}>
                                <ProfessorPage />,
                            </AuthWrapper>
                        ),
                        children: [
                            {
                                path: '',
                                element: <ProfessorCoursesPage />,
                            },
                        ],
                    },
                    {
                        path: 'courses/:name',
                        element: <CoursePage />,
                    },
                    {
                        path: 'courses/:title/add/students',
                        element: (
                            <AuthWrapper roles={['ADMINISTRATOR']}>
                                <CourseTransferStudentsPage />
                            </AuthWrapper>
                        ),
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
