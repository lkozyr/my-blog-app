
export const dateStampToDate = (stamp) => {
    const options = { month: 'long', day: 'numeric', year: 'numeric'};
    const date = new Date(stamp);
    return date.toLocaleDateString('en-US', options);
}
