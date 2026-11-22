const urlBackend = "https://musicas-beckend.vercel.app";
const listaMusicas = document.getElementById("listaMusicas");

async function buscarMusicas() {
    const resposta = await fetch(urlBackend);
    const musicas = await resposta.json();

    listaMusicas.innerHTML = "";

    musicas.forEach((musica) => {
        listaMusicas.innerHTML += `
            <article class="musica">
                <h2>${musica.titulo}</h2>
                <p class="artista">${musica.artista}</p>
                <p class="detalhes">${musica.genero} | ${musica.ano} | ${musica.duracao} min</p>
                <div class="acoes">
                    <a class="editar" href="editar.html?id=${musica.id}">Editar</a>
                    <button class="apagar" onclick="apagarMusica(${musica.id})">Apagar</button>
                </div>
            </article>
        `;
    });
}

buscarMusicas();

async function apagarMusica(id) {
    const resposta = await fetch(`${urlBackend}/apagar/${id}`, {
        method: "DELETE"
    });

    const resultado = await resposta.json();
    alert(resultado.mensagem);

    window.location.reload();
}