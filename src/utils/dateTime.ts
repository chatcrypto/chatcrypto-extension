export const convertToMiliseconds = (unixTime: number) => {
  const lengUnixTime = unixTime.toString().length

  // console.log(lengUnixTime, unixTime, 'lengUnixTime')

  return unixTime * Math.pow(10, 13 - lengUnixTime)
}
