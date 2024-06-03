


export function formatNumber(num: number, type: "short" | "standard" = "short", fractionDigits: number = 0) {
    if (type === 'short') {
        // For numbers greater than 1000, return in terms of "k"
        return num >= 1000 ? (num / 1000).toFixed(fractionDigits) + 'k' : num;
    } else if (type === 'standard') {
        // Return a comma separated string
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
        return num;
    }
}