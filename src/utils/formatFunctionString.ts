export const formatFunctionString = (
  funcString: string,
  cutoffString = true,
): string => {
  try {
    if (funcString == '-') return '-'

    if (funcString) {
      const splittedArr = funcString.split('::')
      const textPrint = splittedArr.slice(1, splittedArr.length).join('::')

      if (!cutoffString) {
        return textPrint
      }

      if (textPrint.length <= 32) {
        return textPrint
      }
      return textPrint.slice(0, 29) + '...'
    }

    return ''
  } catch (error) {
    return ''
  }
}
