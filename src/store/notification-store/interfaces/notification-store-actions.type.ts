import { Announcement } from '../../../announcements/model/announcement.model'

export type NotificationStoreActions = {
    addNotification: (notification: Announcement) => void
    addNotifications: (notifications: Announcement[]) => void
}
