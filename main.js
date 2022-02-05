function setup()
{
    canvas=createCanvas(300,300);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}

function preload()
{
    classifier = ml5.imageClassifier('DoodleNet');
}

function draw()
{
    strokeWeight(10);
    stroke("#000000");
    if (mouseIsPressed)
    {
        line(pmouseX,pmouseY,mouseX,mouseY);
    }
}

function classifyCanvas()
{
    classifier.classify(canvas,gotResult);
}

function gotResult(error,results)
{
    if (error)
    {
        console.error(error);
    }

    else 
    {
        document.getElementById("label").innerHTML = "It can be " + results[0].label;
        document.getElementById("confidence").innerHTML = "We are almost " + Math.round(results[0].confidence * 100) + "% confident";
        utterThis = new SpeechSynthesisUtterance(results[0].label);
        synth.speak(utterThis);
    }
}

function clear_canvas()
{
    background("white");
}