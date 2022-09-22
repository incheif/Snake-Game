let snakeVelocity = {x:0,y:0};
const foodsound = new Audio('../music/food.mp3');
const gameoversound = new Audio('../music/gameover.mp3');
const movesound = new Audio('../music/move.mp3');
const musicsound = new Audio('../music/music.mp3');
let speed=5;
let lastpainttime=0;
let snakearr=[
    {x: 13 ,y: 15 }
]
food = {x: 8,y: 7};
let score=0;

//game functions
function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime-lastpainttime)/1000 < 1/speed){
        return;
    }
    lastpainttime=ctime;
    gameEngine();
}
function collide(sarr){
    //if you bump into yourself
    for (let i = 1; i < snakearr.length; i++) {
        if(snakearr[0].x === snakearr[i].x && snakearr[0].y === snakearr[i].y){
            speed=5;
            return true;
        }

    }
    //if you bump into wall
    if(snakearr[0].x>=18 || snakearr[0].x<=0 || snakearr[0].y<=0 || snakearr[0].y>=18){
        speed=5;
        return true;
    }

    return false;
}
function gameEngine(){
    //Part 1: Updating the snake array & Food
    if(collide(snakearr)){
        gameoversound.play();
        musicsound.pause();
        snakeVelocity={x:0,y:0};
        alert("Game over. press any key to play again!");
        score=0;
        snakearr=[{x:13,y:15}];
        musicsound.play();
    }

    //If you have eaten the food, increment the score and regenerate the food

    if(snakearr[0].x == food.x && snakearr[0].y==food.y){
        snakearr.unshift({x:snakearr[0].x + snakeVelocity.x,y:snakearr[0].y + snakeVelocity.y});
        score+=1;
        speed+=0.5;
        scoreBox.innerHTML="Score : "+score;
        let a=2;
        let b=16;
        foodsound.play();
        food = {x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())};
    }

    //Moving the snake
    for (let i = snakearr.length - 2; i>=0; i--) {
        snakearr[i+1]={...snakearr[i]};

    }

    snakearr[0].x+=snakeVelocity.x;
    snakearr[0].y+=snakeVelocity.y;


    //Part 2: Display the snake and Food

    //Display Snake

    board.innerHTML="";
    snakearr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index==0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);

    });

    //Display Food

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}














//main logic
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{

    //Start the Game

    snakeVelocity={x: 0,y: 0}
    musicsound.play();
    movesound.play();
    switch(e.key){

        case "ArrowUp":
            console.log("ArrowUp");
            snakeVelocity.x= 0;
            snakeVelocity.y= -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            snakeVelocity.x= 0;
            snakeVelocity.y= 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            snakeVelocity.x= -1;
            snakeVelocity.y= 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            snakeVelocity.x= 1;
            snakeVelocity.y= 0;
            break;

        default:
            break;

    }

})
