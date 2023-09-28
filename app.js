import ImageManipulator from './ImageManipulator.js'

const canvas = document.getElementById('canvas')
const originalImageSrc = 'wepik-export-20230922142657alsS.jpeg'
const imageManipulator = new ImageManipulator(canvas, originalImageSrc)

const resetButton = document.getElementById('btn-reset')
resetButton.addEventListener('click', () => {
  imageManipulator.drawImageIntoContext(originalImageSrc)
})

const grayscaleButton = document.getElementById('btn-grayscale')
grayscaleButton.addEventListener('click', () => {
  imageManipulator.applyFilterGrayscale()
})

const negativeButton = document.getElementById('btn-negative')
negativeButton.addEventListener('click', () => {
  imageManipulator.applyFilterNegative()
})

const brightenButton = document.getElementById('btn-brighten')
brightenButton.addEventListener('click', () => {
  imageManipulator.applyBrightness(1.1)
})

const darkenButton = document.getElementById('btn-darken')
darkenButton.addEventListener('click', () => {
  imageManipulator.applyBrightness(0.9)
})

const opacityButton = document.getElementById('btn-opacity')
opacityButton.addEventListener('click', (e) => {
  const opacity = e.target.value
  imageManipulator.applyOpacity(opacity)
})

const rotateClockwiseButton = document.getElementById('btn-rotate-clockwise')
rotateClockwiseButton.addEventListener('click', () => {
  imageManipulator.applyRotation(90)
})
const rotateCounterClockwiseButton = document.getElementById(
  'btn-rotate-counterclockwise'
)
rotateCounterClockwiseButton.addEventListener('click', () => {
  imageManipulator.applyRotation(-90)
})
