class ImageManipulator {
  constructor(canvas) {
    this.canvas = canvas
    this.context = canvas.getContext('2d')
    this.image = new Image()
    this.imageData = this.context.getImageData(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    )
  }

  drawImageIntoContext(imageSrc) {
    this.image.onload = () => {
      this.canvas.width = this.image.naturalWidth
      this.canvas.height = this.image.naturalHeight
      this.context.drawImage(this.image, 0, 0)
    }

    this.image.src = imageSrc
  }
}

export default ImageManipulator
