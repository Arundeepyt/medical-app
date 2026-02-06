let chart;

function login(){
    const u=document.getElementById("username").value;
    const p=document.getElementById("password").value;

    if(u==="admin" && p==="1234"){
        document.getElementById("loginScreen").style.display="none";
        document.getElementById("appScreen").style.display="block";
        updateHistory();
    }else{
        alert("Wrong login");
    }
}

function saveData(){
    const name=nameInput();
    const injury=injuryInput();
    const pain=painInput();
    const motion=motionInput();

    const solution=getGuide(injury,pain);

    const session={name,injury,pain,motion,solution,date:new Date().toLocaleString()};

    const data=JSON.parse(localStorage.getItem("physio")||"[]");
    data.push(session);
    localStorage.setItem("physio",JSON.stringify(data));

    document.getElementById("progressBar").style.width=motion+"%";
    updateHistory();
    updateChart();
    showTab("guide");
}

function updateHistory(){
    const history=document.getElementById("history");
    const data=JSON.parse(localStorage.getItem("physio")||"[]");
    history.innerHTML=data.map(d=>`
        <b>${d.name}</b> (${d.date})<br>
        Injury: ${d.injury}<br>
        Pain: ${d.pain}<br>
        Recovery: ${d.motion}%<hr>
    `).join("");
}

function updateChart(){
    const data=JSON.parse(localStorage.getItem("physio")||"[]");
    const ctx=document.getElementById("progressChart");
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

function showTab(tab){
    ["history","guide","progressChart"].forEach(id=>{
        document.getElementById(id).style.display="none";
    });
    document.getElementById(tab==="progress"?"progressChart":tab).style.display="block";
}

function getGuide(injury,pain){
    let text="✔ What to do:<br>";
    if(injury==="knee") text+="• Light walking<br>• Quad stretch<br>❌ Avoid jumping";
    if(injury==="back") text+="• Hot pack<br>• Posture care<br>❌ Avoid bending";
    if(injury==="shoulder") text+="• Pendulum exercise<br>❌ Avoid overhead lifting";
    document.getElementById("guide").innerHTML=text;
    return text;
}

/* helpers */
const nameInput=()=>document.getElementById("name").value;
const injuryInput=()=>document.getElementById("injury").value;
const painInput=()=>document.getElementById("pain").value;
const motionInput=()=>document.getElementById("motion").value;