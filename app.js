let progress = 0;
let history = [];

function login(){
    const u = document.getElementById("username").value.trim();
    const p = document.getElementById("password").value.trim();

    if(!u || !p){
        alert("Enter username & password");
        return;
    }

    document.getElementById("loginScreen").style.display = "none";
    document.getElementById("appScreen").style.display = "block";

    // OWNER CHECK
    if(u.toLowerCase() === "arundeep"){
        welcome("Sir 👑");
    }else{
        welcome(u);
    }

    addHistory("Logged in");
}

function welcome(name){
    document.getElementById("welcomeBox").innerHTML =
        `Welcome ${name}`;
}

function addProgress(){
    if(progress < 100){
        progress += 10;
        document.getElementById("progressBar").style.width = progress + "%";
        addHistory("Progress increased to " + progress + "%");
    }
}

function addHistory(text){
    history.push(text);
    updateHistory();
}

function updateHistory(){
    const h = document.getElementById("history");
    h.innerHTML = "<h3>History</h3>";
    history.forEach(item=>{
        h.innerHTML += "• " + item + "<br>";
    });
}

function showTab(tab){
    document.getElementById("history").style.display =
        tab === "history" ? "block" : "none";
    document.getElementById("rules").style.display =
        tab === "rules" ? "block" : "none";
}