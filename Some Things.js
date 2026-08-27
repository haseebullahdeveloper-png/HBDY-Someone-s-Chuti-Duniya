"use strict";


/* =========================================================
   PAGE INITIALIZATION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    createParticles();

    setupScrollAnimations();

    setupGalleryButtons();

    setupCTAButton();

    setupCursorEffect();

    setupRippleEffect();

    setupCelebrationEffect();

    setupImageFallback();

});


/* =========================================================
   CREATE BACKGROUND PARTICLES
========================================================= */

function createParticles() {

    const particlesContainer =
        document.getElementById("particles");

    if (!particlesContainer) {
        return;
    }

    const particleEmojis = [
        "❤️",
        "💖",
        "💝",
        "💕",
        "🌸",
        "💮",
        "✨",
        "💫",
        "🦋"
    ];

    const fragment =
        document.createDocumentFragment();

    const particleCount =
        window.innerWidth <= 600 ? 8 : 15;

    for (let i = 0; i < particleCount; i++) {

        const particle =
            document.createElement("div");

        particle.className =
            "particle";

        particle.textContent =
            particleEmojis[
                Math.floor(
                    Math.random() *
                    particleEmojis.length
                )
            ];

        particle.style.left =
            `${Math.random() * 100}%`;

        particle.style.top =
            `${Math.random() * 100}%`;

        particle.style.animationDuration =
            `${Math.random() * 3 + 4}s`;

        particle.style.animationDelay =
            `${Math.random() * 2}s`;

        fragment.appendChild(
            particle
        );
    }

    particlesContainer.appendChild(
        fragment
    );
}


/* =========================================================
   SCROLL ANIMATIONS
========================================================= */

function setupScrollAnimations() {

    const animatedElements =
        document.querySelectorAll(
            ".photo-card, .section-title, .message-card"
        );

    if (!animatedElements.length) {
        return;
    }

    const observer =
        new IntersectionObserver(
            (entries, observerInstance) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const element =
                        entry.target;

                    element.classList.add(
                        "aos-animate"
                    );

                    const delay =
                        element.dataset.delay;

                    if (delay) {

                        element.style.transitionDelay =
                            `${delay}ms`;
                    }


                    if (
                        element.classList.contains(
                            "photo-card"
                        )
                    ) {

                        animatePhoto(element);

                    }


                    if (
                        element.classList.contains(
                            "message-card"
                        )
                    ) {

                        animateMessageText();

                    }


                    observerInstance.unobserve(
                        element
                    );

                });

            },
            {
                threshold: 0.15,

                rootMargin:
                    "0px 0px -50px 0px"
            }
        );


    animatedElements.forEach(
        element => {

            observer.observe(element);

        }
    );
}


/* =========================================================
   MESSAGE ANIMATION
========================================================= */

let messageAnimated = false;


function animateMessageText() {

    if (messageAnimated) {
        return;
    }

    messageAnimated = true;


    const messageElements =
        document.querySelectorAll(
            ".message-text, .message-signature"
        );


    messageElements.forEach(
        (element, index) => {

            setTimeout(
                () => {

                    element.classList.add(
                        "fade-in-animate"
                    );

                },
                index * 350
            );

        }
    );
}


/* =========================================================
   PHOTO ANIMATION
========================================================= */

function animatePhoto(card) {

    const image =
        card.querySelector("img");

    if (!image) {
        return;
    }

    image.style.animation =
        "photoEnter 0.8s ease-out forwards";
}


/* =========================================================
   CTA BUTTON
========================================================= */

function setupCTAButton() {

    const button =
        document.getElementById(
            "celebrateButton"
        );

    if (!button) {
        return;
    }


    button.addEventListener(
        "click",
        () => {

            /*
             * Start the celebration FIRST.
             */
            createCelebrationBurst(
                button
            );


            /*
             * Give the emojis time to
             * spread before scrolling.
             */
            setTimeout(
                () => {

                    const gallery =
                        document.getElementById(
                            "gallery"
                        );

                    if (!gallery) {
                        return;
                    }


                    gallery.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                },
                900
            );

        }
    );
}


