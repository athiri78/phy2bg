// Statistics Page JavaScript - Année 2025/2026 uniquement
document.addEventListener('DOMContentLoaded', function () {

    // Données pour l'année 2025/2026 uniquement
    const currentYearData = {
        year: '2025/2026',
        totalStudents: 156,
        successRate: 76.3,
        averageScore: 74.5,
        testsCompleted: 342,

        // Progression mensuelle (Septembre 2025 - Février 2026)
        monthlyProgress: {
            months: ['Sept 2025', 'Oct 2025', 'Nov 2025', 'Déc 2025', 'Jan 2026', 'Fév 2026'],
            students: [45, 78, 112, 138, 150, 156],
            tests: [23, 67, 135, 198, 276, 342]
        },

        // Scores par module
        moduleScores: {
            'Optique': 76.5,
            'Électrostatique': 73.2,
            'Électrocinétique': 71.8,
            'Magnétostatique': 75.9
        },

        // Distribution des notes
        gradeDistribution: {
            'Excellent (≥85%)': 18,
            'Bien (70-84%)': 42,
            'Passable (60-69%)': 28,
            'Échec (<60%)': 12
        }
    };

    // Configuration globale
    Chart.defaults.font.family = 'Inter, sans-serif';
    Chart.defaults.color = '#6b7280';

    // Graphique 1 : Évolution des étudiants (2025/2026)
    const usersChartCtx = document.getElementById('usersChart').getContext('2d');
    new Chart(usersChartCtx, {
        type: 'line',
        data: {
            labels: currentYearData.monthlyProgress.months,
            datasets: [{
                label: 'Nombre d\'étudiants',
                data: currentYearData.monthlyProgress.students,
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 6,
                pointHoverRadius: 8,
                pointBackgroundColor: '#3b82f6',
                pointBorderColor: '#fff',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    callbacks: {
                        label: (context) => 'Étudiants : ' + context.parsed.y
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: '#f3f4f6' }
                },
                x: {
                    grid: { display: false }
                }
            }
        }
    });

    // Graphique 2 : Tests complétés par mois (2025/2026)
    const successRateChartCtx = document.getElementById('successRateChart').getContext('2d');
    new Chart(successRateChartCtx, {
        type: 'line',
        data: {
            labels: currentYearData.monthlyProgress.months,
            datasets: [{
                label: 'Tests complétés',
                data: currentYearData.monthlyProgress.tests,
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 6,
                pointHoverRadius: 8,
                pointBackgroundColor: '#10b981',
                pointBorderColor: '#fff',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    callbacks: {
                        label: (context) => 'Tests : ' + context.parsed.y
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: '#f3f4f6' }
                },
                x: {
                    grid: { display: false }
                }
            }
        }
    });

    // Graphique 3 : Score moyen par module
    const moduleScoresChartCtx = document.getElementById('moduleScoresChart').getContext('2d');
    new Chart(moduleScoresChartCtx, {
        type: 'bar',
        data: {
            labels: Object.keys(currentYearData.moduleScores),
            datasets: [{
                label: 'Score moyen (%)',
                data: Object.values(currentYearData.moduleScores),
                backgroundColor: [
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(139, 92, 246, 0.8)'
                ],
                borderColor: ['#3b82f6', '#f59e0b', '#10b981', '#8b5cf6'],
                borderWidth: 2,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    callbacks: {
                        label: (context) => 'Score : ' + context.parsed.y.toFixed(1) + '%'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 60,
                    max: 85,
                    grid: { color: '#f3f4f6' },
                    ticks: {
                        callback: (value) => value + '%'
                    }
                },
                x: {
                    grid: { display: false }
                }
            }
        }
    });

    // Graphique 4 : Distribution des notes
    const gradeDistributionChartCtx = document.getElementById('gradeDistributionChart').getContext('2d');
    new Chart(gradeDistributionChartCtx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(currentYearData.gradeDistribution),
            datasets: [{
                data: Object.values(currentYearData.gradeDistribution),
                backgroundColor: [
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(239, 68, 68, 0.8)'
                ],
                borderColor: '#fff',
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        font: { size: 12 },
                        usePointStyle: true
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    callbacks: {
                        label: (context) => context.label + ' : ' + context.parsed + '%'
                    }
                }
            }
        }
    });

    console.log('📊 Statistiques chargées pour l\'année 2025/2026');
    console.log(`   Étudiants: ${currentYearData.totalStudents}`);
    console.log(`   Taux de réussite: ${currentYearData.successRate}%`);
    console.log(`   Tests complétés: ${currentYearData.testsCompleted}`);
});

// Fonctions d'export
function exportToPDF() {
    alert('Export PDF à implémenter avec jsPDF');
}

function exportToExcel() {
    alert('Export Excel à implémenter avec SheetJS');
}
