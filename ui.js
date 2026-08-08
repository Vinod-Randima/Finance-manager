/**
 * UI Interactions & Navigation Handler
 */

document.addEventListener('DOMContentLoaded', () => {
    // Elements Selection
    const menuToggleBtn = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links a');

    // Toggle Mobile Sidebar Menu
    if (menuToggleBtn && navbar) {
        menuToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navbar.classList.toggle('active');
            menuToggleBtn.classList.toggle('open');
        });

        // Close Sidebar when clicking outside
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target) && !menuToggleBtn.contains(e.target)) {
                navbar.classList.remove('active');
                menuToggleBtn.classList.remove('open');
            }
        });

        // Close Sidebar when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
                menuToggleBtn.classList.remove('open');
            });
        });
    }

    // Tab Switching Logic
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            navLinks.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

// Helper to show status toasts/notifications
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerText = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
