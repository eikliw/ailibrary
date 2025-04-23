# AI Wise (AIWise.dev)

A modern, dark-themed resource library for learning AI - from beginners to advanced practitioners.

## Overview

AI Wise (AIWise.dev) is a comprehensive learning path for AI enthusiasts, similar to learningseo.io but focused on artificial intelligence concepts, tools, and applications. The site organizes AI learning resources into digestible sections and categories, making it easier for learners at all levels to find relevant content.

## Features

- Dark, modern UI design
- Categorized learning paths for different AI domains
- Resources for all skill levels (beginner to advanced)
- Regularly updated content via markdown files
- Responsive design for all devices
- Dynamic resource loading and filtering

## Resource Categories

- AI Fundamentals
- Machine Learning
- Deep Learning
- Generative AI
- Natural Language Processing
- Computer Vision
- Reinforcement Learning
- AI Ethics & Responsible AI
- AI Applications
- News & Updates

## Project Structure

- `index.html`: Main landing page
- `css/`: Stylesheet directory
  - `styles.css`: Main stylesheet with dark theme
- `js/`: JavaScript files
  - `main.js`: Core functionality for navigation and UI
  - `resources-loader.js`: Handles loading and filtering resources
- `resources/`: Markdown files containing AI resources organized by category
- `images/`: Image assets

## Getting Started

### Local Development

To view the website locally:

1. Clone this repository
   ```
   git clone https://github.com/eikliw/aiwise.git
   cd aiwise
   ```

2. Start a local server (one of the following methods):
   - Using Python:
     ```
     python -m http.server 8000
     ```
   - Using Node.js (with http-server):
     ```
     npx http-server
     ```

3. Open your browser and navigate to `http://localhost:8000`

## Contributing

### Adding New Resources

To add new resources:

1. Find the appropriate markdown file in the `resources/` directory
2. Add your resource following the existing format:
   ```markdown
   - [Resource Name](https://resource-url.com) - Brief description of the resource
   ```
3. Resources are automatically organized by section (Beginner, Intermediate, Advanced)

### Adding New Categories

To add a new category:

1. Create a new markdown file in the `resources/` directory (e.g., `new-category.md`)
2. Follow the existing format with sections for different skill levels
3. Update the `loadAllResources()` function in `js/resources-loader.js` to include your new category
4. Add a new path card in the `index.html` file

### Pull Request Process

1. Fork the repository
2. Create a new branch for your changes
3. Make your changes following the guidelines above
4. Submit a pull request with a clear description of your additions

## Deployment

To deploy AI Wise to a live website:

1. Register the domain (e.g., AIWise.dev)
2. Choose a hosting provider (GitHub Pages, Netlify, Vercel, etc.)
3. Follow the hosting provider's instructions for deploying a static website

### GitHub Pages Deployment

1. Go to the repository settings
2. Navigate to the Pages section
3. Select the branch to deploy (usually `main`)
4. Save the settings and wait for the deployment to complete

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by [learningseo.io](https://learningseo.io)
- Built with modern web technologies
- Community-driven resource collection
