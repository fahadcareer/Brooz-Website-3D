export const defaultContent = {
    global: {
        siteTitle: "NexCorp | Global Innovation",
        brandName: "NexCorp",
        logoUrl: "",
        faviconUrl: ""
    },
    hero: {
        title: "MAKE YOUR<br>BRAND TALK",
        subtitle: "Corporate advertising solutions & premium material production",
        btnPrimary: "Get a Quote",
        btnSecondary: "Explore Work"
    },
    stats: [
        { target: 500, label: "Projects Deployed" },
        { target: 98, label: "Client Retention (%)" },
        { target: 24, label: "Global Support (Hr)" },
        { target: 100, label: "Reliability Score" }
    ],
    services: [
        { title: "Brand Identity", desc: "Forging dominant visual languages.", image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=800" },
        { title: "Digital Strategy", desc: "Data-driven market penetration.", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" },
        { title: "3D Prototyping", desc: "Hyper-realistic product visualization.", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800" },
        { title: "Global Outreach", desc: "Connecting markets worldwide.", image: "https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?auto=format&fit=crop&q=80&w=800" }
    ],
    production: {
        title: "In-House Production",
        subtitle: "Premium materials. Precision finishing.<br>Corporate-level production standards."
    },
    projects: [
        { name: "Apex Tower Signage", loc: "Dubai, UAE", type: "Ext. Branding", status: "In Design", badgeClass: "design" },
        { name: "Neon-X Hub", loc: "Tokyo, Japan", type: "LED Matrix", status: "In Production", badgeClass: "production" },
        { name: "Vertex HQ", loc: "London, UK", type: "Wayfinding", status: "Installation", badgeClass: "install" },
        { name: "Orbital Mall", loc: "Singapore", type: "Digital Facade", status: "In Production", badgeClass: "production" }
    ],
    whyChooseTitle: "Why Partner With NexCorp?",
    whyChoose: [
        { title: "Timely Execution", desc: "Rapid deployment protocols ensure deadlines are met without compromise." },
        { title: "End-to-End Solutions", desc: "From conceptualization to installation, we handle the entire lifecycle." },
        { title: "Quality Materials", desc: "Sourced from top-tier global suppliers for maximum longevity." },
        { title: "Strong Finishing", desc: "Precision craftsmanship that stands up to close inspection." },
        { title: "On-Time Delivery", desc: "Logistics optimized for punctuality in any region." },
        { title: "After-Sales Support", desc: "Dedicated maintenance teams ensuring sustained excellence." }
    ],
    testimonials: [
        { name: "Sarah Jenkins", role: "CEO, Vertex Groups", quote: "NexCorp transformed our headquarters into a digital landmark. Their precision in LED integration is unmatched in the industry." },
        { name: "David Chen", role: "Director, Orbital Tech", quote: "The branding material durability exceeded our expectations. Two years later, our outdoor signage looks brand new." },
        { name: "Elena Rodriguez", role: "CMO, Solar Systems", quote: "Professional workflow from day one. Their team anticipated challenges we hadn't even considered." },
        { name: "Marcus Thorne", role: "Founder, NeoVision", quote: "Exceptional after-sales support. It's rare to find a partner who cares this much about long-term performance." }
    ],
    contact: {
        title: "Let’s make your<br>brand talk.",
        subtitle: "Fill out the details below to start your transformation."
    }
};

export class ContentManager {
    constructor() {
        this.storageKey = 'nexcorp_cms_data';
    }

    getContent() {
        const stored = localStorage.getItem(this.storageKey);
        if (stored) {
            return JSON.parse(stored);
        }
        return defaultContent;
    }

    saveContent(data) {
        localStorage.setItem(this.storageKey, JSON.stringify(data));
        window.location.reload(); // Refresh to see changes on live site
    }

    resetContent() {
        localStorage.removeItem(this.storageKey);
        window.location.reload();
    }
}

export const contentManager = new ContentManager();
