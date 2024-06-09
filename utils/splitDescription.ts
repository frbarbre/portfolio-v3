export function splitDescription(description: string, splitWords: string[]) {
  let result = [];
  let remainingDescription = description;

  // Iterate through each word in splitWords
  for (let word of splitWords) {
    // Find the index of the word in the remaining description
    let index = remainingDescription.indexOf(word);
    if (index !== -1) {
      // Split the description at the found index and trim the resulting parts
      let before = remainingDescription.slice(0, index).trim();
      let after = remainingDescription.slice(index + word.length).trim();

      // If there is text before the word, add it to the result array
      if (before) {
        result.push(before);
      }
      // Add the word and its subsequent part to the result array
      result.push(word);

      // Continue with the remaining part of the description
      remainingDescription = after;
    }
  }

  // Add any remaining part of the description
  if (remainingDescription) {
    result.push(remainingDescription);
  }

  // Merge adjacent non-splitWord entries
  let finalResult = [];
  let tempStr = "";
  for (let part of result) {
    if (splitWords.includes(part)) {
      if (tempStr) {
        finalResult.push(tempStr.trim());
        tempStr = "";
      }
      finalResult.push(part);
    } else {
      tempStr += part + " ";
    }
  }
  if (tempStr) {
    finalResult.push(tempStr.trim());
  }

  // Combine splitWord entries with adjacent text
  for (let i = 0; i < finalResult.length - 1; i++) {
    if (
      splitWords.includes(finalResult[i]) &&
      i + 1 < finalResult.length &&
      !splitWords.includes(finalResult[i + 1])
    ) {
      finalResult[i] += " " + finalResult[i + 1];
      finalResult.splice(i + 1, 1);
    }
  }

  return finalResult;
}
