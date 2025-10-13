export const truncateSmart = (str, maxLength, maxWordLength = 11) => {
  const words = str.split(" ");
  let result = "";

  for (const word of words) {
    // Om ett ord är för långt → avsluta direkt
    if (word.length > maxWordLength) {
      result += word.slice(0, maxWordLength) + "…";
      return result.trim();
    }

    // Om nästa ord gör att vi överskrider total längd → avsluta där
    if ((result + " " + word).trim().length > maxLength) {
      return result.trim() + "…";
    }

    // Annars lägg till ordet
    result += (result ? " " : "") + word;
  }

  // Om inget behövde trunkeras → returnera originaltexten
  return result;
};
