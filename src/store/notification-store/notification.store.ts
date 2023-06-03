import { StateCreator } from 'zustand'
import { NotificationStoreState } from './interfaces/notification-store-state.type'
import { NotificationStoreActions } from './interfaces/notification-store-actions.type'
import { Announcement } from '../../announcements/model/announcement.model'

export type NotificationStore = NotificationStoreState &
    NotificationStoreActions

const state: NotificationStoreState = {
    notifications: [],
}
export const notificationStoreSlice: StateCreator<NotificationStore> = (
    set,
    get
) => ({
    ...state,
    addNotification: (notification: Announcement) => {
        set((state) => ({
            notifications: [notification, ...get().notifications],
        }))
    },
    addNotifications: (notifications: Announcement[]) => {
        set((state) => ({
            notifications: [...get().notifications, ...notifications],
        }))
    },
})
