// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
});

// Form Submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Show loading state on the button
        const submitButton = this.querySelector('.submit-button');
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        // Send the email using EmailJS
        emailjs.send('service_ryri2hd', 'template_an0n9ja', {
            from_name: data.name,
            email: data.email,
            subject: data.subject,
            message: data.message
        }, 'DcEd9Pb6OY_G43UaW')
        .then(function() {
            // Show success message
            submitButton.textContent = 'Message Sent!';
            submitButton.style.backgroundColor = 'var(--secondary-color)';
            
            // Reset the form
            contactForm.reset();
            
            // Reset button after 3 seconds
            setTimeout(function() {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
                submitButton.style.backgroundColor = '';
            }, 3000);
        })
        .catch(function(error) {
            // Show error message
            console.error('Error sending email:', error);
            submitButton.textContent = 'Error! Try Again';
            submitButton.style.backgroundColor = '#e74c3c';
            
            // Reset button after 3 seconds
            setTimeout(function() {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
                submitButton.style.backgroundColor = '';
            }, 3000);
        });
    });
}

// Scroll Animation for Sections
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.6s ease-out';
    observer.observe(section);
});

// Navbar Background Change on Scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'transparent';
        navbar.style.boxShadow = 'none';
    }
});

// Typing Animation for Hero Section
const heroText = document.querySelector('.hero-content h1');
if (heroText) {
    const text = heroText.textContent;
    heroText.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            heroText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }

    typeWriter();
}

// Project Card Animation
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    // Add entrance animation class to project cards
    projectCards.forEach(card => {
        card.style.animation = 'projectCardEntrance 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards';
        card.style.opacity = '0';
    });
    
    // Add intersection observer to trigger animations when cards come into view
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add hover animations for icons and links
                const icon = entry.target.querySelector('.project-icon');
                if (icon) {
                    icon.style.animation = 'pulse 2s infinite';
                }
                
                // Add staggered animation for tech stack items
                const techItems = entry.target.querySelectorAll('.tech-stack span');
                techItems.forEach((item, index) => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.transition = 'all 0.3s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 300 + (index * 100));
                });
                
                projectObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    // Observe each project card
    projectCards.forEach(card => {
        projectObserver.observe(card);
    });
    
    // Add magnetic effect to project cards
    projectCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Subtle rotation effect
            const strength = 15;
            this.style.transform = `translateY(-15px) perspective(1000px) rotateX(${y / strength * -1}deg) rotateY(${x / strength}deg)`;
            
            // Move icon slightly
            const icon = this.querySelector('.project-icon');
            if (icon) {
                icon.style.transform = `translate(${x / strength * 0.5}px, ${y / strength * 0.5}px) scale(1.1) rotate(10deg)`;
            }
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset all transformations
            this.style.transform = 'translateY(0) perspective(1000px) rotateX(0) rotateY(0)';
            
            const icon = this.querySelector('.project-icon');
            if (icon) {
                icon.style.transform = '';
            }
        });
    });
});

// Add a pulse animation to the keyframes
const styleSheet = document.styleSheets[0];
const keyframes = `
@keyframes pulse {
    0% {
        transform: scale(1);
        box-shadow: 0 8px 15px rgba(79, 70, 229, 0.2);
    }
    50% {
        transform: scale(1.1);
        box-shadow: 0 15px 20px rgba(79, 70, 229, 0.3);
    }
    100% {
        transform: scale(1);
        box-shadow: 0 8px 15px rgba(79, 70, 229, 0.2);
    }
}`;

// Check if we can append to stylesheet
try {
    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
} catch (e) {
    // If there's an error, create a new style element
    const styleElement = document.createElement('style');
    styleElement.textContent = keyframes;
    document.head.appendChild(styleElement);
}

// Skills Progress Animation
const skillCategories = document.querySelectorAll('.skill-category');
skillCategories.forEach(category => {
    const skills = category.querySelectorAll('li');
    skills.forEach(skill => {
        skill.style.opacity = '0';
        skill.style.transform = 'translateX(-20px)';
        skill.style.transition = 'all 0.3s ease-out';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skills.forEach((skill, index) => {
                    setTimeout(() => {
                        skill.style.opacity = '1';
                        skill.style.transform = 'translateX(0)';
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.5 });

    observer.observe(category);
});

// Profile Picture Animation
const aboutImage = document.querySelector('.about-image');
if (aboutImage) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.5 });

    aboutImage.style.opacity = '0';
    aboutImage.style.transform = 'translateX(-50px)';
    aboutImage.style.transition = 'all 0.8s ease-out';
    observer.observe(aboutImage);
}

// Enhanced About Section Animations
const aboutDetails = document.querySelectorAll('.detail');
aboutDetails.forEach((detail, index) => {
    detail.style.opacity = '0';
    detail.style.transform = 'translateY(20px)';
    detail.style.transition = `all 0.5s ease-out ${index * 0.2}s`;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.5 });

    observer.observe(detail);
});

