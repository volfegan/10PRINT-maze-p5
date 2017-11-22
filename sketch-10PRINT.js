
var CHR$1 = String.fromCharCode(9585),
    CHR$2 = String.fromCharCode(9586),
    mazeType="diagonal";
//show correct 10PRINT code name and characteres used
function nameCode(mazeType) {
    var tenPRINTname = document.getElementById("10PRINTname");
    if (mazeType=="diagonal") {
        CHR$1 = String.fromCharCode(9585);
        CHR$2 = String.fromCharCode(9586);
        tenPRINTname.innerHTML = "10 PRINT CHR$(205.5+RND(1)); : GOTO 10"
    }
    if (mazeType=="complex") {
        CHR$1 = String.fromCharCode(9585);
        CHR$2 = String.fromCharCode(9586) + " &nbsp; &amp; &nbsp; " + String.fromCharCode(9587);
        tenPRINTname.innerHTML = "10 PRINT CHR$(204+(INT(RND(1)+.5))*( 9-(INT(RND(1)+.5))*8)); : GOTO 10"
    }
    if (mazeType=="horizontal") {
        CHR$1 = String.fromCharCode(9620);
        CHR$2 = String.fromCharCode(9621);
        tenPRINTname.innerHTML = "10 PRINT CHR$(181+(INT(RND(1)+.5)*3)); : GOTO 10"
    }
    if (mazeType=="chrochet") {
        CHR$1 = String.fromCharCode(9625);
        CHR$2 = String.fromCharCode(9626);
        tenPRINTname.innerHTML = "10 PRINT CHR$(191+(INT(RND(1)+.5)*13) ); : GOTO 10"
    }
    mazeType = mazeType;
    slashPercentage();
}

//show what percentage value on the range input for each maze constructor element
function slashPercentage() {
        var slashInput = Number(document.getElementById("slash-input").value),
            slashesValues = document.getElementById("slashes-percentages");
    //if characters = / \ X
    if (CHR$2 == String.fromCharCode(9586) + " &nbsp; &amp; &nbsp; " + String.fromCharCode(9587) ) {
        slashesValues.innerHTML = Math.round( (0.25 - (slashInput / 2) ) * 100 ) + "%: " + String.fromCharCode(9586) + " &nbsp; &amp; &nbsp; 50%: " + String.fromCharCode(9585) + " &nbsp; &amp; &nbsp; " + Math.round( (0.25 + (slashInput / 2) ) * 100 ) + "%: " + String.fromCharCode(9587);
    //all other characters
    } else {
        slashesValues.innerHTML = "" + Math.round( (0.5 - slashInput) * 100 ) + "%: " + CHR$1 + " &nbsp; &amp; &nbsp; " + Math.round( (0.5 + slashInput) * 100) + "%: " + CHR$2 + " &nbsp; &nbsp; ";
    }
}
    
