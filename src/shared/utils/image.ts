export function imageToFile(image: HTMLImageElement, name: string): File {
  const nameFile = name !== "" ? name : `match_${(+new Date).toString(36)}`
  var blobBin = atob(image.src.split(",")[1])
  var array = []
  for (var i = 0; i < blobBin.length; i++) {
    array.push(blobBin.charCodeAt(i))
  }
  var blob = new Blob([new Uint8Array(array)], { type: "image/png" })
  return new File([blob], `${nameFile}.png`, blob)
}
