var actual = new Date();

function mostrarCalendario(year, month) {
    var now = new Date(year, month - 1, 1);
    var last = new Date(year, month, 0);
    var primerDiaSemana = (now.getDay() === 0) ? 7 : now.getDay();
    var ultimoDiaMes = last.getDate();
    var resultado = "<tr bgcolor='silver'>";

    console.log("Mes: ", ultimoDiaMes, " | Primer día de la semana: ", primerDiaSemana, " | Ahora: ", now, " | Último: ", last);

    for (var i = 1, dia = 1; i <= 42; i++) {
        if (i < primerDiaSemana || dia > ultimoDiaMes) {
            resultado += "<td>&nbsp;</td>";
        } else {
            resultado += "<td class='dia-calendario" + (dia === actual.getDate() && month === actual.getMonth() + 1 && year === actual.getFullYear() ? " hoy" : "") + "'>" + dia + "</td>";
            dia++;
        }
        if (i % 7 === 0) {
            resultado += "</tr><tr>\n";
        }
    }
    resultado += "</tr>";

    var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    var nextMonth = (month % 12) + 1;
    var nextYear = year + Math.floor(month / 12);
    var prevMonth = (month - 2 + 12) % 12 + 1;
    var prevYear = year - Math.floor((month - 2) / 12);

    document.getElementById("calendar").getElementsByTagName("caption")[0].innerHTML =
        "<div>" + meses[month - 1] + " / " + year + "</div>" +
        "<div>" +
        "<a onclick='mostrarCalendario(" + prevYear + "," + prevMonth + ")'>&lt;</a>" +
        "<a onclick='mostrarCalendario(" + nextYear + "," + nextMonth + ")'>&gt;</a>" +
        "<button onclick='mostrarCalendario(" + actual.getFullYear() + "," + (actual.getMonth() + 1) + ")'>Hoy</button>" +
        "</div>";

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

        if (HaHechoClick.classList.contains('dia-calendario')) {
            ElementosClick.push(HaHechoClick);
            console.log("Contenido del elemento que ha hecho click: " + HaHechoClick.innerHTML);
            var diaClicado = parseInt(HaHechoClick.innerHTML);
            var mesClicado = actual.getMonth() + 1;
            var añoClicado = actual.getFullYear();
            var fechaClicada = new Date(añoClicado, mesClicado - 1, diaClicado);
            var inicioSemana = new Date(fechaClicada);
            inicioSemana.setDate(fechaClicada.getDate() - fechaClicada.getDay());
            var displayDiv = document.querySelector('.hahechoClick');
            if (displayDiv) {
                var diasSemana = [];
                for (var i = 0; i < 7; i++) {
                    var diaSemana = new Date(inicioSemana);
                    diaSemana.setDate(inicioSemana.getDate() + i);
                    diasSemana.push(diaSemana.getDate() + " " + meses[diaSemana.getMonth()] + " " + diaSemana.getFullYear());
                }
                console.log(diaSemana);
                console.log(inicioSemana);
                console.log("Semana correspondiente: ", diasSemana);               
                displayDiv.innerHTML = "Semana correspondiente: " + diasSemana.join(", ");
            }
        }
    }
}

capturarClick();
mostrarCalendario(actual.getFullYear(), actual.getMonth() + 1);