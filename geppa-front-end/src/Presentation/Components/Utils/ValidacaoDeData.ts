export function validaData(dateString: string): boolean {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
}