// Project button functionality
document.addEventListener('DOMContentLoaded', function() {
    // Handle GitHub links to ensure they open in new tabs
    const githubLinks = document.querySelectorAll('.project-link.github-link');
    githubLinks.forEach(link => {
        if (!link.hasAttribute('target')) {
            link.setAttribute('target', '_blank');
        }
        if (!link.hasAttribute('rel')) {
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
    
    // Set up share buttons
    const shareButtons = document.querySelectorAll('.project-link.share-link');
    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectName = this.getAttribute('data-project');
            const projectUrl = this.getAttribute('data-url');
            showShareModal(projectName, projectUrl);
        });
    });
    
    // Handle share modal functionality
    function showShareModal(projectName, projectUrl) {
        const shareModal = document.getElementById('shareModal');
        const shareProjectName = document.getElementById('shareProjectName');
        const shareUrlInput = document.getElementById('shareUrlInput');
        
        if (shareModal && shareProjectName && shareUrlInput) {
            // Update modal content
            shareProjectName.textContent = projectName || 'Project';
            shareUrlInput.value = projectUrl || window.location.href;
            
            // Update social links
            updateSocialLinks(projectName, projectUrl);
            
            // Show the modal
            shareModal.style.display = 'block';
        }
    }
    
    function updateSocialLinks(projectName, projectUrl) {
        const shareText = `Check out this amazing project: ${projectName}`;
        
        const shareFacebook = document.getElementById('shareFacebook');
        const shareTwitter = document.getElementById('shareTwitter');
        const shareLinkedin = document.getElementById('shareLinkedin');
        const shareWhatsapp = document.getElementById('shareWhatsapp');
        
        if (shareFacebook) {
            shareFacebook.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(projectUrl)}&quote=${encodeURIComponent(shareText)}`;
        }
        
        if (shareTwitter) {
            shareTwitter.href = `https://twitter.com/intent/tweet?url=${encodeURIComponent(projectUrl)}&text=${encodeURIComponent(shareText)}`;
        }
        
        if (shareLinkedin) {
            shareLinkedin.href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(projectUrl)}`;
        }
        
        if (shareWhatsapp) {
            shareWhatsapp.href = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + projectUrl)}`;
        }
    }
    
    // Set up close modal functionality
    const closeModal = document.querySelector('.close-modal');
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            const shareModal = document.getElementById('shareModal');
            if (shareModal) {
                shareModal.style.display = 'none';
            }
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        const shareModal = document.getElementById('shareModal');
        if (shareModal && e.target === shareModal) {
            shareModal.style.display = 'none';
        }
    });
    
    // Copy link functionality
    const copyShareLink = document.getElementById('copyShareLink');
    if (copyShareLink) {
        copyShareLink.addEventListener('click', function() {
            const shareUrlInput = document.getElementById('shareUrlInput');
            if (shareUrlInput) {
                shareUrlInput.select();
                shareUrlInput.setSelectionRange(0, 99999);
                
                try {
                    document.execCommand('copy');
                    this.textContent = 'Copied!';
                    
                    setTimeout(() => {
                        this.textContent = 'Copy';
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy:', err);
                }
            }
        });
    }
    
    // Set up social share options to open in popup windows
    const socialShareLinks = document.querySelectorAll('.share-option');
    socialShareLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const url = this.getAttribute('href');
            if (!url) return;
            
            const width = 600;
            const height = 400;
            const left = (window.innerWidth - width) / 2;
            const top = (window.innerHeight - height) / 2;
            
            window.open(
                url,
                'share-window',
                `width=${width},height=${height},left=${left},top=${top},location=0,menubar=0,toolbar=0,status=0,scrollbars=1,resizable=1`
            );
        });
    });
});

