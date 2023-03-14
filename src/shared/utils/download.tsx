import fileDownload from 'js-file-download'
export const download = (url: string, fileName: string) => {
    fetch(url, {
        method: 'get',
        mode: 'no-cors',
        referrerPolicy: 'no-referrer',
    })
        .then((res) => res.blob())
        .then((res) => {
            fileDownload(res, fileName)
            // const aElement = document.createElement('a')
            // console.log(fileName)
            // aElement.setAttribute('download', fileName)
            // const href = URL.createObjectURL(res)
            // aElement.href = url
            // aElement.setAttribute('target', '_blank')
            // aElement.click()
            // URL.revokeObjectURL(href)
        })
}
