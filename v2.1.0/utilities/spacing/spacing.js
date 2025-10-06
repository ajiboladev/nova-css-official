// Nova CSS Documentation - Main JavaScript

// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar') && navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Dropdown Functionality
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const dropdown = toggle.closest('.dropdown');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        // Close other dropdowns
        document.querySelectorAll('.dropdown-menu').forEach(otherMenu => {
            if (otherMenu !== menu) {
                otherMenu.classList.remove('show');
            }
        });
        
        menu.classList.toggle('show');
    });
});

// Close dropdowns when clicking outside
document.addEventListener('click', () => {
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.classList.remove('show');
    });
});

// Sidebar Functionality
const sidebar = document.getElementById('sidebar');
const sidebarClose = document.getElementById('sidebarClose');
const sidebarToggle = document.createElement('button');

// Add sidebar toggle button if sidebar exists
if (sidebar) {
    sidebarToggle.className = 'sidebar-toggle';
    sidebarToggle.innerHTML = '☰';
    sidebarToggle.setAttribute('aria-label', 'Toggle sidebar');
    
    const navContent = document.querySelector('.nav-content');
    if (navContent) {
        const logo = navContent.querySelector('.logo');
        navContent.insertBefore(sidebarToggle, logo.nextSibling);
    }
    
    // Toggle sidebar
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('show');
    });
    
    // Close sidebar
    if (sidebarClose) {
        sidebarClose.addEventListener('click', () => {
            sidebar.classList.remove('show');
        });
    }
    
    // Close sidebar when clicking on a link (mobile)
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 1024) {
                sidebar.classList.remove('show');
            }
        });
    });
}

// Copy to Clipboard Functionality
function copyCode(button) {
    // Find the code element (adjust this based on your HTML structure)
    let codeElement = button.previousElementSibling;
    
    // If previous element isn't code, try other common patterns
    if (!codeElement || !codeElement.textContent) {
        codeElement = button.closest('.code-block')?.querySelector('code, pre');
    }
    
    if (!codeElement) {
        alert('Could not find code to copy');
        return;
    }
    
    const codeToCopy = codeElement.textContent;
    
    // Modern clipboard API (works on most devices)
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(codeToCopy)
            .then(() => {
                showCopySuccess(button);
            })
            .catch(() => {
                // If modern API fails, use fallback method
                fallbackCopy(codeToCopy, button);
            });
    } else {
        // Use fallback method for older browsers
        fallbackCopy(codeToCopy, button);
    }
}

function fallbackCopy(text, button) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopySuccess(button);
        } else {
            alert('Copy failed. Please select and copy manually.');
        }
    } catch (err) {
        alert('Copy failed. Please select and copy manually.');
    } finally {
        document.body.removeChild(textArea);
    }
}

function showCopySuccess(button) {
    const originalText = button.textContent;
    button.textContent = 'Copied!';
    button.style.backgroundColor = '#4CAF50';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.backgroundColor = '';
    }, 2000);
}
// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 100;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Update active state in sidebar
            if (this.classList.contains('sidebar-link')) {
                document.querySelectorAll('.sidebar-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        }
    });
});

// Highlight current section in sidebar on scroll
function highlightCurrentSection() {
    const sections = document.querySelectorAll('.utility-section, .component-section');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    sidebarLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightCurrentSection);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('Nova CSS Documentation loaded successfully!');
    highlightCurrentSection();
});