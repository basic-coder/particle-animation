
//global variables
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];
let adjustX = 100; // position of text 
let adjustY = 100;

//handle mouse object to store mouse co ordinates
const mouse = {
    x: null,
    y: null,
    raduis: 200 
}

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
})
ctx.fillStyle = 'white';
ctx.font = "4vmin sans-sarif";
ctx.fillText("This is how we communicate with nature",0,30);
const textCoordinates = ctx.getImageData(0,0,600,400); //height and width of canvas

// blueprint to create particles
class Particle {
    constructor(x,y){
        this.x = x ;
        this.y = y;
        this.size = 1;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 15) + 5;
    }
    draw(){
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
    update(){
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse.raduis ; 
        let force = (maxDistance - distance ) / maxDistance; 
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;
        if(distance < mouse.raduis){
            this.x -= directionX;
            this.y -= directionY;
        }else{
            // return speed adjustment
            if(this.x !== this.baseX){
                let dx = this.x - this.baseX;
                this.x -= dx/5;
            }if(this.y !== this.baseY){
                let dy = this.y - this.baseY;
                this.y -= dy/5;
            }
        }
    }
}


//function init to fill particle array
function init(){
    particleArray = [];

    for(let y=0 , y2 = textCoordinates.height; y < y2; y++){
        for(let x = 0, x2 = textCoordinates.width; x< x2 ; x++){
            if(textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 4] > 128){
                let positionX = x + adjustX;
                let positionY = y + adjustY;
                particleArray.push(new Particle(positionX * 2.2 ,positionY *2.2));
            }
        }
    }
    /*for(let i = 0; i < 500; i++){
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        particleArray.push(new Particle(x , y));
    }
    //particleArray = [];
    //particleArray.push(new Particles(50, 50));*/
}
init();

// animation loop
function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i=0; i< particleArray.length ; i++){
        particleArray[i].draw();
        particleArray[i].update();
    }
    requestAnimationFrame(animate);
}
animate();