
// YYYY-MM-DD
export function convertTime(isoString: string) {
    const date = new Date(isoString);

}


// output: YYYY/MM/DD
export function formatISOToDate(isoString: string) {
    return new Date(isoString).toISOString().slice(0, 10).replace(/-/g, '/');
}

// output: 1 hr ago or 1 min or 1 day but if it's less than > 3 days is yyyy/mm/dd
export function formatISOToTimeAgo(isoString: string) {
    const date = new Date(isoString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 1000 / 60);
    if (minutes < 60) {
        return `${minutes} min ago`;
    }
    if (minutes < 1440) {
        const hours = Math.floor(minutes / 60);
        return `${hours} hr ago`;
    }
    if (minutes < 10080) {
        const days = Math.floor(minutes / 1440);
        return `${days} day ago`;
    }
    return formatISOToDate(isoString);
}
