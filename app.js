// LOGIN
function login(){
    if(username.value==="admin" && password.value==="1234"){
        loginBox.style.display="none";
        app.style.display="block";
    }else{
        alert("Wrong credentials");
    }
}

// PAIN SLIDER
pain.oninput=()=>painValue.innerText=pain.value;

// SAVE
function saveData(){
    const exercises=[...document.querySelectorAll("input[type=checkbox]:checked")].map(e=>e.value);

    const solution=getSolution(injury.value,pain.value);

    const session={
        name:name.value,
        injury:injury.value,
        pain:pain.value,
        motion:motion.value,
        exercises,
        solution,
        date:new Date().toLocaleString()
    };

    const data=JSON.parse(localStorage.getItem("physio"))||[];
    data.push(session);
    localStorage.setItem("physio",JSON.stringify(data));

    updateHistory();
    updateProgress(motion.value);
    updateChart();
}

// SOLUTION
function getSolution(injury,pain){
    injury=injury.toLowerCase();

    if(injury.includes("knee")) return "Ice pack, knee cap, quad strengthening";
    if(injury.includes("back")) return "Hot pack, posture correction, stretching";
    if(injury.includes("shoulder")) return "Pendulum exercise, ice, mobility work";

    if(pain>7) return "High pain – rest + ice + painkiller";
    if(pain>4) return "Medium pain – light exercise";
    return "Low pain – normal activity";
}

// HISTORY
function updateHistory(){
    history.innerHTML="";
    const data=JSON.parse(localStorage.getItem("physio"))||[];

    data.forEach(d=>{
        history.innerHTML+=`
        <div class="historyCard">
            <b>${d.name}</b><br>
            Injury: ${d.injury}<br>
            Pain: ${d.pain}<br>
            Motion: ${d.motion}%<br>
            Exercises: ${d.exercises.join(", ") || "None"}<br>
            <b>Solution:</b> ${d.solution}
        </div>`;
    });
}

// PROGRESS BAR
function updateProgress(val){
    progressBar.style.width=val+"%";
}

// CHART
let chart;
function updateChart(){
    const data=JSON.parse(localStorage.getItem("physio"))||[];
    const ctx=progressChart;

    if(chart) chart.destroy();

    chart=new Chart(ctx,{
        type:"line",
        data:{
            labels:data.map(d=>d.date),
            datasets:[{
                label:"Recovery %",
                data:data.map(d=>d.motion),
                borderColor:"#00ffff",
                tension:.4
            }]
        }
    });
}

// TABS
function showTab(tab){
    history.style.display="none";
    progressChart.style.display="none";

    if(tab==="history") history.style.display="block";
    else progressChart.style.display="block";
}

updateHistory();