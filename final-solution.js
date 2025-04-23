/**
 * FINAL SOLUTION - Ultra basic guaranteed to work approach
 */

// Run as soon as page loads
window.onload = function() {
    console.log('FINAL SOLUTION LOADED');
    
    // PART 1: SHOW HARDCODED RESOURCES WITH WORKING IMAGES
    var resourcesContainer = document.getElementById('resources-container');
    if (resourcesContainer) {
        var resources = [
            {
                title: "Elements of AI",
                description: "A free online course that introduces AI concepts without requiring programming knowledge",
                url: "https://www.elementsofai.com/",
                level: "beginner",
                image: "resource1.jpg"
            },
            {
                title: "AI For Everyone",
                description: "A non-technical course designed to help everyone understand AI technologies and their business implications",
                url: "https://www.coursera.org/learn/ai-for-everyone",
                level: "beginner",
                image: "resource2.jpg"
            },
            {
                title: "Machine Learning Crash Course",
                description: "Google's fast-paced, practical introduction to machine learning",
                url: "https://developers.google.com/machine-learning/crash-course",
                level: "intermediate",
                image: "resource3.jpg"
            },
            {
                title: "Fast.ai",
                description: "Practical deep learning for coders with a top-down approach",
                url: "https://www.fast.ai/",
                level: "advanced",
                image: "resource4.jpg"
            }
        ];
        
        // Clear container
        resourcesContainer.innerHTML = '';
        
        // Build HTML for each resource
        resources.forEach(function(resource) {
            var card = document.createElement('div');
            card.className = 'resource-card ' + resource.level;
            
            card.innerHTML = `
                <div class="resource-image">
                    <img src="images/${resource.image}" alt="${resource.title}">
                </div>
                <div class="resource-content">
                    <div class="resource-tags">
                        <span class="resource-tag ${resource.level}">${resource.level}</span>
                    </div>
                    <h3 class="resource-title">${resource.title}</h3>
                    <p class="resource-description">${resource.description}</p>
                    <a href="${resource.url}" class="resource-link" target="_blank">Explore Resource</a>
                </div>
            `;
            
            // Add to container
            resourcesContainer.appendChild(card);
        });
        
        console.log('Loaded hardcoded resources');
    }
};
