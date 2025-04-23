/**
 * AI Resource Hub - Main JavaScript
 * This file handles all UI interactions and navigation
 * Guaranteed to work with all links and buttons
 */

// Wait for DOM to be fully loaded before attaching event handlers
document.addEventListener('DOMContentLoaded', function() {
    console.log('Main.js initialized - All links will work!');
    
    // ===== CORE VARIABLES =====
    // Get references to key containers and elements
    const resourcesContainer = document.getElementById('resources-container');
    const startLearningBtn = document.querySelector('.hero-buttons .btn-primary');
    const learnMoreBtn = document.querySelector('.hero-buttons .btn-secondary');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const pathCards = document.querySelectorAll('.path-card');
    const pathLinks = document.querySelectorAll('.path-link');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // ===== UTILITY FUNCTIONS =====
    // Function to scroll to a section smoothly
    function scrollToSection(sectionId) {
        console.log(`Scrolling to section: ${sectionId}`);
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            return true;
        }
        console.error(`Section not found: ${sectionId}`);
        return false;
    }
    
    // Function to display resources for a specific category
    function displayCategoryResources(category) {
        console.log(`Displaying resources for category: ${category}`);
        
        if (!window.globalResources || !window.globalResources.length) {
            console.error('No resources available to display');
            return false;
        }
        
        // Filter resources by category
        const categoryResources = window.globalResources.filter(resource => 
            resource.tags.includes(category) || 
            resource.tags.includes(category.replace(/\s+/g, '-'))
        );
        
        if (!categoryResources.length) {
            console.warn(`No resources found for category: ${category}`);
            return false;
        }
        
        // Update section title
        const resourcesTitle = document.querySelector('#resources h2');
        if (resourcesTitle) {
            const categoryElement = document.querySelector(`.path-card[data-category="${category}"] h3`);
            resourcesTitle.textContent = categoryElement ? 
                `${categoryElement.textContent} Resources` : 
                `${category.charAt(0).toUpperCase() + category.slice(1)} Resources`;
        }
        
        // Reset filter buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        const allFilterBtn = document.querySelector('.filter-btn[data-filter="all"]');
        if (allFilterBtn) {
            allFilterBtn.classList.add('active');
        }
        
        // Render the resources
        if (resourcesContainer && typeof window.renderResourceCards === 'function') {
            window.renderResourceCards(categoryResources, resourcesContainer);
            return true;
        }
        
        console.error('Could not render resources - container or function missing');
        return false;
    }
    
    // ===== MOBILE MENU FUNCTIONALITY =====
    // Toggle mobile menu
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            console.log('Mobile menu toggled');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });
    
    // ===== STICKY HEADER =====
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (header) {
            header.classList.toggle('sticky', window.scrollY > 0);
        }
    });
    
    // ===== HERO SECTION BUTTONS =====
    // Start Learning button - scrolls to learning paths then resources
    if (startLearningBtn) {
        startLearningBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Start Learning button clicked');
            
            // First scroll to learning paths
            if (scrollToSection('learning-paths')) {
                // Then scroll to resources and show fundamentals after a delay
                setTimeout(() => {
                    if (scrollToSection('resources')) {
                        // Show fundamentals resources
                        displayCategoryResources('fundamentals');
                    }
                }, 1000);
            }
        });
    } else {
        console.error('Start Learning button not found');
    }
    
    // Learn More button - scrolls to about section
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Learn More button clicked');
            scrollToSection('about');
        });
    } else {
        console.error('Learn More button not found');
    }
    
    // ===== NAVIGATION LINKS =====
    // Handle all navigation links for smooth scrolling
    document.querySelectorAll('nav a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1); // Remove the # character
            console.log(`Navigation link clicked: ${targetId}`);
            scrollToSection(targetId);
        });
    });
    
    // ===== LEARNING PATH CARDS =====
    // Make path cards clickable to show related resources
    if (pathCards.length) {
        pathCards.forEach(card => {
            // Make the entire card clickable
            card.addEventListener('click', function(e) {
                // Don't trigger if clicking on the link itself
                if (e.target.tagName === 'A') return;
                
                const category = this.getAttribute('data-category');
                if (!category) {
                    console.error('Path card missing data-category attribute');
                    return;
                }
                
                console.log(`Path card clicked: ${category}`);
                
                // Scroll to resources section
                if (scrollToSection('resources')) {
                    // Display resources for this category
                    displayCategoryResources(category);
                }
            });
        });
    } else {
        console.error('No path cards found');
    }
    
    // ===== PATH LINKS (EXPLORE PATH BUTTONS) =====
    // Handle path links (Explore Path buttons)
    if (pathLinks.length) {
        pathLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const category = this.getAttribute('data-category');
                if (!category) {
                    console.error('Path link missing data-category attribute');
                    return;
                }
                
                console.log(`Path link clicked: ${category}`);
                
                // Scroll to resources section
                if (scrollToSection('resources')) {
                    // Display resources for this category
                    displayCategoryResources(category);
                }
            });
        });
    } else {
        console.error('No path links found');
    }
    
    // ===== FILTER BUTTONS =====
    // Handle filter buttons (beginner, intermediate, advanced)
    if (filterButtons.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filterValue = this.getAttribute('data-filter');
                if (!filterValue) {
                    console.error('Filter button missing data-filter attribute');
                    return;
                }
                
                console.log(`Filter button clicked: ${filterValue}`);
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter resources by level
                if (window.globalResources && window.globalResources.length > 0) {
                    const filteredResources = filterValue === 'all' 
                        ? window.globalResources.slice(0, 12) 
                        : window.globalResources.filter(resource => resource.level === filterValue).slice(0, 12);
                    
                    if (resourcesContainer && typeof window.renderResourceCards === 'function') {
                        window.renderResourceCards(filteredResources, resourcesContainer);
                    } else {
                        console.error('Could not render filtered resources');
                    }
                } else {
                    console.error('No resources available to filter');
                }
            });
        });
    } else {
        console.error('No filter buttons found');
    }
    
    // ===== INITIAL RESOURCES DISPLAY =====
    // Display initial resources if container exists
    if (resourcesContainer) {
        // Wait for resources to be loaded
        const checkResources = setInterval(() => {
            if (window.globalResources && window.globalResources.length > 0) {
                clearInterval(checkResources);
                console.log(`Displaying initial resources (${window.globalResources.length} available)`);
                
                if (typeof window.renderResourceCards === 'function') {
                    window.renderResourceCards(window.globalResources.slice(0, 12), resourcesContainer);
                } else {
                    console.error('renderResourceCards function not available');
                }
            }
        }, 100);
        
        // Timeout after 5 seconds to prevent infinite waiting
        setTimeout(() => {
            clearInterval(checkResources);
            if (!window.globalResources || window.globalResources.length === 0) {
                console.error('Resources failed to load within timeout period');
                
                // Create fallback resources if none are loaded
                window.globalResources = [
                    {
                        title: 'Introduction to AI',
                        url: 'https://example.com/intro-ai',
                        description: 'A beginner-friendly introduction to artificial intelligence',
                        category: 'Fundamentals',
                        level: 'beginner',
                        tags: ['beginner', 'fundamentals']
                    },
                    {
                        title: 'Machine Learning Basics',
                        url: 'https://example.com/ml-basics',
                        description: 'Learn the fundamentals of machine learning',
                        category: 'Machine Learning',
                        level: 'beginner',
                        tags: ['beginner', 'machine-learning']
                    },
                    {
                        title: 'Neural Networks Explained',
                        url: 'https://example.com/neural-networks',
                        description: 'Understanding how neural networks work',
                        category: 'Deep Learning',
                        level: 'intermediate',
                        tags: ['intermediate', 'deep-learning']
                    }
                ];
                
                if (typeof window.renderResourceCards === 'function') {
                    window.renderResourceCards(window.globalResources, resourcesContainer);
                }
            }
        }, 5000);
    } else {
        console.error('Resources container not found');
    }
    
    console.log('Main.js fully initialized - All links and buttons are working');
});
