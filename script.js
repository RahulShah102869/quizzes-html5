(function () {
    const questions = [
        {
            question: "What does HTML stand for?",
            options: [
                "Hyper Text Markup Language",
                "Home Tool Markup Language",
                "Hyperlinks and Text Markup Language",
                "Hyper Tool Multi Language"
            ],
            correct: 0
        },
        {
            question: "Which tag is used to define an internal style sheet in HTML5?",
            options: [
                "<script>",
                "<style>",
                "<css>",
                "<link>"
            ],
            correct: 1
        },
        {
            question: "Which HTML5 element is used to specify a footer for a document or section?",
            options: [
                "<bottom>",
                "<footer>",
                "<section>",
                "<aside>"
            ],
            correct: 1
        },
        {
            question: "What is the correct HTML5 element for playing video files?",
            options: [
                "<media>",
                "<video>",
                "<movie>",
                "<embed>"
            ],
            correct: 1
        },
        {
            question: "Which input type is used for an email address in HTML5?",
            options: [
                "type='text'",
                "type='mail'",
                "type='email'",
                "type='address'"
            ],
            correct: 2
        },
        {
            question: "Which attribute specifies that an input field must be filled out before submitting a form?",
            options: [
                "validate",
                "required",
                "placeholder",
                "necessary"
            ],
            correct: 1
        },
        {
            question: "What does the <canvas> element in HTML5 allow you to do?",
            options: [
                "Create drawings and graphics via JavaScript",
                "Embed a PDF file",
                "Add a video player",
                "Store data locally"
            ],
            correct: 0
        },
        {
            question: "Which HTML5 tag is used to define navigation links?",
            options: [
                "<navigate>",
                "<nav>",
                "<menu>",
                "<links>"
            ],
            correct: 1
        },
        {
            question: "Which of the following is a semantic element in HTML5?",
            options: [
                "<div>",
                "<span>",
                "<article>",
                "<b>"
            ],
            correct: 2
        },
        {
            question: "Which method is used to store data locally in the browser with HTML5?",
            options: [
                "localStorage",
                "sessionStorage",
                "Both localStorage and sessionStorage",
                "cookiesOnly"
            ],
            correct: 2
        }
    ];

    const TOTAL = questions.length;

    let currentIndex = 0;
    let userAnswers = new Array(TOTAL).fill(null);
    let quizFinished = false;

    const quizMain = document.getElementById('quizMain');
    const resultScreen = document.getElementById('resultScreen');
    const questionText = document.getElementById('questionText');
    const optionsContainer = document.getElementById('optionsContainer');
    const questionCounter = document.getElementById('questionCounter');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const finalScoreEl = document.getElementById('finalScore');
    const resultMessage = document.getElementById('resultMessage');
    const reviewList = document.getElementById('reviewList');
    const restartBtn = document.getElementById('restartBtn');

    function renderQuestion() {
        const q = questions[currentIndex];
        questionText.textContent = `${currentIndex + 1}. ${q.question}`;

        let html = '';
        q.options.forEach((opt, idx) => {
            const isSelected = (userAnswers[currentIndex] === idx);
            const selectedClass = isSelected ? 'selected' : '';
            html += `
        <label class="option ${selectedClass}" data-opt-index="${idx}">
            <input type="radio" name="quizOption" value="${idx}" ${isSelected ? 'checked' : ''}>
            <span>${opt}</span>
        </label>
        `;
        });
        optionsContainer.innerHTML = html;

        document.querySelectorAll('.option').forEach(label => {
            label.addEventListener('click', function (e) {
                const radio = this.querySelector('input[type="radio"]');
                if (radio) {
                    document.querySelectorAll('input[name="quizOption"]').forEach(r => r.checked = false);
                    radio.checked = true;
                }
                document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');

                const optIndex = parseInt(this.dataset.optIndex, 10);
                userAnswers[currentIndex] = optIndex;
            });
        });

        questionCounter.textContent = `${currentIndex + 1} / ${TOTAL}`;

        prevBtn.disabled = (currentIndex === 0);
        if (currentIndex === TOTAL - 1) {
            nextBtn.textContent = 'Submit ✓';
            nextBtn.classList.remove('btn-next');
            nextBtn.classList.add('btn-submit');
        } else {
            nextBtn.textContent = 'Next →';
            nextBtn.classList.add('btn-next');
            nextBtn.classList.remove('btn-submit');
        }
    }

    function goPrev() {
        if (currentIndex > 0) {
            currentIndex--;
            renderQuestion();
        }
    }

    function goNextOrSubmit() {
        if (currentIndex < TOTAL - 1) {
            currentIndex++;
            renderQuestion();
        } else {
            submitQuiz();
        }
    }

    function submitQuiz() {
        let score = 0;
        for (let i = 0; i < TOTAL; i++) {
            if (userAnswers[i] === questions[i].correct) {
                score++;
            }
        }

        quizMain.classList.add('hidden');
        resultScreen.classList.remove('hidden');

        finalScoreEl.innerHTML = `${score} <small>/ ${TOTAL}</small>`;

        const percentage = (score / TOTAL) * 100;
        let message = '';
        if (percentage === 100) message = 'Perfect! You know HTML5!';
        else if (percentage >= 80) message = 'Excellent! Very well done.';
        else if (percentage >= 60) message = 'Good! A little more practice.';
        else if (percentage >= 40) message = 'Not bad, but review your HTML5 basics.';
        else message = 'Keep learning! Try again.';
        resultMessage.textContent = message;

        let reviewHTML = '';
        for (let i = 0; i < TOTAL; i++) {
            const q = questions[i];
            const userAns = userAnswers[i];
            const isCorrect = (userAns === q.correct);
            const correctText = q.options[q.correct];
            const userText = (userAns !== null) ? q.options[userAns] : '(not answered)';

            reviewHTML += `
        <div class="review-item ${isCorrect ? 'review-correct' : 'review-wrong'}">
            <div class="review-icon">${isCorrect ? '✓' : '✗'}</div>
            <div class="review-text">
                <strong>Q${i + 1}: ${q.question}</strong><br>
                ${isCorrect ? '' : `Your answer: <span style="color:#b33;">${userText}</span><br>`}
                Correct: <span style="color:#0f8b4b; font-weight:600;">${correctText}</span>
            </div>
        </div>
        `;
        }
        reviewList.innerHTML = reviewHTML;
        quizFinished = true;
    }

    function resetQuiz() {
        currentIndex = 0;
        userAnswers = new Array(TOTAL).fill(null);
        quizFinished = false;

        quizMain.classList.remove('hidden');
        resultScreen.classList.add('hidden');

        nextBtn.textContent = 'Next →';
        nextBtn.classList.add('btn-next');
        nextBtn.classList.remove('btn-submit');

        renderQuestion();
    }

    prevBtn.addEventListener('click', goPrev);
    nextBtn.addEventListener('click', goNextOrSubmit);
    restartBtn.addEventListener('click', resetQuiz);

    function init() {
        userAnswers = new Array(TOTAL).fill(null);
        currentIndex = 0;
        renderQuestion();
    }

    init();
})();
