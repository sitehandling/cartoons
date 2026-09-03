/* =========================================================
   TOONSTREAM JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       CUSTOM CURSOR
    ===================================================== */

    const cursorDot = document.querySelector(".cursor-dot");
    const cursorRing = document.querySelector(".cursor-ring");

    if (cursorDot && cursorRing) {

        let mouseX = 0;
        let mouseY = 0;

        let ringX = 0;
        let ringY = 0;


        document.addEventListener("mousemove", (event) => {

            mouseX = event.clientX;
            mouseY = event.clientY;

            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;

        });


        function animateCursor() {

            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;

            cursorRing.style.left = `${ringX}px`;
            cursorRing.style.top = `${ringY}px`;

            requestAnimationFrame(animateCursor);
        }

        animateCursor();


        const interactiveElements =
            document.querySelectorAll(
                "button, a, input, .video-card, .new-card, .quick-card"
            );


        interactiveElements.forEach((element) => {

            element.addEventListener("mouseenter", () => {
                document.body.classList.add("cursor-hover");
            });

            element.addEventListener("mouseleave", () => {
                document.body.classList.remove("cursor-hover");
            });

        });

    }


    /* =====================================================
       MOBILE SIDEBAR
    ===================================================== */

    const mobileMenu =
        document.getElementById("mobileMenu");

    const sidebar =
        document.getElementById("sidebar");


    if (mobileMenu && sidebar) {

        mobileMenu.addEventListener("click", () => {

            sidebar.classList.toggle("open");

        });


        document.addEventListener("click", (event) => {

            if (
                sidebar.classList.contains("open") &&
                !sidebar.contains(event.target) &&
                !mobileMenu.contains(event.target)
            ) {

                sidebar.classList.remove("open");

            }

        });

    }


    /* =====================================================
       CAROUSELS
    ===================================================== */

    const carouselButtons =
        document.querySelectorAll(".carousel-arrow");


    carouselButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const carouselId =
                button.dataset.carousel;

            const carousel =
                document.getElementById(carouselId);

            if (!carousel) return;


            const direction =
                button.classList.contains("right")
                    ? 1
                    : -1;


            const amount =
                carousel.clientWidth * 0.85;


            carousel.scrollBy({
                left: amount * direction,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       SEARCH
    ===================================================== */

    const searchInput =
        document.getElementById("searchInput");

    const searchButton =
        document.getElementById("searchButton");


    const searchableCards =
        document.querySelectorAll(
            ".video-card, .new-card"
        );


    function performSearch() {

        if (!searchInput) return;


        const searchTerm =
            searchInput.value
                .trim()
                .toLowerCase();


        let found = 0;


        searchableCards.forEach((card) => {

            const title =
                (card.dataset.title ||
                 card.innerText)
                    .toLowerCase();


            const match =
                title.includes(searchTerm);


            if (match) {

                card.classList.remove(
                    "search-hidden"
                );

                found++;

            } else {

                card.classList.add(
                    "search-hidden"
                );

            }

        });


        if (searchTerm.length === 0) {

            searchableCards.forEach((card) => {

                card.classList.remove(
                    "search-hidden"
                );

            });

            document.body.classList.remove(
                "search-active"
            );

        } else {

            document.body.classList.add(
                "search-active"
            );

            const firstResult =
                document.querySelector(
                    ".video-card:not(.search-hidden), .new-card:not(.search-hidden)"
                );


            if (firstResult && found > 0) {

                firstResult.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }

        }

    }


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            performSearch
        );


        searchInput.addEventListener(
            "keydown",
            (event) => {

                if (event.key === "Enter") {

                    performSearch();

                }

            }
        );

    }


    if (searchButton) {

        searchButton.addEventListener(
            "click",
            performSearch
        );

    }


    /* =====================================================
       HERO DOTS
    ===================================================== */

    const heroDots =
        document.querySelectorAll(".hero-dot");


    heroDots.forEach((dot, index) => {

        dot.addEventListener("click", () => {

            heroDots.forEach((item) => {
                item.classList.remove("active");
            });

            dot.classList.add("active");

            document.documentElement.style
                .setProperty(
                    "--hero-slide",
                    index
                );

        });

    });


    /* =====================================================
       HERO AUTO SLIDE
    ===================================================== */

    let heroIndex = 0;


    setInterval(() => {

        if (!heroDots.length) return;


        heroIndex++;

        if (heroIndex >= heroDots.length) {
            heroIndex = 0;
        }


        heroDots.forEach((dot) => {
            dot.classList.remove("active");
        });


        heroDots[heroIndex]
            .classList.add("active");

    }, 5000);


    /* =====================================================
       WATCH NOW
    ===================================================== */

    const watchNow =
        document.getElementById("watchNow");


    if (watchNow) {

        watchNow.addEventListener("click", () => {

            const firstVideo =
                document.querySelector(".video-card");


            if (firstVideo) {

                firstVideo.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

                firstVideo.classList.add(
                    "card-highlight"
                );


                setTimeout(() => {

                    firstVideo.classList.remove(
                        "card-highlight"
                    );

                }, 1200);

            }

        });

    }


    /* =====================================================
       EXPLORE
    ===================================================== */

    const exploreButton =
        document.getElementById("exploreButton");


    if (exploreButton) {

        exploreButton.addEventListener(
            "click",
            () => {

                document
                    .getElementById("trending")
                    ?.scrollIntoView({
                        behavior: "smooth"
                    });

            }
        );

    }


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const backTop =
        document.getElementById("backTop");


    if (backTop) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 500) {

                backTop.classList.add("show");

            } else {

                backTop.classList.remove("show");

            }

        });


        backTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================================
       NOTIFICATION
    ===================================================== */

    const notificationButton =
        document.getElementById(
            "notificationButton"
        );


    if (notificationButton) {

        notificationButton.addEventListener(
            "click",
            () => {

                alert(
                    "✨ You are all caught up!"
                );

            }
        );

    }


    /* =====================================================
       THEME EFFECT
    ===================================================== */

    const themeButton =
        document.getElementById("themeButton");


    if (themeButton) {

        themeButton.addEventListener(
            "click",
            () => {

                document.body.classList.toggle(
                    "extra-glow"
                );

            }
        );

    }


