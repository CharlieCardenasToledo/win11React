/* ============================================ */
/* TEMPLATE DE PRESENTACIÓN UIDE - CONTROLADOR */
/* Sistema de navegación mejorado con auto-cálculo */
/* ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    const slides = Array.from(document.querySelectorAll('.slide'));
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indexBtn = document.getElementById('indexBtn');
    const indexModal = document.getElementById('indexModal');
    const closeIndexBtn = document.getElementById('closeIndexBtn');
    const indexList = document.getElementById('indexList');
    const currentSlideSpan = document.getElementById('currentSlide');
    const totalSlidesSpan = document.getElementById('totalSlides');
    const progressBar = document.getElementById('progressBar');

    let currentIndex = 0;
    const totalSlides = slides.length;

    // Set total slides dinámico
    if (totalSlidesSpan) {
        totalSlidesSpan.textContent = totalSlides;
    }

    function showSlide(index) {
        if (index < 0 || index >= totalSlides) return;

        // Ocultar todas
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
            // Accesibilidad
            slide.setAttribute('aria-hidden', i === index ? 'false' : 'true');
        });

        currentIndex = index;

        // Actualizar indicador
        if (currentSlideSpan) {
            currentSlideSpan.textContent = currentIndex + 1;
        }

        // Habilitar / deshabilitar botones
        if (prevBtn) prevBtn.disabled = currentIndex === 0;
        if (nextBtn) nextBtn.disabled = currentIndex === totalSlides - 1;

        // Progreso
        if (progressBar) {
            const progress = ((currentIndex + 1) / totalSlides) * 100;
            progressBar.style.width = `${progress}%`;
        }

        // Opcional: cambiar título del documento según el slide
        const activeTitle = slides[currentIndex].getAttribute('data-title');
        if (activeTitle) {
            document.title = activeTitle;
        }
    }

    // Botones
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            showSlide(currentIndex - 1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            showSlide(currentIndex + 1);
        });
    }

    // Teclado: flechas, espacio, PgUp/PgDown
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
            e.preventDefault();
            showSlide(currentIndex + 1);
        } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
            e.preventDefault();
            showSlide(currentIndex - 1);
        } else if (e.key === 'Home') {
            e.preventDefault();
            showSlide(0);
        } else if (e.key === 'End') {
            e.preventDefault();
            showSlide(totalSlides - 1);
        } else if (e.key.toLowerCase() === 'f') {
            // Modo fullscreen rápido
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(() => { });
            } else {
                document.exitFullscreen().catch(() => { });
            }
        }
    });

    // Gestos touch básicos (swipe)
    let touchStartX = null;
    let touchStartY = null;

    document.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
    });

    document.addEventListener('touchend', (e) => {
        if (touchStartX === null || touchStartY === null) return;
        const touch = e.changedTouches[0];
        const dx = touch.clientX - touchStartX;
        const dy = touch.clientY - touchStartY;

        // Evitar disparar en desplazamientos verticales
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
            if (dx < 0) {
                // Swipe izquierda -> siguiente
                showSlide(currentIndex + 1);
            } else {
                // Swipe derecha -> anterior
                showSlide(currentIndex - 1);
            }
        }

        touchStartX = null;
        touchStartY = null;
    });

    // ============================================
    // FUNCIONALIDAD DE ÍNDICE
    // ============================================

    // Generar lista de índice
    function generateIndex() {
        if (!indexList) return;

        indexList.innerHTML = '';

        slides.forEach((slide, index) => {
            const title = slide.getAttribute('data-title') || `Slide ${index + 1}`;

            const slideItem = document.createElement('div');
            slideItem.className = `
                flex items-center gap-3 sm:gap-4 p-3 sm:p-4 mb-2 sm:mb-3 
                bg-slate-100 dark:bg-[rgba(15,20,25,0.8)] border border-slate-300 dark:border-white/20 rounded-lg sm:rounded-xl 
                cursor-pointer transition-all duration-300 
                hover:bg-uide-accent/20 hover:border-uide-accent hover:scale-[1.02]
                ${index === currentIndex ? 'bg-uide-accent/30 border-uide-accent' : ''}
            `;

            slideItem.innerHTML = `
                <div class="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full 
                    ${index === currentIndex ? 'bg-uide-accent' : 'bg-slate-300 dark:bg-white/10'} 
                    flex items-center justify-center font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                    ${index + 1}
                </div>
                <div class="flex-1">
                    <p class="text-slate-900 dark:text-white text-sm sm:text-base md:text-lg font-medium">
                        ${title}
                    </p>
                </div>
                ${index === currentIndex ? '<i class="fas fa-eye text-uide-accent text-lg sm:text-xl"></i>' : ''}
            `;

            slideItem.addEventListener('click', () => {
                showSlide(index);
                closeIndex();
            });

            indexList.appendChild(slideItem);
        });
    }

    // Abrir índice
    function openIndex() {
        if (!indexModal) return;
        generateIndex();
        indexModal.classList.remove('hidden');
        indexModal.classList.add('flex');
        document.body.style.overflow = 'hidden';
    }

    // Cerrar índice
    function closeIndex() {
        if (!indexModal) return;
        indexModal.classList.add('hidden');
        indexModal.classList.remove('flex');
        document.body.style.overflow = '';
    }

    // Event listeners para el índice
    if (indexBtn) {
        indexBtn.addEventListener('click', openIndex);
    }

    if (closeIndexBtn) {
        closeIndexBtn.addEventListener('click', closeIndex);
    }

    // Cerrar al hacer clic fuera del modal
    if (indexModal) {
        indexModal.addEventListener('click', (e) => {
            if (e.target === indexModal) {
                closeIndex();
            }
        });
    }

    // Cerrar con tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && indexModal && !indexModal.classList.contains('hidden')) {
            closeIndex();
        }
    });

    // Atajo de teclado para abrir índice (tecla 'i')
    document.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === 'i' && indexModal && indexModal.classList.contains('hidden')) {
            e.preventDefault();
            openIndex();
        }
    });

    // Inicial
    showSlide(0);

    console.log('✅ Presentación UIDE inicializada con', totalSlides, 'slides');
});
