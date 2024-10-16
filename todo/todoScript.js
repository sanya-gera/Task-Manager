const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("tasks");

function addTask(){
    if(inputBox.value == ""){
        alert("You must write something");
    }else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        if(e.target.classList.contains("checked")){
            listContainer.appendChild(e.target);
        }
        saveData();
    }else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function displayData(){
    listContainer.innerHTML = localStorage.getItem("data");
}

displayData();

//////////////////////////
const startEl = document.getElementById('start');
const stopEl = document.getElementById('stop');
const resetEl = document.getElementById('reset');
const timerEl = document.getElementById('timer');

let interval;
let timeLeft = 1500;

function updateTimer(){
    let minutes = Math.floor(timeLeft/60);
    let seconds = timeLeft%60;
    let formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    timerEl.innerHTML = formattedTime;
}

function startTimer(){
    interval = setInterval(()=>{
        timeLeft--;
        updateTimer();
        if(timeLeft===0){
            clearInterval(interval);
            alert("time's up");
            timeLeft = 1500;
            updateTimer();
        }
    }, 1000);//1000 milliseconds = 1 second
}

function stopTimer(){
    clearInterval(interval);
}
function resetTimer(){
    clearInterval(interval);
    timeLeft=1500;
    updateTimer();
}

startEl.addEventListener("click", startTimer);
startEl.addEventListener("click", stopTimer);
startEl.addEventListener("click", resetTimer);
