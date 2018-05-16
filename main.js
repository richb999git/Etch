/* eslint-env browser */           /* this stops the document error*/
/* eslint-disable no-console */    /* this stops the console error*/

//(Optional): Instead of just changing the color of your grid from black to white (for example) have each pass through it with the mouse change to a completely random RGB value. Then try having each pass just add another 10% of black to it so that only after 10 passes is the square completely black.

var sideSize = 16;
var area = sideSize * sideSize;
var colour = false;
var deleteCell = false;
newGrid();
draw();
document.getElementById("btn1").addEventListener('click', restart, false);
document.getElementById("btn2").addEventListener('click', toggleColourGrid, false);
document.getElementById("btn3").addEventListener('click', blankSqaure, false);

function restart() {
    sideSize = prompt("Enter how many sqaures per side");
    removeListeners();
    clearGrid();
    document.documentElement.style.setProperty("--colNum", sideSize);
    var squareSize = 480/sideSize;
    document.documentElement.style.setProperty("--squareSize", squareSize + "Px");
    area = sideSize * sideSize;
    newGrid();
    draw();
}

function clearGrid() {
    for (var i = 1; i < area + 1; i++) { 
        var boxId ="b" + i;
        var removeEl = document.getElementById(boxId);
        var containerEl = removeEl.parentNode;
        containerEl.removeChild(removeEl);
    }
}
                                           

function newGrid() {
    for (var i = 1; i < area + 1; i++) {
        var msg = '<div class="grid-item" id="b' + i + '"></div>';
        // Insert the HTML into the DOM at the end each time
        document.getElementById("grid-container").insertAdjacentHTML('beforeend', msg);
    }
}

function toggleColourGrid() {
    if (!colour) {    
        document.getElementById("btn2").textContent = "Black"; 
    } else {
        document.getElementById("btn2").textContent = "Colour"; 
    }
    colour = !colour;
    deleteCell = false;
}

function blankSqaure() {
    deleteCell = true;
}

function draw() {
    for (var i = 1; i < area + 1; i++) {
        var boxId ="b" + i;
        var el = document.getElementById(boxId);
        el.addEventListener('mouseover', function(e) {
            if (deleteCell) {
                e.target.style.background = 'white';
                e.target.style.border = 'white';
            } else {
                deleteCell = false;
                if (colour) {
                    var r = Math.floor(Math.random()*255);
                    var g = Math.floor(Math.random()*255);
                    var b = Math.floor(Math.random()*255);
                    var rgb = "rgb(" + r + "," + g + "," + b + ")";
                    e.target.style.background = rgb;
                    e.target.style.border = rgb;
                } else {
                    e.target.style.background = 'black';
                    //e.target.className = "grid-item filled"; // these appear to be the same thing if e passed in function
                    //this.className = "grid-item filled";  // these appear to be the same thing
                }
            }
                
        }, false); 
    }
}

function removeListeners() {
    for (var i = 1; i < area + 1; i++) {
        var boxId ="b" + i;
        var el = document.getElementById(boxId);
        el.removeEventListener('mouseover', function() {
            //remove
        }, false);
    }
}
    

