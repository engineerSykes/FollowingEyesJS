window.onload = function() {
   ctx = canvas.getContext("2d"),
    width = 1000,
    height = 800,
    mX = 0,
    mY = 0,
    started = false,

    canvas.width = width;
    canvas.height = height;


canvas.addEventListener("mousemove", function (e) {
    mX = e.pageX;
    mY = e.pageY;
});

canvas.addEventListener("mouseenter", function (e) {
    if(!started){
        started = true;
        render();
    }
});

canvas.addEventListener("mouseleave", function (e) {
    started = false;
});

function degToRad(value) {
    return value * (Math.PI/180);
}

var Ball = function (x, y, radius, color) {
    this.x = x || 0;
    this.y = y || 0;
    this.radius = radius || 10;

    // makes our x and y the center of the circle.
    this.x = (this.x-this.radius/2);
    this.y = (this.y-this.radius/2);

    // how far out do we want the point
    this.pointLength = Math.sqrt(this.x^2+ this.y^2) - this.radius/4;
    if (this.pointLength <= 50)
    {
        this.pointLength = Math.sqrt(this.x^2+ this.y^2);
    } else
    {
        this.pointLength = Math.sqrt(this.x^2 + this.y^2);
    }
    this.px = 100;
    this.py = 0;


    this.color = color || "peachpuff";
}

Ball.prototype.update = function (x, y) {
    // get the target x and y
    this.targetX = x;
    this.targetY = y;

    var x = this.x - this.targetX,
        y = this.y - this.targetY,
        radians = Math.atan2(y,x);

    this.px = this.x - this.pointLength * Math.cos(radians);
    this.py = this.y - this.pointLength * Math.sin(radians);

};

Ball.prototype.render = function () {

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "black";

    ctx.moveTo(this.x, this.y);
    ctx.beginPath();
    ctx.arc(this.px, this.py, (this.radius/4), 0, Math.PI * 2,false);
    ctx.fill();

};

function renderHead(x, y,radius) {

    ctx.save();
    ctx.translate(650/2,(800* 0.85)/2);
    ctx.scale(0.65,0.85);

    ctx.beginPath();
    ctx.fillStyle = "hsl(28, 25%, 38%)";
    ctx.arc(200, 40, 180, 0, Math.PI * 2,false);
    ctx.fill();

    ctx.restore();

}

function renderEars(x, y,radius) {

    ctx.save();
    ctx.translate(650/2,(800* 0.85)/2);
    ctx.scale(0.65,0.85);


    ctx.beginPath();
    ctx.fillStyle = "hsl(28, 25%, 38%)";
    ctx.arc(x , y-5, radius, 0, Math.PI * 2,false);
    ctx.fill();


    ctx.beginPath();
    ctx.fillStyle = "hsl(28, 25%, 38%)";
    ctx.arc(x + 380, y-5, radius, 0, Math.PI * 2,false);
    ctx.fill();

    ctx.restore();
}


function renderNose(x, y, radius) {

//   ctx.clearPath();

   ctx.save();
   ctx.translate(500, height/2);

   ctx.beginPath();
   ctx.lineWidth = 4;
   ctx.strokeStyle = "hsl(28, 25%, 25%)";
   ctx.arc(x, y, radius, 0, degToRad(210), false);
   ctx.stroke();

   ctx.beginPath();
   ctx.arc(x + 55, y, radius, degToRad(-50), degToRad(160), false);
   ctx.stroke();

   ctx.restore();

     ctx.save();
     ctx.translate(500,400);
     ctx.scale(1, 0.65);

     ctx.beginPath();
     ctx.lineWidth = 5;
     ctx.strokeStyle = "hsl(25, 25%, 22%)";
     ctx.arc(-42, 0, 20, Math.PI, Math.PI * 2,true);

     ctx.stroke();
     ctx.restore();

}

function render() {
    ctx.clearRect(0, 0, width, height);


    renderHead(100 ,40, 380);
    renderEars(10, 10, 35);
    renderNose(-70, 0, 10);

     ctx.save();
     ctx.translate(500,400);
     ctx.scale(1.15, 0.25);

     ctx.beginPath();
     ctx.fillStyle = "hsl(5, 85%, 8%)";
     ctx.arc(-36, 145, 20, 0, Math.PI * 2,false);

     ctx.restore();
     ctx.fill();


    ball1.update(mX, mY);
    ball1.render();
    ball2.update(mX, mY);
    ball2.render();


    if(started){
        requestAnimationFrame(render);
    }
}


var ball1 = new Ball(width/2 - 59, 350, 30);
var ball2 = new Ball(width/2, 350, 30);


render();

}
