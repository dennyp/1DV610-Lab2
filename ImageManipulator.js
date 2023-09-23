class ImageManipulator {
  constructor(canvas) {
    this.canvas = canvas
    this.context = canvas.getContext('2d')
    this.image = new Image()
  }

  setImageData() {
    this.imageData = this.context.getImageData(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    )
  }

  getRgbaData() {
    return this.imageData.data
  }

  drawImageIntoContext(imageSrc) {
    this.image.onload = () => {
      this.canvas.width = this.image.naturalWidth
      this.canvas.height = this.image.naturalHeight
      this.context.drawImage(this.image, 0, 0)
      this.setImageData()
    }

    this.image.src = imageSrc
  }

  putManipulatedImageIntoContext() {
    this.context.putImageData(this.imageData, 0, 0)
  }

  applyEffect(data, index, effect) {
    data[index] = effect
    data[index + 1] = effect
    data[index + 2] = effect
  }

  applyFilterGrayscale() {
    const rgbaData = this.getRgbaData()

    // source of formula: https://en.wikipedia.org/wiki/Grayscale#Luma_coding_in_video_systems
    const redGrayscaleConstant = 0.299
    const greenGrayscaleConstant = 0.587
    const blueGrayscaleConstant = 0.114
    const numberOfValuesInPixel = 4
    for (let i = 0; i < rgbaData.length; i += numberOfValuesInPixel) {
      let red = rgbaData[i]
      let green = rgbaData[i + 1]
      let blue = rgbaData[i + 2]

      const grayscale =
        red * redGrayscaleConstant +
        green * greenGrayscaleConstant +
        blue * blueGrayscaleConstant

      this.applyEffect(rgbaData, i, grayscale)
    }

    this.putManipulatedImageIntoContext()
  }
}

export default ImageManipulator
