document.addEventListener('DOMContentLoaded', function() {
    // Menú móvil
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('mainNav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }

    // Mapa interactivo
    const tooltip = document.getElementById('mapTooltip');
    const map = document.querySelector('.map');
    const estados = document.querySelectorAll('.map__state--active');

    if (tooltip && map) {
        estados.forEach(estado => {
            estado.addEventListener('mouseenter', function() {
                const info = this.getAttribute('data-info');
                if (info) {
                    tooltip.innerHTML = info;
                    tooltip.classList.add('active');
                }
            });

            estado.addEventListener('mousemove', function(e) {
                const rect = map.getBoundingClientRect();
                let x = e.clientX - rect.left + 15;
                let y = e.clientY - rect.top - 10;

                const tooltipRect = tooltip.getBoundingClientRect();
                if (x + tooltipRect.width > rect.width) x = e.clientX - rect.left - tooltipRect.width - 15;
                if (y + tooltipRect.height > rect.height) y = e.clientY - rect.top - tooltipRect.height - 10;
                if (y < 0) y = 10;

                tooltip.style.left = x + 'px';
                tooltip.style.top = y + 'px';
            });

            estado.addEventListener('mouseleave', () => tooltip.classList.remove('active'));
        });
    }

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                window.scrollTo({ top: target.offsetTop - 74, behavior: 'smooth' });
                if (nav) { nav.classList.remove('active'); menuToggle.classList.remove('active'); }
            }
        });
    });
});
