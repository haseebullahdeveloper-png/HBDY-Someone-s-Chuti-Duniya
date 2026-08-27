"use strict";


/* =========================================================
   CONFIGURATION
========================================================= */

const CONFIG = {

    // Main birthday countdown
    birthday:
        "2026-12-18T00:00:00",

    verificationWords: [
        "chuti duniya",
        "chutiduniya",
        "chuti",
        "duniya"
    ],

    secretCodes: [
        "h@xee",
        "haxee",
        "chuti duniya",
        "chotadon",
        "5by2"
    ],

    countdownMessages: {

        birthday:
            "🎂 Happy Birthday to You! 🎉❤️"

    }

};


/* =========================================================
   GLOBAL STATE
========================================================= */

let birthdayCelebrationShown = false;
let tinySecretClicks = 0;


/* =========================================================
   DOM
========================================================= */

const screens =
    document.querySelectorAll(".screen");

const audio =
    document.getElementById("birthdaySong");

const playButton =
    document.getElementById("playButton");

const soundToggle =
    document.getElementById("soundToggle");

const visualizer =
    document.getElementById("visualizer");

const musicPlayer =
    document.querySelector(".music-player");


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        createParticles();

        createDreamStars();

        createDreamBackground();

        setupVerification();

        setupNavigation();

        setupMusic();

        setupCountdown();

        setupLetters();

        setupGift();

        setupSecrets();

        setupCake();

        setupEasterEgg();

    }
);


/* =========================================================
   SCREEN NAVIGATION
========================================================= */

function showScreen(id) {

    const target =
        document.getElementById(id);

    if (!target) {
        return;
    }

    screens.forEach(
        screen => {

            screen.classList.remove(
                "active"
            );

        }
    );

    target.classList.add(
        "active"
    );

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    window.setTimeout(
        () => {

            target
                .querySelector(".screen-content")
                ?.focus?.();

        },
        50
    );

}


/* =========================================================
   NAVIGATION
========================================================= */

function setupNavigation() {

    document
        .getElementById("songContinue")
        ?.addEventListener(
            "click",
            () => showScreen("countdown")
        );


    document
        .getElementById("countdownContinue")
        ?.addEventListener(
            "click",
            () => showScreen("letters")
        );


    document
        .getElementById("lettersContinue")
        ?.addEventListener(
            "click",
            () => showScreen("gift")
        );


    document
        .getElementById("giftContinue")
        ?.addEventListener(
            "click",
            () => showScreen("secrets")
        );


    document
        .getElementById("secretContinue")
        ?.addEventListener(
            "click",
            () => showScreen("cake")
        );


    document
        .getElementById("cakeContinue")
        ?.addEventListener(
            "click",
            () => enterDreamMode()
        );


    document
        .getElementById("replayButton")
        ?.addEventListener(
            "click",
            () => showScreen("verification")
        );

}


/* =========================================================
   VERIFICATION
========================================================= */

function setupVerification() {

    const input =
        document.getElementById(
            "secretInput"
        );

    const button =
        document.getElementById(
            "verifyButton"
        );

    const message =
        document.getElementById(
            "verificationMessage"
        );


    if (!input || !button || !message) {
        return;
    }


    function verify() {

        const value =
            input.value
                .trim()
                .toLowerCase();


        if (!value) {

            message.textContent =
                "You have to enter something first. 👀";

            message.style.color =
                "#c92d4d";

            return;

        }


        const correct =
            CONFIG.verificationWords
                .includes(value);


        if (correct) {

            message.textContent =
                "ACCESS GRANTED ❤️";

            message.style.color =
                "#138a4b";

            createCelebration();


            button.textContent =
                "WELCOME ❤️";

            button.disabled =
                true;


            window.setTimeout(
                () => {

                    showScreen("song");

                },
                1300
            );


        } else {

            message.textContent =
                "Hmm... nice try. 😂 Try again.";

            message.style.color =
                "#c92d4d";

            input.value = "";

            shakeElement(input);

        }

    }


    button.addEventListener(
        "click",
        verify
    );


    input.addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {
                verify();
            }

        }
    );

}


/* =========================================================
   MUSIC
========================================================= */

