import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { AuthStore, authStoreSlice } from './auth-store/auth.store'
import { FileStore, fileStoreSlice } from './file-store/file.store'
import {
    NotificationStore,
    notificationStoreSlice,
} from './notification-store/notification.store'

export type AppStore = AuthStore & FileStore & NotificationStore
export const useApplicationStore = create<AppStore>()(
    persist(
        immer((...a) => ({
            ...authStoreSlice(...a),
            ...fileStoreSlice(...a),
            ...notificationStoreSlice(...a),
        })),
        {
            partialize: ({ token, user }) => ({
                token,
                user,
            }),
            name: 'application-store',
        }
    )
)
