# Personal Portfolio Website

A modern, responsive personal portfolio website for an **ASP.NET Core Backend Developer** specializing in Manufacturing Execution Systems (MES), PostgreSQL, SQL Server migrations, REST APIs, and Docker.

![Portfolio Preview](https://img.shields.io/badge/Status-Ready-brightgreen) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black) ![Bootstrap](https://img.shields.io/badge/Bootstrap_5-7952B3?logo=bootstrap&logoColor=white)

## 🚀 Features

### ✨ Design & User Experience
- **Modern Dark Theme** - Professional color palette suitable for software developers
- **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- **Smooth Animations** - Subtle scroll animations using AOS (Animate On Scroll) library
- **Fast Loading** - Optimized for performance with minimal dependencies
- **Clean UI/UX** - Professional layout with cards, shadows, and hover effects
- **Accessibility** - Semantic HTML and ARIA labels for improved accessibility

### 📄 Sections

1. **Navigation Bar**
   - Fixed navbar with smooth scrolling
   - Active section highlighting
   - Mobile-friendly hamburger menu

2. **Hero Section**
   - Eye-catching introduction
   - Professional title and subtitle
   - Social media links (GitHub, Email, LinkedIn)
   - Call-to-action buttons

3. **About Me**
   - Professional summary
   - Experience highlights
   - Key accomplishments
   - Honest and authentic tone

4. **Skills**
   - Backend Development (C#, ASP.NET Core, REST APIs, EF Core)
   - Database Technologies (PostgreSQL, SQL Server)
   - Tools (Docker, Git, RabbitMQ, Redis)
   - Other Competencies (API Development, Database Migration, Troubleshooting)
   - Interactive skill cards with hover effects

5. **Experience**
   - Timeline layout
   - Detailed responsibilities
   - Professional achievements
   - 1 year as .NET Developer

6. **Projects**
   - Manufacturing Production API (In Progress)
   - SQL Server to PostgreSQL Migration Demo
   - Authentication Service
   - GitHub links for each project
   - Technology badges

7. **Services**
   - ASP.NET Core API Development
   - PostgreSQL Development
   - SQL Server to PostgreSQL Migration
   - Backend Bug Fixing
   - API Integration
   - Docker Containerization

8. **Contact**
   - Contact form with validation
   - Email, GitHub, and location information
   - Success message on submission

9. **Footer**
   - Copyright information
   - Back to top button
   - Current year display

## 🛠️ Technologies Used

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Custom styling with CSS variables
- **Bootstrap 5** - Responsive layout and components
- **JavaScript** (Vanilla) - Interactive functionality

### Libraries & Icons
- **Font Awesome 6.4.0** - Icon library
- **AOS (Animate On Scroll) 2.3.1** - Scroll animations
- **Bootstrap 5.3.0** - UI framework

### No Backend Required
This is a static portfolio website with no server-side dependencies. The contact form uses client-side validation and displays a success message without actual submission.

## 📁 File Structure

```
portfolio-website/
│
├── index.html          # Main HTML file
├── styles.css          # Custom CSS styles
├── script.js           # JavaScript functionality
└── README.md           # Documentation (this file)
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor (VS Code, Sublime Text, etc.)

### Installation & Setup

1. **Clone or Download** the project files
   ```bash
   git clone https://github.com/[YOUR_GITHUB_USERNAME]/portfolio-website.git
   cd portfolio-website
   ```

2. **Customize Your Content**
   
   Open `index.html` and replace all placeholders:
   - `[PLACEHOLDER_NAME]` - Your full name
   - `[PLACEHOLDER_GITHUB]` - Your GitHub username
   - `[PLACEHOLDER_EMAIL]` - Your email address
   - `[PLACEHOLDER_LINKEDIN]` - Your LinkedIn username (optional)

3. **Optional: Add a Favicon**
   - Create or download a favicon image (favicon.png or favicon.ico)
   - Uncomment the favicon link in the `<head>` section of index.html
   - Place your favicon file in the project root directory

4. **Run Locally**
   
   Simply open `index.html` in your web browser:
   - Double-click the file, or
   - Right-click → Open with → Your Browser
   
   Or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server
   
   # Using VS Code Live Server extension
   Right-click on index.html → Open with Live Server
   ```

## 🎨 Customization Guide

### Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #3498db;      /* Main theme color */
    --primary-hover: #2980b9;      /* Hover state */
    --bg-dark: #0a0e27;            /* Background */
    --bg-dark-alt: #151b3d;        /* Alternate background */
    --text-primary: #ffffff;       /* Primary text */
    --text-secondary: #b8bfce;     /* Secondary text */
}
```

### Content
- **About Section**: Update your professional summary and experience
- **Skills Section**: Add/remove skills based on your expertise
- **Experience Section**: Modify responsibilities and timeline
- **Projects Section**: Replace with your actual projects
- **Services Section**: Customize services you offer

### Animations
Adjust AOS settings in `script.js`:
```javascript
AOS.init({
    duration: 800,    // Animation duration (ms)
    easing: 'ease-in-out',
    once: true,       // Animation happens only once
    offset: 100       // Offset from trigger point
});
```

## 📱 Browser Compatibility

Tested and working on:
- ✅ Google Chrome (latest)
- ✅ Mozilla Firefox (latest)
- ✅ Safari (latest)
- ✅ Microsoft Edge (latest)
- ✅ Opera (latest)

## 🌐 Deployment Options

### Option 1: GitHub Pages
1. Create a GitHub repository
2. Push your files to the repository
3. Go to Settings → Pages
4. Select branch (main/master) and root folder
5. Save and wait for deployment

Your site will be live at: `https://[username].github.io/[repository-name]`

### Option 2: Netlify
1. Sign up at [Netlify](https://www.netlify.com/)
2. Drag and drop your project folder
3. Site is instantly deployed

### Option 3: Vercel
1. Sign up at [Vercel](https://vercel.com/)
2. Import your GitHub repository
3. Deploy with one click

### Option 4: Traditional Web Hosting
Upload all files via FTP to your hosting provider (cPanel, DirectAdmin, etc.)

## 📊 SEO Optimization

The portfolio includes:
- ✅ Meta description
- ✅ Meta keywords
- ✅ Open Graph tags for social sharing
- ✅ Semantic HTML5 elements
- ✅ Descriptive alt text (when images are added)
- ✅ Clean URL structure
- ✅ Mobile-friendly design

### Improve SEO Further:
- Add a sitemap.xml
- Create a robots.txt file
- Add Google Analytics
- Submit to Google Search Console
- Add structured data (JSON-LD)

## ⚡ Performance Tips

- Images should be optimized (WebP format recommended)
- Consider adding a service worker for offline support
- Use CDN versions of libraries (already implemented)
- Minimize custom CSS/JS if needed
- Enable gzip compression on your server

## 🔒 Contact Form Integration (Optional)

To make the contact form functional, you can integrate:
- **FormSpree** (easiest) - [formspree.io](https://formspree.io/)
- **EmailJS** - [emailjs.com](https://www.emailjs.com/)
- **Netlify Forms** - (if hosted on Netlify)
- **Custom Backend** - ASP.NET Core API, Node.js, PHP

## 📝 License

This project is open source and available under the [MIT License](https://opensource.org/licenses/MIT).

## 👨‍💻 Author

**[PLACEHOLDER_NAME]**
- GitHub: [@[PLACEHOLDER_GITHUB]](https://github.com/[PLACEHOLDER_GITHUB])
- Email: [PLACEHOLDER_EMAIL]
- Location: Pakistan

## 🙏 Acknowledgments

- Bootstrap 5 for the responsive framework
- Font Awesome for icons
- AOS library for scroll animations
- Inspiration from professional developer portfolios

## 📞 Support & Feedback

If you have any questions or suggestions:
- Open an issue on GitHub
- Contact via email
- Connect on LinkedIn

---

**⭐ If you found this portfolio useful, please consider giving it a star on GitHub!**

## 🔄 Future Enhancements

Potential features to add:
- [ ] Blog section
- [ ] Testimonials
- [ ] Download CV button
- [ ] Project detail modals
- [ ] Dark/Light theme toggle
- [ ] Language switcher
- [ ] Live chat integration
- [ ] Analytics dashboard
- [ ] Certificate showcase
- [ ] Interactive timeline

---

**Built with ❤️ by [PLACEHOLDER_NAME]**
