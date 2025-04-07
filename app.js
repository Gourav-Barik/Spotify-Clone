let gameSeq=[];
let userSeq=[];

let btns=["yellow", "red", "purple", "green"];

let started=false;
let level=0;
let hs=0;

let h3=document.querySelector("h3");
let h2=document.querySelector("h2");

document.addEventListener("keypress", function() {
    if (started == false) {
        started = true;

        levelUp();
    }
});

function levelUp() {
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;

    let randIdx=Math.floor(Math.random()*4);
    let randColor=btns[randIdx];
    let randBtn=document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    btnFlash(randBtn);
}

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    },250);
}

let allBtns=document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    userColor=btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    },250);
}

function checkAns(idx) {
    if (userSeq[idx] == gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    }
    else {
        body=document.querySelector("body");
        body.style.backgroundColor="red";
        setTimeout(function() {
            body.style.backgroundColor="white";
        },100);
        h2.innerHTML=`Game over! Your score was <b>${level-1}</b>. Press any key to restart`;
        reset();
    }
}

function reset() {
    started=false;
    gameSeq=[];
    userSeq=[];

    if (level-1>=hs){
        hs=level-1;
        h3.innerText=`Highest Score: ${hs}`;
    }
    level=0;
}