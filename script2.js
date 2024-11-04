var actual = new Date();
function mostrarCalendario(year, month) {
    var now = new Date(year, month - 1, 1);
    var last = new Date(year, month, 0);
    var primerDiaSemana = (now.getDay() === 0) ? 7 : now.getDay();
    var ultimoDiaMes = last.getDate();
    var resultado = "<tr bgcolor='silver'>";

    // Consolidar los logs en un solo bloque
    console.log("Mes: ", ultimoDiaMes, " | Primer día de la semana: ", primerDiaSemana, " | Ahora: ", now, " | Último: ", last);

    // Hacemos un bucle hasta 42 
    for (var i = 1, dia = 1; i <= 42; i++) {
        if (i < primerDiaSemana || dia > ultimoDiaMes) {
            resultado += "<td>&nbsp;</td>"; // Celda vacía
        } else {
            resultado += (dia === actual.getDate() && month === actual.getMonth() + 1 && year === actual.getFullYear() ? 
                "<td class='hoy'>" + dia + "</td>" : "<td>" + dia + "</td>");
            dia++; // Incrementar día solo si está dentro del mes
        }
        if (i % 7 === 0) {
            resultado += "</tr><tr>\n"; // Nueva fila cada 7 días
        }
    }
    resultado += "</tr>";

    var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    // Calcular siguiente y anterior mes y año
    var nextMonth = (month % 12) + 1;
    var nextYear = year + Math.floor(month / 12);
    var prevMonth = (month - 2 + 12) % 12 + 1;
    var prevYear = year - Math.floor((month - 2) / 12);

    // Actualizar el contenido del calendario
    document.getElementById("calendar").getElementsByTagName("caption")[0].innerHTML =
        "<div>" + meses[month - 1] + " / " + year + "</div>" +
        "<div>" +
        "<a onclick='mostrarCalendario(" + prevYear + "," + prevMonth + ")'>&lt;</a>" +
        "<a onclick='mostrarCalendario(" + nextYear + "," + nextMonth + ")'>&gt;</a>" +
        "</div>";
    document.getElementById("calendar").getElementsByTagName("tbody")[0].innerHTML = resultado;
}

mostrarCalendario(actual.getFullYear(), actual.getMonth() + 1);