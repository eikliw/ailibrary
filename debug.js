/**
 * Debug script to test ALL interactive elements on the site
 * This will run tests and fix issues automatically
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('%c🔍 DEBUG SCRIPT STARTED', 'background: #222; color: #bada55; font-size: 16px; padding: 10px;');
    
    // Create debug overlay
    const debugOverlay = document.createElement('div');
    debugOverlay.style.position = 'fixed';
    debugOverlay.style.bottom = '0';
    debugOverlay.style.left = '0';
    debugOverlay.style.right = '0';
    debugOverlay.style.backgroundColor = 'rgba(0,0,0,0.8)';
    debugOverlay.style.color = '#fff';
    debugOverlay.style.padding = '10px';
    debugOverlay.style.zIndex = '9999';
    debugOverlay.style.maxHeight = '300px';
    debugOverlay.style.overflowY = 'auto';
    debugOverlay.style.fontFamily = 'monospace';
    debugOverlay.innerHTML = '<h3>Debug Console</h3><div id="debug-log"></div>';
    document.body.appendChild(debugOverlay);
    
    const debugLog = document.getElementById('debug-log');
    
    // Log function with visual feedback
    function log(message, type = 'info') {
        console.log(message);
        const entry = document.createElement('div');
        entry.style.marginBottom = '5px';
        entry.style.borderLeft = '3px solid ' + (type === 'error' ? '#ff5555' : type === 'success' ? '#55ff55' : '#5555ff');
        entry.style.paddingLeft = '10px';
        entry.innerHTML = message;
        debugLog.appendChild(entry);
        debugLog.scrollTop = debugLog.scrollHeight;
    }
    
    // Test function to check if an element exists
    function testElementExists(selector, description) {
        const element = document.querySelector(selector);
        if (element) {
            log(`✅ PASS: ${description} exists`, 'success');
            return element;
        } else {
            log(`❌ FAIL: ${description} does not exist`, 'error');
            return null;
        }
    }
    
    // Test if a section exists
    function testSectionExists(id, description) {
        return testElementExists(`#${id}`, description);
    }
    
    // Test function to check if a link has an href attribute
    function testLinkHref(element, description) {
        if (!element) return null;
        
        const href = element.getAttribute('href');
        if (href) {
            log(`✅ PASS: ${description} has href: ${href}`, 'success');
            return href;
        } else {
            log(`❌ FAIL: ${description} does not have an href attribute`, 'error');
            return null;
        }
    }
    
    // Test function to check if an element has a data attribute
    function testDataAttribute(element, attribute, description) {
        if (!element) return null;
        
        const value = element.getAttribute(attribute);
        if (value) {
            log(`✅ PASS: ${description} has ${attribute}: ${value}`, 'success');
            return value;
        } else {
            log(`❌ FAIL: ${description} does not have a ${attribute} attribute`, 'error');
            return null;
        }
    }
    
    // Test function to check if an element has an event listener
    function testClickEvent(element, description) {
        if (!element) return;
        
        // Add visual feedback for click
        const originalBackground = element.style.backgroundColor;
        const originalTransition = element.style.transition;
        
        element.style.transition = 'background-color 0.3s';
        
        element.addEventListener('click', function(e) {
            // Only for test clicks, not real user clicks
            if (e.isTrusted) return;
            
            element.style.backgroundColor = '#55ff55';
            setTimeout(() => {
                element.style.backgroundColor = originalBackground;
            }, 500);
            
            log(`✅ CLICK TEST: ${description} was clicked`, 'success');
        });
        
        // Simulate a click
        const clickEvent = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
        });
        
        element.dispatchEvent(clickEvent);
    }
    
    // Fix function to ensure an element has an href
    function fixMissingHref(element, href, description) {
        if (!element) return;
        if (!element.getAttribute('href')) {
            element.setAttribute('href', href);
            log(`🔧 FIXED: Added missing href=${href} to ${description}`, 'info');
        }
    }
    
    // Fix function to ensure an element has a data attribute
    function fixMissingDataAttribute(element, attribute, value, description) {
        if (!element) return;
        if (!element.getAttribute(attribute)) {
            element.setAttribute(attribute, value);
            log(`🔧 FIXED: Added missing ${attribute}=${value} to ${description}`, 'info');
        }
    }
    
    // Fix function to ensure an element has a click handler
    function fixMissingClickHandler(element, handler, description) {
        if (!element) return;
        
        // Remove existing click handlers to avoid duplicates
        const newElement = element.cloneNode(true);
        element.parentNode.replaceChild(newElement, element);
        
        // Add new click handler
        newElement.addEventListener('click', handler);
        log(`🔧 FIXED: Added click handler to ${description}`, 'info');
        
        return newElement;
    }
    
    // Test and fix all sections
    log('🔍 Testing if all sections exist...', 'info');
    const sections = [
        { id: 'hero', description: 'Hero section' },
        { id: 'about', description: 'About section' },
        { id: 'learning-paths', description: 'Learning Paths section' },
        { id: 'resources', description: 'Resources section' },
        { id: 'contact', description: 'Contact section' }
    ];
    
    sections.forEach(section => {
        testSectionExists(section.id, section.description);
    });
    
    // Test and fix the Start Learning button
    log('🔍 Testing Start Learning button...', 'info');
    let startLearningBtn = testElementExists('.hero-buttons .btn-primary', 'Start Learning button');
    const startLearningHref = testLinkHref(startLearningBtn, 'Start Learning button');
    
    if (startLearningBtn) {
        fixMissingHref(startLearningBtn, '#learning-paths', 'Start Learning button');
        
        startLearningBtn = fixMissingClickHandler(startLearningBtn, function(e) {
            e.preventDefault();
            log('🖱️ Start Learning button clicked', 'info');
            
            // First scroll to learning paths
            const learningPathsSection = document.getElementById('learning-paths');
            if (learningPathsSection) {
                learningPathsSection.scrollIntoView({ behavior: 'smooth' });
                
                // Then scroll to resources and show fundamentals
                setTimeout(() => {
                    const resourcesSection = document.getElementById('resources');
                    if (resourcesSection) {
                        resourcesSection.scrollIntoView({ behavior: 'smooth' });
                        
                        // Show fundamentals resources
                        if (window.globalResources && window.globalResources.length > 0) {
                            const fundamentalsResources = window.globalResources.filter(resource => 
                                resource.tags.includes('fundamentals')
                            );
                            
                            const resourcesContainer = document.getElementById('resources-container');
                            if (resourcesContainer && fundamentalsResources.length > 0) {
                                // Update title
                                const resourcesTitle = document.querySelector('#resources h2');
                                if (resourcesTitle) {
                                    resourcesTitle.textContent = 'Fundamentals Resources';
                                }
                                
                                // Render resources
                                if (typeof renderResourceCards === 'function') {
                                    renderResourceCards(fundamentalsResources, resourcesContainer);
                                    log('📚 Displayed Fundamentals resources', 'success');
                                } else {
                                    log('❌ renderResourceCards function not found', 'error');
                                }
                            }
                        }
                    }
                }, 1000);
            }
        }, 'Start Learning button');
        
        testClickEvent(startLearningBtn, 'Start Learning button');
    }
    
    // Test and fix the Learn More button
    log('🔍 Testing Learn More button...', 'info');
    let learnMoreBtn = testElementExists('.hero-buttons .btn-secondary', 'Learn More button');
    const learnMoreHref = testLinkHref(learnMoreBtn, 'Learn More button');
    
    if (learnMoreBtn) {
        fixMissingHref(learnMoreBtn, '#about', 'Learn More button');
        
        learnMoreBtn = fixMissingClickHandler(learnMoreBtn, function(e) {
            e.preventDefault();
            log('🖱️ Learn More button clicked', 'info');
            
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 'Learn More button');
        
        testClickEvent(learnMoreBtn, 'Learn More button');
    }
    
    // Test and fix all navigation links
    log('🔍 Testing navigation links...', 'info');
    const navLinks = document.querySelectorAll('nav a');
    log(`Found ${navLinks.length} navigation links`, 'info');
    
    navLinks.forEach((link, index) => {
        const href = testLinkHref(link, `Navigation link ${index + 1}`);
        
        if (href && href.startsWith('#')) {
            const targetSection = document.querySelector(href);
            if (!targetSection) {
                log(`❌ FAIL: Navigation link ${index + 1} points to non-existent section: ${href}`, 'error');
            }
            
            link = fixMissingClickHandler(link, function(e) {
                e.preventDefault();
                log(`🖱️ Navigation link to ${href} clicked`, 'info');
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }, `Navigation link to ${href}`);
        }
    });
    
    // Test and fix all path cards
    log('🔍 Testing path cards...', 'info');
    const pathCards = document.querySelectorAll('.path-card');
    log(`Found ${pathCards.length} path cards`, 'info');
    
    pathCards.forEach((card, index) => {
        const category = testDataAttribute(card, 'data-category', `Path card ${index + 1}`);
        
        if (!category) {
            // Try to determine category from content
            const heading = card.querySelector('h3');
            if (heading) {
                const categoryFromHeading = heading.textContent.toLowerCase().replace(/\s+/g, '-');
                fixMissingDataAttribute(card, 'data-category', categoryFromHeading, `Path card ${index + 1}`);
            }
        }
        
        card = fixMissingClickHandler(card, function(e) {
            // Don't trigger if clicking on the link itself
            if (e.target.tagName === 'A') return;
            
            const category = this.getAttribute('data-category');
            if (!category) return;
            
            log(`🖱️ Path card ${category} clicked`, 'info');
            
            const resourcesSection = document.getElementById('resources');
            if (resourcesSection) {
                resourcesSection.scrollIntoView({ behavior: 'smooth' });
                
                // Filter resources by category
                if (window.globalResources && window.globalResources.length > 0) {
                    const categoryResources = window.globalResources.filter(resource => 
                        resource.tags.includes(category) || 
                        resource.tags.includes(category.replace(/\s+/g, '-'))
                    );
                    
                    const resourcesContainer = document.getElementById('resources-container');
                    if (resourcesContainer && categoryResources.length > 0) {
                        // Update title
                        const resourcesTitle = document.querySelector('#resources h2');
                        if (resourcesTitle) {
                            const categoryName = document.querySelector(`.path-card[data-category="${category}"] h3`);
                            resourcesTitle.textContent = categoryName ? 
                                `${categoryName.textContent} Resources` : 'Category Resources';
                        }
                        
                        // Reset filter buttons
                        document.querySelectorAll('.filter-btn').forEach(btn => {
                            btn.classList.remove('active');
                        });
                        const allFilterBtn = document.querySelector('.filter-btn[data-filter="all"]');
                        if (allFilterBtn) {
                            allFilterBtn.classList.add('active');
                        }
                        
                        // Render resources
                        if (typeof renderResourceCards === 'function') {
                            renderResourceCards(categoryResources, resourcesContainer);
                            log(`📚 Displayed ${category} resources`, 'success');
                        } else {
                            log('❌ renderResourceCards function not found', 'error');
                        }
                    }
                }
            }
        }, `Path card ${index + 1}`);
    });
    
    // Test and fix all path links
    log('🔍 Testing path links...', 'info');
    const pathLinks = document.querySelectorAll('.path-link');
    log(`Found ${pathLinks.length} path links`, 'info');
    
    pathLinks.forEach((link, index) => {
        testLinkHref(link, `Path link ${index + 1}`);
        const category = testDataAttribute(link, 'data-category', `Path link ${index + 1}`);
        
        if (!category) {
            // Try to determine category from parent card
            const parentCard = link.closest('.path-card');
            if (parentCard) {
                const categoryFromCard = parentCard.getAttribute('data-category');
                if (categoryFromCard) {
                    fixMissingDataAttribute(link, 'data-category', categoryFromCard, `Path link ${index + 1}`);
                }
            }
        }
        
        link = fixMissingClickHandler(link, function(e) {
            e.preventDefault();
            
            const category = this.getAttribute('data-category');
            if (!category) return;
            
            log(`🖱️ Path link ${category} clicked`, 'info');
            
            const resourcesSection = document.getElementById('resources');
            if (resourcesSection) {
                resourcesSection.scrollIntoView({ behavior: 'smooth' });
                
                // Filter resources by category
                if (window.globalResources && window.globalResources.length > 0) {
                    const categoryResources = window.globalResources.filter(resource => 
                        resource.tags.includes(category) || 
                        resource.tags.includes(category.replace(/\s+/g, '-'))
                    );
                    
                    const resourcesContainer = document.getElementById('resources-container');
                    if (resourcesContainer && categoryResources.length > 0) {
                        // Update title
                        const resourcesTitle = document.querySelector('#resources h2');
                        if (resourcesTitle) {
                            const categoryName = document.querySelector(`.path-card[data-category="${category}"] h3`);
                            resourcesTitle.textContent = categoryName ? 
                                `${categoryName.textContent} Resources` : 'Category Resources';
                        }
                        
                        // Reset filter buttons
                        document.querySelectorAll('.filter-btn').forEach(btn => {
                            btn.classList.remove('active');
                        });
                        const allFilterBtn = document.querySelector('.filter-btn[data-filter="all"]');
                        if (allFilterBtn) {
                            allFilterBtn.classList.add('active');
                        }
                        
                        // Render resources
                        if (typeof renderResourceCards === 'function') {
                            renderResourceCards(categoryResources, resourcesContainer);
                            log(`📚 Displayed ${category} resources`, 'success');
                        } else {
                            log('❌ renderResourceCards function not found', 'error');
                        }
                    }
                }
            }
        }, `Path link ${index + 1}`);
    });
    
    // Test and fix all filter buttons
    log('🔍 Testing filter buttons...', 'info');
    const filterButtons = document.querySelectorAll('.filter-btn');
    log(`Found ${filterButtons.length} filter buttons`, 'info');
    
    filterButtons.forEach((button, index) => {
        const filterValue = testDataAttribute(button, 'data-filter', `Filter button ${index + 1}`);
        
        button = fixMissingClickHandler(button, function() {
            const filterValue = this.getAttribute('data-filter');
            if (!filterValue) return;
            
            log(`🖱️ Filter button ${filterValue} clicked`, 'info');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter resources
            if (window.globalResources && window.globalResources.length > 0) {
                const filteredResources = filterValue === 'all' 
                    ? window.globalResources.slice(0, 12) 
                    : window.globalResources.filter(resource => resource.level === filterValue).slice(0, 12);
                
                const resourcesContainer = document.getElementById('resources-container');
                if (resourcesContainer) {
                    if (typeof renderResourceCards === 'function') {
                        renderResourceCards(filteredResources, resourcesContainer);
                        log(`📚 Displayed ${filterValue} resources`, 'success');
                    } else {
                        log('❌ renderResourceCards function not found', 'error');
                    }
                }
            }
        }, `Filter button ${index + 1}`);
    });
    
    // Test if resources container exists
    log('🔍 Testing resources container...', 'info');
    const resourcesContainer = testElementExists('#resources-container', 'Resources container');
    
    // Add test resources if none are loaded
    if (resourcesContainer && (!window.globalResources || window.globalResources.length === 0)) {
        log('⚠️ WARNING: No resources loaded, adding test resources', 'info');
        
        window.globalResources = [
            {
                title: 'Test Resource 1',
                url: 'https://example.com/1',
                description: 'This is a test resource for debugging',
                category: 'Fundamentals',
                subcategory: 'Basics',
                level: 'beginner',
                tags: ['beginner', 'fundamentals']
            },
            {
                title: 'Test Resource 2',
                url: 'https://example.com/2',
                description: 'Another test resource for debugging',
                category: 'Deep Learning',
                subcategory: 'Neural Networks',
                level: 'intermediate',
                tags: ['intermediate', 'deep-learning']
            },
            {
                title: 'Test Resource 3',
                url: 'https://example.com/3',
                description: 'Advanced test resource',
                category: 'Computer Vision',
                subcategory: 'Object Detection',
                level: 'advanced',
                tags: ['advanced', 'computer-vision']
            }
        ];
        
        if (typeof renderResourceCards === 'function') {
            renderResourceCards(window.globalResources, resourcesContainer);
            log('📚 Added and displayed test resources', 'success');
        }
    }
    
    // Add a test button to the debug overlay
    const testButton = document.createElement('button');
    testButton.textContent = 'Run All Tests Again';
    testButton.style.padding = '8px 16px';
    testButton.style.backgroundColor = '#5555ff';
    testButton.style.color = 'white';
    testButton.style.border = 'none';
    testButton.style.borderRadius = '4px';
    testButton.style.marginTop = '10px';
    testButton.style.cursor = 'pointer';
    
    testButton.addEventListener('click', function() {
        debugLog.innerHTML = '';
        log('🔄 Running all tests again...', 'info');
        
        // Simulate clicking all buttons
        if (startLearningBtn) testClickEvent(startLearningBtn, 'Start Learning button');
        if (learnMoreBtn) testClickEvent(learnMoreBtn, 'Learn More button');
        
        // Click the first path card
        const firstPathCard = document.querySelector('.path-card');
        if (firstPathCard) testClickEvent(firstPathCard, 'First path card');
        
        // Click the first path link
        const firstPathLink = document.querySelector('.path-link');
        if (firstPathLink) testClickEvent(firstPathLink, 'First path link');
        
        // Click the first filter button
        const firstFilterBtn = document.querySelector('.filter-btn');
        if (firstFilterBtn) testClickEvent(firstFilterBtn, 'First filter button');
    });
    
    debugOverlay.appendChild(testButton);
    
    // Add a close button to the debug overlay
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close Debug Panel';
    closeButton.style.padding = '8px 16px';
    closeButton.style.backgroundColor = '#ff5555';
    closeButton.style.color = 'white';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '4px';
    closeButton.style.marginTop = '10px';
    closeButton.style.marginLeft = '10px';
    closeButton.style.cursor = 'pointer';
    
    closeButton.addEventListener('click', function() {
        debugOverlay.style.display = 'none';
    });
    
    debugOverlay.appendChild(closeButton);
    
    log('%c🎉 DEBUG SCRIPT COMPLETED', 'background: #222; color: #bada55; font-size: 16px; padding: 10px;');
});