/* =========================================================
   CELEBRATION EFFECT STYLES
========================================================= */

function setupCelebrationEffect() {

    if (
        document.getElementById(
            "celebrationEffectStyles"
        )
    ) {
        return;
    }


    const style =
        document.createElement("style");


    style.id =
        "celebrationEffectStyles";


    style.textContent = `

        /* =========================================
           CELEBRATION EMOJIS
        ========================================= */

        .celebration-burst {

            position: fixed;

            left: 0;
            top: 0;

            z-index: 999999;

            pointer-events: none;

            user-select: none;

            line-height: 1;

            will-change:
                transform,
                opacity;

            animation:
                celebrationExplosion
                2.4s
                cubic-bezier(.15,.75,.25,1)
                forwards;
        }


        /* =========================================
           FULL SCREEN EXPLOSION
        ========================================= */

        @keyframes celebrationExplosion {

            /* Start directly at button */

            0% {

                opacity: 1;

                transform:
                    translate(-50%, -50%)
                    scale(0.2)
                    rotate(0deg);
            }


            /* Jump upward */

            12% {

                opacity: 1;

                transform:
                    translate(
                        calc(-50% + var(--x1)),
                        calc(-50% + var(--y1))
                    )
                    scale(1.3)
                    rotate(var(--r1));
            }


            /* Spread outward */

            40% {

                opacity: 1;

                transform:
                    translate(
                        calc(-50% + var(--x2)),
                        calc(-50% + var(--y2))
                    )
                    scale(1.15)
                    rotate(var(--r2));
            }


            /* Reach most of screen */

            72% {

                opacity: 0.9;

                transform:
                    translate(
                        calc(-50% + var(--x3)),
                        calc(-50% + var(--y3))
                    )
                    scale(1)
                    rotate(var(--r3));
            }


            /* Final drift */

            100% {

                opacity: 0;

                transform:
                    translate(
                        calc(-50% + var(--x4)),
                        calc(-50% + var(--y4))
                    )
                    scale(0.7)
                    rotate(var(--r4));
            }

        }


        /* =========================================
           BUTTON POP
        ========================================= */

        .celebration-button-pop {

            animation:
                celebrationButtonPop
                0.5s
                cubic-bezier(.2,.8,.3,1.4);
        }


        @keyframes celebrationButtonPop {

            0% {
                transform:
                    scale(1);
            }

            30% {
                transform:
                    scale(0.88);
            }

            60% {
                transform:
                    scale(1.12);
            }

            100% {
                transform:
                    scale(1);
            }

        }

    `;


    document.head.appendChild(
        style
    );
}


/* =========================================================
   🎉 FULL-SCREEN PARTY POPPER
========================================================= */

