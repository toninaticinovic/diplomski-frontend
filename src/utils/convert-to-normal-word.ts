function convertToNormalCase(input: string): string {
  const words = input.split("_")
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1)

  const result = words.join(" ")

  return result
}

export default convertToNormalCase
