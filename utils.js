function crearCard(titulo, contenido) {
    return `
    <h3>${titulo}</h3>
        <div class="card-container">
            ${contenido}
        </div>
    `;
}

function crearContenidoDia(contenidoDia) {
    return `
        <p><strong>Paciente:</strong> ${contenidoDia.paciente}</p>
        <p><strong>Receta:</strong> ${contenidoDia.receta}</p>
        <p><strong>Pago:</strong> ${contenidoDia.pago}</p>
        <p><strong>Asistió:</strong> ${contenidoDia.asistio ? 'Sí' : 'No'}</p>
        <p><strong>Reservado:</strong> ${contenidoDia.reservado ? 'Sí' : 'No'}</p>
    `;
}

function generarTablaCalendario(calendario) {
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
    return html;
}
