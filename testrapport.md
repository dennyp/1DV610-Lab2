# Test report

All test have in common that a local development server is up an running. For example using the vscode extension Live Server.

## Test summary

| Test case | Description                             | Pass/Fail | Comment |
| --------- | --------------------------------------- | --------- | ------- |
| 1.1       | Navigate to test page                   | Pass      |         |
| 1.2       | Filter with grayscale                   | Pass      |         |
| 1.3       | Negative image                          | Pass      |         |
| 1.4       | Brighten image                          | Pass      |         |
| 1.5       | Darken Image                            | Pass      |         |
| 1.6       | Change opacity                          | Pass      |         |
| 1.7       | Rotate clockwise                        | Pass      |         |
| 1.8       | Rotate counter-clockwise                | Pass      |         |
| 1.9       | Rotate multiple times clockwise         | Pass      |         |
| 1.10      | Rotate multiple times counter-clockwise | Pass      |         |
| 1.11      | Tint image                              | Pass      |         |
| Total     |                                         | 100%      |         |

## Test case 1.1, Navigate to test page

Page is shown with an image of a pizza which is the test image, when navigation to site is successful.

### Input:

- Navigate to site http://localhost:3000/TestApp/

### Output:

- The image of a pizza is shown.

---

## Test case 1.2, Filter with grayscale

The image turns gray when button is clicked.

### Input:

- Test case 1.1
- Click the button "Grayscale".

### Output:

- The image turns completely gray and you can still see a pizza.

---

## Test case 1.3, Negative image

The colors of the image is inverted when button is clicked.

### Input:

- Test case 1.1
- Click the button "Negative".

### Output:

- The colors of the image is inverted and looks like a photo negative of a pizza.

---

## Test case 1.4, Brighten image

The image becomes brighter.

### Input:

- Test case 1.1
- Click the button "Brighten".

### Output:

- The image becomes brighter and it still displays a pizza.

---

## Test case 1.5, Darken image

The image becomes darker.

### Input:

- Test case 1.1
- Click the button "Darken".

### Output:

- The image becomes darker and you can still see a pizza.

---

## Test case 1.6, Change opacity

The image becomes transparant.

### Input:

- Test case 1.1
- Click the button "50% Opacity".

### Output:

- The image becomes notacibly transparant and you can still see a pizza.

---

## Test case 1.7, Rotate clockwise

The image is rotated clockwise and maintains the aspect ratio.

### Input:

- Test case 1.1
- Click the button "Rotate clockwise".

### Output:

- The image is rotated 90 degrees clockwise and maintains the aspect ratio of the original image. The former width of the canvas should now be the height and vice versa.

---

## Test case 1.8, Rotate counterclockwise

The image is rotated counter-clockwise and maintains the aspect ratio.

### Input:

- Test case 1.1
- Click the button "Rotate counterclockwise".

### Output:

- the image is rotated 90 degrees counter-clockwise and maintains the aspect ratio of the original image. The former width of the canvas should now be the height and vice versa.

---

## Test case 1.9, Rotate multiple times clockwise

The image is rotated clockwise at least five times and gets the result as in Test case 1.7.

### Input:

- Test case 1.1
- Click the button "Rotate clockwise" five times.

### Output:

- The image should end up 90 degrees clockwise like in Test case 1.7.

---

## Test case 1.10, Rotate multiple times counter-clockwise

The image is rotated counter-clockwise at least five times and gets the result as in Test case 1.8.

### Input:

- Test case 1.1
- Click the button "Rotate counterclockwise" five times.

### Output:

- The image should end up 90 degrees counter-clockwise like in Test case 1.8.

---

## Test case 1.11, Tint image

A color is selected from the select list and the image tint for the selected option increases.

### Input:

- Test case 1.1
- Select color from the select list.
  1. Red
  2. Green
  3. Blue
- Click the button "Tint color". Repeat for all the colors in the select list.

### Output:

- The image should get the tint of the selected color.
  1. Red tint
  2. Green tint
  3. Blue tint

---
