import { series } from './data.js';

function renderSeriesTable(series) {
    var container = document.createElement("div");
    container.classList.add("container");
    
    var tableContainer = document.createElement("div");
    tableContainer.classList.add("table-container");
    var table = document.createElement("table");
    table.classList.add("table", "table-bordered", "table-striped", "table-fixed");
    var totalTemporadas = 0;
    var tableBody = series.map(function (serie) {
        totalTemporadas += serie.temporadas;
        return `
            <tr data-id="${serie.id}">
                <td>${serie.id}</td>
                <td class="serie-name">${serie.nombre}</td>
                <td>${serie.canal}</td>
                <td>${serie.temporadas}</td>
            </tr>
        `;
    }).join('');
    var averageTemporadas = Math.round(totalTemporadas / series.length); 
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
                <td><strong>${averageTemporadas}</strong></td>
            </tr>
        </tbody>
    `;
    
    table.addEventListener("click", function(event) {
        var tr = event.target.closest("tr");
        if (tr && tr.dataset.id) {
            var selectedSerie = series.find(serie => serie.id === parseInt(tr.dataset.id));
            renderSeriesDetail(selectedSerie);
        }
    });

    tableContainer.appendChild(table);
    container.appendChild(tableContainer);

    document.body.appendChild(container);
}

function renderSeriesDetail(serie) {
    var detailContainer = document.getElementById("serie-detail");
    if (!detailContainer) {
        detailContainer = document.createElement("div");
        detailContainer.id = "serie-detail";
        detailContainer.classList.add("detail-container");
        document.body.appendChild(detailContainer);
    }

    var card = document.createElement("div");
    card.classList.add("card");

    var cardImg = document.createElement("img");
    cardImg.classList.add("card-img-top");
    cardImg.src = serie.imgUrl;

    var cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    var cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = serie.nombre;

    var cardText = document.createElement("p");
    cardText.classList.add("card-text");
    cardText.textContent = serie.descripcion;

    var cardLink = document.createElement("a");
    cardLink.classList.add("card-page-link");
    cardLink.href = serie.pagina_web;
    cardLink.textContent = serie.pagina_web;

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(cardLink);

    card.appendChild(cardImg);
    card.appendChild(cardBody);

    detailContainer.innerHTML = "";
    detailContainer.appendChild(card);
}

window.onload = function () {
    renderSeriesTable(series);

    var serieNames = document.querySelectorAll('.serie-name');
    serieNames.forEach(function (name) {
        name.addEventListener('mouseover', function () {
            name.style.textDecoration = 'underline';
        });

        name.addEventListener('mouseout', function () {
            name.style.textDecoration = ''; 
        });
    });
    
    serieNames.forEach(function (name) {
        name.style.color = 'blue';
    });
};
