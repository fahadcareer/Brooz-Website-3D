import { contentManager } from '../core/contentManager';

const loginScreen = document.getElementById('login-screen');
const dashboard = document.getElementById('dashboard');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const saveBtn = document.getElementById('saveBtn');
const errorMsg = document.getElementById('errorMsg');

// HARDCODED CREDENTIALS
const AUTH = {
    email: 'admin@nexcorp.com',
    password: 'admin'
};

// Check Session
if (sessionStorage.getItem('cms_auth') === 'true') {
    showDashboard();
}

// Login Logic
loginBtn.addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;

    if (email === AUTH.email && pass === AUTH.password) {
        sessionStorage.setItem('cms_auth', 'true');
        showDashboard();
    } else {
        errorMsg.style.display = 'block';
    }
});

logoutBtn.addEventListener('click', () => {
    sessionStorage.removeItem('cms_auth');
    window.location.reload();
});

function showDashboard() {
    loginScreen.style.display = 'none';
    dashboard.style.display = 'block';
    loadData();
}

// --- DYNAMIC RENDERERS ---

function createInput(label, value, name, type = 'text') {
    return `
        <div style="margin-bottom: 0.5rem;">
            <label>${label}</label>
            ${type === 'textarea'
            ? `<textarea class="cms-input" data-key="${name}">${value || ''}</textarea>`
            : `<input type="${type}" class="cms-input" data-key="${name}" value="${value || ''}">`
        }
        </div>
    `;
}

function renderServices(container, data) {
    container.innerHTML = '';
    data.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'cms-card';
        div.innerHTML = `
            <button type="button" class="btn-small btn-remove" onclick="this.parentElement.remove()">Remove</button>
            <h3>Service #${index + 1}</h3>
            ${createInput('Title', item.title, 'title')}
            ${createInput('Description', item.desc, 'desc', 'textarea')}
            ${createInput('Image URL', item.image, 'image')}
        `;
        container.appendChild(div);
    });
}

function renderProjects(container, data) {
    container.innerHTML = '';
    data.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'cms-card';
        div.innerHTML = `
            <button type="button" class="btn-small btn-remove" onclick="this.parentElement.remove()">Remove</button>
            <h3>Project #${index + 1}</h3>
            ${createInput('Project Name', item.name, 'name')}
            ${createInput('Location', item.loc, 'loc')}
            ${createInput('Type', item.type, 'type')}
            ${createInput('Status (e.g., In Production)', item.status, 'status')}
            ${createInput('Badge Class (production / design / install)', item.badgeClass, 'badgeClass')}
        `;
        container.appendChild(div);
    });
}

function renderGenericList(container, data, titleField = 'title', descField = 'desc', label = 'Item') {
    container.innerHTML = '';
    data.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'cms-card';
        div.innerHTML = `
            <button type="button" class="btn-small btn-remove" onclick="this.parentElement.remove()">Remove</button>
            <h3>${label} #${index + 1}</h3>
            ${createInput('Title / Name', item[titleField], titleField)}
            ${createInput('Description / Subtitle', item[descField], descField, 'textarea')}
            ${item.quote ? createInput('Quote', item.quote, 'quote', 'textarea') : ''}
            ${item.role ? createInput('Role', item.role, 'role') : ''}
        `;
        container.appendChild(div);
    });
}


function loadData() {
    const content = contentManager.getContent();

    // Global Settings
    if (content.global) {
        const siteTitleInput = document.querySelector('[name="global.siteTitle"]');
        const brandNameInput = document.querySelector('[name="global.brandName"]');
        const logoUrlInput = document.querySelector('[name="global.logoUrl"]');
        const faviconUrlInput = document.querySelector('[name="global.faviconUrl"]');

        if (siteTitleInput) siteTitleInput.value = content.global.siteTitle || '';
        if (brandNameInput) brandNameInput.value = content.global.brandName || '';
        if (logoUrlInput) logoUrlInput.value = content.global.logoUrl || '';
        if (faviconUrlInput) faviconUrlInput.value = content.global.faviconUrl || '';
    }

    // Simple Fields
    document.querySelector('[name="hero.title"]').value = content.hero.title;
    document.querySelector('[name="hero.subtitle"]').value = content.hero.subtitle;
    document.querySelector('[name="hero.btnPrimary"]').value = content.hero.btnPrimary;
    document.querySelector('[name="hero.btnSecondary"]').value = content.hero.btnSecondary;
    document.querySelector('[name="contact.title"]').value = content.contact.title;
    document.querySelector('[name="contact.subtitle"]').value = content.contact.subtitle;

    document.querySelector('[name="production.title"]').value = content.production?.title || '';
    document.querySelector('[name="production.subtitle"]').value = content.production?.subtitle || '';

    document.querySelector('[name="whyChooseTitle"]').value = content.whyChooseTitle || "Why Partner With NexCorp?";

    // Stats
    const statsContainer = document.getElementById('stats-container');
    statsContainer.innerHTML = '';
    content.stats.forEach((stat) => {
        const div = document.createElement('div');
        div.className = 'array-item';
        div.innerHTML = `
            <label>Label</label>
            <input type="text" class="stat-label" value="${stat.label}">
            <label>Target Number</label>
            <input type="number" class="stat-target" value="${stat.target}">
        `;
        statsContainer.appendChild(div);
    });

    // Dynamic Lists
    renderServices(document.getElementById('services-container'), content.services);
    renderProjects(document.getElementById('projects-container'), content.projects);
    renderGenericList(document.getElementById('why-container'), content.whyChoose, 'title', 'desc', 'Feature');
    renderGenericList(document.getElementById('testimonials-container'), content.testimonials, 'name', 'role', 'Testimonial');
}