function createCelebrationBurst(button) {

    if (!button) {
        return;
    }


    const emojis = [

        "🎉",
        "🎊",
        "🥳",
        "✨",
        "💖",
        "💝",
        "💕",
        "⭐",
        "🌸",
        "💫",
        "🦋",
        "❤️"

    ];


    /* =========================================
       GET BUTTON POSITION
    ========================================= */

    const rect =
        button.getBoundingClientRect();


    const startX =
        rect.left +
        rect.width / 2;


    const startY =
        rect.top +
        rect.height / 2;


    /* =========================================
       BUTTON POP
    ========================================= */

    button.classList.remove(
        "celebration-button-pop"
    );


    /*
     * Force browser to restart
     * the button animation.
     */
    void button.offsetWidth;


    button.classList.add(
        "celebration-button-pop"
    );


    /* =========================================
       NUMBER OF EMOJIS
    ========================================= */

    const particleCount =
        window.innerWidth <= 600
            ? 32
            : 50;


    /* =========================================
       CREATE EACH EMOJI
    ========================================= */

    for (
        let i = 0;
        i < particleCount;
        i++
    ) {


        const particle =
            document.createElement("span");


        particle.className =
            "celebration-burst";


        particle.textContent =
            emojis[
                Math.floor(
                    Math.random() *
                    emojis.length
                )
            ];


        /* =====================================
           STARTING POSITION
        ===================================== */

        particle.style.left =
            `${startX}px`;

        particle.style.top =
            `${startY}px`;


        /* =====================================
           RANDOM FULL-SCREEN DESTINATION
        ===================================== */

        const screenWidth =
            window.innerWidth;


        const screenHeight =
            window.innerHeight;


        /*
         * Random position anywhere
         * on the visible screen.
         */

        const finalX =
            Math.random() *
            screenWidth;


        const finalY =
            Math.random() *
            screenHeight;


        /* =====================================
           JUMP POSITION
        ===================================== */

        const jumpX =
            startX +
            (finalX - startX) *
            0.18;


        const jumpY =
            startY -
            (
                100 +
                Math.random() * 180
            );


        /* =====================================
           MIDDLE POSITION
        ===================================== */

        const middleX =
            startX +
            (finalX - startX) *
            0.48;


        const middleY =
            Math.min(
                startY,
                finalY
            ) -
            (
                80 +
                Math.random() * 180
            );


        /* =====================================
           FIRST JUMP
        ===================================== */

        particle.style.setProperty(
            "--x1",
            `${jumpX - startX}px`
        );


        particle.style.setProperty(
            "--y1",
            `${jumpY - startY}px`
        );


        /* =====================================
           MIDDLE
        ===================================== */

        particle.style.setProperty(
            "--x2",
            `${middleX - startX}px`
        );


        particle.style.setProperty(
            "--y2",
            `${middleY - startY}px`
        );


        /* =====================================
           SCREEN DESTINATION
        ===================================== */

        particle.style.setProperty(
            "--x3",
            `${finalX - startX}px`
        );


        particle.style.setProperty(
            "--y3",
            `${finalY - startY}px`
        );


        /* =====================================
           FINAL SMALL DRIFT
        ===================================== */

        const finalX2 =
            finalX +
            (
                Math.random() -
                0.5
            ) *
            180;


        const finalY2 =
            finalY +
            (
                Math.random() -
                0.5
            ) *
            180;


        particle.style.setProperty(
            "--x4",
            `${finalX2 - startX}px`
        );


        particle.style.setProperty(
            "--y4",
            `${finalY2 - startY}px`
        );


        /* =====================================
           ROTATION
        ===================================== */

        particle.style.setProperty(
            "--r1",
            `${Math.random() * 360 - 180}deg`
        );


        particle.style.setProperty(
            "--r2",
            `${Math.random() * 720 - 360}deg`
        );


        particle.style.setProperty(
            "--r3",
            `${Math.random() * 1080 - 540}deg`
        );


        particle.style.setProperty(
            "--r4",
            `${Math.random() * 1440 - 720}deg`
        );


        /* =====================================
           RANDOM SIZE
        ===================================== */

        particle.style.fontSize =
            `${24 + Math.random() * 18}px`;


        /* =====================================
           RANDOM DELAY
        ===================================== */

        particle.style.animationDelay =
            `${Math.random() * 0.12}s`;


        /* =====================================
           ADD TO PAGE
        ===================================== */

        document.body.appendChild(
            particle
        );


        /* =====================================
           CLEAN UP
        ===================================== */

        particle.addEventListener(
            "animationend",
            () => {

                particle.remove();

            },
            {
                once: true
            }
        );

    }
}


/* =========================================================
   GALLERY LIKE BUTTONS
========================================================= */

function setupGalleryButtons() {

    const buttons =
        document.querySelectorAll(
            ".like-btn"
        );


    buttons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    toggleLike(
                        button
                    );

                }
            );

        }
    );
}


