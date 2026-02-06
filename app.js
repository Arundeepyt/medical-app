// -------- DOM ELEMENTS --------
const username = document.getElementById("username");
const password = document.getElementById("password");
const loginBox = document.getElementById("loginBox");
const app = document.getElementById("app");

const nameInput = document.getElementById("name");
const injuryInput = document.getElementById("injury");
const pain = document.getElementById("pain");
const painValue = document.getElementById("painValue");
const motionInput = document.getElementById("motion");
const solutionBox = document.getElementById("solutionBox");
const history = document.getElementById("history");
const progressBar = document.getElementById("progressBar");
const progressChart = document.getElementById("progressChart").getContext("2d");

const historyTab = document.getElementById("historyTab");
const chartTab = document.getElementById("chartTab");

// -------- LOGIN --------
function login() {
    if(username.value === "admin" && password.value === "1234") {
        loginBox.style.display = "none";
        app.style.display = "block";
        updateHistory();
        updateChart();
    } else {
        alert("Wrong login");
    }
}

// -------- PAIN SLIDER --------
pain.oninput = () => painValue.innerText = pain.value;

// -------- SAVE DATA --------
function saveData() {
    const name = nameInput.value.trim();
    const injury = injuryInput.value.trim();
    const painLevel = parseInt(pain.value);
    const motion = parseInt(motionInput.value);

    if(!name || !injury || !motionInput.value) {
        alert("Fill all fields");
        return;
    }

    const solution = getSolution(injury, painLevel);

    const session = {
        name,
        injury,
        pain: painLevel,
        motion,
        solution,
        date: new Date().toLocaleString()
    };

    const data = JSON.parse(localStorage.getItem("physio")) || [];
    data.push(session);
    localStorage.setItem("physio", JSON.stringify(data));

    solutionBox.innerHTML = `<b>What to do:</b><br>${solution}`;
    updateProgress(motion);
    updateHistory();
    updateChart();
    showTab("history");
}

// -------- SOLUTION --------
function getSolution(injury, pain) {
    injury = injury.toLowerCase();
    if(injury.includes("knee")) return "Ice pack, Knee cap, Quad strengthening";
    if(injury.includes("back")) return "Hot pack, Core exercise, Posture care";
    if(injury.includes("shoulder")) return "Pendulum exercise, Ice, Avoid overhead work";
    if(pain > 7) return "High pain: Rest + Ice + Painkiller";
    if(pain > 4) return "Medium pain: Heat + Light exercise";
    return "Low pain: Normal exercise allowed";
}

// -------- HISTORY --------
function updateHistory() {
    history.innerHTML = "";
    const data = JSON.parse(localStorage.getItem("physio")) || [];
    data.forEach(d => {
        history.innerHTML += `
        <div class="card">
            <b>${d.name}</b> (${d.date})<br>
            Injury: ${d.injury}<br>
            Pain: ${d.pain}<br>
            Motion: ${d.motion}%<br>
            Solution: ${d.solution}
        </div>`;
    });
}

// -------- PROGRESS --------
function updateProgress(val) {
    progressBar.style.width = val + "%";
}

// -------- CHART --------
let chart;
function updateChart() {
    const data = JSON.parse(localStorage.getItem("physio")) || [];

    if(chart) chart.destroy();

    chart = new Chart(progressChart, {
        type: "line",
        data: {
            labels: data.map(d => d.date),
            datasets: [{
                label: "Recovery %",
                data: data.map(d => d.motion),
                borderColor: "#00ffff",
                backgroundColor: "rgba(0,255,255,0.2)",
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true }
            },
            scales: {
                y: { beginAtZero: true, max: 100 }
            }
        }
    });
}

// -------- TABS --------
function showTab(tab) {
    historyTab.style.display = "none";
    chartTab.style.display = "none";
    if(tab === "history") historyTab.style.display = "block";
    if(tab === "chart") chartTab.style.display = "block";
}
