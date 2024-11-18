
/**
 * Validates a date string in YYYY-MM-DD format.
 *
 * @param dateStr - The date string to validate.
 * @param minAge - (Optional) Minimum age requirement in years.
 * @returns {true | string} - Returns true if valid, otherwise an error message.
 */
export function validateDate(dateStr: string, minAge?: number): true | string {
    // Trim any surrounding whitespace
    const trimmedDate = dateStr.trim();

    // 1. Check format: YYYY-MM-DD
    const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateFormatRegex.test(trimmedDate)) {
        return "Date must be in YYYY-MM-DD format";
    }

    // 2. Parse date components
    const [year, month, day] = trimmedDate.split('-').map(Number);
    const date = new Date(year, month - 1, day); // Month is 0-indexed in Date object

    // 3. Check if date is valid (e.g., no February 30)
    if (
        date.getFullYear() !== year ||
        date.getMonth() !== month - 1 ||
        date.getDate() !== day
    ) {
        return "Invalid date";
    }

    // 4. Optional: Check minimum age requirement
    if (minAge !== undefined) {
        const today = new Date();
        const ageCutoff = new Date(
            today.getFullYear() - minAge,
            today.getMonth(),
            today.getDate()
        );

        if (date > ageCutoff) {
            return `You must be at least ${minAge} years old`;
        }
    }

    return true;
}
