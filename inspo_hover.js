// Cursor-following glow border + glare effect for inspiration and portfolio cards
(function () {
    function wrapCard(card, gridSpan) {
        const wrapper = document.createElement('div');
        wrapper.className = 'card-glow-wrapper';
        wrapper.style.gridColumn = gridSpan;

        card.parentNode.insertBefore(wrapper, card);
        wrapper.appendChild(card);

        wrapper.addEventListener('mousemove', function (e) {
            const rect = wrapper.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            wrapper.style.setProperty('--mouse-x', x + 'px');
            wrapper.style.setProperty('--mouse-y', y + 'px');
            // Map cursor X across the card to a gradient angle (80° → 260°)
            // so the rainbow rotates as the cursor sweeps left-to-right
            const angle = 80 + (x / rect.width) * 180;
            wrapper.style.setProperty('--iridescent-angle', angle + 'deg');
        });
    }

    function initCardGlow() {
        // Inspiration page portrait/landscape cards
        document.querySelectorAll('.screenshotPortrait, .screenshotLandscape').forEach(function (card) {
            const span = card.classList.contains('screenshotLandscape') ? 'span 2' : 'span 1';
            wrapCard(card, span);
        });

        // Index/portfolio grid cards
        document.querySelectorAll('.newGridItem').forEach(function (card) {
            const span = card.classList.contains('item-1') ? 'span 2' : 'span 1';
            wrapCard(card, span);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCardGlow);
    } else {
        initCardGlow();
    }
})();
