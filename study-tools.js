// Study tools functionality (Timetable, Quizzes, Flashcards)

// Initialize study tools
function initStudyTools() {
    // Initialize timetable
    if (document.querySelector('.timetable-section')) {
        initTimetable();
    }

    // Initialize quizzes
    if (document.querySelector('.quiz-section')) {
        initQuizzes();
    }

    // Initialize flashcards
    if (document.querySelector('.flashcards-section')) {
        initFlashcards();
    }

    // Add event listeners to quick actions
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const target = this.dataset.target;
            if (target) {
                showSection(target);
            }
        });
    });
}

// Timetable functionality
function initTimetable() {
    // Generate timetable
    generateTimetable();

    // Add event listeners for navigation
    document.getElementById('prev-week').addEventListener('click', function() {
        // Logic to go to previous week
        alert('Previous week navigation would be implemented here');
    });

    document.getElementById('next-week').addEventListener('click', function() {
        // Logic to go to next week
        alert('Next week navigation would be implemented here');
    });

    // Add event listener for adding class
    document.querySelector('.add-class-form button').addEventListener('click', addClass);
}

function generateTimetable() {
    const timetableBody = document.querySelector('.timetable tbody');
    timetableBody.innerHTML = '';

    // Sample timetable data
    const times = ['08:00', '10:00', '12:00', '14:00', '16:00'];
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    times.forEach(time => {
        const row = document.createElement('tr');

        // Time cell
        const timeCell = document.createElement('td');
        timeCell.textContent = time;
        row.appendChild(timeCell);

        // Day cells
        days.forEach(day => {
            const cell = document.createElement('td');
            cell.textContent = 'Free';
            row.appendChild(cell);
        });

        timetableBody.appendChild(row);
    });
}

function addClass() {
    const className = document.getElementById('class-name').value;
    const classDay = document.getElementById('class-day').value;
    const classStart = document.getElementById('class-start').value;

    if (!className || !classDay || !classStart) {
        alert('Please fill all fields');
        return;
    }

    // In a real app, this would add to the timetable
    alert(`Class "${className}" added to ${classDay} at ${classStart}`);

    // Clear form
    document.getElementById('class-name').value = '';
    document.getElementById('class-start').value = '';
}

// Quiz functionality
function initQuizzes() {
    // Add event listeners to category cards
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            startQuiz(category);
        });
    });

    // Add event listeners to quiz controls
    document.getElementById('prev-question').addEventListener('click', showPrevQuestion);
    document.getElementById('next-question').addEventListener('click', showNextQuestion);
    document.getElementById('submit-quiz').addEventListener('click', submitQuiz);
    document.getElementById('retake-quiz').addEventListener('click', retakeQuiz);
    document.getElementById('new-quiz').addEventListener('click', newQuiz);
}

function startQuiz(category) {
    // Hide categories, show quiz
    document.querySelector('.quiz-categories').style.display = 'none';
    document.querySelector('.quiz-container').style.display = 'block';

    // Set quiz category
    document.getElementById('quiz-category').textContent = `${category.charAt(0).toUpperCase() + category.slice(1)} Quiz`;

    // Load quiz questions (in a real app, this would come from an API)
    loadQuizQuestions(category);
}

function loadQuizQuestions(category) {
    // Sample questions
    const questions = [
        {
            question: "What is the value of π (pi) approximately?",
            options: ["3.14", "2.71", "1.61", "4.67"],
            answer: 0
        },
        {
            question: "What is the chemical symbol for gold?",
            options: ["Go", "Gd", "Au", "Ag"],
            answer: 2
        },
        {
            question: "Who wrote 'Romeo and Juliet'?",
            options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
            answer: 1
        }
    ];

    // Store questions for the quiz
    localStorage.setItem('quiz_questions', JSON.stringify(questions));
    localStorage.setItem('current_question', 0);
    localStorage.setItem('quiz_answers', JSON.stringify([]));

    // Show first question
    showQuestion(0);
}

