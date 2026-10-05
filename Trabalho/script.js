/* =====================================================
   LIVRARIA DA LEH
   JavaScript
===================================================== */


/* =====================================================
   CAPAS DOS LIVROS
   Busca automaticamente imagens no Google Books
===================================================== */

const capas = document.querySelectorAll(".capa-img");


capas.forEach(img => {

    const busca = img.dataset.busca;

    const url =
        "https://www.googleapis.com/books/v1/volumes?q=" +
        encodeURIComponent(busca) +
        "&maxResults=1&langRestrict=pt";


    fetch(url)

        .then(resposta => resposta.json())

        .then(dados => {

            if (
                dados.items &&
                dados.items.length > 0
            ) {

                const livro =
                    dados.items[0].volumeInfo;

                if (livro.imageLinks) {

                    let imagem =
                        livro.imageLinks.thumbnail;

                    imagem =
                        imagem.replace(
                            "http://",
                            "https://"
                        );

                    img.src = imagem;

                }

            }

        })

        .catch(() => {

            console.log(
                "Não foi possível carregar a capa."
            );

        });


    /* Caso a imagem dê erro */

    img.addEventListener("error", () => {

        img.style.display = "none";

    });

});



/* =====================================================
   PESQUISA
===================================================== */

const pesquisa =
    document.getElementById("pesquisa");

const categoria =
    document.getElementById("categoria");

const livros =
    document.querySelectorAll(".livro-card");

const semResultados =
    document.getElementById("semResultados");


function filtrarLivros() {

    const texto =
        pesquisa.value
            .toLowerCase()
            .trim();

    const categoriaSelecionada =
        categoria.value;


    let encontrados = 0;


    livros.forEach(livro => {

        const titulo =
            livro.dataset.titulo
                .toLowerCase();

        const autor =
            livro.dataset.autor
                .toLowerCase();

        const categoriaLivro =
            livro.dataset.categoria;


        const encontrouTexto =
            titulo.includes(texto) ||
            autor.includes(texto);


        const encontrouCategoria =
            categoriaSelecionada === "todos" ||
            categoriaLivro === categoriaSelecionada;


        if (
            encontrouTexto &&
            encontrouCategoria
        ) {

            livro.style.display = "block";

            encontrados++;

        } else {

            livro.style.display = "none";

        }

    });


    if (encontrados === 0) {

        semResultados.style.display = "block";

    } else {

        semResultados.style.display = "none";

    }

}


pesquisa.addEventListener(
    "input",
    filtrarLivros
);


categoria.addEventListener(
    "change",
    filtrarLivros
);



/* =====================================================
   FAVORITOS
===================================================== */

const favoritos =
    document.querySelectorAll(".favorito");


favoritos.forEach(botao => {

    botao.addEventListener(
        "click",
        () => {

            botao.classList.toggle("ativo");


            if (
                botao.classList.contains("ativo")
            ) {

                botao.textContent = "♥";

            } else {

                botao.textContent = "♡";

            }

        }
    );

});



/* =====================================================
   MODAL DE RESUMO
===================================================== */

const modal =
    document.getElementById("modal");

const fecharModal =
    document.getElementById("fecharModal");

const modalTitulo =
    document.getElementById("modalTitulo");

const modalAutor =
    document.getElementById("modalAutor");

const modalCategoria =
    document.getElementById("modalCategoria");

const modalDescricao =
    document.getElementById("modalDescricao");


const botoesDetalhes =
    document.querySelectorAll(".detalhes");


botoesDetalhes.forEach(botao => {

    botao.addEventListener(
        "click",
        () => {

            modalTitulo.textContent =
                botao.dataset.titulo;

            modalAutor.textContent =
                "✍️ " + botao.dataset.autor;

            modalCategoria.textContent =
                botao.dataset.categoria;

            modalDescricao.textContent =
                botao.dataset.resumo;


            modal.classList.add("ativo");

            document.body.style.overflow =
                "hidden";

        }
    );

});



/* FECHAR MODAL */

fecharModal.addEventListener(
    "click",
    fechar
);


function fechar() {

    modal.classList.remove("ativo");

    document.body.style.overflow =
        "auto";

}



/* CLICAR FORA DO MODAL */

modal.addEventListener(
    "click",
    event => {

        if (
            event.target === modal
        ) {

            fechar();

        }

    }
);



/* TECLA ESC */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            fechar();

        }

    }
);



/* =====================================================
   MODO ESCURO
===================================================== */

const temaBtn =
    document.getElementById("temaBtn");


temaBtn.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "escuro"
        );


        if (
            document.body.classList.contains(
                "escuro"
            )
        ) {

            temaBtn.textContent = "☀️";

        } else {

            temaBtn.textContent = "🌙";

        }

    }
);