// Chatbot Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get chatbot elements
    const chatbotButton = document.getElementById('chatbotButton');
    const chatbotContainer = document.getElementById('chatbotContainer');
    const closeChatbot = document.getElementById('closeChatbot');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const userInput = document.getElementById('userInput');
    const sendMessage = document.getElementById('sendMessage');
    
    // Toggle chatbot visibility
    chatbotButton.addEventListener('click', function() {
        chatbotContainer.classList.toggle('active');
        if (chatbotContainer.classList.contains('active')) {
            userInput.focus();
        }
    });
    
    // Close chatbot
    closeChatbot.addEventListener('click', function() {
        chatbotContainer.classList.remove('active');
    });
    
    // Send message when clicking send button
    sendMessage.addEventListener('click', function() {
        sendUserMessage();
    });
    
    // Send message when pressing Enter key
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendUserMessage();
        }
    });
    
    // Function to send user message
    function sendUserMessage() {
        const message = userInput.value.trim();
        if (message === '') return;
        
        // Add user message to chat
        addMessage('user', message);
        
        // Clear input field
        userInput.value = '';
        
        // Show typing indicator
        showTypingIndicator();
        
        // Process the message and get response (with delay for realistic effect)
        setTimeout(() => {
            const response = getBotResponse(message);
            
            // Remove typing indicator and add bot response
            removeTypingIndicator();
            addMessage('bot', response);
            
            // Scroll to bottom of chat
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
    }
    
    // Function to add a message to the chat
    function addMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.className = sender === 'user' ? 'user-message' : 'bot-message';
        
        const avatarElement = document.createElement('div');
        avatarElement.className = sender === 'user' ? 'user-avatar' : 'bot-avatar';
        
        const iconElement = document.createElement('i');
        iconElement.className = sender === 'user' ? 'fas fa-user' : 'fas fa-robot';
        
        const contentElement = document.createElement('div');
        contentElement.className = 'message-content';
        contentElement.textContent = message;
        
        avatarElement.appendChild(iconElement);
        messageElement.appendChild(avatarElement);
        messageElement.appendChild(contentElement);
        
        chatbotMessages.appendChild(messageElement);
        
        // Scroll to bottom of chat
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Function to show typing indicator
    function showTypingIndicator() {
        const typingElement = document.createElement('div');
        typingElement.className = 'bot-message typing-indicator-container';
        typingElement.id = 'typingIndicator';
        
        const avatarElement = document.createElement('div');
        avatarElement.className = 'bot-avatar';
        
        const iconElement = document.createElement('i');
        iconElement.className = 'fas fa-robot';
        
        const indicatorElement = document.createElement('div');
        indicatorElement.className = 'typing-indicator';
        
        // Add the three dots
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('span');
            indicatorElement.appendChild(dot);
        }
        
        avatarElement.appendChild(iconElement);
        typingElement.appendChild(avatarElement);
        typingElement.appendChild(indicatorElement);
        
        chatbotMessages.appendChild(typingElement);
        
        // Scroll to bottom of chat
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Function to remove typing indicator
    function removeTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    // Function to get bot response based on user query
    function getBotResponse(message) {
        // Convert message to lowercase for easier matching
        const lowerMessage = message.toLowerCase();
        
        // Common greetings
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            return "Hello! How can I help you today?";
        }
        
        // Questions about skills
        if (lowerMessage.includes('skill') || lowerMessage.includes('technologies') || lowerMessage.includes('tech stack')) {
            return "Mehtab is skilled in full-stack web development with expertise in JavaScript, React, Node.js, Express, MongoDB, HTML5, CSS3, and responsive design principles. He also has experience with various frameworks and tools like Redux, Next.js, and Git.";
        }
        
        // Questions about experience
        if (lowerMessage.includes('experience') || lowerMessage.includes('work history') || lowerMessage.includes('background')) {
            return "Mehtab has worked on various web development projects, creating responsive websites, web applications, and backend systems. He has experience in both frontend and backend development, with a focus on creating user-friendly interfaces and robust server-side solutions.";
        }
        
        // Questions about projects
        if (lowerMessage.includes('project') || lowerMessage.includes('portfolio')) {
            return "Mehtab has worked on several exciting projects. You can view them in the Projects section of this website. These include web applications, responsive websites, and full-stack solutions. Each project highlights different skills and technologies.";
        }
        
        // Questions about contact
        if (lowerMessage.includes('contact') || lowerMessage.includes('hire') || lowerMessage.includes('email') || lowerMessage.includes('reach')) {
            return "You can contact Mehtab through the contact form on this website, or via email at work.mehtabalimondal@gmail.com. He's currently open to new opportunities and project collaborations.";
        }
        
        // Questions about education
        if (lowerMessage.includes('education') || lowerMessage.includes('degree') || lowerMessage.includes('study')) {
            return "Mehtab has a Bachelor's degree in Computer Science with a focus on web technologies and software development. He also continuously learns through online courses and practical project work.";
        }
        
        // Questions about availability
        if (lowerMessage.includes('available') || lowerMessage.includes('free') || lowerMessage.includes('schedule')) {
            return "Mehtab is currently available for freelance work and full-time opportunities. You can discuss your project needs by reaching out through the contact form.";
        }
        
        // Questions about rates or pricing
        if (lowerMessage.includes('rate') || lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('charge')) {
            return "Pricing depends on project requirements, scope, and timeline. Please reach out through the contact form with your project details for a custom quote.";
        }
        
        // Questions about timeline
        if (lowerMessage.includes('how long') || lowerMessage.includes('timeline') || lowerMessage.includes('deadline')) {
            return "Project timelines vary based on complexity and scope. Mehtab prioritizes delivering high-quality work within agreed timeframes. Contact with your project details for a more specific timeline estimate.";
        }
        
        // Questions about process
        if (lowerMessage.includes('process') || lowerMessage.includes('how do you work') || lowerMessage.includes('methodology')) {
            return "Mehtab follows an agile development approach, starting with requirements gathering, then moving to design, development, testing, and deployment. He maintains clear communication throughout the project lifecycle.";
        }
        
        // Gratitude or ending conversation
        if (lowerMessage.includes('thank') || lowerMessage.includes('thanks') || lowerMessage.includes('appreciated')) {
            return "You're welcome! Feel free to ask if you have any other questions.";
        }
        
        // Default response for unrecognized queries
        return "That's a great question! For specific information about this topic, please reach out directly through the contact form and Mehtab will get back to you with more details.";
    }
});