function setupMusic() {

    if (!audio || !playButton) {
        return;
    }


    playButton.addEventListener(
        "click",
        toggleMusic
    );


    soundToggle?.addEventListener(
        "click",
        toggleMusic
    );


    audio.addEventListener(
        "timeupdate",
        updateProgress
    );


    audio.addEventListener(
        "loadedmetadata",
        updateDuration
    );


    audio.addEventListener(
        "ended",
        () => {

            playButton.textContent =
                "▶";

            soundToggle &&
                (soundToggle.textContent = "🎵");

            musicPlayer
                ?.classList
                .remove("playing");

        }
    );


    document
        .getElementById("progressBar")
        ?.addEventListener(
            "input",
            event => {

                if (!audio.duration) {
                    return;
                }


                audio.currentTime =
                    (
                        Number(event.target.value) /
                        100
                    ) *
                    audio.duration;

            }
        );

}


function toggleMusic() {

    if (!audio) {
        return;
    }


    if (audio.paused) {

        audio
            .play()
            .then(
                () => {

                    if (playButton) {

                        playButton.textContent =
                            "❚❚";

                    }


                    if (soundToggle) {

                        soundToggle.textContent =
                            "🔊";

                    }


                    musicPlayer
                        ?.classList
                        .add("playing");

                }
            )
            .catch(
                () => {

                    alert(
                        "Add your birthday-song.mp3 inside the Assits folder first ❤️"
                    );

                }
            );


    } else {

        audio.pause();


        if (playButton) {

            playButton.textContent =
                "▶";

        }


        if (soundToggle) {

            soundToggle.textContent =
                "🎵";

        }


        musicPlayer
            ?.classList
            .remove("playing");

    }

}


function updateProgress() {

    if (!audio || !audio.duration) {
        return;
    }


    const progress =
        (
            audio.currentTime /
            audio.duration
        ) *
        100;


    const progressBar =
        document.getElementById(
            "progressBar"
        );


    if (progressBar) {

        progressBar.value =
            progress;

    }


    const current =
        document.getElementById(
            "currentTime"
        );


    if (current) {

        current.textContent =
            formatTime(
                audio.currentTime
            );

    }

}


function updateDuration() {

    const duration =
        document.getElementById(
            "duration"
        );


    if (!duration || !audio) {
        return;
    }


    duration.textContent =
        formatTime(
            audio.duration
        );

}


function formatTime(seconds) {

    if (!Number.isFinite(seconds)) {
        return "0:00";
    }


    const minutes =
        Math.floor(
            seconds / 60
        );


    const remaining =
        Math.floor(
            seconds % 60
        );


    return `${minutes}:${String(
        remaining
    ).padStart(2, "0")}`;

}


/* =========================================================
   COUNTDOWN
   NOW COUNTS DIRECTLY TO
   18 DECEMBER 2026 — 12:00 AM
========================================================= */

function setupCountdown() {

    updateCountdown();


    window.setInterval(
        updateCountdown,
        1000
    );

}


function updateCountdown() {

    const now =
        Date.now();


    const birthdayTarget =
        new Date(
            CONFIG.birthday
        ).getTime();


    const difference =
        birthdayTarget - now;


    /*
       BIRTHDAY HAS ARRIVED
    */

    if (difference <= 0) {

        setText(
            "days",
            "00"
        );

        setText(
            "hours",
            "00"
        );

        setText(
            "minutes",
            "00"
        );

        setText(
            "seconds",
            "00"
        );


        const birthdayReached =
            document.getElementById(
                "birthdayReached"
            );


        if (birthdayReached) {

            birthdayReached.style.display =
                "block";


            birthdayReached.textContent =
                CONFIG
                    .countdownMessages
                    .birthday;

        }


        /*
           Celebration only once.
        */

        if (!birthdayCelebrationShown) {

            birthdayCelebrationShown =
                true;

            createCelebration();

        }


        return;

    }


    /*
       CALCULATE REMAINING TIME
    */

    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (
                difference /
                (1000 * 60 * 60)
            ) % 24
        );


    const minutes =
        Math.floor(
            (
                difference /
                (1000 * 60)
            ) % 60
        );


    const seconds =
        Math.floor(
            (
                difference /
                1000
            ) % 60
        );


    /*
       UPDATE SCREEN
    */

    setText(
        "days",
        String(days).padStart(
            2,
            "0"
        )
    );


    setText(
        "hours",
        String(hours).padStart(
            2,
            "0"
        )
    );


    setText(
        "minutes",
        String(minutes).padStart(
            2,
            "0"
        )
    );


    setText(
        "seconds",
        String(seconds).padStart(
            2,
            "0"
        )
    );


    /*
       Hide birthday message while
       countdown is still running.
    */

    const birthdayReached =
        document.getElementById(
            "birthdayReached"
        );


    if (birthdayReached) {

        birthdayReached.style.display =
            "none";

    }

}


