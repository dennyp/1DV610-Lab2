import ImageManipulator from './ImageManipulator.js'

const canvas = document.getElementById('canvas')

const imageManipulator = new ImageManipulator(canvas)

const originalImage = 'wepik-export-20230922142657alsS.jpeg'
imageManipulator.drawImageIntoContext(originalImage)

const resetButton = document.getElementById('btn-reset')
resetButton.addEventListener('click', () => {
  imageManipulator.drawImageIntoContext(originalImage)
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
