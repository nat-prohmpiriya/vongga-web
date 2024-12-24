
// YYYY-MM-DD
export function convertTime(isoString: string) {
    const date = new Date(isoString);

}

export function formatISOToDate(isoString: string) {
    return new Date(isoString).toISOString().slice(0, 10).replace(/-/g, '/');

}
