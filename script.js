// Speaking Up - JavaScript Functionality

document.addEventListener("DOMContentLoaded", function() {
    console.log("Speaking Up page loaded successfully");
    
    // Smooth scroll behavior for navigation links
    const navLinks = document.querySelectorAll("a[href^=\"#\"]");
    
    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth" });
            }
        });
    });
});

// Function to add article content dynamically
function updateArticleContent(content) {
    const articleContent = document.querySelector(".article-content");
    if (articleContent) {
        articleContent.innerHTML = content;
    }
}

// Function to update meta information
function updateArticleMeta(date, readingTime) {
    const publishedDate = document.querySelector(".published-date");
    const readTime = document.querySelector(".reading-time");
    
    if (publishedDate) publishedDate.textContent = `Published ${date}`;
    if (readTime) readTime.textContent = `Est. Reading Time: ${readingTime}`;
}

// Handle social links
document.addEventListener("DOMContentLoaded", function() {
    // Email link handler
    const emailLink = document.querySelector('a[href^="mailto:"]');
    if (emailLink) {
        emailLink.addEventListener('click', function(e) {
            // Try to open email client
            const email = this.href.replace('mailto:', '');
            
            // For better compatibility, we'll let the browser handle the mailto: protocol
            // If it doesn't work, the user will see the email address
            setTimeout(function() {
                if (!document.hasFocus()) {
                    // Email client opened successfully
                    return;
                }
                // If email client didn't open, show the email address
                alert('Please email us at: ' + email);
            }, 1000);
        });
    }
    
    // Ensure external links open in new tabs (backup for target="_blank")
    const externalLinks = document.querySelectorAll('a[href^="http"], a[href^="https"]');
    externalLinks.forEach(link => {
        if (!link.hasAttribute('target')) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });

    // Initialize rating system
    initializeRatingSystem();
});

// Rating System Functionality
function initializeRatingSystem() {
    const stars = document.querySelectorAll('.star');
    const ratingNumber = document.getElementById('rating-number');
    const ratingStarsDisplay = document.getElementById('rating-stars-display');
    const ratingCount = document.getElementById('rating-count');
    const userRating = document.getElementById('user-rating');

    // Initialize ratings data (in a real app, this would come from a server)
    let ratingsData = loadRatingsData();
    
    // Update display
    updateRatingDisplay(ratingsData);

    // Add click handlers to stars
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.dataset.rating);
            submitRating(rating, ratingsData);
        });

        // Add hover effects
        star.addEventListener('mouseenter', function() {
            const rating = parseInt(this.dataset.rating);
            highlightStars(rating);
        });
    });

    // Reset stars on mouse leave
    document.getElementById('rating-stars').addEventListener('mouseleave', function() {
        const userRatingValue = getUserRating();
        highlightStars(userRatingValue);
    });

    function highlightStars(rating) {
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }

    function submitRating(rating, data) {
        // Save user rating
        localStorage.setItem('userArticleRating', rating);
        
        // Add to ratings data (in a real app, this would be sent to server)
        data.ratings.push(rating);
        data.count = data.ratings.length;
        
        // Recalculate average
        data.average = data.ratings.reduce((a, b) => a + b, 0) / data.ratings.length;
        
        // Save updated data
        saveRatingsData(data);
        
        // Update display
        updateRatingDisplay(data);
        
        // Show confirmation
        showRatingConfirmation(rating);
    }

    function updateRatingDisplay(data) {
        const average = data.average.toFixed(1);
        const count = data.count;
        const userRatingValue = getUserRating();

        // Update average rating
        ratingNumber.textContent = average;
        
        // Update star display
        const fullStars = Math.floor(average);
        const hasHalfStar = average % 1 >= 0.5;
        let starsDisplay = '';
        
        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                starsDisplay += '★';
            } else if (i === fullStars && hasHalfStar) {
                starsDisplay += '☆'; // Could use half star if supported
            } else {
                starsDisplay += '☆';
            }
        }
        
        ratingStarsDisplay.textContent = starsDisplay;
        ratingCount.textContent = `(${count} ${count === 1 ? 'vote' : 'votes'})`;
        
        // Update user rating display
        if (userRatingValue > 0) {
            userRating.textContent = `${userRatingValue} star${userRatingValue !== 1 ? 's' : ''}`;
            highlightStars(userRatingValue);
        } else {
            userRating.textContent = 'Not rated yet';
            highlightStars(0);
        }
    }

    function getUserRating() {
        return parseInt(localStorage.getItem('userArticleRating')) || 0;
    }

    function loadRatingsData() {
        // Load from localStorage (in a real app, this would be from a server)
        const saved = localStorage.getItem('articleRatings');
        if (saved) {
            return JSON.parse(saved);
        }
        
        // Default data with some sample ratings
        return {
            ratings: [5, 4, 5, 4, 5, 3, 4, 5], // Sample ratings
            count: 8,
            average: 4.4
        };
    }

    function saveRatingsData(data) {
        localStorage.setItem('articleRatings', JSON.stringify(data));
    }

    function showRatingConfirmation(rating) {
        // Simple confirmation message
        const confirmation = document.createElement('div');
        confirmation.textContent = `Thank you for rating this article ${rating} star${rating !== 1 ? 's' : ''}!`;
        confirmation.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--accent-color, #2c5282);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(confirmation);
        
        setTimeout(() => {
            confirmation.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(confirmation);
            }, 300);
        }, 3000);
    }
}

// Add CSS animations for confirmation message
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);
