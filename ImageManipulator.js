class ImageManipulator {
  constructor(canvas, imageSrc) {
    this.canvas = canvas
    this.context = canvas.getContext('2d')

    this.image = new Image()
    this.drawImageIntoContext(imageSrc)

    this.xImageCenter = this.image.width / 2
    this.yImageCenter = this.image.height / 2
    this.rotationAngle = 0
    this.aspectRatio = this.image.width / this.image.height
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

  setOriginalCanvasDimensions() {
    this.canvas.width = this.image.width
    this.canvas.height = this.image.height
  }

  drawImageIntoContext(imageSrc) {
    this.image.onload = () => {
      this.setOriginalCanvasDimensions()
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

  applyFilterNegative() {
    const rgbaData = this.getRgbaData()

    const numberOfValuesInPixel = 4
    for (let i = 0; i < rgbaData.length; i += numberOfValuesInPixel) {
      rgbaData[i] = 255 - rgbaData[i]
      rgbaData[i + 1] = 255 - rgbaData[i + 1]
      rgbaData[i + 2] = 255 - rgbaData[i + 2]
    }

    this.putManipulatedImageIntoContext()
  }

  applyBrightness(factor) {
    const rgbaData = this.getRgbaData()

    const numberOfValuesInPixel = 4
    for (let i = 0; i < rgbaData.length; i += numberOfValuesInPixel) {
      rgbaData[i] *= factor
      rgbaData[i + 1] *= factor
      rgbaData[i + 2] *= factor
    }

    this.putManipulatedImageIntoContext()
  }

  applyOpacity(opacity) {
    const rgbaData = this.getRgbaData()

    const numberOfValuesInPixel = 4
    for (let i = 0; i < rgbaData.length; i += numberOfValuesInPixel) {
      rgbaData[i + 3] = opacity
    }

    this.putManipulatedImageIntoContext()
  }

  setRotationAngle(degrees) {
    if (this.rotationAngle >= 360) {
      this.rotationAngle = degrees
    } else {
      this.rotationAngle += degrees
    }
  }

  flipCanvasWidthAndHeight() {
    this.canvas.width = this.image.height
    this.canvas.height = this.image.width
  }

  updateCanvasDimensions(rotationInDegrees) {
    if (
      Math.abs(rotationInDegrees) === 90 ||
      Math.abs(rotationInDegrees) === 270
    ) {
      this.flipCanvasWidthAndHeight()
    } else {
      this.setOriginalCanvasDimensions()
    }
  }

  clearCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  applyRotation(degrees) {
    this.setRotationAngle(degrees)
    this.updateCanvasDimensions(this.rotationAngle)
    this.clearCanvas()

    const rotationInRadians = (this.rotationAngle * Math.PI) / 180

    this.context.save()
    this.context.translate(this.canvas.width / 2, this.canvas.height / 2)
    this.context.rotate(rotationInRadians)
    this.context.drawImage(
      this.image,
      -this.xImageCenter,
      -this.yImageCenter,
      this.image.width,
      this.image.height
    )
    this.context.restore()

    this.setImageData()
  }
}

export default ImageManipulator