function showQuestion(index) {
    const questions = JSON.parse(localStorage.getItem('quiz_questions'));
    const currentQuestion = questions[index];

    // Update question text
    document.getElementById('question-text').textContent = currentQuestion.question;

    // Update options
    const optionsContainer = document.querySelector('.quiz-options');
    optionsContainer.innerHTML = '';

    currentQuestion.options.forEach((option, i) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'quiz-option';
        optionElement.innerHTML = `
            <input type="radio" name="quiz-option" id="option-${i}" value="${i}">
            <label for="option-${i}">${option}</label>
        `;
        optionsContainer.appendChild(optionElement);
    });

    // Update progress
    document.getElementById('current-question').textContent = index + 1;
    document.getElementById('total-questions').textContent = questions.length;

    // Update button states
    document.getElementById('prev-question').disabled = index === 0;
    document.getElementById('next-question').disabled = index === questions.length - 1;
    document.getElementById('submit-quiz').style.display = index === questions.length - 1 ? 'block' : 'none';
}

function showPrevQuestion() {
    const currentIndex = parseInt(localStorage.getItem('current_question'));
    if (currentIndex > 0) {
        saveAnswer();
        localStorage.setItem('current_question', currentIndex - 1);
        showQuestion(currentIndex - 1);
    }
}

function showNextQuestion() {
    const questions = JSON.parse(localStorage.getItem('quiz_questions'));
    const currentIndex = parseInt(localStorage.getItem('current_question'));
    if (currentIndex < questions.length - 1) {
        saveAnswer();
        localStorage.setItem('current_question', currentIndex + 1);
        showQuestion(currentIndex + 1);
    }
}

function saveAnswer() {
    const selectedOption = document.querySelector('input[name="quiz-option"]:checked');
    if (selectedOption) {
        const answers = JSON.parse(localStorage.getItem('quiz_answers'));
        const currentIndex = parseInt(localStorage.getItem('current_question'));

        answers[currentIndex] = parseInt(selectedOption.value);
        localStorage.setItem('quiz_answers', JSON.stringify(answers));
    }
}

function submitQuiz() {
    saveAnswer();

    const questions = JSON.parse(localStorage.getItem('quiz_questions'));
    const answers = JSON.parse(localStorage.getItem('quiz_answers'));

    // Calculate score
    let score = 0;
    questions.forEach((question, index) => {
        if (answers[index] === question.answer) {
            score++;
        }
    });

    // Show results
    document.querySelector('.quiz-container').style.display = 'none';
    document.querySelector('.quiz-results').style.display = 'block';

    document.getElementById('score').textContent = score;
    document.getElementById('total').textContent = questions.length;
}

function retakeQuiz() {
    localStorage.removeItem('quiz_answers');
    localStorage.setItem('current_question', 0);
    document.querySelector('.quiz-results').style.display = 'none';
    document.querySelector('.quiz-container').style.display = 'block';
    showQuestion(0);
}

function newQuiz() {
    document.querySelector('.quiz-results').style.display = 'none';
    document.querySelector('.quiz-categories').style.display = 'block';
}

// Flashcard functionality
function initFlashcards() {
    // Sample flashcards
    const flashcards = {
        'General Knowledge': [
            { front: 'What is the capital of France?', back: 'Paris' },
            { front: 'What is the largest planet in our solar system?', back: 'Jupiter' }
        ],
        'Mathematics': [
            { front: 'What is the Pythagorean theorem?', back: 'a² + b² = c²' },
            { front: 'What is the value of π (pi)?', back: 'Approximately 3.14159' }
        ]
    };

    localStorage.setItem('flashcards', JSON.stringify(flashcards));

    // Initialize deck list
    renderDeckList();

    // Set first deck as active
    if (Object.keys(flashcards).length > 0) {
        const firstDeck = Object.keys(flashcards)[0];
        setActiveDeck(firstDeck);
    }

    // Add event listeners
    document.getElementById('create-deck').addEventListener('click', createDeck);
    document.getElementById('add-flashcard').addEventListener('click', addFlashcard);
    document.getElementById('prev-card').addEventListener('click', showPrevCard);
    document.getElementById('next-card').addEventListener('click', showNextCard);
    document.getElementById('flip-card').addEventListener('click', flipCard);
}

