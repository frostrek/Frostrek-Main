import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * GSAP default settings for consistent animations across the site.
 */
export const defaultEase = 'power3.out';
export const defaultDuration = 0.8;

export { gsap, ScrollTrigger };
