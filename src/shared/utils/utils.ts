export const extractFileExtension = (filename: string) => {
    if (!filename) return ''
    return filename.split('.').at(-1) ?? ''
}

export const addProxyDefaultValue = (object: any, defaultValue: any) => {
    const handler = {
        get: function (target: any, name: any) {
            // eslint-disable-next-line no-prototype-builtins
            return target.hasOwnProperty(name) ? target[name] : defaultValue
        },
    }

    return new Proxy(object, handler)
}

export const formatDatePretty = (date: Date) => {
    date = new Date(date)
    const year = date.getFullYear()
    const month = date.toLocaleString('default', { month: 'short' })
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${day}-${month}-${year} ${hours}:${minutes}`
}