// --- ADD ITEM LISTENERS ---
document.getElementById('addServiceBtn').addEventListener('click', () => {
    const container = document.getElementById('services-container');
    const div = document.createElement('div');
    div.className = 'cms-card';
    div.innerHTML = `
        <button type="button" class="btn-small btn-remove" onclick="this.parentElement.remove()">Remove</button>
        <h3>New Service</h3>
        ${createInput('Title', '', 'title')}
        ${createInput('Description', '', 'desc', 'textarea')}
        ${createInput('Image URL', '', 'image')}
    `;
    container.appendChild(div);
});

// (Similar listeners could be added for others, simplified for brevity but fully functional via copy-paste pattern if needed. 
// For now, only Service Adding is explicitly requested/demoed, but I'll add Project quickly)
document.getElementById('addProjectBtn').addEventListener('click', () => {
    const container = document.getElementById('projects-container');
    const div = document.createElement('div');
    div.className = 'cms-card';
    div.innerHTML = `
        <button type="button" class="btn-small btn-remove" onclick="this.parentElement.remove()">Remove</button>
        <h3>New Project</h3>
        ${createInput('Project Name', '', 'name')}
        ${createInput('Location', '', 'loc')}
        ${createInput('Type', '', 'type')}
        ${createInput('Status', 'In Production', 'status')}
        ${createInput('Badge Class', 'production', 'badgeClass')}
    `;
    container.appendChild(div);
});

document.getElementById('addWhyBtn').addEventListener('click', () => {
    const container = document.getElementById('why-container');
    const div = document.createElement('div');
    div.className = 'cms-card';
    div.innerHTML = `
        <button type="button" class="btn-small btn-remove" onclick="this.parentElement.remove()">Remove</button>
        <h3>New Feature</h3>
        ${createInput('Title', '', 'title')}
        ${createInput('Description', '', 'desc', 'textarea')}
    `;
    container.appendChild(div);
});

document.getElementById('addTestimonialBtn').addEventListener('click', () => {
    const container = document.getElementById('testimonials-container');
    const div = document.createElement('div');
    div.className = 'cms-card';
    div.innerHTML = `
        <button type="button" class="btn-small btn-remove" onclick="this.parentElement.remove()">Remove</button>
        <h3>New Testimonial</h3>
        ${createInput('Name', '', 'name')}
        ${createInput('Role', '', 'role')}
        ${createInput('Quote', '', 'quote', 'textarea')}
    `;
    container.appendChild(div);
});


// --- SAVE LOGIC ---

function scrapeContainer(containerId) {
    const items = [];
    const container = document.getElementById(containerId);
    container.querySelectorAll('.cms-card').forEach(card => {
        const obj = {};
        card.querySelectorAll('.cms-input').forEach(input => {
            obj[input.getAttribute('data-key')] = input.value;
        });
        items.push(obj);
    });
    return items;
}

saveBtn.addEventListener('click', () => {
    const current = contentManager.getContent();

    // Read Global Settings
    if (!current.global) current.global = {};
    current.global.siteTitle = document.querySelector('[name="global.siteTitle"]').value;
    current.global.brandName = document.querySelector('[name="global.brandName"]').value;
    const logoInput = document.querySelector('[name="global.logoUrl"]');
    if (logoInput) current.global.logoUrl = logoInput.value;
    const faviconInput = document.querySelector('[name="global.faviconUrl"]');
    if (faviconInput) current.global.faviconUrl = faviconInput.value;

    // Read Simple Fields
    current.hero.title = document.querySelector('[name="hero.title"]').value;
    current.hero.subtitle = document.querySelector('[name="hero.subtitle"]').value;
    current.hero.btnPrimary = document.querySelector('[name="hero.btnPrimary"]').value;
    current.hero.btnSecondary = document.querySelector('[name="hero.btnSecondary"]').value;
    current.contact.title = document.querySelector('[name="contact.title"]').value;
    current.contact.subtitle = document.querySelector('[name="contact.subtitle"]').value;

    current.production.title = document.querySelector('[name="production.title"]').value;
    current.production.subtitle = document.querySelector('[name="production.subtitle"]').value;

    current.whyChooseTitle = document.querySelector('[name="whyChooseTitle"]').value;

    // Read Stats
    const statsContainer = document.getElementById('stats-container');
    const newStats = [];
    statsContainer.querySelectorAll('.array-item').forEach(div => {
        newStats.push({
            label: div.querySelector('.stat-label').value,
            target: parseInt(div.querySelector('.stat-target').value)
        });
    });
    current.stats = newStats;

    // Read Dynamic Lists
    current.services = scrapeContainer('services-container');
    current.projects = scrapeContainer('projects-container');

    // For Mixed Types (Why Choose & Testimonials) we need custom scraping or smart field detection
    // Why Choose use title/desc
    current.whyChoose = scrapeContainer('why-container').map(i => ({ title: i.title, desc: i.desc }));
    // Testimonials use name, role, quote
    current.testimonials = scrapeContainer('testimonials-container');

    contentManager.saveContent(current);
    alert('Saved Successfully!');
});