function setText(id, value) {

    const element =
        document.getElementById(
            id
        );


    if (element) {

        element.textContent =
            value;

    }

}


/* =========================================================
   LETTERS
========================================================= */

const letters = {

    smile: {

        title:
            "Open when you need a smile 💗",

        content:
`Hey Chuti Duniya,

If you're reading this because you need a little smile,
then consider this your reminder that someone out there
is thinking about you.

You have this weird little ability to make ordinary moments
feel special.

So smile.

Even if it's just a tiny one.

And if that didn't work...

Okay fine.

Think about me being dramatic while making this website. 😂

Now smile properly.

❤️`

    },


    miss: {

        title:
            "Open when you miss me 💌",

        content:
`If you miss me...

Just remember that distance, time, busy days and everything
else can't erase the memories we've made.

Close your eyes for a second.

Think of one of our funniest moments.

There.

That's the version of us I want you to remember.

And yes...

I probably miss you too.

— H@xee ❤️`

    },


    birthday: {

        title:
            "Happy Birthday, Chuti Duniya 🎂",

        content:
`Today is your day.

So forget the stress.
Forget the bad days.
Forget everything that didn't go right.

For today, just celebrate YOU.

I hope this year brings you things you haven't even imagined yet.

More happiness.
More adventures.
More laughter.
More beautiful memories.

And hopefully...

A little more of me annoying you. 😂

Happy Birthday, Chuti Duniya.

You deserve a beautiful year.

❤️`

    }

};


function setupLetters() {

    const envelopes =
        document.querySelectorAll(
            ".letter-envelope"
        );


    envelopes.forEach(
        envelope => {

            envelope.addEventListener(
                "click",
                () => {

                    const key =
                        envelope.dataset.letter;

                    openLetter(key);

                }
            );

        }
    );


    document
        .getElementById("closeLetter")
        ?.addEventListener(
            "click",
            closeLetter
        );


    document
        .querySelector(".modal-backdrop")
        ?.addEventListener(
            "click",
            closeLetter
        );

}


function openLetter(key) {

    const letter =
        letters[key];


    if (!letter) {
        return;
    }


    const modal =
        document.getElementById(
            "letterModal"
        );


    if (!modal) {
        return;
    }


    const title =
        document.getElementById(
            "letterTitle"
        );


    const content =
        document.getElementById(
            "letterContent"
        );


    if (title) {

        title.textContent =
            letter.title;

    }


    if (content) {

        content.textContent =
            letter.content;

    }


    modal.classList.add(
        "open"
    );


    modal.setAttribute(
        "aria-hidden",
        "false"
    );

}


function closeLetter() {

    const modal =
        document.getElementById(
            "letterModal"
        );


    if (!modal) {
        return;
    }


    modal.classList.remove(
        "open"
    );


    modal.setAttribute(
        "aria-hidden",
        "true"
    );

}


/* =========================================================
   GIFT
========================================================= */

function setupGift() {

    const gift =
        document.getElementById(
            "giftBox"
        );


    const message =
        document.getElementById(
            "giftMessage"
        );


    const hint =
        document.getElementById(
            "giftHint"
        );


    gift?.addEventListener(
        "click",
        () => {

            if (
                gift.classList.contains(
                    "opened"
                )
            ) {

                return;

            }


            gift.classList.add(
                "opened"
            );


            if (hint) {

                hint.textContent =
                    "✨ Opened.";

            }


            createCelebration();


            window.setTimeout(
                () => {

                    message?.classList.add(
                        "show"
                    );

                },
                700
            );

        }
    );

}


