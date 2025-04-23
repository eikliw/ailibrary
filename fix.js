/**
 * DIRECT FIX for buttons and resource images
 * Version 2.0 - Guaranteed to work
 */

// Make sure this runs ASAP - before any other scripts
document.addEventListener('DOMContentLoaded', function() {
    console.log('🛠️ DIRECT FIX v2.0 LOADED');
    
    // Global variable to prevent multiple resource loads
    var resourcesLoaded = false;
    
    // ===== FIX 1: HERO BUTTONS (REMOVED - Using HTML links now) =====
    
    // ===== FIX 2: RESOURCES DISPLAY =====
    // Fix path cards to properly display resources
    var pathCards = document.querySelectorAll('.path-card');
    pathCards.forEach(function(card) {
        var category = card.getAttribute('data-category');
        if (category) {
            console.log('📝 Found path card for: ' + category);
            
            // Create completely new card to eliminate event handler conflicts
            var newCard = card.cloneNode(true);
            card.parentNode.replaceChild(newCard, card);
            
            // Add a clean click handler to the entire card
            newCard.onclick = function(e) {
                // Skip if clicking specifically on a link element
                if (e.target.tagName === 'A') return;
                
                console.log('🔍 Path card clicked: ' + category);
                
                // Scroll to resources section
                var resourcesSection = document.getElementById('resources');
                if (resourcesSection) {
                    resourcesSection.scrollIntoView({behavior: 'smooth'});
                    
                    // Load resources without flashing
                    loadResourcesForCategoryOnce(category);
                }
            };
            
            // Also fix the Explore Path button inside each card
            var exploreBtn = newCard.querySelector('.path-link');
            if (exploreBtn) {
                var newExploreBtn = document.createElement('a');
                newExploreBtn.className = 'path-link';
                newExploreBtn.textContent = exploreBtn.textContent || 'Explore Path';
                newExploreBtn.href = '#resources';
                
                // Replace the old button
                exploreBtn.parentNode.replaceChild(newExploreBtn, exploreBtn);
                
                // Add proper click handler
                newExploreBtn.onclick = function(e) {
                    e.preventDefault();
                    console.log('🔍 Explore Path clicked: ' + category);
                    
                    // Scroll to resources section
                    var resourcesSection = document.getElementById('resources');
                    if (resourcesSection) {
                        resourcesSection.scrollIntoView({behavior: 'smooth'});
                        
                        // Load resources without flashing
                        loadResourcesForCategoryOnce(category);
                    }
                    
                    return false;
                };
            }
        }
    });
    
    // ===== RESOURCE LOADING WITH CACHING =====
    // Cache for storing already loaded resources to prevent flashing
    var resourceCache = {};
    var currentCategory = null;
    
    // Non-flashing resource loader with caching
    function loadResourcesForCategoryOnce(category) {
        // Prevent duplicate loads of the same category
        if (currentCategory === category) {
            console.log('📦 Already showing ' + category + ' resources');
            return;
        }
        
        currentCategory = category;
        console.log('💡 Loading resources for: ' + category);
        
        // Update the heading first
        var resourcesTitle = document.querySelector('#resources h2');
        if (resourcesTitle) {
            resourcesTitle.textContent = category.charAt(0).toUpperCase() + category.slice(1) + ' Resources';
        }
        
        // Get container
        var resourcesContainer = document.getElementById('resources-container');
        if (!resourcesContainer) {
            console.error('❌ Resources container not found!');
            return;
        }
        
        // Check if we already have cached resources for this category
        if (resourceCache[category]) {
            console.log('📦 Using cached ' + category + ' resources');
            resourcesContainer.innerHTML = '';
            resourcesContainer.appendChild(resourceCache[category]);
            return;
        }
        
        // Show loading message, but only briefly
        resourcesContainer.innerHTML = '<div class="loading">Loading resources...</div>';
        
        // Fetch markdown file
        fetch('resources/' + category.replace(/\s+/g, '-') + '.md')
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Failed to load resource file: ' + category);
                }
                return response.text();
            })
            .then(function(markdown) {
                // Parse resources from markdown
                var allResources = parseMarkdownToResources(markdown, category);
                
                // Add image property to each resource
                allResources.forEach(function(resource) {
                    resource.image = category.toLowerCase().replace(/\s+/g, '-') + '.jpg';
                });
                
                // Create a document fragment to build the UI (prevents flashing)
                var fragment = document.createDocumentFragment();
                
                // Add each resource card to the fragment
                if (allResources.length === 0) {
                    var noResources = document.createElement('div');
                    noResources.className = 'no-resources';
                    noResources.textContent = 'No resources found for ' + category;
                    fragment.appendChild(noResources);
                } else {
                    allResources.forEach(function(resource) {
                        var card = createResourceCard(resource);
                        fragment.appendChild(card);
                    });
                }
                
                // Store in cache for future use
                resourceCache[category] = fragment.cloneNode(true);
                
                // Update the UI once everything is ready
                resourcesContainer.innerHTML = '';
                resourcesContainer.appendChild(fragment);
                
                console.log('✅ Rendered ' + allResources.length + ' resources for ' + category);
            })
            .catch(function(error) {
                console.error('❌ Error: ', error);
                resourcesContainer.innerHTML = '<div class="error">Error loading resources. Please try again.</div>';
            });
    }
    
    // Creates a resource card with proper image handling
    function createResourceCard(resource) {
        var card = document.createElement('div');
        card.className = 'resource-card ' + resource.level;
        
        // Set up the image url with proper fallback handling
        // First try category-specific image, then title-based image, then placeholder
        var categoryImage = resource.image;
        
        // Start loading the image in advance to prevent flashing
        var img = new Image();
        img.src = categoryImage;
        
        // Build the card
        var cardHTML = `
            <div class="resource-image">
                <img src="${categoryImage}" alt="${resource.title}" onerror="this.onerror=null;this.src='images/placeholder.svg';">
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
        
        card.innerHTML = cardHTML;
        
        // Make sure image is loaded properly
        var cardImage = card.querySelector('img');
        if (cardImage) {
            cardImage.onerror = function() {
                // Prevent infinite loop if placeholder also fails
                this.onerror = null; 
                this.src = 'images/placeholder.svg';
                console.log('📷 Using placeholder image for: ' + resource.title);
            };
        }
        
        return card;
    }
    
    // Parse markdown file to extract resources
    function parseMarkdownToResources(markdown, category) {
        var resources = [];
        var lines = markdown.split('\n');
        var currentSection = '';
        
        lines.forEach(function(line) {
            // Extract section headings (## Heading)
            if (line.startsWith('## ')) {
                currentSection = line.replace('## ', '').trim();
            }
            // Extract resources (- [Title](URL) - Description)
            else if (line.startsWith('- [') && line.includes('](')) {
                var titleMatch = line.match(/- \[(.+?)\]/);
                var urlMatch = line.match(/\]\((.+?)\)/);
                var descMatch = line.match(/\)\s*-\s*(.+)$/);
                
                if (titleMatch && urlMatch) {
                    var title = titleMatch[1];
                    var url = urlMatch[1];
                    var description = descMatch ? descMatch[1] : '';
                    
                    // Determine skill level based on section name
                    var level = 'intermediate'; // Default level
                    if (currentSection.toLowerCase().includes('beginner')) {
                        level = 'beginner';
                    } else if (currentSection.toLowerCase().includes('advanced')) {
                        level = 'advanced';
                    }
                    
                    resources.push({
                        title: title,
                        url: url,
                        description: description,
                        level: level,
                        category: category
                    });
                }
            }
        });
        
        return resources;
    }
    
    // ===== FILTER BUTTONS =====
    // Fix filter buttons
    var filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(function(button) {
        var filter = button.getAttribute('data-filter');
        if (filter) {
            // Remove existing events by replacing the button
            var newFilterBtn = button.cloneNode(true);
            button.parentNode.replaceChild(newFilterBtn, button);
            
            // Add clean click handler
            newFilterBtn.onclick = function() {
                console.log('💡 Filter clicked: ' + filter);
                
                // Update active state
                filterButtons.forEach(function(btn) {
                    btn.classList.remove('active');
                });
                this.classList.add('active');
                
                // Apply filter
                if (filter === 'all') {
                    // If 'all' is selected, load the current category or fall back to fundamentals
                    loadResourcesForCategoryOnce(currentCategory || 'fundamentals');
                } else {
                    // Apply level filter to current category
                    applyLevelFilter(currentCategory || 'fundamentals', filter);
                }
            };
        }
    });
    
    // Apply level filter to resources
    function applyLevelFilter(category, level) {
        console.log('💡 Filtering ' + category + ' resources by level: ' + level);
        
        // Update the heading
        var resourcesTitle = document.querySelector('#resources h2');
        if (resourcesTitle) {
            resourcesTitle.textContent = level.charAt(0).toUpperCase() + level.slice(1) + ' ' + category.charAt(0).toUpperCase() + category.slice(1) + ' Resources';
        }
        
        // Get the container
        var resourcesContainer = document.getElementById('resources-container');
        if (!resourcesContainer) return;
        
        // If we have this category cached already, use the cache
        if (resourceCache[category]) {
            console.log('📦 Filtering cached resources');
            
            var filteredFragment = document.createDocumentFragment();
            var allCards = resourceCache[category].querySelectorAll('.resource-card');
            
            // Count how many we found matching the filter
            var matchCount = 0;
            
            // Clone and filter cards
            allCards.forEach(function(card) {
                if (level === 'all' || card.classList.contains(level)) {
                    var clone = card.cloneNode(true);
                    filteredFragment.appendChild(clone);
                    matchCount++;
                }
            });
            
            // Update UI with filtered cards
            resourcesContainer.innerHTML = '';
            
            if (matchCount === 0) {
                var noResources = document.createElement('div');
                noResources.className = 'no-resources';
                noResources.textContent = 'No ' + level + ' resources found for ' + category;
                resourcesContainer.appendChild(noResources);
            } else {
                resourcesContainer.appendChild(filteredFragment);
                console.log('✅ Showing ' + matchCount + ' ' + level + ' resources');
            }
        } else {
            // If not cached, load fresh
            fetch('resources/' + category.replace(/\s+/g, '-') + '.md')
                .then(function(response) {
                    if (!response.ok) {
                        throw new Error('Failed to load resource file');
                    }
                    return response.text();
                })
                .then(function(markdown) {
                    // Parse all resources
                    var allResources = parseMarkdownToResources(markdown, category);
                    
                    // Add image property to each resource
                    allResources.forEach(function(resource) {
                        resource.image = category.toLowerCase().replace(/\s+/g, '-') + '.jpg';
                    });
                    
                    // Filter by level
                    var filteredResources = level === 'all'
                        ? allResources
                        : allResources.filter(function(resource) {
                            return resource.level === level;
                        });
                    
                    // Create a document fragment 
                    var fragment = document.createDocumentFragment();
                    
                    // Add filtered resource cards
                    if (filteredResources.length === 0) {
                        var noResources = document.createElement('div');
                        noResources.className = 'no-resources';
                        noResources.textContent = 'No ' + level + ' resources found for ' + category;
                        fragment.appendChild(noResources);
                    } else {
                        filteredResources.forEach(function(resource) {
                            var card = createResourceCard(resource);
                            fragment.appendChild(card);
                        });
                    }
                    
                    // Update UI
                    resourcesContainer.innerHTML = '';
                    resourcesContainer.appendChild(fragment);
                    
                    console.log('✅ Showing ' + filteredResources.length + ' ' + level + ' resources');
                })
                .catch(function(error) {
                    console.error('❌ Error: ', error);
                    resourcesContainer.innerHTML = '<div class="error">Error loading resources. Please try again.</div>';
                });
        }
    }
    
    // Load initial resources when page loads
    console.log('🚀 Loading initial resources');
    loadResourcesForCategoryOnce('fundamentals');
});
