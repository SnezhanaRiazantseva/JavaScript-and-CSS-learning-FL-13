function letterCount(fullString, subStringToFind) {
  let regexp = new RegExp(`(${subStringToFind})`, `gi`);

  if (!subStringToFind) {
    return ('Empty substring for search');
  }
  let occurrences = fullString.match(regexp) || [];

  return occurrences.length;
}

letterCount("Marry", "")
letterCount("Maggy", "g")
letterCount("Barry", "b")
letterCount("", "z")