/* =====================================================
   VIDEO CARD CLICK
===================================================== */

const videoCards =
    document.querySelectorAll(
        ".video-card, .new-card"
    );


videoCards.forEach((card) => {

    card.addEventListener("click", (event) => {

        /* Ignore the three-dot button */
        if (
            event.target.closest(".more-button")
        ) {
            return;
        }


        /* =============================================
           BEN 10 TRENDING CARD
        ============================================= */

        if (
            card.classList.contains(
                "ben10-trending-card"
            )
        ) {

            window.location.href =
                "pages/ben10.html";

            return;
        }


        /* =============================================
           OTHER CARDS — CURRENT DEMO
        ============================================= */

        const title =
            card.dataset.title ||
            card.querySelector("h3")
                ?.textContent ||
            "Video";


        console.log(
            `Selected video: ${title}`
        );

    });

});

    /* =====================================================
       MY LIST DEMO
    ===================================================== */

    const moreButtons =
        document.querySelectorAll(
            ".more-button"
        );


    moreButtons.forEach((button) => {

        button.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();


                const card =
                    button.closest(
                        ".video-card, .new-card"
                    );


                const title =
                    card?.dataset.title ||
                    "Video";


                alert(
                    `${title}\n\nMore options coming soon.`
                );

            }
        );

    });


    /* =====================================================
       KEYBOARD SEARCH
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "/" &&
                document.activeElement !== searchInput
            ) {

                event.preventDefault();

                searchInput?.focus();

            }

            if (event.key === "Escape") {

                if (searchInput) {

                    searchInput.value = "";

                    performSearch();

                    searchInput.blur();

                }

            }

        }
    );


    /* =====================================================
       IMAGE-LIKE PARALLAX
    ===================================================== */

    const heroVisual =
        document.querySelector(".hero-visual");


    if (heroVisual) {

        heroVisual.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    heroVisual.getBoundingClientRect();


                const x =
                    (event.clientX - rect.left)
                    / rect.width
                    - 0.5;


                const y =
                    (event.clientY - rect.top)
                    / rect.height
                    - 0.5;


                heroVisual.style.transform =
                    `translate(${x * 7}px, ${y * 7}px)`;

            }
        );


        heroVisual.addEventListener(
            "mouseleave",
            () => {

                heroVisual.style.transform =
                    "translate(0,0)";

            }
        );

    }


    /* =====================================================
       RANDOM STAR SPARKLES
    ===================================================== */

    function createSparkle() {

        const sparkle =
            document.createElement("span");


        sparkle.innerHTML = "✦";

        sparkle.style.position = "fixed";

        sparkle.style.left =
            `${Math.random() * 100}%`;

        sparkle.style.top =
            `${Math.random() * 100}%`;

        sparkle.style.color =
            Math.random() > .5
                ? "#00eaff"
                : "#ff1593";


        sparkle.style.fontSize =
            `${8 + Math.random() * 10}px`;


        sparkle.style.pointerEvents =
            "none";

        sparkle.style.zIndex = "1";

        sparkle.style.opacity = "0";


        document.body.appendChild(
            sparkle
        );


        sparkle.animate(
            [
                {
                    opacity: 0,
                    transform: "scale(.4) rotate(0deg)"
                },
                {
                    opacity: 1,
                    transform: "scale(1) rotate(90deg)"
                },
                {
                    opacity: 0,
                    transform: "scale(.4) rotate(180deg)"
                }
            ],
            {
                duration:
                    1800 +
                    Math.random() * 1800,

                easing: "ease-in-out"
            }
        ).onfinish = () => {

            sparkle.remove();

        };

    }


    setInterval(
        createSparkle,
        1000
    );

    


});