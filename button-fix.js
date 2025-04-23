/**
 * BUTTON FIX - The most basic approach possible
 */

window.onload = function() {
    console.log('BUTTON FIX LOADED');
    
    // 1. Add direct onclick handlers to the buttons
    var startLearningBtn = document.querySelector('.hero-buttons .btn-primary');
    if (startLearningBtn) {
        startLearningBtn.onclick = function(e) {
            e.preventDefault();
            console.log('Start Learning clicked');
            
            // Scroll to learning paths
            var learningPathsSection = document.getElementById('learning-paths');
            if (learningPathsSection) {
                learningPathsSection.scrollIntoView({behavior: 'smooth'});
                
                // Then scroll to resources
                setTimeout(function() {
                    var resourcesSection = document.getElementById('resources');
                    if (resourcesSection) {
                        resourcesSection.scrollIntoView({behavior: 'smooth'});
                    }
                }, 800);
            }
            
            return false;
        };
    }
    
    var learnMoreBtn = document.querySelector('.hero-buttons .btn-secondary');
    if (learnMoreBtn) {
        learnMoreBtn.onclick = function(e) {
            e.preventDefault();
            console.log('Learn More clicked');
            
            var aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({behavior: 'smooth'});
            }
            
            return false;
        };
    }
    
    // Add script tag to run direct-fix.js after this script
    var scriptTag = document.createElement('script');
    scriptTag.src = 'direct-fix.js';
    document.body.appendChild(scriptTag);
};