/* =========================================================
   SECRET ROOM
========================================================= */

function setupSecrets() {

    const input =
        document.getElementById(
            "secretCode"
        );


    const button =
        document.getElementById(
            "secretCodeButton"
        );


    const result =
        document.getElementById(
            "secretResult"
        );


    if (!input || !button || !result) {
        return;
    }


    function checkCode() {

        const value =
            input.value
                .trim()
                .toLowerCase();


        if (
            CONFIG.secretCodes
                .includes(value)
        ) {

            result.textContent =
                "🔓 SECRET ROOM UNLOCKED. YOU WILL SEE IT AT LAST.";


            result.style.color =
                "#ffd166";


            createCelebration();


            revealSecret();


        } else {

            result.textContent =
                "🔒 Nope. The secret is hiding somewhere else.";


            result.style.color =
                "#ff91a7";


            shakeElement(
                input
            );

        }

    }


    button.addEventListener(
        "click",
        checkCode
    );


    input.addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {

                checkCode();

            }

        }
    );

}


function revealSecret() {

    const lock =
        document.querySelector(
            ".secret-lock"
        );


    if (lock) {

        lock.textContent =
            "🔓";

    }

}


/* =========================================================
   HIDDEN EASTER EGG
========================================================= */

function setupEasterEgg() {

    const button =
        document.getElementById(
            "tinySecret"
        );


    if (!button) {
        return;
    }


    button.addEventListener(
        "click",
        () => {

            tinySecretClicks++;


            if (tinySecretClicks >= 5) {

                tinySecretClicks = 0;


                alert(
                    "You found a tiny secret. 👀❤️"
                );


                createCelebration();

            }

        }
    );

}


/* =========================================================
   CAKE
========================================================= */

function setupCake() {

    const candles =
        document.querySelectorAll(
            ".candle"
        );


    const message =
        document.getElementById(
            "wishMessage"
        );


    const continueButton =
        document.getElementById(
            "cakeContinue"
        );


    candles.forEach(
        candle => {

            candle.addEventListener(
                "click",
                () => {

                    if (
                        candle.classList.contains(
                            "blown"
                        )
                    ) {

                        return;

                    }


                    candle.classList.add(
                        "blown"
                    );


                    createTinySmoke(
                        candle
                    );


                    const remaining =
                        document.querySelectorAll(
                            ".candle:not(.blown)"
                        ).length;


                    if (remaining === 0) {

                        if (message) {

                            message.textContent =
                                "Wish made. ✨❤️";

                        }


                        createCelebration();


                        continueButton
                            ?.classList
                            .remove(
                                "hidden"
                            );


                    } else {

                        if (message) {

                            message.textContent =
                                `${remaining} candle${remaining === 1 ? "" : "s"} left... 🎂`;

                        }

                    }

                }
            );

        }
    );

}


function createTinySmoke(candle) {

    const smoke =
        document.createElement(
            "span"
        );


    smoke.textContent =
        "💨";


    smoke.style.position =
        "fixed";


    const rect =
        candle.getBoundingClientRect();


    smoke.style.left =
        `${rect.left}px`;


    smoke.style.top =
        `${rect.top - 25}px`;


    smoke.style.zIndex =
        "1000";


    document.body.appendChild(
        smoke
    );


    smoke.animate(
        [
            {
                opacity: 1,
                transform:
                    "translateY(0) scale(.7)"
            },
            {
                opacity: 0,
                transform:
                    "translateY(-50px) scale(1.2)"
            }
        ],
        {
            duration: 800,
            easing: "ease-out"
        }
    ).onfinish =
        () => smoke.remove();

}


/* =========================================================
   DREAM MODE
========================================================= */

function enterDreamMode() {

    showScreen(
        "dream"
    );


    createCelebration();


    createDreamStars();

}


