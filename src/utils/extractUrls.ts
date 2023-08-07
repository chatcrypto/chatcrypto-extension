export const extractUrls = (str: string) => {
  const regexp =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()'@:%_+.~#?!&//=]*)/gi

  if (typeof str !== 'string') {
    /** Fail to extract url from string */
    return []
  }

  if (str) {
    const urls = str.match(regexp)
    if (urls) {
      return urls
    } else {
      undefined
    }
  } else {
    undefined
  }
}
