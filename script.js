const canvas = document.getElementById('granim-canvas');
const navCollapse = document.getElementById('navbarNavAltMarkup');
navCollapse.addEventListener('show.bs.collapse', () => {
    canvas.style.height = '310px';
    canvas.style.transition = 'height 0.3s ease-in-out';
});
navCollapse.addEventListener('hide.bs.navCollapse', () => {
    canvas.style.height = '97px';
    canvas.style.transition = 'height 0.3s ease-in-out';
});

function incrementStats() {
    const counters = document.querySelectorAll('[id^="stat-"]');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2200;
        let startTime = null;
        counter.textContent = 0;
        function animate(currentTime) {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const current = Math.floor(progress * target);
            counter.textContent = current.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(animate); // Smooth animation loop
            } else {
                counter.textContent = target.toLocaleString();
            }
        }
        requestAnimationFrame(animate);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.getElementById('stats');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                incrementStats();
            }
        });
    }, { threshold: 0.3 });
    observer.observe(statsSection);
});