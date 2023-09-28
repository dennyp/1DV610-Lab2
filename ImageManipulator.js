class ImageManipulator {
  #canvas
  #context
  #image
  #imageData
  #xImageCenter = 0
  #yImageCenter = 0
  #rotationAngle = 0

  get #getCanvasWidth() {
    return this.#canvas.width
  }

  get #getCanvasHeight() {
    return this.#canvas.height
  }

  set #setCanvas(canvas) {
    this.#canvas = canvas
  }

  set #setCanvasWidth(width) {
    if (width > 0) this.#canvas.width = width
  }

  set #setCanvasHeight(height) {
    if (height > 0) this.#canvas.height = height
  }

  get #getContext() {
    return this.#context
  }

  set #setContext(context) {
    this.#context = context
  }

  get #getImage() {
    return this.#image
  }

  get #getImageWidth() {
    return this.#image.width
  }

  get #getImageHeight() {
    return this.#image.height
  }

  set #setImage(image) {
    this.#image = image
  }

  set #setImageSource(src) {
    this.#image.src = src
  }

  get #getImageData() {
    return this.#imageData
  }

  set #setImageData(data) {
    this.#imageData = data
  }

  get #getRotationAngle() {
    return this.#rotationAngle
  }

  set #setRotationAngle(degrees) {
    if (this.#rotationAngle >= 360 || this.#rotationAngle <= -360) {
      this.#rotationAngle = degrees
    } else {
      this.#rotationAngle += degrees
    }
  }

  get #getXImageCenter() {
    return this.#xImageCenter
  }

  get #getYImageCenter() {
    return this.#yImageCenter
  }

  set #setXImageCenter(value) {
    if (this.#getImageWidth > 0) this.#xImageCenter = value
  }

  set #setYImageCenter(value) {
    if (this.#getImageHeight > 0) this.#yImageCenter = value
  }

  get #getRgbaData() {
    return this.#imageData.data
  }

  get #getImageDataFromContext() {
    return this.#getContext.getImageData(
      0,
      0,
      this.#getCanvasWidth,
      this.#getCanvasHeight
    )
  }

  constructor(canvas, imageSrc) {
    this.#setCanvas = canvas
    this.#setContext = canvas.getContext('2d')

    this.#setImage = new Image()
    this.drawImageIntoContext(imageSrc)

    this.#setXImageCenter = this.#getImageWidth / 2
    this.#setYImageCenter = this.#getImageHeight / 2
    this.#setRotationAngle = 0
  }

  #setOriginalCanvasDimensions() {
    this.#setCanvasWidth = this.#getImageWidth
    this.#setCanvasHeight = this.#getImageHeight
  }

  drawImageIntoContext(imageSrc) {
    this.#image.onload = () => {
      this.#setOriginalCanvasDimensions()
      this.#getContext.drawImage(this.#getImage, 0, 0)
      this.#setImageData = this.#getImageDataFromContext
    }

    this.#setImageSource = imageSrc
  }

  #putManipulatedImageIntoContext() {
    this.#getContext.putImageData(this.#getImageData, 0, 0)
  }

  #applyEffect(data, index, effect) {
    data[index] = effect
    data[index + 1] = effect
    data[index + 2] = effect
  }

  applyFilterGrayscale() {
    const rgbaData = this.#getRgbaData

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

      this.#applyEffect(rgbaData, i, grayscale)
    }

    this.#putManipulatedImageIntoContext()
  }

  applyFilterNegative() {
    const rgbaData = this.#getRgbaData

    const numberOfValuesInPixel = 4
    for (let i = 0; i < rgbaData.length; i += numberOfValuesInPixel) {
      rgbaData[i] = 255 - rgbaData[i]
      rgbaData[i + 1] = 255 - rgbaData[i + 1]
      rgbaData[i + 2] = 255 - rgbaData[i + 2]
    }

    this.#putManipulatedImageIntoContext()
  }

  applyBrightness(factor) {
    const rgbaData = this.#getRgbaData

    const numberOfValuesInPixel = 4
    for (let i = 0; i < rgbaData.length; i += numberOfValuesInPixel) {
      rgbaData[i] *= factor
      rgbaData[i + 1] *= factor
      rgbaData[i + 2] *= factor
    }

    this.#putManipulatedImageIntoContext()
  }

  applyOpacity(opacity) {
    const rgbaData = this.#getRgbaData

    const numberOfValuesInPixel = 4
    for (let i = 0; i < rgbaData.length; i += numberOfValuesInPixel) {
      rgbaData[i + 3] = opacity
    }

    this.#putManipulatedImageIntoContext()
  }

  #flipCanvasWidthAndHeight() {
    this.#setCanvasWidth = this.#getImageHeight
    this.#setCanvasHeight = this.#getImageWidth
  }

  #updateCanvasDimensions(rotationInDegrees) {
    if (
      Math.abs(rotationInDegrees) === 90 ||
      Math.abs(rotationInDegrees) === 270
    ) {
      this.#flipCanvasWidthAndHeight()
    } else {
      this.#setOriginalCanvasDimensions()
    }
  }

  #clearCanvas() {
    this.#getContext.clearRect(
      0,
      0,
      this.#getCanvasWidth,
      this.#getCanvasHeight
    )
  }

  applyRotation(degrees) {
    this.#setRotationAngle = degrees
    this.#updateCanvasDimensions(this.#getRotationAngle)
    console.log(
      '🚀 ~ file: ImageManipulator.js:233 ~ ImageManipulator ~ applyRotation ~ this.#getRotationAngle:',
      this.#getRotationAngle
    )
    this.#clearCanvas()

    const rotationInRadians = (this.#getRotationAngle * Math.PI) / 180
    console.log(
      '🚀 ~ file: ImageManipulator.js:236 ~ ImageManipulator ~ applyRotation ~ rotationInRadians:',
      rotationInRadians
    )

    this.#getContext.save()
    this.#getContext.translate(
      this.#getCanvasWidth / 2,
      this.#getCanvasHeight / 2
    )
    this.#getContext.rotate(rotationInRadians)
    this.#getContext.drawImage(
      this.#getImage,
      -this.#getXImageCenter,
      -this.#getYImageCenter,
      this.#getImageWidth,
      this.#getImageHeight
    )
    this.#getContext.restore()

    this.#setImageData = this.#getImageDataFromContext
  }

  tintSelectedColor(data, index, color, factor) {
    switch (color) {
      case 'red':
        data[index] *= factor
        break
      case 'green':
        data[index + 1] *= factor
        break
      case 'blue':
        data[index + 2] *= factor
        break
    }
  }

  changeTint(color, factor) {
    const rgbaData = this.#getRgbaData

    const numberOfValuesInPixel = 4
    for (let i = 0; i < rgbaData.length; i += numberOfValuesInPixel) {
      this.tintSelectedColor(rgbaData, i, color, factor)
    }

    this.#putManipulatedImageIntoContext()
  }
}

export default ImageManipulator
