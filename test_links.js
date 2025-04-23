/**
 * Test script to verify all links and buttons on the AI Library site
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('==== LINK TESTING SCRIPT STARTED ====');
    
    // Test function to check if an element exists
    function testElementExists(selector, description) {
        const element = document.querySelector(selector);
        if (element) {
            console.log(`✅ PASS: ${description} exists`);
            return element;
        } else {
            console.error(`❌ FAIL: ${description} does not exist`);
            return null;
        }
    }
    
    // Test function to check if a link has an href attribute
    function testLinkHref(element, description) {
        if (!element) return;
        
        const href = element.getAttribute('href');
        if (href) {
            console.log(`✅ PASS: ${description} has href: ${href}`);
            return href;
        } else {
            console.error(`❌ FAIL: ${description} does not have an href attribute`);
            return null;
        }
    }
    
    // Test function to check if an element has a data attribute
    function testDataAttribute(element, attribute, description) {
        if (!element) return;
        
        const value = element.getAttribute(attribute);
        if (value) {
            console.log(`✅ PASS: ${description} has ${attribute}: ${value}`);
            return value;
        } else {
            console.error(`❌ FAIL: ${description} does not have a ${attribute} attribute`);
            return null;
        }
    }
    
    // Test 1: Check if the Start Learning button exists and has an href
    const startLearningBtn = testElementExists('.hero-buttons .btn-primary', 'Start Learning button');
    testLinkHref(startLearningBtn, 'Start Learning button');
    
    // Test 2: Check if the Learn More button exists and has an href
    const learnMoreBtn = testElementExists('.hero-buttons .btn-secondary', 'Learn More button');
    testLinkHref(learnMoreBtn, 'Learn More button');
    
    // Test 3: Check if all navigation links exist and have hrefs
    const navLinks = document.querySelectorAll('nav a');
    console.log(`Found ${navLinks.length} navigation links`);
    navLinks.forEach((link, index) => {
        testLinkHref(link, `Navigation link ${index + 1}`);
    });
    
    // Test 4: Check if all path cards exist and have data-category attributes
    const pathCards = document.querySelectorAll('.path-card');
    console.log(`Found ${pathCards.length} path cards`);
    pathCards.forEach((card, index) => {
        testDataAttribute(card, 'data-category', `Path card ${index + 1}`);
    });
    
    // Test 5: Check if all path links exist, have hrefs, and data-category attributes
    const pathLinks = document.querySelectorAll('.path-link');
    console.log(`Found ${pathLinks.length} path links`);
    pathLinks.forEach((link, index) => {
        testLinkHref(link, `Path link ${index + 1}`);
        testDataAttribute(link, 'data-category', `Path link ${index + 1}`);
    });
    
    // Test 6: Check if all filter buttons exist and have data-filter attributes
    const filterButtons = document.querySelectorAll('.filter-btn');
    console.log(`Found ${filterButtons.length} filter buttons`);
    filterButtons.forEach((button, index) => {
        testDataAttribute(button, 'data-filter', `Filter button ${index + 1}`);
    });
    
    // Test 7: Check if resources container exists
    testElementExists('#resources-container', 'Resources container');
    
    console.log('==== LINK TESTING COMPLETED ====');
});
