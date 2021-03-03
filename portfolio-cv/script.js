/* ********** Menu ********** */
// funciones anónimas autoejecutables: Así la podemos reutilizar
((d) => {
    const $btnMenu = d.querySelector(".menu-btn"),
        $menu = d.querySelector(".menu");

    $btnMenu.addEventListener("click", (e) => {
        $btnMenu.firstElementChild.classList.toggle("none");
        $btnMenu.lastElementChild.classList.toggle("none");
        $menu.classList.toggle("is-active");
    });
    // Cuando hacemos clic en algún enlace del menú, el menú se cerrará
    d.addEventListener("click", (e) => {
        //e.target es elemento que ha producido el elemento
        if (!e.target.matches(".menu a")) return false;

        $btnMenu.firstElementChild.classList.remove("none");
        $btnMenu.lastElementChild.classList.add("none");
        $menu.classList.remove("is-active");
    });
})(document);

// /* ********** ContactForm ********** */
((d) => {
    const $form = d.querySelector(".contact-form"),
        $loader = d.querySelector(".contact-form-loader"),
        $response = d.querySelector(".contact-form-response");

    $form.addEventListener("submit", (e) => {
        //Para evitar que el formulario se envie y lo podamos controlar con AJAX
        e.preventDefault();
        $loader.classList.remove("none");
        //La enviamos a nuestro correo
        fetch("https://formsubmit.co/ajax/typem0n71@gmail.com", {
            method: "POST",
            // El FromData serializa los datos, y obenemos los datos del e.target;
            // que es el objeto que genera el evento, en este caso, nuestro formulario
            body: new FormData(e.target),
        })
            // Fech trabaja con promesas
            .then((res) => (res.ok ? res.json() : Promise.reject(res)))
            .then((json) => {
                console.log(json);
                location.hash = "#gracias";
                $form.reset();
            })
            .catch((err) => {
                console.log(err);
                // Si no existe err.statusText, nosotros generamos un error personalizado
                let message = err.statusText || "Ocurrió un error al enviar, intenta nuevamente";
                // número el error y el estado
                $response.querySelector("h3").innerHTML = `Error ${err.status}: ${message}`;
            })
            .finally(() => {
                $loader.classList.add("none");
                setTimeout(() => {
                    location.hash = "#close";
                }, 3000);
            });
    });
})(document);
