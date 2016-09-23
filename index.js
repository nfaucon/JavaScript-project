
// Helper function to access the HTML widget
var $ = function (id) { return document.getElementById(id); }

var nrImg = 7;          //the number of img 
var IntSeconds = 4;     //the seconds between the imgs

// This is the function called at regular interval to go to the 
// next picture
var Timer = function ()
{
    nrShown++;              // select the next picture
    if (nrShown == nrImg)
        nrShown = 0;
    Effect();               // display it
}

// pressing the right arrow displays the next image
var next = function ()
{
    nrShown++;              // select the next picture
    if (nrShown == nrImg)   // if reaching the last image
        nrShown = 0;        // go back to the first one
    Effect();               // display it

    clearInterval(mytime);  // reset the delay so that we don't change picture too fast
    mytime = setInterval(Timer, IntSeconds * 1000);
}

// pressing the left arrow displays the previous image
var prev = function ()
{
    nrShown--;              // select the previous picture
    if (nrShown == -1)      // if we have a negative index
        nrShown = nrImg -1; // go to the last image
    Effect();               // display it

    clearInterval(mytime);  // reset the delay so that we don't change picture too fast
    mytime = setInterval(Timer, IntSeconds * 1000);
}

// We update here the page with the next image with a smooth transition
var Effect = function ()
{
    for (var i = 0; i < nrImg; i++)
    {
        Vect[i].style.opacity = "0";   //to add the fade effect
        Vect[i].style.visibility = "hidden";

        document.getElementById("S" + i).style.backgroundColor = "rgba(0, 0, 0, 0.70)";
        document.getElementById("SP" + i).style.visibility = "hidden";
    }
    Vect[nrShown].style.opacity = "1";
    Vect[nrShown].style.visibility = "visible";
    document.getElementById("S" + nrShown).style.backgroundColor = "rgba(255, 255, 255, 0.90)";
    document.getElementById("SP" + nrShown).style.visibility = "visible";
}

// Called when the page is loaded 
// to initialize everything
window.onload = function ()
{
    $("arrowLeft").onclick = prev;
    $("arrowRight").onclick = next;
    nrShown = 0;    //the img visible
    Vect = new Array(nrImg + 10);
    Vect[0] = document.getElementById("Img1");
    Vect[0].style.visibility = "visible";

    document.getElementById("S" + 0).style.visibility = "visible";

    for (var i = 1; i < nrImg; i++)
    {
        Vect[i] = document.getElementById("Img" + (i + 1));
        document.getElementById("S" + i).style.visibility = "visible";
    }

    document.getElementById("S" + 0).style.backgroundColor = "rgba(255, 255, 255, 0.90)";
    document.getElementById("SP" + nrShown).style.visibility = "visible";

    mytime = setInterval(Timer, IntSeconds * 1000);
}
