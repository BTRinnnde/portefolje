# Minimalist Portfolio Website

A clean, elegant, and sophisticated personal portfolio website featuring a dark theme and minimalist design.

## Features

- Responsive design for all devices
- Dark theme with a sophisticated color palette
- Clean, minimalist aesthetic with ample whitespace
- Sections for showcasing your professional work
- Resume/CV display and download functionality
- Links to your websites: alltogetherofficial.com and thequiethub.com

## Setup Instructions

1. Replace the placeholder text in `index.html` with your personal information
2. Replace `resume.pdf` with your actual resume/CV in PDF format
3. Customize the website sections as needed
4. Update the links to your websites
5. Personalize the color scheme in `styles.css` if desired

## Customization

### Colors

The color scheme is defined in the `:root` section of `styles.css`. You can modify these variables to change the colors throughout the website:

```css
:root {
    --bg-primary: #121212;        /* Main background color */
    --bg-secondary: #1e1e1e;      /* Secondary background color */
    --text-primary: #f5f5f5;      /* Primary text color */
    --text-secondary: #a0a0a0;    /* Secondary text color */
    --accent: #646cff;            /* Accent color for highlights */
    --border: #333;               /* Border color */
}
```

### Typography

The website uses Inter font from Google Fonts. You can change this by replacing the font import in the `<head>` section of `index.html` and updating the font-family in `styles.css`.

## Viewing the Website

You can view the website locally by opening `index.html` in your web browser.

## Deployment

To deploy this website:

1. Upload all files to your web hosting provider
2. Make sure to include your actual resume PDF file
3. Test all links to ensure they work correctly

## File Structure

- `index.html` - Main HTML structure
- `styles.css` - CSS styling
- `script.js` - JavaScript functionality
- `resume.pdf` - Your resume/CV file (replace with your actual PDF)
- `resume-placeholder.txt` - Placeholder text (delete after replacing with actual resume)
- `README.md` - This documentation file

## Notes

- The resume download feature requires you to replace the placeholder with an actual PDF file named `resume.pdf`
- For the best experience, use professional, high-quality images for any profile pictures or project thumbnails you add
- The current mobile menu is simplified - you may want to enhance it with a proper hamburger menu functionality for production use 