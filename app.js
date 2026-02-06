const history=document.getElementById("history");
const guide=document.getElementById("guide");
const progressBar=document.getElementById("progressBar");
const progressChart=document.getElementById("progressChart");

let sessions=[];
let chart=null;

function showTab(tab){
    history.style.display="none";
    guide.style.display="none";
    progressChart.style.display="none";

    if(tab==="history") history.style.display="block";
    if(tab==="guide") guide.style.display="block";
    if(tab==="progress") progressChart.style.display="block";
}

function getSolution(injury,pain){
    if(injury==="knee"){
        return pain==3
        ? ["Rest completely","Avoid squats","Use ice"]
        : ["Light walking","Stretch quads","Avoid jumping"];
    }
    if(injury==="back"){
        return pain==3
        ? ["No bending","Use heat","Sleep flat"]
        : ["Core exercises","Avoid lifting","Stretch gently"];
    }
    return ["Rest shoulder","Avoid overhead work","Light rotations"];
}

function saveData(){
    const name=document.getElementById("name").value;
    const injury=document.getElementById("injury").value;
    const pain=document.getElementById("pain").value;

    const solution=getSolution(injury,pain);

    const session={
        name,
        injury,
        pain,
        solution,
        date:new Date().toLocaleString()
    };

    sessions.push(session);

    updateHistory();
    updateGuide(solution);
    updateProgress();
    drawChart();

    showTab("history");
}

function updateHistory(){
    history.innerHTML="";
    sessions.forEach(s=>{
        history.innerHTML+=`
        <div>
            <b>${s.date}</b><br>
            ${s.injury} pain (${s.pain})
        </div><hr>`;
    });
}

function updateGuide(list){
    guide.innerHTML="<b>✔ What to do / ❌ What not to do</b><ul>";
    list.forEach(i=>{
        guide.innerHTML+=`<li>${i}</li>`;
    });
    guide.innerHTML+="</ul>";
}

function updateProgress(){
    progressBar.style.width=Math.min(sessions.length*20,100)+"%";
}

function drawChart(){
    if(chart) chart.destroy();

    chart=new Chart(progressChart,{
        type:"line",
        data:{
            labels:sessions.map((_,i)=>i+1),
            datasets:[{
                label:"Pain Level",
                data:sessions.map(s=>s.pain),
                borderWidth:2
            }]
        },
        options:{
            responsive:true,
            scales:{y:{min:0,max:3}}
        }
    });
}