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
    
    // Get form data
    const formData = {
        sector: document.getElementById('sector').value,
        serviceType: document.querySelector('input[name="serviceType"]:checked')?.value,
        fullName: document.getElementById('fullName').value,
        company: document.getElementById('company').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        projectDetails: document.getElementById('projectDetails').value,
        budget: document.getElementById('budget').value,
        timestamp: new Date().toISOString(),
        status: 'new'
    };
    
    try {
        // Save to Firebase
        await db.collection('quotes').add(formData);
        
        // Show success
        showToast();
        
        // Reset form and close modal
        document.getElementById('quoteForm').reset();
        closeQuoteModal();
        
    } catch (error) {
        console.error('Error saving quote:', error);
        alert('Une erreur est survenue. Veuillez réessayer ou nous contacter par téléphone.');
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
