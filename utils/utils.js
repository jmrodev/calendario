



export function generarTablaCalendario(calendario) {
    const fechaActual = new Date();
    const diaActual = fechaActual.getDate(); // Día del mes actual
    const mesActual = fechaActual.getMonth(); // Mes actual (0-11)
    const añoActual = fechaActual.getFullYear(); // Año actual

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
            // Verificar si el día es el actual
            const esDiaActual = dia === diaActual && mesActual === (new Date(añoActual, 0, dia).getMonth()) && añoActual === añoActual;
            const claseDia = esDiaActual ? 'dia-actual' : ''; // Asignar clase si es el día actual

            html += `<td class="${claseDia}" onclick="mostrarContenido(${index}, ${dia}, ${diaIndex})">${dia !== null ? dia : ''}</td>`;
        });
        html += '</tr>';
    });

    html += `
            </tbody>
        </table>
    `;
    return html;
}
