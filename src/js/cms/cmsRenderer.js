import { contentManager, defaultContent } from '../core/contentManager';

export function renderCMSContent() {
    const content = contentManager.getContent();

    // 0. GLOBAL SETTINGS
    if (content.global) {
        if (content.global.siteTitle) document.title = content.global.siteTitle;

        const brandLogo = document.querySelector('.logo');
        if (brandLogo) {
            if (content.global.logoUrl && content.global.logoUrl.trim() !== '') {
                // Render Image Logo
                brandLogo.innerHTML = `<img src="${content.global.logoUrl}" alt="${content.global.brandName}" style="height: 100%; width: auto; max-height: 40px; display: block;">`;
                brandLogo.style.display = 'flex';
                brandLogo.style.alignItems = 'center';
            } else if (content.global.brandName) {
                // Render Text Logo
                brandLogo.innerHTML = content.global.brandName; // Reset to text
            }
        }

        // Favicon
        if (content.global.faviconUrl && content.global.faviconUrl.trim() !== '') {
            let link = document.querySelector("link[rel~='icon']");
            if (!link) {
                link = document.createElement('link');
                link.rel = 'icon';
                document.head.appendChild(link);
            }
            link.href = content.global.faviconUrl;
        }
    }

    // 1. HERO
    setHTML('[data-cms="hero.title"]', content.hero.title);
    setText('[data-cms="hero.subtitle"]', content.hero.subtitle);
    setText('[data-cms="hero.btnPrimary"]', content.hero.btnPrimary);
    setText('[data-cms="hero.btnSecondary"]', content.hero.btnSecondary);

    // 2. STATS
    const statCards = document.querySelectorAll('.stat-card');
    content.stats.forEach((stat, index) => {
        if (statCards[index]) {
            const counter = statCards[index].querySelector('.counters');
            const label = statCards[index].querySelector('.stat-label');
            if (counter) {
                counter.setAttribute('data-target', stat.target);
            }
            if (label) label.innerText = stat.label;
        }
    });

    // 3. SERVICES
    const serviceCards = document.querySelectorAll('.service-card');
    content.services.forEach((svc, index) => {
        if (serviceCards[index]) {
            const title = serviceCards[index].querySelector('h3');
            const desc = serviceCards[index].querySelector('p');
            const preview = serviceCards[index].querySelector('.service-preview');

            if (title) title.innerText = svc.title;
            if (desc) desc.innerText = svc.desc;
            if (preview && svc.image) {
                preview.style.backgroundImage = `url('${svc.image}')`;
                preview.style.backgroundSize = 'cover';
                preview.style.backgroundPosition = 'center';
            }
        }
    });

    // 4. PRODUCTION
    setText('[data-cms="production.title"]', content.production.title);
    setHTML('[data-cms="production.subtitle"]', content.production.subtitle);

    // 5. PROJECTS
    // Fallback if empty
    const projectData = (content.projects && content.projects.length > 0)
        ? content.projects
        : defaultContent.projects;

    const projectContainer = document.querySelector('.projects-grid');
    const existingProjectCards = document.querySelectorAll('.project-card');

    if (projectContainer && existingProjectCards.length > 0) {
        // Template for cloning
        const templateCard = existingProjectCards[0].cloneNode(true);

        projectData.forEach((proj, index) => {
            let card;

            // Get existing or clone new
            if (index < existingProjectCards.length) {
                card = existingProjectCards[index];
            } else {
                card = templateCard.cloneNode(true);
                projectContainer.appendChild(card);
            }

            // Ensure Visibility (GSAP Override)
            card.style.display = 'block';
            card.style.opacity = '1';
            card.style.visibility = 'visible';

            const title = card.querySelector('h3');
            const status = card.querySelector('.status-badge');
            const details = card.querySelectorAll('.project-details span');

            if (title) title.innerText = proj.name;
            if (status) {
                status.innerText = proj.status;
                status.className = `status-badge ${proj.badgeClass}`;
            }
            if (details[0]) details[0].innerHTML = `<span class="label">Loc:</span> ${proj.loc}`;
            if (details[1]) details[1].innerHTML = `<span class="label">Type:</span> ${proj.type}`;
        });

        // Hide excess cards
        for (let i = projectData.length; i < existingProjectCards.length; i++) {
            existingProjectCards[i].style.display = 'none';
        }
    }

    // 6. WHY CHOOSE US
    setText('#why-choose .section-title', content.whyChooseTitle || "Why Partner With NexCorp?");

    // Fallback: If CMS data is empty, use default content to prevent empty section
    const whyData = (content.whyChoose && content.whyChoose.length > 0)
        ? content.whyChoose
        : defaultContent.whyChoose;

    const whyContainer = document.querySelector('.why-grid');
    const existingWhyCards = document.querySelectorAll('.why-card');

    if (whyContainer && existingWhyCards.length > 0) {
        // We use the first card as a template for cloning if needed
        const templateCard = existingWhyCards[0].cloneNode(true);

        whyData.forEach((item, index) => {
            let card;

            // Get existing or create new
            if (index < existingWhyCards.length) {
                card = existingWhyCards[index];
            } else {
                card = templateCard.cloneNode(true);
                whyContainer.appendChild(card);
            }

            // Update Content
            card.style.display = 'flex'; // Ensure visible
            // Reset GSAP styles
            card.style.opacity = '1';
            card.style.visibility = 'visible';
            card.style.transform = 'none';

            const title = card.querySelector('h3');
            const desc = card.querySelector('p');
            if (title) title.innerText = item.title;
            if (desc) desc.innerText = item.desc;
        });

        // Hide excess cards
        for (let i = whyData.length; i < existingWhyCards.length; i++) {
            existingWhyCards[i].style.display = 'none';
        }
    }

    // 7. TESTIMONIALS
    const testCards = document.querySelectorAll('.testimonial-card');
    content.testimonials.forEach((t, index) => {
        if (testCards[index]) {
            const name = testCards[index].querySelector('h4');
            const role = testCards[index].querySelector('p:not(.quote)');
            const quote = testCards[index].querySelector('.quote');

            if (name) name.innerText = t.name;
            if (role) role.innerText = t.role;
            if (quote) quote.innerText = `"${t.quote}"`;
        }
    });

    // 8. CONTACT
    setHTML('[data-cms="contact.title"]', content.contact.title);
    setText('[data-cms="contact.subtitle"]', content.contact.subtitle);
}

function setText(selector, value) {
    const el = document.querySelector(selector);
    if (el) el.innerText = value;
}

function setHTML(selector, value) {
    const el = document.querySelector(selector);
    if (el) {
        // Convert newlines to breaks if value is a string
        if (typeof value === 'string') {
            value = value.replace(/\n/g, '<br>');
        }
        el.innerHTML = value;
    }
}
