export function crearContenidoDia(contenidoDia) {
    return `
        <p><strong>Paciente:</strong> ${contenidoDia.paciente}</p>
        <p><strong>Receta:</strong> ${contenidoDia.receta}</p>
        <p><strong>Pago:</strong> ${contenidoDia.pago}</p>
        <p><strong>Asistió:</strong> ${contenidoDia.asistio ? 'Sí' : 'No'}</p>
        <p><strong>Reservado:</strong> ${contenidoDia.reservado ? 'Sí' : 'No'}</p>
    `;
}