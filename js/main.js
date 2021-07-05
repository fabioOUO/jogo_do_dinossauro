const dino = document.querySelector(".dino");
let jumping = false;

function handleKeyUp(){
    if(event.keyCode === 32 && !jumping){
        jumping = true;
        moveUp();
    }
}

function moveUp() {
    let position = 0;
    let upInterval = setInterval(()=>{
        if(position <= 100){
            position += 10;
            dino.style.bottom = position+'px';
        }else{
            clearInterval(upInterval);
            moveDown(position);
        }
    },25);
}

function moveDown(start_position) {
    let position = start_position;
    let upInterval = setInterval(()=>{
        if(position > 0){
            position -= 10;
            dino.style.bottom = position+'px';
        }else{
            clearInterval(upInterval);
            jumping = false;
        }
    },25);
}

document.addEventListener('keyup', handleKeyUp)

console.log(dino);