export function getString(proof, callback) {
  if (proof) {
    const reader = new FileReader()
    reader.readAsDataURL(proof)

    reader.onload = () => {
      callback(reader.result)
    }
  }
}
