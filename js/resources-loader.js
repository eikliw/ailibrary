/**
 * Resources Loader
 * This script loads resources from markdown files and parses them
 */

// Global variable to store all resources
let globalResources = [];

async function fetchMarkdownResource(path) {
    try {
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${path}: ${response.status} ${response.statusText}`);
        }
        return await response.text();
    } catch (error) {
        console.error(`Error fetching markdown resource: ${error.message}`);
        return null;
    }
}

function parseMarkdown(markdown) {
    if (!markdown) return [];
    
    const resources = [];
    const sections = markdown.split('##').filter(section => section.trim().length > 0);
    
    // Process the main title (if present)
    let mainCategory = '';
    if (sections[0].startsWith('# ')) {
        mainCategory = sections[0].split('\n')[0].replace('# ', '').trim();
        sections[0] = sections[0].split('\n').slice(1).join('\n');
    }
    
    sections.forEach(section => {
        const lines = section.split('\n').filter(line => line.trim().length > 0);
        const sectionTitle = lines[0].trim();
        
        let currentSubsection = '';
        
        lines.slice(1).forEach(line => {
            if (line.startsWith('### ')) {
                currentSubsection = line.replace('### ', '').trim();
            } else if (line.startsWith('- [')) {
                // Extract resource information
                const titleMatch = line.match(/- \[(.+?)\]/);
                const urlMatch = line.match(/\]\((.+?)\)/);
                const descriptionMatch = line.match(/\)\s*-\s*(.+)$/);
                
                if (titleMatch && urlMatch) {
                    const title = titleMatch[1];
                    const url = urlMatch[1];
                    const description = descriptionMatch ? descriptionMatch[1] : '';
                    
                    // Determine level based on section title
                    let level = 'intermediate';
                    if (sectionTitle.toLowerCase().includes('beginner')) {
                        level = 'beginner';
                    } else if (sectionTitle.toLowerCase().includes('advanced')) {
                        level = 'advanced';
                    }
                    
                    resources.push({
                        title,
                        url,
                        description,
                        category: mainCategory,
                        subcategory: currentSubsection,
                        level,
                        tags: [level, mainCategory.toLowerCase().replace(/\s+/g, '-')]
                    });
                }
            }
        });
    });
    
    return resources;
}

async function loadResourcesForCategory(category) {
    const path = `resources/${category}.md`;
    const markdown = await fetchMarkdownResource(path);
    return parseMarkdown(markdown);
}

async function loadAllResources() {
    const categories = [
        'fundamentals',
        'machine-learning',
        'deep-learning',
        'nlp',
        'computer-vision',
        'reinforcement-learning',
        'ai-ethics',
        'ai-applications'
    ];
    
    let allResources = [];
    
    for (const category of categories) {
        try {
            const resources = await loadResourcesForCategory(category);
            allResources = allResources.concat(resources);
        } catch (error) {
            console.error(`Error loading resources for ${category}:`, error);
        }
    }
    
    // Store in global variable for access from main.js
    globalResources = allResources;
    return allResources;
}

function renderResourceCards(resources, container) {
    container.innerHTML = '';
    
    if (resources.length === 0) {
        container.innerHTML = '<p class="no-resources">No resources found matching your criteria.</p>';
        return;
    }
    
    resources.forEach(resource => {
        const card = document.createElement('div');
        card.className = `resource-card ${resource.tags.join(' ')}`;
        
        // Create placeholder image URL based on category
        const imageUrl = `images/${resource.tags[1] || 'placeholder'}.jpg`;
        
        // Create card HTML structure
        card.innerHTML = `
            <div class="resource-image">
                <img src="${imageUrl}" alt="${resource.title}" onerror="this.src='images/placeholder.jpg'">
            </div>
            <div class="resource-content">
                <div class="resource-tags">
                    ${resource.tags.map(tag => `<span class="resource-tag ${tag}">${tag}</span>`).join('')}
                </div>
                <h3 class="resource-title">${resource.title}</h3>
                <p class="resource-description">${resource.description || resource.subcategory}</p>
                <a href="${resource.url}" class="resource-link" target="_blank">Explore Resource</a>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Load resources when the page loads, but don't set up event handlers here
// Those will be handled in main.js
document.addEventListener('DOMContentLoaded', async function() {
    console.log('Resources loader initialized');
    await loadAllResources();
});
