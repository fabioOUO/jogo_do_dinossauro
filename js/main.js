const dino = document.querySelector(".dino");
const background = document.querySelector('.container-game');
const dinoY = Math.floor(dino.getBoundingClientRect()["bottom"]);

let jumping = false, walking = false, live = true, ponts = 0;

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
    },20);
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
    },20);
}

function moveRight(element, position_start, position_end, velocity) {
    let position = position_start;
    let rightInterval = setInterval(()=>{
        if(position <= position_end){
            position += velocity;
            element.style.right = position + 'px';
        }else{
            clearInterval(rightInterval);
            background.removeChild(element);
            ponts += 10;
            document.querySelector("#ponts").innerHTML = ponts+" px";
        }
        live = checkLive();
        if(!live){
            clearInterval(rightInterval);
        }
    },10);
}

function checkLive(){
    if(!live)return false;
   
    const cactu = document.querySelector(".cactus");
    const dinoNewY = Math.floor(dino.getBoundingClientRect()["bottom"]);
    
    if(cactu != null){
        const cactuX = Math.floor(cactu.getBoundingClientRect()["left"]);
        if(cactuX < 30 && cactuX > 0 && (dinoY - dinoNewY < 30)){
            document.querySelector(".game-over").classList.add("show");
            return false;
        }
    }
    return true;
}

createCactus = () => {
        const intervalTime = Math.random()*6000;
        setTimeout(() => {
            if(live){
                const cactus = document.createElement('div');
                cactus.classList.add('cactus');
                
                moveRight(cactus, 0, screen.width, 3 );

                background.appendChild(cactus);
                createCactus();
            }else{
                clearInterval(intervalTime);
            }
        }, intervalTime);
}

function start(){
    jumping = false, walking = false, live = true;
    createCactus();
    document.addEventListener('keyup', handleKeyUp);
    document.querySelector(".game-over").classList.remove("show");
    document.querySelector(".game-over").classList.add("hide");
}

function restart(){
    location. reload();
}

start();
