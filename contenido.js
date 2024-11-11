function mostrarContenido(semanaIndex, dia, diaIndex) {
    const contenedorSemana = document.getElementById('semana');
    const contenedorDia = document.getElementById('dia');

    contenedorSemana.innerHTML =
        crearCard(`Semana: 
        ${semanaIndex + 1}`,
            '');

    if (dia !== null) {
        const contenidoDia = datosDelCalendario[diaIndex]; // Obtener el contenido del día desde el objeto JSON
        if (contenidoDia) {
            contenedorDia.innerHTML =
                crearCard(`Contenido del día ${dia}`,
                    crearContenidoDia(contenidoDia));
        } else {
            contenedorDia.innerHTML =
                crearCard(`Contenido del día ${dia}`,
                    `<p>No hay información disponible. <strong>Tomar turno.</strong></p>`);
        }
    } else {
        contenedorDia.innerHTML =
            crearCard('No hay contenido para este día', '');
    }
}

// Función para crear el contenido del día
function crearContenidoDia(contenido) {
    // Filtrar pacientes por fecha
    const pacientesDelDia = datosDelCalendario.filter(p => p.fecha === contenido.fecha);

    // Crear contenido para todos los pacientes
    const contenidoPacientes = pacientesDelDia.map(paciente => `
        <div class="card ${paciente.pago === "Pagado" ? 'green' : paciente.asistio ? 'red' : 'yellow'}">
            <p><strong>Paciente:</strong> ${paciente.paciente}</p>
            <p><strong>Pago:</strong> ${paciente.pago}</p>
            <p><strong>Asistió:</strong> ${paciente.asistio ? 'Sí' : 'No'}</p>
            <p><strong>Reservado:</strong> ${paciente.reservado ? 'Sí' : 'No'}</p>
            <p><strong>Hora:</strong> ${paciente.hora || 'No disponible'}</p>
            <button ${paciente.asistio ? 'disabled' : ''}>
                ${paciente.asistio ? 'Vino al turno' : 'No asistió'}
            </button>
            <button ${paciente.pago === "Pagado" ? 'disabled' : ''}>
                ${paciente.pago === "Pagado" ? 'Pago realizado' : 'Pago pendiente'}
            </button>
        </div>
    `).join('');

    return contenidoPacientes || `<p>No hay información disponible. <strong>Tomar turno.</strong></p>`;
} 