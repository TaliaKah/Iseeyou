// -------------------
//  Parameters 
// -------------------


//Runaway bound
const ai = new rw.HostedModel({
    url: "https://anime-portrait-7e59bafe.hosted-models.runwayml.cloud/v1/",
    token: "UdEuJYS1Szgn3QtLOPBTug==",
  });


//variables
let img: p5.Element
const z = []
let t=1
let p5Canvas;

// to record our video
const capturer = new CCapture({
    framerate: 5,
    format: "webm",
    name: "movie",
    quality: 100,
    verbose: true,
  });

// -------------------
//       Drawing
// -------------------

function draw() {
    //start video recording
    if (frameCount === 1) capturer.start();
    //display the picture created by IA
    if (img)
        image(img, 0, 0, width, height)
    //at different frame we change value to obtain a new pictures and eventually get an animation
    if (frameCount<151){
        if (frameCount<59)
            t-=0.015
        else{
            if (frameCount<101)
                t-=0.09
            else{
                if (frameCount<130)
                    t-=0.5
                else
                    t-=0.6
            }
        }
        const inputs = {
            "z": z,
            "truncation": t,
        };
        ai.query(inputs).then(outputs => {
            const { image } = outputs;
            img = createImg(image)
            img.hide()
        });
    }
    //stop the video 
    capturer.capture(p5Canvas.canvas);
    if (frameCount === 150) {
        noLoop();
        capturer.stop();
        capturer.save();
    }
}

// -------------------
//    Initialization
// -------------------

function setup() {
    p6_CreateCanvas()
    p5Canvas = createCanvas(1080, 1080);
    frameRate(5)
    
    for (let i = 0; i < 512; i++) {
        z[i]=0
    }

    // IA iniatialisation 
    const inputs = {
        "z": z,
        "truncation":t ,
    };
    // make the pictures thanks to IA
    ai.query(inputs).then(outputs => {
        const { image } = outputs;
        img = createImg(image)
        img.hide()
    });
}

function windowResized() {
    p6_ResizeCanvas()
}