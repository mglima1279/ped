const calcButton = document.getElementById("calc-button");
const finalButton = document.getElementById("fin-button");
const dist = 120, val = 20;
var hasIntersect = false;

var processStart = "", processEnd = "", minSpeed = 9999, maxSpeed = 0, avgSpeed = 0, sum = 0, totalVal = 0, counter = 0;

calcButton.addEventListener("click", () => {
    if(hasIntersect) return;
    counter++;
    
    const screen = document.getElementById("calc-section");
    
    const 
    placaInput = document.getElementById("placa"),
    hInicial = document.getElementById("hInicial"),
    hFinal = document.getElementById("hFinal"),
    placaDisplay = document.getElementById('placa-dispay'),
    startTime = document.getElementById('start-time'),
    endTime = document.getElementById('end-time'),
    runTime = document.getElementById('run-time'),
    medSpeed = document.getElementById('med-speed'),
    priceDisplay = document.getElementById('price-display')
    ;

    if(counter == 1) processStart = hInicial.value;
    processEnd = hFinal.value;
    
    // verificando se a placa está preenchida
    if (!placaInput.value || !hInicial.value || !hFinal.value) {
        return;
    }
    
    
    placaDisplay.innerHTML = placaInput.value;
    startTime.innerHTML = hInicial.value;
    endTime.innerHTML = hFinal.value;
    runTime.innerHTML = calcTime(hInicial.value, hFinal.value);
    medSpeed.innerHTML = calcSpeed(dist, runTime.innerHTML);

    let medspeed = parseFloat(calcSpeed(dist, runTime.innerHTML).toString().replace("km/h", ""));

    sum+=medspeed;
    avgSpeed = sum/counter;
    
    if (medspeed<=60){
        priceDisplay.innerHTML = "R$17.00"; 
        totalVal+=17;
    } else if(medspeed<=100){
        priceDisplay.innerHTML = "R$18.00"; 
        totalVal+=18;
    } else{
        priceDisplay.innerHTML = "R$20.00"; 
        totalVal+=20;
    }
    
    screen.style.display = "block";
    hasIntersect = true;
    setTimeout(()=>{
        screen.style.display = "none";
        hasIntersect = false;
    }, 5000)
})

finalButton.addEventListener("click", () => {
    if(hasIntersect) return;
    if(counter == 0) return;

    document.getElementById('min-speed').innerHTML = minSpeed.toFixed(1)+"km/h";
    document.getElementById('max-speed').innerHTML = maxSpeed.toFixed(1)+"km/h";
    document.getElementById('avg-speed').innerHTML = avgSpeed+"km/h";
    document.getElementById('total-values').innerHTML = "R$"+totalVal;
    document.getElementById('process-start').innerHTML = processStart;
    document.getElementById('process-end').innerHTML = processEnd;

    const displayScreen = document.getElementById('resultScreen');

    displayScreen.style.display = "block";
    hasIntersect = true;
});

function calcTime(horaInicial, horaFinal) {
    const [horaInicialH, horaInicialM] = horaInicial.split(':').map(Number);
    const [horaFinalH, horaFinalM] = horaFinal.split(':').map(Number);
    
    const minutosIniciais = horaInicialH * 60 + horaInicialM;
    const minutosFinais = horaFinalH * 60 + horaFinalM;
    
    let diferenca = minutosFinais - minutosIniciais;
    if (diferenca < 0) {
        diferenca += 24 * 60;
    }
    
    const horas = String(Math.floor(diferenca / 60)).padStart(2, '0');
    const minutos = String(diferenca % 60).padStart(2, '0');
    
    return `${horas}:${minutos}`;
}

function calcSpeed(distancia, tempo) {
    const h = Number(tempo.substring(0, 2));
    const m = Number(tempo.substring(3, 5));
    
    const totalHoras = h + m / 60;
    const velocidadeMedia = totalHoras > 0 ? distancia / totalHoras : 0;

    if(velocidadeMedia > maxSpeed) maxSpeed = velocidadeMedia;

    if(velocidadeMedia < minSpeed) minSpeed = velocidadeMedia;

    return Math.floor(velocidadeMedia) + ' km/h';
}

// <h3>Menor velocidade<span id="min-speed">0km/h</span></h3>
// <h3>Maior velocidade<span id="max-speed">0km/h</span></h3>
// <h3>Média das velocidades<span id="avg-speed">0km/h</span></h3>
// <h3>Total dos valores<span id="total-values">R$00,00</span></h3>
// <h3>Hora inicial<span id="process-start">00:00</span></h3>
// <h3>Hora final<span id="process-end">00:00</span></h3>
