/**
 * "Jakim Smerfem Jesteś?" - Oficjalny Quiz Piknikowy
 * Dostosowany do oryginalnej specyfikacji piknikowej z automatycznym punktowaniem,
 * obsługą remisów, dynamicznymi kodami QR i pełną mobilną responsywnością.
 */

// 1. Baza Danych Smerfów
const SMURFS = {
    papa: {
        name: "Papa Smerf 🧙",
        desc: "Jesteś odpowiedzialny/a i opanowany/a. Potrafisz działać spokojnie nawet podczas gargamelowego zamieszania.",
        img: "/static/images/smurfs/papa.png",
        adviceChild: "Słuchaj rad dorosłych i pomagaj młodszym! Twoja odpowiedzialność to wspaniała supermoc.",
        adviceParent: "Twój maluch uczy się od Ciebie opanowania. Dbaj o to, by we wspólnym zgiełku znaleźć chwilę na spokojną, ciepłą rozmowę."
    },
    smerfetka: {
        name: "Smerfetka 🌸",
        desc: "Masz dużo życzliwości i energii. Wnosisz dobrą atmosferę i sprawiasz, że wokół robi się bardziej kolorowo.",
        img: "/static/images/smurfs/smerfetka.png",
        adviceChild: "Bądź zawsze uśmiechnięty/a i dziel się swoją energią! Twoja życzliwość sprawia, że świat jest piękniejszy.",
        adviceParent: "Wspieraj w dziecku optymizm i wiarę w siebie. Wasza wspólna, wesoła zabawa to najlepsze wspomnienia z pikniku!"
    },
    pracus: {
        name: "Pracuś 🔧",
        desc: "Uwielbiasz tworzyć i rozwiązywać problemy. Gdy inni mówią „nie da się”, Ty już szukasz narzędzi.",
        img: "/static/images/smurfs/pracus.png",
        adviceChild: "Buduj, twórz i pytaj! Twoja kreatywność i chęć tworzenia nowych rzeczy są niesamowite.",
        adviceParent: "Twój mały konstruktor uwielbia majsterkować i główkować! Wspieraj go w kreatywnych projektach, nawet gdy pokój wygląda jak warsztat Pracusia."
    },
    osilek: {
        name: "Osiłek 💪",
        desc: "Masz energię, odwagę i lubisz wyzwania. Nic łatwo Cię nie zatrzyma.",
        img: "/static/images/smurfs/osilek.png",
        adviceChild: "Używaj swojej odwagi i energii, aby stawiać czoła wyzwaniom i pomagać innym! Jesteś dzielnym Smerfikiem.",
        adviceParent: "Masz w domu wulkan energii i ruchu! Zapewnij dziecku dużo sportowych wyzwań – wspólne tory przeszkód będą strzałem w dziesiątkę!"
    },
    remis: {
        name: "Smerf Wielozadaniowy! 🍄",
        desc: "Masz cechy kilku Smerfów jednocześnie. W Wiosce Smerfów każdy talent jest ważny!",
        img: "/static/images/smurfs/welcome.png",
        adviceChild: "Masz w sobie wiele wspaniałych talentów! Pamiętaj, że każdy z nich jest wyjątkowy i ważny.",
        adviceParent: "Twoje dziecko łączy cechy wielu silnych charakterów – to wspaniałe bogactwo osobowości! Pomagaj mu rozwijać każdy z tych talentów."
    }
};

