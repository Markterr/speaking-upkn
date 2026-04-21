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
});
