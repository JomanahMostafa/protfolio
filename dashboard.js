// ===== DASHBOARD INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
});

function initializeDashboard() {
    // Initialize preloader
    initPreloader();

    // Initialize sidebar
    initSidebar();

    // Initialize theme system
    initThemeSystem();

    // Initialize language system
    initLanguageSystem();

    // Initialize counters
    initCounters();

    // Initialize charts
    initCharts();

    // Initialize interactive elements
    initInteractiveElements();
}

// ===== PRELOADER =====
function initPreloader() {
    const preloader = document.querySelector('.dashboard-preloader');

    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.classList.add('hidden');

            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1500);
    });
}

// ===== SIDEBAR =====
function initSidebar() {
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.dashboard-sidebar');

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(event) {
        if (window.innerWidth <= 992) {
            const isClickInsideSidebar = sidebar.contains(event.target);
            const isClickOnToggle = sidebarToggle.contains(event.target);

            if (!isClickInsideSidebar && !isClickOnToggle && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
            }
        }
    });

    // Menu item click handler
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// ===== THEME SYSTEM =====
function initThemeSystem() {
    const themeButtons = document.querySelectorAll('.toggle-btn[data-theme]');
    const savedTheme = localStorage.getItem('dashboard-theme') || 'light';

    setTheme(savedTheme);

    themeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            setTheme(theme);
        });
    });
}

function setTheme(theme) {
    document.body.classList.remove('light-mode', 'dark-mode');
    document.body.classList.add(`${theme}-mode`);

    const themeButtons = document.querySelectorAll('.toggle-btn[data-theme]');
    themeButtons.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-theme') === theme);
    });

    localStorage.setItem('dashboard-theme', theme);

    // Update charts if they exist
    updateChartsTheme();
}

// ===== LANGUAGE SYSTEM =====
function initLanguageSystem() {
    const langButtons = document.querySelectorAll('.toggle-btn[data-lang]');
    const savedLang = localStorage.getItem('dashboard-lang') || 'ar';

    setLanguage(savedLang);

    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            setLanguage(lang);
        });
    });
}

function setLanguage(lang) {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    document.body.setAttribute('data-lang', lang);

    const langButtons = document.querySelectorAll('.toggle-btn[data-lang]');
    langButtons.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    localStorage.setItem('dashboard-lang', lang);
}

// ===== COUNTERS =====
function initCounters() {
    const counters = document.querySelectorAll('.stat-value[data-count]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    let current = 0;
    const duration = 2000;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// ===== CHARTS =====
let charts = {};

function initCharts() {
    createMiniCharts();
    createProjectsStatsChart();
    createSkillsChart();
}

function createMiniCharts() {
    const miniCharts = {
        projectsChart: {
            type: 'line',
            data: {
                labels: ['', '', '', '', '', ''],
                datasets: [{
                    data: [12, 15, 18, 14, 20, 25],
                    borderColor: '#0061ff',
                    backgroundColor: 'rgba(0, 97, 255, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: { display: false },
                    y: { display: false }
                },
                elements: {
                    point: { radius: 0 }
                }
            }
        },
        clientsChart: {
            type: 'line',
            data: {
                labels: ['', '', '', '', '', ''],
                datasets: [{
                    data: [8, 10, 12, 9, 13, 15],
                    borderColor: '#00c853',
                    backgroundColor: 'rgba(0, 200, 83, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: { display: false },
                    y: { display: false }
                },
                elements: {
                    point: { radius: 0 }
                }
            }
        },
        revenueChart: {
            type: 'line',
            data: {
                labels: ['', '', '', '', '', ''],
                datasets: [{
                    data: [30, 35, 40, 38, 45, 50],
                    borderColor: '#8338ec',
                    backgroundColor: 'rgba(131, 56, 236, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: { display: false },
                    y: { display: false }
                },
                elements: {
                    point: { radius: 0 }
                }
            }
        },
        satisfactionChart: {
            type: 'line',
            data: {
                labels: ['', '', '', '', '', ''],
                datasets: [{
                    data: [90, 92, 94, 93, 96, 98],
                    borderColor: '#00d4ff',
                    backgroundColor: 'rgba(0, 212, 255, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: { display: false },
                    y: { display: false }
                },
                elements: {
                    point: { radius: 0 }
                }
            }
        }
    };

    Object.keys(miniCharts).forEach(chartId => {
        const canvas = document.getElementById(chartId);
        if (canvas) {
            const config = miniCharts[chartId];
            charts[chartId] = new Chart(canvas, config);
        }
    });
}

function createProjectsStatsChart() {
    const ctx = document.getElementById('projectsStatsChart');
    if (!ctx) return;

    const isDark = document.body.classList.contains('dark-mode');
    const textColor = isDark ? '#f5f5f5' : '#1a1a2e';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

    charts.projectsStatsChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
            datasets: [{
                    label: 'المشاريع المكتملة',
                    data: [12, 19, 15, 22, 18, 25],
                    backgroundColor: 'rgba(0, 97, 255, 0.8)',
                    borderColor: '#0061ff',
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false,
                },
                {
                    label: 'المشاريع الجارية',
                    data: [8, 12, 10, 15, 12, 18],
                    backgroundColor: 'rgba(0, 212, 255, 0.8)',
                    borderColor: '#00d4ff',
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false,
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: textColor,
                        font: {
                            family: 'Tajawal, sans-serif'
                        }
                    }
                },
                title: {
                    display: false
                }
            },
            scales: {
                x: {
                    grid: {
                        color: gridColor
                    },
                    ticks: {
                        color: textColor,
                        font: {
                            family: 'Tajawal, sans-serif'
                        }
                    }
                },
                y: {
                    grid: {
                        color: gridColor
                    },
                    ticks: {
                        color: textColor,
                        font: {
                            family: 'Tajawal, sans-serif'
                        }
                    },
                    beginAtZero: true
                }
            }
        }
    });
}

function createSkillsChart() {
    const ctx = document.getElementById('skillsChart');
    if (!ctx) return;

    const isDark = document.body.classList.contains('dark-mode');
    const textColor = isDark ? '#f5f5f5' : '#1a1a2e';

    charts.skillsChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Flutter', 'Dart', 'Firebase', 'UI/UX', 'Animations'],
            datasets: [{
                data: [35, 25, 20, 15, 5],
                backgroundColor: [
                    '#0061ff',
                    '#00d4ff',
                    '#8338ec',
                    '#00c853',
                    '#ffab00'
                ],
                borderWidth: 2,
                borderColor: isDark ? '#1e293b' : '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: textColor,
                        font: {
                            family: 'Tajawal, sans-serif'
                        },
                        padding: 20
                    }
                }
            },
            cutout: '70%'
        }
    });
}

