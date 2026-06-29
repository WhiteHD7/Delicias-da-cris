document.addEventListener("DOMContentLoaded", () => {

    /* ANIMAÇÃO DAS SEÇÕES AO ROLAR */

    const elementosAnimados = document.querySelectorAll(
        ".sobre, .categoria"
    );

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entradas) => {
                entradas.forEach((entrada) => {
                    if (entrada.isIntersecting) {
                        entrada.target.classList.add("show");
                        observer.unobserve(entrada.target);
                    }
                });
            },
            {
                threshold: 0.15
            }
        );

        elementosAnimados.forEach((elemento) => {
            elemento.classList.add("fade-in");
            observer.observe(elemento);
        });
    }


    /* DESTACA A OPÇÃO ATUAL DO MENU */

    const secoes = document.querySelectorAll("section[id]");
    const linksMenu = document.querySelectorAll(
        "#menuPrincipal a"
    );

    function atualizarMenuAtivo() {
        let secaoAtual = "";

        secoes.forEach((secao) => {
            const inicioSecao = secao.offsetTop - 180;

            if (window.scrollY >= inicioSecao) {
                secaoAtual = secao.id;
            }
        });

        linksMenu.forEach((link) => {
            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                `#${secaoAtual}`
            ) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener(
        "scroll",
        atualizarMenuAtivo,
        { passive: true }
    );

    atualizarMenuAtivo();


    /* BOTÃO VOLTAR AO TOPO */

    const botaoTopo = document.getElementById("topo");

    if (botaoTopo) {
        function atualizarBotaoTopo() {
            botaoTopo.style.display =
                window.scrollY > 500 ? "flex" : "none";
        }

        window.addEventListener(
            "scroll",
            atualizarBotaoTopo,
            { passive: true }
        );

        botaoTopo.addEventListener("click", () => {
            botaoTopo.classList.add("subindo");

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

            setTimeout(() => {
                botaoTopo.classList.remove("subindo");
            }, 1000);
        });

        atualizarBotaoTopo();
    }


    /* GALERIA DE IMAGENS */

    const slides = document.querySelector(".slides");
    const imagens = document.querySelectorAll(
        ".slides img"
    );
    const botaoAnterior = document.querySelector(".prev");
    const botaoProximo = document.querySelector(".next");

    let indiceAtual = 0;

    function mostrarSlide() {
        if (!slides) return;

        slides.style.transform =
            `translateX(${-indiceAtual * 100}%)`;
    }

    if (
        slides &&
        imagens.length > 0 &&
        botaoAnterior &&
        botaoProximo
    ) {
        botaoProximo.addEventListener("click", () => {
            indiceAtual++;

            if (indiceAtual >= imagens.length) {
                indiceAtual = 0;
            }

            mostrarSlide();
        });

        botaoAnterior.addEventListener("click", () => {
            indiceAtual--;

            if (indiceAtual < 0) {
                indiceAtual = imagens.length - 1;
            }

            mostrarSlide();
        });
    }


    /* MENU MOBILE */

    const botaoMenu =
        document.getElementById("menuMobile");

    const menuPrincipal =
        document.getElementById("menuPrincipal");

    if (botaoMenu && menuPrincipal) {
        botaoMenu.addEventListener("click", () => {
            const menuAberto =
                menuPrincipal.classList.toggle("ativo");

            botaoMenu.setAttribute(
                "aria-expanded",
                String(menuAberto)
            );

            botaoMenu.textContent =
                menuAberto ? "✕" : "☰";
        });

        menuPrincipal
            .querySelectorAll("a")
            .forEach((link) => {
                link.addEventListener("click", () => {
                    menuPrincipal.classList.remove(
                        "ativo"
                    );

                    botaoMenu.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    botaoMenu.textContent = "☰";
                });
            });
    }

});