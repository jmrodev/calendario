import { datosDelCalendario } from '../data/data.js';
import { crearCard } from './card.js';


// Funciones para obtener estilos y mensajes
export  function obtenerClaseEstilo(paciente) {
    return paciente.pago === "Pagado" ? 'green' : paciente.asistio ? 'red' : 'yellow';
}

export function obtenerMensajeAsistencia(paciente) {
    return paciente.asistio ? 'Vino al turno' : 'No asistió';
}

export function obtenerMensajePago(paciente) {
    return paciente.pago === "Pagado" ? 'Pagado' : 'Pago pendiente';
}

// Función para crear la maquetación del paciente
export function crearMaquetacionPaciente(paciente) {
    return `
        <div class="card ${obtenerClaseEstilo(paciente)}">
            <p><strong>Paciente:</strong> ${paciente.paciente}</p>
            <p><strong>Pago:</strong> ${paciente.pago}</p>
            <p><strong>Asistió:</strong> ${paciente.asistio ? 'Sí' : 'No'}</p>
            <p><strong>Reservado:</strong> ${paciente.reservado ? 'Sí' : 'No'}</p>
            <p><strong>Hora:</strong> ${paciente.hora || 'No disponible'}</p>
            <button style="${paciente.asistio ? 'display:none;' : ''}">
                ${obtenerMensajeAsistencia(paciente)}
            </button>
            <button style="${paciente.pago === "Pagado" ? 'display:none;' : ''}">
                ${obtenerMensajePago(paciente)}
            </button>
        </div>
    `;
}

// Función para crear el contenido del día
export function crearContenidoDia(contenido) {
    const pacientesDelDia = datosDelCalendario.filter(p => p.fecha === contenido.fecha);
    const contenidoPacientes = pacientesDelDia.map(crearMaquetacionPaciente).join('');
    return contenidoPacientes || `<p>No hay información disponible. <strong>Tomar turno.</strong></p>`;
}

export function mostrarContenido(semanaIndex, dia, diaIndex) {
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