// Custom Cursor Animation
document.addEventListener('DOMContentLoaded', function() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    // Check if cursor elements exist
    if (!cursorDot || !cursorOutline) {
        console.warn('Custom cursor elements not found!');
        return;
    }
    
    // Add custom cursor class to body
    document.body.classList.add('custom-cursor');
    
    // Initial positioning to avoid flash
    cursorDot.style.opacity = '0';
    cursorOutline.style.opacity = '0';
    
    // Store mouse position
    let mouseX = 0;
    let mouseY = 0;
    
    // Store current position
    let dotX = 0;
    let dotY = 0;
    let outlineX = 0;
    let outlineY = 0;
    
    // Set smooth animation speeds
    const dotSpeed = 1; // Faster for dot
    const outlineSpeed = 0.2; // Slower for outline
    
    // Variables for trail optimization
    let trailThrottle = false;
    const trailDensity = 5; // Higher number = less frequent trails
    
    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        // Store mouse position
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Show cursor elements after first movement
        if (cursorDot.style.opacity === '0') {
            cursorDot.style.opacity = '1';
            cursorOutline.style.opacity = '1';
        }
        
        // Create cursor trail
        createCursorTrail(e.clientX, e.clientY);
    });
    
    // Function to create cursor trail
    function createCursorTrail(x, y) {
        // Skip if throttling
        if (trailThrottle) return;
        
        // Set throttle
        trailThrottle = true;
        setTimeout(() => {
            trailThrottle = false;
        }, trailDensity);
        
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        document.body.appendChild(trail);
        
        // Position the trail dot
        trail.style.left = `${x}px`;
        trail.style.top = `${y}px`;
        
        // Animate and remove
        trail.style.animation = 'cursorTrailFade 0.8s forwards';
        
        // Remove from DOM after animation
        setTimeout(() => {
            trail.remove();
        }, 800);
    }
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursorDot.style.opacity = '0';
        cursorOutline.style.opacity = '0';
    });
    
    // Show cursor when entering window
    document.addEventListener('mouseenter', () => {
        cursorDot.style.opacity = '1';
        cursorOutline.style.opacity = '1';
    });
    
    // Add special effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .hamburger, .project-card, input, textarea, .cta-button');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.width = '60px';
            cursorOutline.style.height = '60px';
            cursorOutline.style.backgroundColor = 'rgba(79, 70, 229, 0.1)';
            // Add subtle scale to dot
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.width = '40px';
            cursorOutline.style.height = '40px';
            cursorOutline.style.backgroundColor = 'transparent';
            // Reset dot
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
    
    // Animation loop for smooth movement
    function animateCursor() {
        // Calculate smooth movement
        dotX += (mouseX - dotX) * dotSpeed;
        dotY += (mouseY - dotY) * dotSpeed;
        outlineX += (mouseX - outlineX) * outlineSpeed;
        outlineY += (mouseY - outlineY) * outlineSpeed;
        
        // Apply positions
        cursorDot.style.left = `${dotX}px`;
        cursorDot.style.top = `${dotY}px`;
        cursorOutline.style.left = `${outlineX}px`;
        cursorOutline.style.top = `${outlineY}px`;
        
        // Continue animation
        requestAnimationFrame(animateCursor);
    }
    
    // Start animation
    animateCursor();
    
    // Disable cursor on touch devices
    if ('ontouchstart' in window) {
        document.body.classList.remove('custom-cursor');
        cursorDot.style.display = 'none';
        cursorOutline.style.display = 'none';
    }
});

// Add magnetic effect to buttons
const magneticButtons = document.querySelectorAll('.cta-button, .submit-button');

magneticButtons.forEach(button => {
    button.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        // The strength of the magnetic effect
        const strength = 15;
        
        // Apply the transform
        this.style.transform = `translate(${x / strength}px, ${y / strength}px)`;
    });
    
    button.addEventListener('mouseleave', function() {
        // Reset the transform
        this.style.transform = '';
    });
}); 