// 2. Oficjalne Pytania z Oryginalnego Promptu
const QUESTIONS = [
    {
        question: "Gargamel znowu knuje plan! Co robisz? 🧙‍♂️🐱",
        caption: "🐱 Klakier już miauczy z radości, więc działaj szybko!",
        options: [
            { text: "Organizuję plan ratunkowy i mówię wszystkim, co robić.", smurf: "papa" },
            { text: "Dodaję otuchy i pilnuję, żeby nikt nie został sam.", smurf: "smerfetka" },
            { text: "Konstruuję supersmerfowy wynalazek obronny.", smurf: "pracus" },
            { text: "Pędzę pierwszy ratować sytuację.", smurf: "osilek" }
        ]
    },
    {
        question: "Jaki magiczny przedmiot byś wybrał/a? ✨",
        caption: "🪄 Poczuj smerfną magię w dłoniach!",
        options: [
            { text: "Magiczną księgę pełną mądrości i sekretów.", smurf: "papa" },
            { text: "Zaczarowany naszyjnik przynoszący szczęście przyjaciołom.", smurf: "smerfetka" },
            { text: "Uniwersalny smerfny multitool do naprawiania wszystkiego.", smurf: "pracus" },
            { text: "Superelastyczne buty dające niezwykłą siłę i szybkość.", smurf: "osilek" }
        ]
    },
    {
        question: "Co byś zobaczył/a w szklanej kuli Gargamela? 🔮",
        caption: "👁️ Spójrz w przyszłość... Jaka przygoda Cię czeka?",
        options: [
            { text: "Siebie prowadzącego ważną wyprawę dla Wioski Smerfów.", smurf: "papa" },
            { text: "Wesołą smerfną zabawę pełną śmiechu i przyjaciół.", smurf: "smerfetka" },
            { text: "Swój genialny wynalazek ratujący Wioskę Smerfów.", smurf: "pracus" },
            { text: "Siebie pokonującego przeszkody podczas wielkiej przygody.", smurf: "osilek" }
        ]
    },
    {
        question: "Ważniak zgubił się podczas wyprawy po SmerfJagody. Co robisz? 🍓",
        caption: "🌲 Leśna gęstwina skrywa wiele tajemnic... Pora ruszyć na pomoc!",
        options: [
            { text: "Organizuję grupę poszukiwawczą.", smurf: "papa" },
            { text: "Pocieszam wszystkich.", smurf: "smerfetka" },
            { text: "Robię mapę i analizuję trasę.", smurf: "pracus" },
            { text: "Biegnę szukać pierwszy.", smurf: "osilek" }
        ]
    },
    {
        question: "Papa Smerf daje Ci jedno zadanie specjalne. Co wybierasz? 📜",
        caption: "🔴 Najmądrzejszy ze Smerfów czeka na Twoją decyzję!",
        options: [
            { text: "Dowodzenie wielką wyprawą.", smurf: "papa" },
            { text: "Przygotowanie wielkiego smerfnego przyjęcia.", smurf: "smerfetka" },
            { text: "Budowę nowego wynalazku dla Wioski Smerfów.", smurf: "pracus" },
            { text: "Trening ochrony Wioski Smerfów.", smurf: "osilek" }
        ]
    }
];

// 3. Stan Aplikacji
let currentStep = 0; // 0 = Ekran startowy, 1..5 = Pytania, 6 = Wynik
let answers = [];     // Zapisane odpowiedzi użytkownika

// 4. Elementy DOM
const welcomeSlide = document.getElementById("slide-welcome");
const resultSlide = document.getElementById("slide-result");
const questionsWrapper = document.getElementById("questions-wrapper");
const progressContainer = document.getElementById("progress-container");
const progressFill = document.getElementById("progress-fill");
const navControls = document.getElementById("quiz-navigation");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");

// 5. Inicjalizacja przy załadowaniu strony
window.addEventListener("DOMContentLoaded", () => {
    generateQuestionsHTML();
    generateQRCodes();
    setupKeyboardNavigation();
});

// Generowanie HTML pytań w oparciu o tablicę pytań
function generateQuestionsHTML() {
    questionsWrapper.innerHTML = "";
    
    QUESTIONS.forEach((q, qIndex) => {
        const slide = document.createElement("section");
        slide.className = "slide";
        slide.id = `slide-question-${qIndex}`;
        
        slide.innerHTML = `
            <div class="question-slide-container">
                <div class="question-badge">
                    <i class="fa-solid fa-feather-pointed"></i> Pytanie ${qIndex + 1} z ${QUESTIONS.length}
                </div>
                <h2 class="question-title">${q.question}</h2>
                <span class="funny-caption">${q.caption}</span>
                
                <div class="answers-grid">
                    ${q.options.map((opt, optIndex) => `
                        <div class="answer-card" onclick="selectAnswer(${qIndex}, ${optIndex}, '${opt.smurf}')" id="q-${qIndex}-opt-${optIndex}">
                            <div class="answer-index">${String.fromCharCode(65 + optIndex)}</div>
                            <div class="answer-text">${opt.text}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        questionsWrapper.appendChild(slide);
    });
}

// Generowanie dynamicznych kodów QR
function generateQRCodes() {
    const currentURL = window.location.href;
    
    // Kod QR na powitanie
    new QRious({
        element: document.getElementById('qr-welcome'),
        value: currentURL,
        size: 200,
        background: 'white',
        foreground: '#0096ff',
        level: 'H'
    });

    // Kod QR na koniec
    new QRious({
        element: document.getElementById('qr-result'),
        value: currentURL,
        size: 200,
        background: 'white',
        foreground: '#0096ff',
        level: 'H'
    });
}

