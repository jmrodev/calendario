

function generarCalendario() {
    const calendario = [];
    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth(); // Mes actual (0-11)
    const añoActual = fechaActual.getFullYear(); // Año actual
    const diasEnMes = new Date(añoActual, mesActual + 1, 0).getDate(); // Días en el mes actual
    let primerDia = new Date(añoActual, mesActual, 1).getDay(); // Día de la semana del primer día del mes
    let semana = new Array(7).fill(null);
    let diaActual = 1;

    // Llenar la matriz con días del mes actual
    for (let i = 0; i < primerDia; i++) {
        semana[i] = null; // Días del mes anterior
    }

    while (diaActual <= diasEnMes) {
        semana[primerDia] = diaActual;
        primerDia++;
        if (primerDia === 7) {
            calendario.push(semana);
            semana = new Array(7).fill(null);
            primerDia = 0;
        }
        diaActual++;
    }

    // Agregar la última semana si no está llena
    if (semana.some(dia => dia !== null)) {
        calendario.push(semana);
    }

    // Renderizar el calendario en HTML
    const contenedorCalendario = document.getElementById('calendario');
    const contenedorSemana = document.getElementById('semana'); // Div para mostrar la semana
    const contenedorDia = document.getElementById('dia'); // Div para mostrar el contenido del día
    
    let html = `
        <table id="calendar">
            <thead>
                <tr>
                    <th>Lun</th>
                    <th>Mar</th>
                    <th>Mie</th>
                    <th>Jue</th>
                    <th>Vie</th>
                    <th>Sab</th>
                    <th>Dom</th>
                </tr>
            </thead>
            <tbody>
    `;

    calendario.forEach((semana, index) => {
        html += '<tr>';
        semana.forEach((dia, diaIndex) => {
            html += `<td onclick="mostrarContenido(${index}, ${dia}, ${diaIndex})">${dia !== null ? dia : ''}</td>`;
        });
        html += '</tr>';
    });

    html += `
            </tbody>
        </table>
    `;

    contenedorCalendario.innerHTML = html;
}



// Función para mostrar la semana y el contenido del día como cards
function mostrarContenido(semanaIndex, dia, diaIndex) {
    const contenedorSemana = document.getElementById('semana');
    const contenedorDia = document.getElementById('dia');
// Ejemplo de datos para cada día

    // Mostrar la semana como card
    contenedorSemana.innerHTML = `
        <div class="card">
            <h3>Semana: ${semanaIndex + 1}</h3>
        </div>
    `;

    // Mostrar el contenido del día como card
    if (dia !== null) {
        const contenidoDia = datosDelCalendario[diaIndex]; // Obtener el contenido del día desde el objeto JSON
        if (contenidoDia) {
            contenedorDia.innerHTML = `
                <div class="card">
                    <p><strong>Paciente:</strong> ${contenidoDia.paciente}</p>
                    <p><strong>Receta:</strong> ${contenidoDia.receta}</p>
                    <p><strong>Pago:</strong> ${contenidoDia.pago}</p>
                    <p><strong>Asistió:</strong> ${contenidoDia.asistio ? 'Sí' : 'No'}</p>
                    <p><strong>Reservado:</strong> ${contenidoDia.reservado ? 'Sí' : 'No'}</p>
                </div>
            `;
        } else {
            contenedorDia.innerHTML = `
                <div class="card">
                    <h3>Contenido del día ${dia}</h3>
                    <p>No hay información disponible. <strong>Tomar turno.</strong></p>
                </div>
            `;
        }
    } else {
        contenedorDia.innerHTML = `
            <div class="card">
                <h3>No hay contenido para este día</h3>
            </div>
        `;
    }
}

// Asegurarse de que el DOM esté completamente cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', (event) => {
    generarCalendario();
});