# Axis Laser Engraver Software

Axis is cross platform laser engraver software built using Electron.js

## Functionalities

Axis serves as a user inteactive canvas where a person can choose from default shapes to add to the canvas, write text with a user selected font, and upload images.

# Position and Transformation Controls 

Transformation and positioning attributes allow the user to adjust sizes and positions of objects at a 0.01 millimeter scale. 
Images

Positioning:
- X min, X Max, Y min, Y max

Transformations:
- Width, Height, Rotation angle

Direction:
- Reflection Vertical & Horizontal

# Image options

- Black and White 
- Grayscale 
- Dithered - slider
- Saturation - slider

- Emboss: Adds emboss texture to selected object
- Invert: inverts color on selected object 

## Serial

Utilizing the npm SerialPort Package, I was able to have the software detect connected serial devices and display them as a list. When selected the device, operations could then be performed which includes manuvering the laser engraver head, toggling the power of the laser, and sending G-Code to the engraver.

## G-Code Generation

The method I came up with to compile an image into G-Code utilizes pixels on the canvas which are mapped to physical measurements. These pixels are rendered as coordinates which when generated, are reconized by their X and Y positioning on the canvas. 

## Engraving Styles 

Viewing the screenshots below, you can see on the right side there are two boxes above the "Generate Output" button. These represent the two engraving styles, Raster and Vector. 

The Rastor process and engraves in a horizontal movement. For achieving different saturations, the algorithm adjusts the speed of the laser head and adjusts the laser intensity.

The Vector process was a little more complex on the other hand due to the nature of vector engraving being outline based. This was achived by writing a path following algorithm that could detect black pixels and choosing the next coordinate to be the closest neighbor. 

## Images

![picture](https://github.com/jessepelzar/Axis-Public/blob/master/img1.png)
![picture](https://github.com/jessepelzar/Axis-Public/blob/master/img2.png)
![picture](https://github.com/jessepelzar/Axis-Public/blob/master/img3.png)


# Discalaimer

Unfortunately I could not upload the rest of the developed product to a public repository so I created this one to show what I can. If you have any questions regarding the source, feel free to contact me by email: jessepelzar@gmail.com

