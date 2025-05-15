export const truncateCharacters = (name: string, maxLength: number): string => {
  const normalizedName = name.trim().replace(/\s+/g, " ");
  const totalCharacters = normalizedName.replace(/\s/g, "").length;
  if (totalCharacters > maxLength) {
    const firstName = normalizedName.split(" ")[0];
    if (firstName.length > maxLength) {
      return firstName.slice(0, maxLength);
    } else {
      return firstName;
    }
  }
  return normalizedName;
};
export const truncateText = (text: string) => {
    const words = text.split(" ");
    if (words.length <= 8) {
      return text; // Return the text as is if there are 9 or fewer words
    } else {
      const truncated = words.slice(0, 9).join(" ") + "..."; // Slice first 9 words and add "..."
      return truncated;
    }
  };
  export const DateFormator = (date: string | Date): string => {
    // Helper function to convert month number to month name
    const getMonthName = (monthIndex: number): string => {
      const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      return months[monthIndex];
    };
    // Check if the date is already a string, return it as is
    if (typeof date === 'string') {
      // Split the string by "T" and extract the date part (before the "T")
      const [year, month, day] = date.split('T')[0].split('-');
      const monthName = getMonthName(Number(month) - 1); // Month is zero-based in JavaScript
      return `${monthName} ${day}, ${year}`;
    }
    // If it's a Date object, convert it to string
    if (date instanceof Date) {
      const year = date.getFullYear();
      const month = date.getMonth();  // Get month (0-based index)
      const day = date.getDate();
      const monthName = getMonthName(month);
      return `${monthName} ${day}, ${year}`;
    }
    // In case the input is neither a string nor a Date object, return an empty string
    return '';
  };
  export const shortName = (name: string) => {
    const nameParts = name.split(" "); // Split name into parts
    // Ensure there is at least two words
    const firstInitial = nameParts[0].charAt(0); // First character of the first word
    const secondInitial = nameParts[1] ? nameParts[1].charAt(0) : ''; // First character of the second word, if it exists
    // Combine initials
    return firstInitial + secondInitial;
  };