function toggleLike(button) {

    const heartIcon =
        button.querySelector(
            ".heart-icon"
        );


    if (!heartIcon) {
        return;
    }


    const isLiked =
        button.classList.toggle(
            "liked"
        );


    button.setAttribute(
        "aria-pressed",
        String(isLiked)
    );


    heartIcon.textContent =
        isLiked
            ? "❤️"
            : "🤍";


    if (isLiked) {

        createFloatingHeart(
            button
        );

    }
}


/* =========================================================
   FLOATING HEART
========================================================= */

function createFloatingHeart(button) {

    const heart =
        document.createElement(
            "div"
        );


    heart.textContent =
        "❤️";


    heart.style.position =
        "fixed";

    heart.style.fontSize =
        "1.5rem";

    heart.style.pointerEvents =
        "none";

    heart.style.zIndex =
        "9999";


    const rect =
        button.getBoundingClientRect();


    heart.style.left =
        `${rect.left + rect.width / 2}px`;


    heart.style.top =
        `${rect.top}px`;


    document.body.appendChild(
        heart
    );


    const animation =
        heart.animate(
            [
                {
                    transform:
                        "translate(-50%, 0) scale(1)",

                    opacity: 1
                },

                {
                    transform:
                        "translate(-50%, -70px) scale(1.5)",

                    opacity: 0
                }
            ],
            {
                duration: 1200,

                easing: "ease-out"
            }
        );


    animation.onfinish =
        () => {

            heart.remove();

        };
}


/* =========================================================
   CURSOR PARALLAX
========================================================= */

function setupCursorEffect() {

    const floatingHearts =
        document.querySelector(
            ".floating-hearts"
        );


    if (!floatingHearts) {
        return;
    }


    const supportsHover =
        window.matchMedia(
            "(hover: hover)"
        ).matches;


    if (!supportsHover) {
        return;
    }


    document.addEventListener(
        "mousemove",
        event => {

            const x =
                event.clientX /
                window.innerWidth;


            const y =
                event.clientY /
                window.innerHeight;


            const moveX =
                (x - 0.5) *
                18;


            const moveY =
                (y - 0.5) *
                18;


            floatingHearts.style.transform =
                `translate3d(${moveX}px, ${moveY}px, 0)`;

        }
    );
}


/* =========================================================
   RIPPLE EFFECT
========================================================= */

function setupRippleEffect() {

    const buttons =
        document.querySelectorAll(
            "button"
        );


    buttons.forEach(
        button => {

            button.addEventListener(
                "click",
                createRipple
            );

        }
    );
}


function createRipple(event) {

    const button =
        event.currentTarget;


    const existingRipple =
        button.querySelector(
            ".ripple"
        );


    if (existingRipple) {

        existingRipple.remove();

    }


    const rect =
        button.getBoundingClientRect();


    const size =
        Math.max(
            rect.width,
            rect.height
        );


    const ripple =
        document.createElement(
            "span"
        );


    ripple.className =
        "ripple";


    ripple.style.width =
        `${size}px`;


    ripple.style.height =
        `${size}px`;


    ripple.style.left =
        `${event.clientX - rect.left - size / 2}px`;


    ripple.style.top =
        `${event.clientY - rect.top - size / 2}px`;


    button.appendChild(
        ripple
    );


    ripple.addEventListener(
        "animationend",
        () => {

            ripple.remove();

        },
        {
            once: true
        }
    );
}


/* =========================================================
   IMAGE ERROR FALLBACK
========================================================= */

function setupImageFallback() {

    const images =
        document.querySelectorAll(
            ".photo-container img"
        );


    images.forEach(
        image => {

            image.addEventListener(
                "error",
                () => {

                    image.alt =
                        "Memory image could not be loaded";


                    image.style.objectFit =
                        "contain";


                    image.style.padding =
                        "20px";

                },
                {
                    once: true
                }
            );

        }
    );
}