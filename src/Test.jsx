import React from 'react'
import Sketch from 'react-p5';

const Test = () => {

const setup = (p5, parent) => {
    p5.createCanvas(300, 300).parent(parent);
    p5.background(0);
}
const mousePressed = p5 => {
    p5.strokeWeight(25);
    p5.stroke(255);
    p5.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY);
}
  return <Sketch setup={setup} mousePressed={mousePressed} />
};

    // const setup = (p5, canvasParentRef) => {
    //   const cnv = p5.createCanvas(500, 500).parent(canvasParentRef)
    //   cnv.mousePressed((event) => {
    //     line(mouseX, mouseY, pmouseX, pmouseY);
    //     console.log('lol')
    //   })
    // }
    
    // const draw = p5 => {
    //     p5.background(255, 255, 255)
    //     p5.strokeWeight(100)
    // }
    
    // return <Sketch setup={setup} draw={draw} />
    


export default Test
