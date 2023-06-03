import { FileStoreState } from './interfaces/file-store-state.type'
import { FileStoreActions } from './interfaces/file-store-actions.type'
import { StateCreator } from 'zustand'

export type FileStore = FileStoreState & FileStoreActions

const state: FileStoreState = {
    spinner: false,
    fileMenuPosition: null,
}

export const fileStoreSlice: StateCreator<FileStore> = (set, get) => ({
    ...state,
    setSpinner: (value: boolean) => {
        set((state) => ({
            spinner: value,
        }))
    },
    setFileMenuPosition: (position) => {
        set((state) => ({
            fileMenuPosition: position,
        }))
    },
})
