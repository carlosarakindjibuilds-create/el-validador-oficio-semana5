let respuestas = { q1: '', q2: '', q3: '' };

function irAPaso2() {
    const nom = document.getElementById('nombreInput').value;
    if(!nom || nom.trim() === '') {
        alert("Por favor ingrese su nombre");
        return;
    }
    document.getElementById('paso1').classList.add('hidden');
    document.getElementById('paso2').classList.remove('hidden');
}

function seleccionar(pregunta, opcion, elem) {
    respuestas[pregunta] = opcion;
    const botones = document.getElementsByClassName(pregunta + '-btn');
    for(let i=0; i<botones.length; i++) {
        botones[i].classList.remove('btn-seleccionado');
    }
    elem.classList.add('btn-seleccionado');
}

function evaluarRespuestas() {
    if(!respuestas.q1 || !respuestas.q2 || !respuestas.q3) {
        alert("Doña Mari, por favor complete las opciones.");
        return;
    }
    const nombre = document.getElementById('nombreInput').value;
    let nivelRiesgo = "BAJO";
    let colorFondoText = "background-color: #d1fae5; color: #065f46; border: 1px solid #a7f3d0;";
    let recomendaciones = ["Calzado cómodo.", "Estiramientos.", "Hidratación."];

    if (respuestas.q1 === 'C' || respuestas.q2 === 'C') {
        nivelRiesgo = "CRÍTICO / ALTO";
        colorFondoText = "background-color: #fee2e2; color: #991b1b; border: 1px solid #fca5a5;";
        recomendaciones = ["Descansos de 5 min.", "Elevar piernas.", "Medias compresión."];
    } else if (respuestas.q1 === 'B' || respuestas.q2 === 'B' || respuestas.q3 === 'B') {
        nivelRiesgo = "MODERADO";
        colorFondoText = "background-color: #fef3c7; color: #92400e; border: 1px solid #fde68a;";
        recomendaciones = ["Alternar peso.", "Usar banco.", "Evitar humo."];
    }

    const jsonOutput = {
        "metadatos_evaluacion": { "evaluado": nombre, "fecha_ISO": new Date().toISOString() },
        "metricas_analizadas": { "score_ergonomia": respuestas.q1 === 'C' ? 95 : 35, "estres_termico": respuestas.q3 === 'B' ? "Alta" : "Baja" },
        "diagnostico_estructurado": { "estatus_semasforo": nivelRiesgo, "consejos": recomendaciones }
    };

    document.getElementById('jsonBlock').innerText = JSON.stringify(jsonOutput, null, 2);
    document.getElementById('lblNombre').innerText = nombre;
    document.getElementById('valErgo').innerText = jsonOutput.metricas_analizadas.score_ergonomia + "/100";
    document.getElementById('valTermica').innerText = jsonOutput.metricas_analizadas.estres_termico;
    
    const lblRiesgo = document.getElementById('lblRiesgo');
    lblRiesgo.innerText = "Riesgo: " + nivelRiesgo;
    lblRiesgo.style.cssText = colorFondoText;

    const lista = document.getElementById('listaRecomendaciones');
    lista.innerHTML = "";
    recomendaciones.forEach(rec => {
        const li = document.createElement('li');
        li.innerText = rec;
        lista.appendChild(li);
    });
    document.getElementById('paso2').classList.add('hidden');
    document.getElementById('paso3').classList.remove('hidden');
}

function reiniciar() {
    respuestas = { q1: '', q2: '', q3: '' };
    document.querySelectorAll('.btn-opcion').forEach(b => b.classList.remove('btn-seleccionado'));
    document.getElementById('paso3').classList.add('hidden');
    document.getElementById('paso1').classList.remove('hidden');
}
