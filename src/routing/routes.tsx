import { RouteObject } from 'react-router-dom'
import App from '../App'
import { LoginPage } from '../auth/pages/login.page'
import { Dashboard } from '../dashboad/pages/dashboard.page'
import StudentCoursesPage from '../courses-dashboard/pages/student-courses.page'
import StudentPage from '../shared/pages/student.page'
import ProfessorCoursesPage from '../courses-dashboard/pages/professor-courses.page'
import ProfessorPage from '../shared/pages/professor.page'
import { AuthWrapper } from '../auth/components/auth.wrapper'
import { StudentDashboardPage } from '../users/pages/student-dashboard.page'
import React from 'react'
import { AdminCoursesPage } from '../courses-dashboard/pages/admin-courses.page'
import { AdminPage } from '../shared/pages/admin.page'
import { ProfessorDashboardPage } from '../users/pages/professor-dashboard.page'
import { CreateAnnouncementPage } from '../announcements/pages/create-announcement.page'
import { CourseTestsPage } from '../courses-dashboard/pages/tests/course-tests.page'
import { CourseTestSubmissionsPage } from '../courses-dashboard/pages/tests/course-test-submissions.page'
import { CourseDashboardPage } from '../courses-dashboard/pages/course-dashboard.page'
import { FileTreePage } from '../courses-dashboard/pages/files/file-tree.page'
import { CourseAnnouncementsPage } from '../courses-dashboard/pages/announcements/course-announcements.page'
import { CourseStudentsPage } from '../courses-dashboard/pages/students/course-students.page'
import { CourseProfessorsPage } from '../courses-dashboard/pages/professors/course-professors.page'
import { MyCourseScoresPage } from '../courses-dashboard/pages/tests/my-course-scores.page'
import { CourseProfessorTransferPage } from '../courses-dashboard/pages/professors/course-professor-transfer.page'
import { CourseStudentTransferPage } from '../courses-dashboard/pages/students/course-student-transfer.page'

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
                        path: 'announcements',
                        element: (
                            <AuthWrapper roles={['ADMINISTRATOR', 'PROFESSOR']}>
                                <CreateAnnouncementPage />
                            </AuthWrapper>
                        ),
                    },
                    {
                        path: 'courses/:title',
                        element: (
                            <AuthWrapper
                                roles={[
                                    'ADMINISTRATOR',
                                    'PROFESSOR',
                                    'STUDENT',
                                ]}
                            >
                                <CourseDashboardPage />
                            </AuthWrapper>
                        ),
                        children: [
                            {
                                path: 'files',
                                element: <FileTreePage />,
                            },
                            {
                                path: 'announcements',
                                element: <CourseAnnouncementsPage />,
                            },
                            {
                                path: 'students',
                                element: (
                                    <AuthWrapper roles={['ADMINISTRATOR']}>
                                        <CourseStudentsPage />
                                    </AuthWrapper>
                                ),
                            },
                            {
                                path: 'professors',
                                element: (
                                    <AuthWrapper roles={['ADMINISTRATOR']}>
                                        <CourseProfessorsPage />
                                    </AuthWrapper>
                                ),
                            },
                            {
                                path: 'professors/transfer',
                                element: (
                                    <AuthWrapper roles={['ADMINISTRATOR']}>
                                        <CourseProfessorTransferPage />
                                    </AuthWrapper>
                                ),
                            },
                            {
                                path: 'students/transfer',
                                element: (
                                    <AuthWrapper roles={['ADMINISTRATOR']}>
                                        <CourseStudentTransferPage />
                                    </AuthWrapper>
                                ),
                            },
                            {
                                path: 'tests',
                                element: (
                                    <AuthWrapper roles={['PROFESSOR']}>
                                        <CourseTestsPage />
                                    </AuthWrapper>
                                ),
                            },
                            {
                                path: 'tests/:testId/submissions',
                                element: (
                                    <AuthWrapper roles={['PROFESSOR']}>
                                        <CourseTestSubmissionsPage />
                                    </AuthWrapper>
                                ),
                            },
                            {
                                path: 'my-scores',
                                element: (
                                    <AuthWrapper roles={['STUDENT']}>
                                        <MyCourseScoresPage />
                                    </AuthWrapper>
                                ),
                            },
                        ],
                    },
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
                ],
            },
        ],
    },
]
