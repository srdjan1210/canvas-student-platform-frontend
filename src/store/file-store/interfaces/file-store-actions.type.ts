export type FileStoreActions = {
    setSpinner: (state: boolean) => void
    setFileMenuPosition: (val: { x: number; y: number } | null) => void
}
