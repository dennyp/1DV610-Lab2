# Image Manipulator

This module will manipulate images in different ways. For example, you can change the rotation of an image, adjust the tint and brightness, and apply different filters on an image.See the below documentation to use the module.

## Installation

This is how you set up a local project. Follow the steps below.

1. Clone the repository
   ```sh
   https://github.com/dennyp/ImageManipulator.git
   ```
2. To try out the test app, launch a local development server. For example, using the vscode extension Live Server.
3. Go to http://localhost:3000/TestApp/ to start using the ImageManipulator with the provided test application.

## Usage

To start using the ImageManipulator in your project follow the steps below.

1. Import the ImageManipulator module.
   ```js
   import ImageManipulator from ./ImageManipulator.js
   ```
2. Create a HTML canvas element.
   ```js
   const canvas = document.getElementById('canvas')
   ```
3. Create a constant with the path to the image you want to manipulate.
   ```js
   const originalImageSrc = 'wepik-export-20230922142657alsS.jpeg'
   ```
4. Create a new instance of the ImageManipulator. The constructor takes the canvas and the path to your image as parameters.
   ```js
   const imageManipulator = new ImageManipulator(canvas, originalImageSrc)
   ```
5. Now you can use the following methods to manipulate your image:
   - applyFilterGrayscale()
   - applyFilterNegative()
   - changeBrightness(factor)
   - changeOpacity(value)
   - changeRotation(degrees)
   - changeTint(color, factor)

### Methods

The method applyFilterGrayscale() converts the image to gray.

```js
imageManipulator.applyFilterGrayscale()
```

To apply a negative filter you can use applyFilterNegative(). This filter inverts the colors in the image. The second time you use it the image is restored to its original.

```js
imageManipulator.applyFilterNegative()
```

If you want to change brightness in the image you can use the method changeBrightness(factor). The brightness is changed by multiplying the pixel values in the image with the desired factor. The below code snippet increases the brightness by 10%.

```js
imageManipulator.changeBrightness(1.1)
```

The method changeOpacity(value) determines the opacaity, or how transparent the image is. The value parameter should be between 0 and 255. A lower value is more transparant.

```js
imageManipulator.changeOpacity(127)
```

To change rotation of the image you can use the method changeRotation(degrees). To rotate the image clockwise you use positive values, and to rotate counterclockwise you use negative values. Note that in the current implementation you can only use values in increments of 90.

```js
imageManipulator.changeRotation(90)
```

If you want a different tint of an image you can use the method changeTint(color, factor). The color parameter can be either 'red', 'green', or 'blue'. The factor parameter determines which value to multiply with. A value above 1 increases the tint and a value below 1 decreases the tint for the specified color.

```js
imageManipulator.changeTint(1.1)
```

## License

This module is distributed under the MIT license.
