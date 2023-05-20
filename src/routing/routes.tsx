import { RouteObject } from 'react-router-dom'
import App from '../App'
import { LoginPage } from '../auth/pages/login.page'
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
import { CourseTransferProfessorsPage } from '../courses/pages/course-transfer-professors.page'
import { CourseCoordinatorPage } from '../courses/pages/course-coordinator.page'
import { AdminCoursesPage } from '../courses/pages/admin-courses.page'
import { AdminPage } from '../shared/pages/admin.page'
import CourseStudentListingPage from '../courses/pages/course-student-listing.page'
import { CourseProfessorListingPage } from '../courses/pages/course-professor-listing.page'
import { ProfessorDashboardPage } from '../users/pages/professor-dashboard.page'
import { AnnouncementPage } from '../announcements/pages/announcement.page'
import { CreateAnnouncementPage } from '../announcements/pages/create-announcement.page'

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
                        path: 'professors',
                        element: (
                            <AuthWrapper roles={['ADMINISTRATOR']}>
                                <ProfessorDashboardPage />
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
                        path: 'administrator',
                        element: (
                            <AuthWrapper roles={['ADMINISTRATOR']}>
                                <AdminPage />
                            </AuthWrapper>
                        ),
                        children: [
                            {
                                path: '',
                                element: <AdminCoursesPage />,
                            },
                        ],
                    },
                    {
                        path: 'courses',
                        element: <CourseCoordinatorPage />,
                        children: [
                            {
                                path: ':name',
                                element: <CoursePage />,
                            },
                            {
                                path: ':title/add/students',
                                element: (
                                    <AuthWrapper roles={['ADMINISTRATOR']}>
                                        <CourseTransferStudentsPage />
                                    </AuthWrapper>
                                ),
                            },
                            {
                                path: ':title/add/professors',
                                element: (
                                    <AuthWrapper roles={['ADMINISTRATOR']}>
                                        <CourseTransferProfessorsPage />
                                    </AuthWrapper>
                                ),
                            },
                            {
                                path: ':title/list/students',
                                element: (
                                    <AuthWrapper roles={['ADMINISTRATOR']}>
                                        <CourseStudentListingPage />
                                    </AuthWrapper>
                                ),
                            },
                            {
                                path: ':title/list/professors',
                                element: (
                                    <AuthWrapper roles={['ADMINISTRATOR']}>
                                        <CourseProfessorListingPage />
                                    </AuthWrapper>
                                ),
                            },
                            {
                                path: ':title/announcements/:announcementId',
                                element: (
                                    <AuthWrapper
                                        roles={[
                                            'ADMINISTRATOR',
                                            'PROFESSOR',
                                            'STUDENT',
                                        ]}
                                    >
                                        <AnnouncementPage />
                                    </AuthWrapper>
                                ),
                            },
                            {
                                path: ':course/create/announcement',
                                element: (
                                    <AuthWrapper
                                        roles={[
                                            'ADMINISTRATOR',
                                            'PROFESSOR',
                                            'STUDENT',
                                        ]}
                                    >
                                        <CreateAnnouncementPage />
                                    </AuthWrapper>
                                ),
                            },
                        ],
                    },
                ],
            },
        ],
    },
]
