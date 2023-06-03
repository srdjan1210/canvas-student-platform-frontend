import { FileStoreState } from './interfaces/file-store-state.type'
import { FileStoreActions } from './interfaces/file-store-actions.type'
import { StateCreator } from 'zustand'
import { FileBoxType } from '../../courses/components/files/file-box-switch.component'

export type FileStore = FileStoreState & FileStoreActions

const state: FileStoreState = {
    boxType: 'grid',
    spinner: false,
    fileMenuPosition: null,
}

export const fileStoreSlice: StateCreator<FileStore> = (set, get) => ({
    ...state,
    setBoxType: (val: FileBoxType) => {
        set((state) => ({
            boxType: val,
        }))
    },
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
