import './style.css';
import { renderCMSContent } from './js/cms/cmsRenderer'; // CMS Integration
import { initSmoothScroll } from './js/core/smoothScroll';
import { initBackground } from './js/core/background3d';
import { initNavigation } from './js/components/navigation';
import { initCursor } from './js/components/cursor';
import { initContactForm } from './js/components/contactForm';

import { initHero } from './js/sections/hero';
import { initStats } from './js/sections/stats';
import { initServices } from './js/sections/services';
import { initWork } from './js/sections/work';
import { initProjects } from './js/sections/projects';
import { initAbout } from './js/sections/about';
import { initCTA } from './js/sections/cta';
import { initGeneralAnimations } from './js/sections/general';

// 0. Render Content from CMS (Local Storage)
try {
  renderCMSContent();
} catch (error) {
  console.error("CMS Render Failed: ", error);
}

// 1. Core Initialization
const lenis = initSmoothScroll();
initBackground();
initNavigation();
initCursor();

// 2. Sections Initialization
initHero();
initStats();
initServices(lenis);
initWork();
initProjects();
initAbout();
initCTA();
initContactForm();
initGeneralAnimations();

console.log("App Initialized with Modular Structure 2.0 + CMS");
