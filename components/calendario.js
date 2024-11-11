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
    contenedorCalendario.innerHTML = generarTablaCalendario(calendario);
}

// Asegurarse de que el DOM esté completamente cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', (event) => {
    generarCalendario();
}); 