function createDreamStars() {

    const container =
        document.getElementById(
            "dreamStars"
        );


    if (!container) {
        return;
    }


    container.innerHTML =
        "";


    for (
        let i = 0;
        i < 80;
        i++
    ) {

        const star =
            document.createElement(
                "span"
            );


        star.className =
            "dream-star";


        star.textContent =
            Math.random() > .8
                ? "✦"
                : "•";


        star.style.left =
            `${Math.random() * 100}%`;


        star.style.top =
            `${Math.random() * 100}%`;


        star.style.fontSize =
            `${2 + Math.random() * 5}px`;


        star.style.opacity =
            `${.2 + Math.random() * .8}`;


        star.style.animationDelay =
            `${Math.random() * 3}s`;


        container.appendChild(
            star
        );

    }

}


function createDreamBackground() {

    const container =
        document.getElementById(
            "stars"
        );


    if (!container) {
        return;
    }


    for (
        let i = 0;
        i < 25;
        i++
    ) {

        const star =
            document.createElement(
                "span"
            );


        star.textContent =
            "✦";


        star.style.position =
            "absolute";


        star.style.left =
            `${Math.random() * 100}%`;


        star.style.top =
            `${Math.random() * 100}%`;


        star.style.opacity =
            `${Math.random() * .4}`;


        container.appendChild(
            star
        );

    }

}


/* =========================================================
   GLOBAL PARTICLES
========================================================= */

function createParticles() {

    const container =
        document.getElementById(
            "particles"
        );


    if (!container) {
        return;
    }


    const emojis = [
        "❤️",
        "💖",
        "💕",
        "✨",
        "🌸",
        "💫"
    ];


    const count =
        window.innerWidth <= 600
            ? 8
            : 16;


    for (
        let i = 0;
        i < count;
        i++
    ) {

        const particle =
            document.createElement(
                "span"
            );


        particle.className =
            "particle";


        particle.textContent =
            emojis[
                Math.floor(
                    Math.random() *
                    emojis.length
                )
            ];


        particle.style.left =
            `${Math.random() * 100}%`;


        particle.style.top =
            `${Math.random() * 100}%`;


        particle.style.fontSize =
            `${15 + Math.random() * 18}px`;


        particle.style.animationDelay =
            `${Math.random() * 5}s`;


        particle.style.animationDuration =
            `${5 + Math.random() * 5}s`;


        container.appendChild(
            particle
        );

    }

}


/* =========================================================
   CELEBRATION
========================================================= */

function createCelebration() {

    const layer =
        document.getElementById(
            "celebrationLayer"
        );


    if (!layer) {
        return;
    }


    const emojis = [
        "🎉",
        "🎊",
        "❤️",
        "💖",
        "✨",
        "💝",
        "🌸",
        "🥳",
        "💫"
    ];


    const count =
        window.innerWidth <= 600
            ? 30
            : 55;


    for (
        let i = 0;
        i < count;
        i++
    ) {

        const particle =
            document.createElement(
                "span"
            );


        particle.className =
            "celebration-particle";


        particle.textContent =
            emojis[
                Math.floor(
                    Math.random() *
                    emojis.length
                )
            ];


        particle.style.setProperty(
            "--x",
            `${(Math.random() - .5) * window.innerWidth * 1.5}px`
        );


        particle.style.setProperty(
            "--y",
            `${(Math.random() - .5) * window.innerHeight * 1.5}px`
        );


        particle.style.setProperty(
            "--rotation",
            `${Math.random() * 1000 - 500}deg`
        );


        particle.style.animationDelay =
            `${Math.random() * .15}s`;


        layer.appendChild(
            particle
        );


        particle.addEventListener(
            "animationend",
            () => particle.remove(),
            {
                once: true
            }
        );

    }

}


/* =========================================================
   UTILITIES
========================================================= */

function shakeElement(element) {

    if (!element) {
        return;
    }


    element.animate(
        [
            {
                transform:
                    "translateX(0)"
            },
            {
                transform:
                    "translateX(-8px)"
            },
            {
                transform:
                    "translateX(8px)"
            },
            {
                transform:
                    "translateX(-5px)"
            },
            {
                transform:
                    "translateX(5px)"
            },
            {
                transform:
                    "translateX(0)"
            }
        ],
        {
            duration: 400
        }
    );

}


/* =========================================================
   KEYBOARD SHORTCUT
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeLetter();

        }

    }
);
