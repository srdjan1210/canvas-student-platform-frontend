import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { AuthStore, authStoreSlice } from './auth-store/auth.store'
import { FileStore, fileStoreSlice } from './file-store/file.store'

export const useApplicationStore = create<AuthStore & FileStore>()(
    persist(
        immer((...a) => ({
            ...authStoreSlice(...a),
            ...fileStoreSlice(...a),
        })),
        {
            partialize: ({ token, user, boxType }) => ({
                token,
                user,
                boxType,
            }),
            name: 'application-store',
        }
    )
)
