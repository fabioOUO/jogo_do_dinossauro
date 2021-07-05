const dino = document.querySelector(".dino");
const background = document.querySelector('.container-game');

let jumping = false, walking = false, live = true;

function handleKeyUp(){
    if(event.keyCode === 32 && !jumping){
        jumping = true;
        moveUp(dino, 0, 85, 8);
    }
}

function moveUp(element, position_start, position_end, velocity) {
    let position = position_start;
    let upInterval = setInterval(()=>{
        if(position <= position_end){
            position += velocity;
            element.style.bottom = position+'px';
        }else{
            clearInterval(upInterval);
            moveDown(dino, position, 0, velocity);
        }
    },25);
}

function moveDown(element, position_start, position_end, velocity) {
    let position = position_start;
    let upInterval = setInterval(()=>{
        if(position > position_end){
            position -= velocity;
            element.style.bottom = position+'px';
        }else{
            clearInterval(upInterval);
            jumping = false;
        }
    },25);
}

function moveRight(element, position_start, position_end, velocity) {
    let position = position_start;
    let upInterval = setInterval(()=>{
        if(position <= position_end){
            position += velocity;
            element.style.right = position+'px';
        }else{
            clearInterval(upInterval);
            moveDown(position);
            background.removeChild(element);
        }
    },25);
}

function gameover(){
    console.log("Game Over")
}

createCactus=() => {
        const intervalTime = Math.random()*6000;
        setTimeout(() => {
            if(live){
                const cactus = document.createElement('div');
                cactus.classList.add('cactus');
                
                moveRight(cactus, 0, screen.width, 5);

                background.appendChild(cactus);
                createCactus();
            }else{
                clearInterval(intervalTime);
                gameover();
            }
        }, intervalTime);
}

function start(){
    createCactus();
    document.addEventListener('keyup', handleKeyUp);
}

start();