function renderDeckList() {
    const flashcards = JSON.parse(localStorage.getItem('flashcards'));
    const deckList = document.querySelector('.deck-list');
    deckList.innerHTML = '';

    Object.keys(flashcards).forEach(deckName => {
        const deckElement = document.createElement('div');
        deckElement.className = 'deck';
        deckElement.textContent = deckName;
        deckElement.addEventListener('click', () => setActiveDeck(deckName));
        deckList.appendChild(deckElement);
    });
}

function setActiveDeck(deckName) {
    const flashcards = JSON.parse(localStorage.getItem('flashcards'));
    const deck = flashcards[deckName];

    if (!deck) return;

    // Update UI
    document.querySelectorAll('.deck').forEach(deck => {
        deck.classList.remove('active');
    });

    // Find the deck element that matches the deckName
    const deckElements = document.querySelectorAll('.deck');
    for (const deckElement of deckElements) {
        if (deckElement.textContent === deckName) {
            deckElement.classList.add('active');
            break;
        }
    }

    document.getElementById('current-deck').textContent = deckName;

    // Set current deck
    localStorage.setItem('current_deck', deckName);
    localStorage.setItem('current_card_index', 0);

    // Show first card
    showCard(0);
}

function showCard(index) {
    const deckName = localStorage.getItem('current_deck');
    const flashcards = JSON.parse(localStorage.getItem('flashcards'));
    const deck = flashcards[deckName];

    if (!deck || index < 0 || index >= deck.length) return;

    const card = deck[index];
    const flashcard = document.querySelector('.flashcard');

    // Reset to front
    flashcard.classList.remove('flipped');

    // Update card content
    document.querySelector('.flashcard-front p').textContent = card.front;
    document.querySelector('.flashcard-back p').textContent = card.back;

    // Update card count
    document.getElementById('card-count').textContent = `${index + 1}/${deck.length}`;

    // Store current index
    localStorage.setItem('current_card_index', index);
}

function showPrevCard() {
    const currentIndex = parseInt(localStorage.getItem('current_card_index'));
    if (currentIndex > 0) {
        showCard(currentIndex - 1);
    }
}

function showNextCard() {
    const deckName = localStorage.getItem('current_deck');
    const flashcards = JSON.parse(localStorage.getItem('flashcards'));
    const deck = flashcards[deckName];
    const currentIndex = parseInt(localStorage.getItem('current_card_index'));

    if (currentIndex < deck.length - 1) {
        showCard(currentIndex + 1);
    }
}

function flipCard() {
    document.querySelector('.flashcard').classList.toggle('flipped');
}

function createDeck() {
    const deckName = prompt('Enter a name for the new deck:');
    if (deckName) {
        const flashcards = JSON.parse(localStorage.getItem('flashcards'));
        flashcards[deckName] = [];
        localStorage.setItem('flashcards', JSON.stringify(flashcards));
        renderDeckList();
        setActiveDeck(deckName);
    }
}

function addFlashcard() {
    const front = document.getElementById('flashcard-front').value.trim();
    const back = document.getElementById('flashcard-back').value.trim();

    if (!front || !back) {
        alert('Please fill both front and back of the flashcard');
        return;
    }

    const deckName = localStorage.getItem('current_deck');
    const flashcards = JSON.parse(localStorage.getItem('flashcards'));
    const deck = flashcards[deckName];

    deck.push({ front, back });
    flashcards[deckName] = deck;
    localStorage.setItem('flashcards', JSON.stringify(flashcards));

    // Clear form
    document.getElementById('flashcard-front').value = '';
    document.getElementById('flashcard-back').value = '';

    // Show last card
    showCard(deck.length - 1);
}

// Initialize study tools when on dashboard
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.dashboard-container')) {
        initStudyTools();
    }
});