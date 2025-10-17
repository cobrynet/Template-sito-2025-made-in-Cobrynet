// Gestione del carosello
document.addEventListener('DOMContentLoaded', function() {
    const carouselDots = document.querySelectorAll('.ellipse');
    const leftArrow = document.querySelector('.chevron-left');
    const rightArrow = document.querySelector('.chevron-right');
    const ctaButton = document.querySelector('.pulsante-cta');
    
    let currentSlide = 0;
    const totalSlides = carouselDots.length;

    // Funzione per aggiornare lo stato del carosello
    function updateCarousel(slideIndex) {
        // Rimuovi la classe active da tutti i dots
        carouselDots.forEach(dot => dot.classList.remove('active'));
        
        // Aggiungi la classe active al dot corrente
        if (carouselDots[slideIndex]) {
            carouselDots[slideIndex].classList.add('active');
        }
        
        currentSlide = slideIndex;
    }

    // Gestione click sui dots del carosello
    carouselDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            updateCarousel(index);
        });
    });

    // Gestione freccia sinistra
    leftArrow.addEventListener('click', () => {
        const newSlide = currentSlide > 0 ? currentSlide - 1 : totalSlides - 1;
        updateCarousel(newSlide);
    });

    // Gestione freccia destra
    rightArrow.addEventListener('click', () => {
        const newSlide = currentSlide < totalSlides - 1 ? currentSlide + 1 : 0;
        updateCarousel(newSlide);
    });

    // Auto-play del carosello (opzionale)
    function autoPlay() {
        const nextSlide = currentSlide < totalSlides - 1 ? currentSlide + 1 : 0;
        updateCarousel(nextSlide);
    }

    // Avvia auto-play ogni 5 secondi
    let autoPlayInterval = setInterval(autoPlay, 5000);

    // Pausa auto-play quando l'utente interagisce
    function pauseAutoPlay() {
        clearInterval(autoPlayInterval);
        setTimeout(() => {
            autoPlayInterval = setInterval(autoPlay, 5000);
        }, 10000); // Riprende dopo 10 secondi di inattività
    }

    // Aggiungi event listeners per pausare l'auto-play
    carouselDots.forEach(dot => dot.addEventListener('click', pauseAutoPlay));
    leftArrow.addEventListener('click', pauseAutoPlay);
    rightArrow.addEventListener('click', pauseAutoPlay);

    // Gestione smooth scroll per i link del menu
    const menuLinks = document.querySelectorAll('.header a[href^="#"]');
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Gestione click sul CTA button
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            // Aggiungi qui la logica per il call-to-action
            console.log('CTA button clicked');
            
            // Esempio: scroll alla sezione contatti
            const footer = document.querySelector('.footer');
            if (footer) {
                footer.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Lazy loading per le immagini di background (simulazione)
    function simulateImageLoading() {
        const placeholders = document.querySelectorAll('[class*="rettangolo"], .foto-header, .carosello-foto1, .foto2');
        
        placeholders.forEach((placeholder, index) => {
            setTimeout(() => {
                placeholder.style.opacity = '0.8';
                placeholder.style.transition = 'opacity 0.3s ease';
                
                // Simula il caricamento di un'immagine
                setTimeout(() => {
                    placeholder.style.opacity = '1';
                }, 300);
            }, index * 100);
        });
    }

    // Avvia la simulazione del caricamento delle immagini
    simulateImageLoading();

    // Gestione hover effects per elementi interattivi
    const interactiveElements = document.querySelectorAll('.pulsante-cta, .ellipse, .social-link');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Parallax effect leggero per alcuni elementi (opzionale)
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.foto-header, .carosello-foto1');
        
        parallaxElements.forEach(element => {
            const speed = 0.1;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Gestione tastiera per accessibilità
    document.addEventListener('keydown', function(e) {
        if (e.target.classList.contains('ellipse')) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.target.click();
            }
        }
        
        // Navigazione con frecce per il carosello
        if (e.key === 'ArrowLeft') {
            const focusedElement = document.activeElement;
            if (focusedElement.classList.contains('ellipse')) {
                leftArrow.click();
            }
        } else if (e.key === 'ArrowRight') {
            const focusedElement = document.activeElement;
            if (focusedElement.classList.contains('ellipse')) {
                rightArrow.click();
            }
        }
    });

    // Aggiungi attributi ARIA per l'accessibilità
    carouselDots.forEach((dot, index) => {
        dot.setAttribute('role', 'button');
        dot.setAttribute('aria-label', `Vai alla slide ${index + 1}`);
        dot.setAttribute('tabindex', '0');
    });

    leftArrow.setAttribute('aria-label', 'Slide precedente');
    rightArrow.setAttribute('aria-label', 'Slide successiva');

    // Inizializza il primo dot come attivo
    updateCarousel(0);
});

// Gestione del ridimensionamento della finestra
window.addEventListener('resize', function() {
    // Aggiorna eventuali calcoli di posizionamento se necessario
    console.log('Window resized');
});

// Utility per debug (rimuovi in produzione)
function debugInfo() {
    console.log('Template sito caricato correttamente');
    console.log('Dimensioni corpo:', document.body.offsetWidth, 'x', document.body.offsetHeight);
}