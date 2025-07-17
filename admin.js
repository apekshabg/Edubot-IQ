// Admin panel functionality

// Initialize admin panel
function initAdminPanel() {
    if (!document.querySelector('.admin-section')) return;

    // Add event listeners to tabs
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            showAdminTab(tabName);
        });
    });

    // Show first tab by default
    showAdminTab('students');

    // Render student list
    renderStudentList();
}

function showAdminTab(tabName) {
    // Update tab styles
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`.admin-tab[data-tab="${tabName}"]`).classList.add('active');

    // Show tab content
    document.querySelectorAll('.admin-tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`admin-${tabName}`).classList.add('active');
}

function renderStudentList() {
    // Sample student data
    const students = [
        { id: 1, name: "John Doe", email: "john@example.com", courses: 5, score: 85 },
        { id: 2, name: "Jane Smith", email: "jane@example.com", courses: 4, score: 92 },
        { id: 3, name: "Bob Johnson", email: "bob@example.com", courses: 6, score: 78 },
        { id: 4, name: "Alice Williams", email: "alice@example.com", courses: 3, score: 88 }
    ];

    const tableBody = document.querySelector('.student-list tbody');
    tableBody.innerHTML = '';

    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.courses}</td>
            <td>${student.score}%</td>
            <td>
                <button class="btn-icon view"><i class="fas fa-eye"></i></button>
                <button class="btn-icon edit"><i class="fas fa-edit"></i></button>
                <button class="btn-icon delete"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    // Add event listeners to buttons
    document.querySelectorAll('.view').forEach(btn => {
        btn.addEventListener('click', function() {
            const studentId = this.closest('tr').querySelector('td:first-child').textContent;
            alert(`View student ${studentId}`);
        });
    });

    document.querySelectorAll('.edit').forEach(btn => {
        btn.addEventListener('click', function() {
            const studentId = this.closest('tr').querySelector('td:first-child').textContent;
            alert(`Edit student ${studentId}`);
        });
    });

    document.querySelectorAll('.delete').forEach(btn => {
        btn.addEventListener('click', function() {
            const studentId = this.closest('tr').querySelector('td:first-child').textContent;
            if (confirm(`Are you sure you want to delete student ${studentId}?`)) {
                this.closest('tr').remove();
            }
        });
    });
}

// Initialize admin panel when on admin page
if (document.querySelector('.admin-section')) {
    document.addEventListener('DOMContentLoaded', initAdminPanel);
}