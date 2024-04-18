import { series } from './data.js';
import { Serie } from './serie.js';

function renderSeriesTable(series: Serie[]): void {
  const table = document.createElement("table");
  table.classList.add("table", "table-bordered", "table-striped", "table-fixed");
  table.style.width = "50%"; // Establecemos el ancho de la tabla
  table.style.margin = "0 auto"; // Centramos la tabla horizontalmente
  let totalTemporadas = 0;

  const tableBody = series.map((serie) => {
    totalTemporadas += serie.temporadas;
    return `
      <tr>
        <td>${serie.id}</td>
        <td>${serie.nombre}</td>
        <td>${serie.canal}</td>
        <td>${serie.temporadas}</td>
      </tr>
    `;
  }).join('');

  const averageTemporadas = Math.round(totalTemporadas / series.length); // Redondeamos al entero más cercano

  table.innerHTML = `
    <thead>
        <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Canal</th>
            <th>Temporadas</th>
        </tr>
    </thead>
    <tbody>
        ${tableBody}
        <tr>
            <td colspan="3"><strong>Promedio de temporadas:</strong></td>
            <td><strong>${averageTemporadas}</strong></td> // Utilizamos el promedio redondeado
        </tr>
    </tbody>
  `;

  document.body.appendChild(table);
}

window.onload = () => {
  renderSeriesTable(series);
};
