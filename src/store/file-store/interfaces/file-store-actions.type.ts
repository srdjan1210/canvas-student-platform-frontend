import { FileBoxType } from '../../../courses/components/files/file-box-switch.component'

export type FileStoreActions = {
    setBoxType: (val: FileBoxType) => void
    setSpinner: (state: boolean) => void
    setFileMenuPosition: (val: { x: number; y: number } | null) => void
}
