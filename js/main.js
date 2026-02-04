document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('mainNav');
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }

    const tooltip = document.getElementById('mapTooltip');
    const map = document.querySelector('.map');
    const estados = document.querySelectorAll('.map__state--active');
    if (tooltip && map) {
        estados.forEach(estado => {
            estado.addEventListener('mouseenter', function() {
                const info = this.getAttribute('data-info');
                if (info) { tooltip.innerHTML = info; tooltip.classList.add('active'); }
            });
            estado.addEventListener('mousemove', function(e) {
                const rect = map.getBoundingClientRect();
                let x = e.clientX - rect.left + 15, y = e.clientY - rect.top - 10;
                const tr = tooltip.getBoundingClientRect();
                if (x + tr.width > rect.width) x = e.clientX - rect.left - tr.width - 15;
                if (y + tr.height > rect.height) y = e.clientY - rect.top - tr.height - 10;
                if (y < 0) y = 10;
                tooltip.style.left = x + 'px'; tooltip.style.top = y + 'px';
            });
            estado.addEventListener('mouseleave', () => tooltip.classList.remove('active'));
        });
    }
});