maze10PRINT = function(p) {
    p.CHR$index = 0;
    p.CHR$list = [];
    p.symbolSize = 16;
    
    function symbolCHAR1(x, y, charType) {
        this.x = x;
        this.y = y;
        
        this.display = function() {
            p.stroke(255);
            p.fill(255);
            if (charType == "diagonal" || charType == "complex") {
                p.line(this.x, this.y, this.x + p.symbolSize, this.y + p.symbolSize);
                
            } else if (charType == "horizontal") {
                p.text(String.fromCharCode(9620), this.x, this.y);
                
            } else {
                p.text(String.fromCharCode(9625), this.x, this.y);
                
            }
        }
    }
    function symbolCHAR2(x, y, charType) {
        this.x = x;
        this.y = y;
        
        this.display = function() {
            p.stroke(255);
            if (charType == "diagonal" || charType == "complex") {
                p.line(this.x, this.y + p.symbolSize, this.x + p.symbolSize, this.y);
                
            } else if (charType == "horizontal") {
                p.text(String.fromCharCode(9621), this.x, this.y);
                
            } else {
                p.text(String.fromCharCode(9626), this.x, this.y);
            }
        }
    }
    function symbolCHAR3(x, y, charType) {
        this.x = x;
        this.y = y;
        
        this.display = function() {
            p.stroke(255);
            p.noFill();
            if (charType == "complex") {
                p.line(this.x, this.y + p.symbolSize, this.x + p.symbolSize, this.y);
                p.line(this.x, this.y, this.x + p.symbolSize, this.y + p.symbolSize);
            }
        }
    }
    
    p.setup = function() {
        p.createCanvas( p.windowWidth, p.windowHeight - 47);
        p.background(0);
        p.textSize(p.symbolSize);
        p.x = 0;
        p.y = 0;
        p.textFont('Consolas');
    }

    p.draw = function() {
        var slashInput = Number(document.getElementById("slash-input").value),
            mazeValue = document.getElementsByTagName("input"),
            mazeType;
        //get the range percentage values for each maze character
        for (let inputs in mazeValue) {
            if (mazeValue[inputs].name == "maze") {
                if (mazeValue[inputs].checked) {
                    mazeType = mazeValue[inputs].value;
                }
            }
        }
        
        p.background(0);
                
        if (mazeType=="diagonal") {
            //diagonal maze:  10 PRINT CHR$(205.5+RND(1)); : GOTO 10

            if (p.random() + slashInput < 0.5) {
                p.CHR$list[p.CHR$index] = new symbolCHAR1(p.x, p.y, "diagonal");
            } else {
                p.CHR$list[p.CHR$index] = new symbolCHAR2(p.x, p.y, "diagonal");
            }
        }
        if (mazeType=="complex") {
            //Complex maze with / \ X:  10 PRINT CHR$(204+(RND(1)+.5)*3); : GOTO 10
            p.numberProb = p.random(2) + slashInput;
            if (p.numberProb <= 0.5) {
                p.CHR$list[p.CHR$index] = new symbolCHAR1(p.x, p.y, "complex");
            } else if (p.numberProb > 0.5 && p.numberProb <= 1.5) {
                p.CHR$list[p.CHR$index] = new symbolCHAR2(p.x, p.y, "complex");

            } else {
                p.CHR$list[p.CHR$index] = new symbolCHAR3(p.x, p.y, "complex");
            }
        }
        if (mazeType=="horizontal") {
            //horizontal maze:  10 PRINT CHR$(181+(INT(RND(1)+.5)*3)); : GOTO 10
            if (p.random() + slashInput < 0.5) {
                p.CHR$list[p.CHR$index] = new symbolCHAR1(p.x, p.y, "horizontal");
            } else {
                p.CHR$list[p.CHR$index] = new symbolCHAR2(p.x, p.y, "horizontal");
            }
        }
        if (mazeType=="chrochet") {
            //Crochet:  10 PRINT CHR$(191+(INT(RND(1)+.5)*13) ); : GOTO 10
            if (p.random() + slashInput < 0.5) {
                p.CHR$list[p.CHR$index] = new symbolCHAR1(p.x, p.y, "chrochet");
            } else {
                p.CHR$list[p.CHR$index] = new symbolCHAR2(p.x, p.y, "chrochet");
            }
        }
        
        for (let i = 0; i < p.CHR$list.length; i++) {
            try {
                p.CHR$list[i].display();
            } catch(e) {
                console.log("index: ", i, " p.CHR$list.length: ", p.CHR$list.length, e.message);
            }
        }
        
        p.x += p.symbolSize;
        p.CHR$index += 1;
        //go to next line
        if (p.x > p.width) {
            p.x = 0;
            p.y += p.symbolSize;
        }
        //after finish writing entire canvas, return to top and delete old entries
        if (p.y > p.height) {
            p.y = 0;
            p.CHR$index = 0;
        }
    }
    
    p.windowResized = function() {
        p.CHR$list = [];
        p.CHR$index = 0;
        p.resizeCanvas(p.windowWidth, p.windowHeight - 47);
    }
}


new p5(maze10PRINT, "10PRINT");