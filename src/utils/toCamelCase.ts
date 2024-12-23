// convert every key in an object keys to camelCase
export default function toCamelCase(obj: any) {
    return Object.keys(obj).reduce((acc: any, key: any) => {
        const newKey = key.replace(/[-_]/g, ' ')
        const camelCaseKey = newKey.charAt(0).toLowerCase() + newKey.slice(1)
        acc[camelCaseKey] = obj[key]
        return acc
    }, {})
}