// 6. Mechanizm nawigacji między slajdami (Typeform look & feel)
function updateSlideVisibility() {
    welcomeSlide.classList.remove("active");
    welcomeSlide.style.display = "none";
    
    resultSlide.classList.remove("active");
    resultSlide.style.display = "none";
    
    for (let i = 0; i < QUESTIONS.length; i++) {
        const qSlide = document.getElementById(`slide-question-${i}`);
        if (qSlide) {
            qSlide.classList.remove("active");
            qSlide.style.display = "none";
        }
    }
    
    // Widok Powitalny
    if (currentStep === 0) {
        welcomeSlide.style.display = "flex";
        setTimeout(() => welcomeSlide.classList.add("active"), 50);
        progressContainer.style.display = "none";
        navControls.style.display = "none";
    } 
    // Widok Wyniku
    else if (currentStep > QUESTIONS.length) {
        showResults();
    } 
    // Widok Aktywnego Pytania
    else {
        const activeQIndex = currentStep - 1;
        const activeSlide = document.getElementById(`slide-question-${activeQIndex}`);
        if (activeSlide) {
            activeSlide.style.display = "flex";
            setTimeout(() => activeSlide.classList.add("active"), 50);
        }
        
        // Pasek postępu
        progressContainer.style.display = "block";
        const progressPercentage = (activeQIndex / QUESTIONS.length) * 100;
        progressFill.style.width = `${progressPercentage}%`;
        
        // Wyświetlanie przycisków nawigacji
        navControls.style.display = "flex";
        
        // Wyłączenie przycisku "Dalej" jeśli brak wybranej odpowiedzi
        btnNext.disabled = answers[activeQIndex] === undefined;
        btnPrev.disabled = false;
    }
}

function nextSlide() {
    if (currentStep <= QUESTIONS.length) {
        currentStep++;
        updateSlideVisibility();
    }
}

function prevSlide() {
    if (currentStep > 0) {
        currentStep--;
        updateSlideVisibility();
    }
}

// Zaznaczenie odpowiedzi z krótkim, naturalnym opóźnieniem
function selectAnswer(qIndex, optIndex, smurfKey) {
    answers[qIndex] = smurfKey;
    
    const allOptions = document.querySelectorAll(`[id^="q-${qIndex}-opt-"]`);
    allOptions.forEach(opt => opt.classList.remove("selected"));
    
    const selectedOption = document.getElementById(`q-${qIndex}-opt-${optIndex}`);
    if (selectedOption) {
        selectedOption.classList.add("selected");
    }
    
    setTimeout(() => {
        nextSlide();
    }, 350);
}

function submitCurrentAnswer() {
    const qIndex = currentStep - 1;
    if (answers[qIndex] !== undefined) {
        nextSlide();
    }
}

// 7. Obliczanie punktów (Matching Engine)
function showResults() {
    progressContainer.style.display = "block";
    progressFill.style.width = "100%";
    
    resultSlide.style.display = "flex";
    setTimeout(() => resultSlide.classList.add("active"), 50);
    navControls.style.display = "none";
    
    // Obliczanie punktów
    const score = {
        papa: 0,
        smerfetka: 0,
        pracus: 0,
        osilek: 0
    };
    
    answers.forEach(key => {
        if (score[key] !== undefined) {
            score[key]++;
        }
    });
    
    // Wybór najwyższego wyniku i weryfikacja remisów
    let topSmurf = "papa";
    let maxCount = 0;
    let candidates = [];
    
    Object.keys(score).forEach(key => {
        if (score[key] > maxCount) {
            maxCount = score[key];
            candidates = [key];
        } else if (score[key] === maxCount) {
            candidates.push(key);
        }
    });
    
    // Sprawdzenie warunku remisu
    if (candidates.length > 1) {
        topSmurf = "remis";
    } else {
        topSmurf = candidates[0];
    }
    
    // Prezentacja wyników
    const smurfObj = SMURFS[topSmurf] || SMURFS.remis;
    
    document.getElementById("result-smurf-img").src = smurfObj.img;
    document.getElementById("result-smurf-img").alt = smurfObj.name;
    document.getElementById("result-smurf-name").textContent = smurfObj.name;
    document.getElementById("result-smurf-desc").textContent = smurfObj.desc;
    document.getElementById("result-advice-child").textContent = smurfObj.adviceChild;
    document.getElementById("result-advice-parent").textContent = smurfObj.adviceParent;
}

// Restart quizu
function restartQuiz() {
    currentStep = 0;
    answers = [];
    
    const allOptions = document.querySelectorAll(".answer-card");
    allOptions.forEach(opt => opt.classList.remove("selected"));
    
    updateSlideVisibility();
}

// 8. Nawigacja Klawiaturą (Komputery Stacjonarne)
function setupKeyboardNavigation() {
    document.addEventListener("keydown", (e) => {
        if (currentStep === 0 && e.key === "Enter") {
            nextSlide();
            return;
        }
        
        if (currentStep > 0 && currentStep <= QUESTIONS.length) {
            const activeQIndex = currentStep - 1;
            const key = e.key.toUpperCase();
            
            // Obsługujemy opcje A - D
            if (key >= 'A' && key <= 'D') {
                const optIndex = key.charCodeAt(0) - 65; // A = 0, B = 1, C = 2, D = 3
                const optionEl = document.getElementById(`q-${activeQIndex}-opt-${optIndex}`);
                if (optionEl) {
                    optionEl.click();
                }
            }
            
            if (e.key === "Enter" && answers[activeQIndex] !== undefined) {
                nextSlide();
            }
            
            if (e.key === "Backspace" || e.key === "ArrowUp") {
                prevSlide();
            }
        }
    });
}
