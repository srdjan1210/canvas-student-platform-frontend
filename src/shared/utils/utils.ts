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