function updateChartsTheme() {
    // Recreate charts with updated theme colors
    setTimeout(() => {
        if (charts.projectsStatsChart) {
            charts.projectsStatsChart.destroy();
        }
        if (charts.skillsChart) {
            charts.skillsChart.destroy();
        }
        createProjectsStatsChart();
        createSkillsChart();
    }, 100);
}

// ===== INTERACTIVE ELEMENTS =====
function initInteractiveElements() {
    // Refresh buttons
    const refreshButtons = document.querySelectorAll('.refresh-btn');
    refreshButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            icon.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                icon.style.transform = 'rotate(0deg)';
            }, 500);

            // Simulate data refresh
            simulateDataRefresh();
        });
    });

    // Quick action buttons
    const quickActionButtons = document.querySelectorAll('.quick-action-btn');
    quickActionButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.querySelector('span').textContent;
            showNotification(`تم تنفيذ: ${action}`, 'success');
        });
    });

    // Chart filter
    const chartFilter = document.querySelector('.chart-filter');
    if (chartFilter) {
        chartFilter.addEventListener('change', function() {
            showNotification(`تم تطبيق الفلتر: ${this.value}`, 'info');
        });
    }

    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function(e) {
            if (e.target.value.length > 2) {
                simulateSearch(e.target.value);
            }
        }, 300));
    }
}

function simulateDataRefresh() {
    // Simulate API call delay
    setTimeout(() => {
        showNotification('تم تحديث البيانات بنجاح', 'success');
    }, 1000);
}

function simulateSearch(query) {
    console.log('Searching for:', query);
    // In a real app, this would make an API call
}

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        left: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: var(--shadow-xl);
        z-index: 10000;
        transform: translateX(-400px);
        transition: transform 0.3s ease;
        max-width: 400px;
        font-family: 'Tajawal', sans-serif;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(-400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function getNotificationColor(type) {
    const colors = {
        success: 'var(--success)',
        error: 'var(--error)',
        warning: 'var(--warning)',
        info: 'var(--primary)'
    };
    return colors[type] || 'var(--primary)';
}

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== WINDOW RESIZE HANDLER =====
window.addEventListener('resize', debounce(function() {
    // Reinitialize charts on resize for better responsiveness
    if (Object.keys(charts).length > 0) {
        Object.values(charts).forEach(chart => {
            if (chart && typeof chart.resize === 'function') {
                chart.resize();
            }
        });
    }
}, 250));