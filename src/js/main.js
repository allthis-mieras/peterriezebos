import { initScrollConfig } from './modules/scroll-config';
import { initLenis } from './modules/lenis';
import { initHero } from './modules/hero';
import { initAbout } from './modules/about';
import { initProjects } from './modules/projects';

// FIX: Initialiseer scroll configuratie EERST
// Dit is cruciaal omdat ScrollTrigger configuratie (zoals normalizeScroll)
// moet gebeuren voordat we ScrollTriggers aanmaken in andere modules
// Anders werken de mobiele fixes niet correct
initScrollConfig();

// Initialize Lenis smooth scroll
// FIX: Lenis moet na scroll-config maar voor andere modules
// Dit zorgt ervoor dat Lenis-ScrollTrigger integratie werkt
initLenis();

// Initialize components
// Deze kunnen nu veilig ScrollTriggers aanmaken omdat alles geconfigureerd is
initHero();
initAbout();
initProjects(); 