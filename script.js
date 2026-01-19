// Slide Navigation System
let currentSlide = 1;
const totalSlides = 12;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateSlideCounter();
    updateProgressBar();
    updateNavigationButtons();
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            e.preventDefault();
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            prevSlide();
        }
    });
    
    // Button click handlers
    document.getElementById('nextBtn').addEventListener('click', nextSlide);
    document.getElementById('prevBtn').addEventListener('click', prevSlide);
});

// Navigate to next slide
function nextSlide() {
    if (currentSlide < totalSlides) {
        goToSlide(currentSlide + 1);
    }
}

// Navigate to previous slide
function prevSlide() {
    if (currentSlide > 1) {
        goToSlide(currentSlide - 1);
    }
}

// Go to specific slide
function goToSlide(slideNumber) {
    // Remove active class from current slide
    const currentSlideElement = document.getElementById(`slide-${currentSlide}`);
    currentSlideElement.classList.remove('active');
    currentSlideElement.classList.add('prev');
    
    // Add active class to new slide
    const newSlideElement = document.getElementById(`slide-${slideNumber}`);
    newSlideElement.classList.remove('prev');
    newSlideElement.classList.add('active');
    
    // Update current slide number
    currentSlide = slideNumber;
    
    // Update UI
    updateSlideCounter();
    updateProgressBar();
    updateNavigationButtons();
    
    // Scroll to top of slide content
    newSlideElement.querySelector('.slide-content').scrollTop = 0;
}

// Update slide counter display
function updateSlideCounter() {
    document.getElementById('currentSlide').textContent = currentSlide;
    document.getElementById('totalSlides').textContent = totalSlides;
}

// Update progress bar
function updateProgressBar() {
    const progress = (currentSlide / totalSlides) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;
}

// Update navigation button states
function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // Disable/enable previous button
    if (currentSlide === 1) {
        prevBtn.disabled = true;
    } else {
        prevBtn.disabled = false;
    }
    
    // Disable/enable next button
    if (currentSlide === totalSlides) {
        nextBtn.disabled = true;
    } else {
        nextBtn.disabled = false;
    }
}

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swiped left - go to next slide
            nextSlide();
        } else {
            // Swiped right - go to previous slide
            prevSlide();
        }
    }
}