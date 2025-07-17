// Common functions used across multiple pages

// Initialize the application
function init() {
    // Set current date
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('current-date').textContent = now.toLocaleDateString('en-US', options);

    // Initialize dashboard navigation
    initDashboardNavigation();

    // Check if user is logged in
    checkAuth();
}

// Initialize dashboard navigation
function initDashboardNavigation() {
    // Show active section and hide others
    const sections = document.querySelectorAll('.main-content > div');
    sections.forEach(section => {
        if (section.classList.contains('active-section')) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });

    // Add event listeners for navigation
    document.querySelectorAll('.sidebar-nav li, .action-btn, .back-btn').forEach(item => {
        item.addEventListener('click', function() {
            const target = this.dataset.target;
            if (target) {
                showSection(target);
            }
        });
    });
}

// Show specific section
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.main-content > div').forEach(section => {
        section.style.display = 'none';
    });

    // Show the requested section
    const section = document.querySelector(`.${sectionName}-section`);
    if (section) {
        section.style.display = 'block';
    }

    // Initialize specific section components
    if (sectionName === 'chatbot') {
        initChatbot();
    }
    else if (sectionName === 'admin') {
        initAdminPanel();
    }
    else if (sectionName === 'timetable' || sectionName === 'quiz' || sectionName === 'flashcards') {
        initStudyTools();
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);