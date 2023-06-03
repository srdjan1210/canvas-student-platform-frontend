export const download = async (endpoint: string, fileName: string) => {
    try {
        const link = document.createElement('a')
        link.href = endpoint
        link.setAttribute('download', fileName)
        document.body.appendChild(link)
        link.click()
        link.remove()
    } catch (e: any) {
        console.log(e)
    }
}

export const downloadAxios = (response: any) => {
    console.log(response)
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const contentDispositionHeader = response.headers['content-disposition']
    const filename = getFilenameFromContentDisposition(contentDispositionHeader)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()
    link.remove()
}

const getFilenameFromContentDisposition = (
    contentDisposition: string
): string => {
    const matches = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(
        contentDisposition
    )
    return matches && matches[1] ? matches[1].replace(/['"]/g, '') : 'file'
}
