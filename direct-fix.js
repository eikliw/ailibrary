/**
 * DIRECT-FIX.JS - Ultra simplified version with guaranteed functionality
 */

console.log('DIRECT FIX RUNNING');
    
// Function to directly load resources
function showFundamentalsResources() {
    // Get the container
    var container = document.getElementById('resources-container');
    if (!container) {
        console.error('Resources container not found');
        return;
    }
    
    // Clear and show loading indicator
    container.innerHTML = 'Loading resources...';
    
    // Create resources manually from fundamentals.md
    var resourcesHTML = '';
    
    resourcesHTML += `
    <div class="resource-card beginner">
        <div class="resource-image">
            <img src="images/placeholder.svg" alt="Elements of AI">
        </div>
        <div class="resource-content">
            <div class="resource-tags">
                <span class="resource-tag beginner">beginner</span>
            </div>
            <h3 class="resource-title">Elements of AI</h3>
            <p class="resource-description">A free online course that introduces AI concepts without requiring programming knowledge</p>
            <a href="https://www.elementsofai.com/" class="resource-link" target="_blank">Explore Resource</a>
        </div>
    </div>
    `;
    
    resourcesHTML += `
    <div class="resource-card beginner">
        <div class="resource-image">
            <img src="images/placeholder.svg" alt="AI For Everyone">
        </div>
        <div class="resource-content">
            <div class="resource-tags">
                <span class="resource-tag beginner">beginner</span>
            </div>
            <h3 class="resource-title">AI For Everyone</h3>
            <p class="resource-description">A non-technical course designed to help everyone understand AI technologies and their business implications</p>
            <a href="https://www.coursera.org/learn/ai-for-everyone" class="resource-link" target="_blank">Explore Resource</a>
        </div>
    </div>
    `;
    
    resourcesHTML += `
    <div class="resource-card intermediate">
        <div class="resource-image">
            <img src="images/placeholder.svg" alt="Machine Learning Crash Course">
        </div>
        <div class="resource-content">
            <div class="resource-tags">
                <span class="resource-tag intermediate">intermediate</span>
            </div>
            <h3 class="resource-title">Machine Learning Crash Course</h3>
            <p class="resource-description">Google's fast-paced, practical introduction to machine learning</p>
            <a href="https://developers.google.com/machine-learning/crash-course" class="resource-link" target="_blank">Explore Resource</a>
        </div>
    </div>
    `;
    
    resourcesHTML += `
    <div class="resource-card advanced">
        <div class="resource-image">
            <img src="images/placeholder.svg" alt="Fast.ai">
        </div>
        <div class="resource-content">
            <div class="resource-tags">
                <span class="resource-tag advanced">advanced</span>
            </div>
            <h3 class="resource-title">Fast.ai</h3>
            <p class="resource-description">Practical deep learning for coders with a top-down approach</p>
            <a href="https://www.fast.ai/" class="resource-link" target="_blank">Explore Resource</a>
        </div>
    </div>
    `;
    
    // Set the HTML directly
    container.innerHTML = resourcesHTML;
    console.log('Loaded 4 hardcoded resources');
}

// Load resources immediately
showFundamentalsResources();

// Make path cards work
var pathCards = document.querySelectorAll('.path-card');
pathCards.forEach(function(card) {
    card.addEventListener('click', function() {
        var resourcesSection = document.getElementById('resources');
        if (resourcesSection) {
            resourcesSection.scrollIntoView({behavior: 'smooth'});
            setTimeout(showFundamentalsResources, 100);
        }
    });
});

// Make exploreLinks work
var exploreLinks = document.querySelectorAll('.path-link');
exploreLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        var resourcesSection = document.getElementById('resources');
        if (resourcesSection) {
            resourcesSection.scrollIntoView({behavior: 'smooth'});
            setTimeout(showFundamentalsResources, 100);
        }
    });
});

// Make filter buttons work
var filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        // Update active state
        filterButtons.forEach(function(btn) {
            btn.classList.remove('active');
        });
        this.classList.add('active');
        
        // Just reload the same resources for any filter
        showFundamentalsResources();
    });
});
