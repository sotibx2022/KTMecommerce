export const truncateText = (text: string) => {
    const words = text.split(" ");
    if (words.length <= 10) {
      return text; // Return the text as is if there are 9 or fewer words
    } else {
      const truncated = words.slice(0, 9).join(" ") + "..."; // Slice first 9 words and add "..."
      return truncated;
    }
  };