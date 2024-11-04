// Inicializa la variable 'actual' con la fecha y hora actuales
var actual = new Date();

function mostrarCalendario(year, month) {
    // Crea un objeto de fecha para el primer día del mes
    var now = new Date(year, month - 1, 1);
    // Crea un objeto de fecha para el último día del mes
    var last = new Date(year, month, 0);
    // Determina el primer día de la semana (1-7, donde 1 es lunes y 7 es domingo)
    var primerDiaSemana = (now.getDay() === 0) ? 7 : now.getDay();
    // Obtiene el número total de días en el mes
    var ultimoDiaMes = last.getDate();
    // Inicializa la variable 'resultado' con la primera fila de la tabla del calendario
    var resultado = "<tr bgcolor='silver'>";

    // Consolida los logs en un solo bloque para depuración
    console.log("Mes: ", ultimoDiaMes, " | Primer día de la semana: ", primerDiaSemana, " | Ahora: ", now, " | Último: ", last);

    // Bucle para crear las celdas del calendario (hasta 42 celdas)
    for (var i = 1, dia = 1; i <= 42; i++) {
        // Si la celda está fuera del rango del mes, agrega una celda vacía
        if (i < primerDiaSemana || dia > ultimoDiaMes) {
            resultado += "<td>&nbsp;</td>"; // Celda vacía
        } else {
            // Agrega el día actual, aplicando la clase 'hoy' si corresponde
            resultado += "<td class='dia-calendario" + (dia === actual.getDate() && month === actual.getMonth() + 1 && year === actual.getFullYear() ? " hoy" : "") + "'>" + dia + "</td>";
            dia++; // Incrementa el día solo si está dentro del mes
        }
        // Cada 7 días, cierra la fila y comienza una nueva
        if (i % 7 === 0) {
            resultado += "</tr><tr>\n"; // Nueva fila cada 7 días
        }
    }
    resultado += "</tr>"; // Cierra la última fila del calendario

    // Array que contiene los nombres de los meses
    var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    // Calcular el siguiente mes y año
    var nextMonth = (month % 12) + 1; // Si el mes es diciembre, el siguiente mes es enero
    var nextYear = year + Math.floor(month / 12); // Incrementa el año si el mes es diciembre

    // Calcular el mes y año anterior
    var prevMonth = (month - 2 + 12) % 12 + 1; // Si el mes es enero, el mes anterior es diciembre
    var prevYear = year - Math.floor((month - 2) / 12); // Decrementa el año si el mes es enero

    // Actualiza el contenido del encabezado del calendario
    document.getElementById("calendar").getElementsByTagName("caption")[0].innerHTML =
        "<div>" + meses[month - 1] + " / " + year + "</div>" + // Muestra el mes y el año
        "<div>" +
        "<a onclick='mostrarCalendario(" + prevYear + "," + prevMonth + ")'>&lt;</a>" + // Enlace para el mes anterior
        "<a onclick='mostrarCalendario(" + nextYear + "," + nextMonth + ")'>&gt;</a>" + // Enlace para el siguiente mes
        "<button onclick='mostrarCalendario(" + actual.getFullYear() + "," + (actual.getMonth() + 1) + ")'>Hoy</button>" + // Botón para ir al día de hoy
        "</div>"
        

    // Actualiza el contenido del cuerpo de la tabla del calendario
    document.getElementById("calendar").getElementsByTagName("tbody")[0].innerHTML = resultado;
}

function capturarClick() {
    var ElementosClick = [];
    document.onclick = capturaClick;

    function capturaClick(event) {
        var HaHechoClick;
        if (event == null) {
            HaHechoClick = event.srcElement;
        } else {
            HaHechoClick = event.target;
        }
    if (HaHechoClick.classList.contains('dia-calendario')) { // Cambia 'dia-calendario' por la clase que uses

        ElementosClick.push(HaHechoClick);
        console.log("Contenido del elemento que ha hecho click: "+ HaHechoClick.innerHTML);
        
        var displayDiv = document.querySelector('.hahechoclick');

        if (displayDiv) {
            displayDiv.innerHTML = "Contenido del elemento que ha hecho click: " + HaHechoClick.innerHTML;
        }
      }
    }
}

capturarClick()
// Llama a la función para mostrar el calendario del mes actual
mostrarCalendario(actual.getFullYear(), actual.getMonth() + 1);