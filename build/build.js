var ai = new rw.HostedModel({
    url: "https://anime-portrait-7e59bafe.hosted-models.runwayml.cloud/v1/",
    token: "UdEuJYS1Szgn3QtLOPBTug==",
});
var img;
var z = [];
var t = 1;
var p5Canvas;
var capturer = new CCapture({
    framerate: 5,
    format: "webm",
    name: "movie",
    quality: 100,
    verbose: true,
});
function draw() {
    if (frameCount === 1)
        capturer.start();
    if (img)
        image(img, 0, 0, width, height);
    if (frameCount < 151) {
        if (frameCount < 59)
            t -= 0.015;
        else {
            if (frameCount < 101)
                t -= 0.09;
            else {
                if (frameCount < 130)
                    t -= 0.5;
                else
                    t -= 0.6;
            }
        }
        var inputs = {
            "z": z,
            "truncation": t,
        };
        ai.query(inputs).then(function (outputs) {
            var image = outputs.image;
            img = createImg(image);
            img.hide();
        });
    }
    capturer.capture(p5Canvas.canvas);
    if (frameCount === 150) {
        noLoop();
        capturer.stop();
        capturer.save();
    }
}
function setup() {
    p6_CreateCanvas();
    p5Canvas = createCanvas(1080, 1080);
    frameRate(5);
    for (var i = 0; i < 512; i++) {
        z[i] = 0;
    }
    var inputs = {
        "z": z,
        "truncation": t,
    };
    ai.query(inputs).then(function (outputs) {
        var image = outputs.image;
        img = createImg(image);
        img.hide();
    });
}
function windowResized() {
    p6_ResizeCanvas();
}
var __ASPECT_RATIO = 1;
var __MARGIN_SIZE = 25;
function __desiredCanvasWidth() {
    var windowRatio = windowWidth / windowHeight;
    if (__ASPECT_RATIO > windowRatio) {
        return windowWidth - __MARGIN_SIZE * 2;
    }
    else {
        return __desiredCanvasHeight() * __ASPECT_RATIO;
    }
}
function __desiredCanvasHeight() {
    var windowRatio = windowWidth / windowHeight;
    if (__ASPECT_RATIO > windowRatio) {
        return __desiredCanvasWidth() / __ASPECT_RATIO;
    }
    else {
        return windowHeight - __MARGIN_SIZE * 2;
    }
}
var __canvas;
function __centerCanvas() {
    __canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
}
function p6_CreateCanvas() {
    __canvas = createCanvas(__desiredCanvasWidth(), __desiredCanvasHeight());
    __centerCanvas();
}
function p6_ResizeCanvas() {
    resizeCanvas(__desiredCanvasWidth(), __desiredCanvasHeight());
    __centerCanvas();
}
var p6_SaveImageSequence = function (durationInFrames, fileExtension) {
    if (frameCount <= durationInFrames) {
        noLoop();
        var filename_1 = nf(frameCount - 1, ceil(log(durationInFrames) / log(10)));
        var mimeType = (function () {
            switch (fileExtension) {
                case 'png':
                    return 'image/png';
                case 'jpeg':
                case 'jpg':
                    return 'image/jpeg';
            }
        })();
        __canvas.elt.toBlob(function (blob) {
            p5.prototype.downloadFile(blob, filename_1, fileExtension);
            setTimeout(function () { return loop(); }, 100);
        }, mimeType);
    }
};
//# sourceMappingURL=../src/src/build.js.map