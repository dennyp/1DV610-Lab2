import ImageManipulator from './ImageManipulator.js'

const canvas = document.getElementById('canvas')

const imageManipulator = new ImageManipulator(canvas)
imageManipulator.drawImageIntoContext('wepik-export-20230922142657alsS.jpeg')

const grayscaleButton = document.getElementById('btn-grayscale')
grayscaleButton.addEventListener('click', () => {
  imageManipulator.applyFilterGrayscale()
})
