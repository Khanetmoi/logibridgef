// Initialize Lucide icons
lucide.createIcons();

// Mobile menu toggle
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('hidden');
}

// Smooth scroll
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// Logistics toggle
function switchLogistics(type) {
    const btnAir = document.getElementById('btn-air');
    const btnSea = document.getElementById('btn-sea');
    const contentAir = document.getElementById('content-air');
    const contentSea = document.getElementById('content-sea');
    
    if (type === 'air') {
        btnAir.classList.add('active');
        btnSea.classList.remove('active');
        contentAir.classList.remove('hidden');
        contentSea.classList.add('hidden');
    } else {
        btnSea.classList.add('active');
        btnAir.classList.remove('active');
        contentSea.classList.remove('hidden');
        contentAir.classList.add('hidden');
    }
}

// Modal functions
function openQuoteModal(type = '') {
    const modal = document.getElementById('quoteModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Pre-fill if type specified
    if (type === 'air') {
        document.querySelector('input[value="logistics"]').checked = true;
    } else if (type === 'sea') {
        document.querySelector('input[value="logistics"]').checked = true;
    }
}

function openSectorQuote(sector) {
    openQuoteModal();
    document.getElementById('sector').value = sector;
}

function closeQuoteModal() {
    const modal = document.getElementById('quoteModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal on outside click
document.getElementById('quoteModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeQuoteModal();
    }
});

// Form submission
document.getElementById('quoteForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const originalContent = submitBtn.innerHTML;
    
    // Show loading
    submitBtn.innerHTML = '<div class="loader"></div>';
    submitBtn.disabled = true;
    
    const form = e.target;
    // Get form data using FormData (best for Formspree)
    const formData = new FormData(form);
    
    // Append subject
    formData.append('_subject', "Nouveau devis Logibridge");
    
    try {
        const response = await fetch('https://formspree.io/f/mqeyvegk', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            // Show success
            showToast();
            
            // Reset form and close modal
            form.reset();
            closeQuoteModal();
        } else {
            let errorMsg = 'Erreur lors de l\'envoi du formulaire';
            try {
                const errorData = await response.json();
                if (errorData.errors && errorData.errors.length > 0) {
                    errorMsg = errorData.errors[0].message;
                }
            } catch (err) {}
            throw new Error(errorMsg);
        }
        
    } catch (error) {
        console.error('Error saving quote:', error);
        alert('Une erreur est survenue: ' + error.message + '. Veuillez réessayer ou nous contacter par téléphone.');
    } finally {
        submitBtn.innerHTML = originalContent;
        submitBtn.disabled = false;
        lucide.createIcons();
    }
});

// Toast notification
function showToast() {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 5000);
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('shadow-lg');
    } else {
        nav.classList.remove('shadow-lg');
    }
});

// Smart Call Feature Pre-Fetch
// We pre-fetch the IP to avoid popup blockers and async delay when the user clicks.
let userCountryCode = null;

fetch('https://ipapi.co/json/')
    .then(r => r.json())
    .then(data => {
        if (data && data.country_code) {
            userCountryCode = data.country_code;
        }
    })
    .catch(err => console.error('Location pre-fetch failed:', err));

function handleSmartCall() {
    if (userCountryCode === 'AE') { // UAE
        window.location.href = 'tel:+971528064643';
    } else if (userCountryCode === 'CM') { // Cameroon
        window.location.href = 'tel:+237657763839';
    } else {
        // Fallback options
        const modal = document.getElementById('contactOptionsModal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            window.location.href = 'https://wa.me/971528064643';
        }
    }
}

function closeContactOptionsModal() {
    const modal = document.getElementById('contactOptionsModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close contact modal on outside click
document.getElementById('contactOptionsModal')?.addEventListener('click', function(e) {
    if (e.target === this) {
        closeContactOptionsModal();
    }
});
