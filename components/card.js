export function crearCard(titulo, contenido) {
    return `
    <h3>${titulo}</h3>
        <div class="card-container">
            ${contenido}
        </div>
    `;
}