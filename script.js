// Initialize Lucide icons
lucide.createIcons();

// Theme Toggle Functionality
function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  html.setAttribute('data-theme', newTheme);

  // Update theme switch icon
  const iconElement = document.querySelector('.theme-icon-dark');
  if (newTheme === 'light') {
    iconElement.setAttribute('data-lucide', 'sun');
  } else {
    iconElement.setAttribute('data-lucide', 'moon');
  }
  lucide.createIcons();

  // Save preference
  localStorage.setItem('theme', newTheme);
}

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);

// Update icon on load
const iconElement = document.querySelector('.theme-icon-dark');
if (savedTheme === 'light') {
  iconElement.setAttribute('data-lucide', 'sun');
}
lucide.createIcons();

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Scroll-triggered animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Apply initial animation state
document.querySelectorAll('.timeline-item, .project-card, .stack-card, .stat-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'all 0.6s ease';
  observer.observe(el);
});

// GitHub Repos Fetch
const GITHUB_USERNAME = 'Joel-RD';

async function fetchGitHubRepos() {
  const container = document.getElementById('repos-container');

  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=9`);

    if (!response.ok) {
      throw new Error('Failed to fetch repos');
    }

    const repos = await response.json();

    if (repos.length === 0) {
      container.innerHTML = '<div class="repos-loading"><p>No repositories found</p></div>';
      return;
    }

    // Calculate total stars
    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    document.getElementById('repo-count').textContent = repos.length;
    document.getElementById('total-stars').textContent = totalStars;

    // Render repos
    container.innerHTML = repos.map(repo => `
                    <div class="repo-card">
                        <div class="repo-header">
                            <a href="${repo.html_url}" target="_blank" class="repo-name">${repo.name}</a>
                            <span class="repo-visibility">${repo.visibility}</span>
                        </div>
                        <p class="repo-description">${repo.description || 'Sin descripción'}</p>
                        <div class="repo-meta">
                            <div class="repo-language">
                                <span class="language-dot"></span>
                                ${repo.language || 'N/A'}
                            </div>
                            <div class="repo-meta-item">
                                <i data-lucide="star"></i>
                                ${repo.stargazers_count}
                            </div>
                            <div class="repo-meta-item">
                                <i data-lucide="git-fork"></i>
                                ${repo.forks_count}
                            </div>
                        </div>
                        ${repo.topics && repo.topics.length > 0 ? `
                            <div class="repo-topics">
                                ${repo.topics.slice(0, 4).map(topic => `<span class="repo-topic">${topic}</span>`).join('')}
                            </div>
                        ` : ''}
                        <a href="${repo.html_url}" target="_blank" class="repo-link">
                            Ver repo <i data-lucide="arrow-right"></i>
                        </a>
                    </div>
                `).join('');

    lucide.createIcons();

    // Add animation to repo cards
    document.querySelectorAll('.repo-card').forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'all 0.6s ease';
      el.style.transitionDelay = `${index * 0.1}s`;
      observer.observe(el);
    });

  } catch (error) {
    container.innerHTML = `
                    <div class="repos-error">
                        <p>Error al cargar repositorios: ${error.message}</p>
                    </div>
                `;
  }
}

// Fetch repos when page loads
fetchGitHubRepos();