export const convertToMiliseconds = (unixTime: number) => {
  const unixFloor = Math.floor(unixTime)
  const lengUnixTime = unixFloor.toString().length

  // console.log(lengUnixTime, unixTime, 'lengUnixTime')

  return unixFloor * Math.pow(10, 13 - lengUnixTime)
}
