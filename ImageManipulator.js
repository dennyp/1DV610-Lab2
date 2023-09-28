/**
 * Creates a new Image Manipulator.
 * @class
 */
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

  /**
   * Represents the image manipulator.
   * @constructor
   * @param {HTMLElement} canvas - The canvas element to draw the image into.
   * @param {String} imageSrc - The source destination of the image.
   */
  constructor(canvas, imageSrc) {
    this.#setCanvas = canvas
    this.#setContext = canvas.getContext('2d')

    this.#setImage = new Image()
    this.drawImageIntoContext(imageSrc)

    this.#setXImageCenter = this.#getImageWidth / 2
    this.#setYImageCenter = this.#getImageHeight / 2
    this.#setRotationAngle = 0
  }

  /**
   * Set canvas width and height to the image width and height
   */
  #setOriginalCanvasDimensions() {
    this.#setCanvasWidth = this.#getImageWidth
    this.#setCanvasHeight = this.#getImageHeight
  }

  /**
   * When image is fully loaded, it will draw into the canvas context.
   * @param {String} imageSrc - The source destination of the image.
   */
  drawImageIntoContext(imageSrc) {
    this.#image.onload = () => {
      this.#setOriginalCanvasDimensions()
      this.#getContext.drawImage(this.#getImage, 0, 0)
      this.#setImageData = this.#getImageDataFromContext
    }

    this.#setImageSource = imageSrc
  }

  /**
   * Puts the manipulated image data into the canvas context.
   */
  #putManipulatedImageIntoContext() {
    this.#getContext.putImageData(this.#getImageData, 0, 0)
  }

  #applyEffect(data, index, effect) {
    data[index] = effect
    data[index + 1] = effect
    data[index + 2] = effect
  }

  /**
   * Applies a grayscale filter to the image.
   */
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

  /**
   * Applies a negative filter to the image. Applying the negative filter again will restore the image.
   */
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

  /**
   * Changes the brightness of the image.
   * @param {Number} factor - A factor to multiply the brightness of the image. If above 1, the image will become brighter. If below 1, the image will become darker.
   */
  changeBrightness(factor) {
    const rgbaData = this.#getRgbaData

    const numberOfValuesInPixel = 4
    for (let i = 0; i < rgbaData.length; i += numberOfValuesInPixel) {
      rgbaData[i] *= factor
      rgbaData[i + 1] *= factor
      rgbaData[i + 2] *= factor
    }

    this.#putManipulatedImageIntoContext()
  }

  /**
   * Changes the opacity of the image.
   * @param {Number} opacity - A value between 0 and 255. A lower value is more transparent.
   */
  changeOpacity(opacity) {
    const rgbaData = this.#getRgbaData

    const numberOfValuesInPixel = 4
    for (let i = 0; i < rgbaData.length; i += numberOfValuesInPixel) {
      rgbaData[i + 3] = opacity
    }

    this.#putManipulatedImageIntoContext()
  }

  /**
   * Flips the width and height of the canvas.
   */
  #flipCanvasWidthAndHeight() {
    this.#setCanvasWidth = this.#getImageHeight
    this.#setCanvasHeight = this.#getImageWidth
  }

  /**
   * If the image is rotated (-)90 degrees or (-)270 degrees, the canvas dimensions will be flipped from the original image. Otherwise, it is set to the original dimensions.
   * @param {Number} rotationInDegrees - The rotation of the image in degrees.
   */
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

  /**
   * Clears the canvas context.
   */
  #clearCanvas() {
    this.#getContext.clearRect(
      0,
      0,
      this.#getCanvasWidth,
      this.#getCanvasHeight
    )
  }

  /**
   * Rotates the image around its center.
   * @param {Number} degrees - The rotation of the image in degrees.
   */
  changeRotation(degrees) {
    this.#setRotationAngle = degrees
    this.#updateCanvasDimensions(this.#getRotationAngle)
    this.#clearCanvas()

    const rotationInRadians = (this.#getRotationAngle * Math.PI) / 180
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

  /**
   * Checks which of the colors to tint and multiplies the current color value with the factor.
   * @param {ImageData} data - The data of the image.
   * @param {Number} index - The index of the current pixel.
   * @param {String} color - The color to tint the image. Can be 'red', 'green' or 'blue'.
   * @param {Number} factor - The factor to multiply the current color value with.
   */
  #tintSelectedColor(data, index, color, factor) {
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

  /**
   * Tints the image with the selected color.
   * @param {String} color - The color to tint the image. Can be 'red', 'green' or 'blue'.
   * @param {Number} factor - The factor to multiply the current color value with.
   */
  changeTint(color, factor) {
    const rgbaData = this.#getRgbaData

    const numberOfValuesInPixel = 4
    for (let i = 0; i < rgbaData.length; i += numberOfValuesInPixel) {
      this.#tintSelectedColor(rgbaData, i, color, factor)
    }

    this.#putManipulatedImageIntoContext()
  }
}

export default ImageManipulator
