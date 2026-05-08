---
name: Technical Neo-Noir
colors:
  surface: '#131314'
  surface-dim: '#131314'
  surface-bright: '#3a393a'
  surface-container-lowest: '#0e0e0f'
  surface-container-low: '#1c1b1c'
  surface-container: '#201f20'
  surface-container-high: '#2a2a2b'
  surface-container-highest: '#353436'
  on-surface: '#e5e2e3'
  on-surface-variant: '#bbc9cd'
  inverse-surface: '#e5e2e3'
  inverse-on-surface: '#313031'
  outline: '#859397'
  outline-variant: '#3c494c'
  surface-tint: '#2fd9f4'
  primary: '#8aebff'
  on-primary: '#00363e'
  primary-container: '#22d3ee'
  on-primary-container: '#005763'
  inverse-primary: '#006877'
  secondary: '#7bd0ff'
  on-secondary: '#00354a'
  secondary-container: '#00a6e0'
  on-secondary-container: '#00374d'
  tertiary: '#61f6b9'
  on-tertiary: '#003825'
  tertiary-container: '#3dd99e'
  on-tertiary-container: '#005a3e'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#a2eeff'
  primary-fixed-dim: '#2fd9f4'
  on-primary-fixed: '#001f25'
  on-primary-fixed-variant: '#004e5a'
  secondary-fixed: '#c4e7ff'
  secondary-fixed-dim: '#7bd0ff'
  on-secondary-fixed: '#001e2c'
  on-secondary-fixed-variant: '#004c69'
  tertiary-fixed: '#68fcbf'
  tertiary-fixed-dim: '#45dfa4'
  on-tertiary-fixed: '#002114'
  on-tertiary-fixed-variant: '#005137'
  background: '#131314'
  on-background: '#e5e2e3'
  surface-variant: '#353436'
typography:
  headline-xl:
    fontFamily: Geist
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Geist
    fontSize: 40px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.2'
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  container-max: 1200px
  gutter: 2rem
  margin: 1.5rem
  stack-xl: 8rem
  stack-lg: 4rem
  stack-md: 2rem
  stack-sm: 1rem
---

## Brand & Style

This design system is built for a high-performance developer portfolio that emphasizes technical precision and modern aesthetics. The brand personality is "The Architect of Code"—expert, focused, and forward-thinking. It targets a sophisticated audience of hiring managers and fellow engineers who value clean architecture and pixel-perfect execution.

The visual style is a fusion of **Technical Minimalism** and **Cyber-Brutalism**. It utilizes deep black backgrounds to create a sense of infinite space, contrasted by sharp, neon accents that signify energy and interactivity. Every element is designed to feel like part of a sophisticated IDE or a high-end dashboard, using monospaced typography to reinforce the developer-centric narrative.

## Colors

The color palette centers on a pure high-contrast experience. The primary background is the deep `#0A0A0B` black, ensuring that white typography and neon accents pop with maximum clarity. 

- **Primary & Secondary:** `#22D3EE` and `#38BDF8` are used for interactive states, primary actions, and brand highlights. These should be applied to text links, icons, and subtle glows.
- **Tertiary:** `#34D399` is reserved for success states, active status indicators (e.g., "Available for work"), or specific code highlighting.
- **Surface Strategy:** Use varying levels of gray (derived from the primary blue at 5-10% opacity) to create subtle separation between sections without breaking the deep black aesthetic.

## Typography

This design system uses a dual-font approach to balance readability with a technical aesthetic. **Geist** serves as the primary typeface for its ultra-clean, Swiss-inspired geometric forms that excel in dark mode. 

**JetBrains Mono** is utilized for labels, metadata, and "technical captions." It should be used in all-caps for labels to maximize the "terminal" feel. For body text, maintain generous line heights (1.6) to ensure long-form content is digestible against the high-contrast background. Headlines should use tighter tracking (letter-spacing) to feel more cohesive and impactful.

## Layout & Spacing

The layout follows a **Fixed-Fluid Grid hybrid**. Content is contained within a 1200px max-width container, centered on the screen. The spacing rhythm is strictly based on a 4px baseline, with larger gaps used to create "breathing room" between project blocks.

- **Vertical Rhythm:** Use `stack-xl` (128px) for major sections to signify a clear transition in content.
- **Grids:** Project galleries should utilize a 2-column or 3-column grid with a `2rem` gutter. 
- **Negative Space:** Avoid clutter. The design should feel spacious, allowing high-quality project imagery to command attention.

## Elevation & Depth

In a deep black environment, elevation is achieved through **Tonal Layers** and **Subtle Glows** rather than traditional shadows.

1.  **Level 0 (Base):** `#0A0A0B` (Background).
2.  **Level 1 (Cards/Containers):** A slightly lighter surface color (e.g., `#121214`) or a 1px border with 10% opacity of the primary cyan.
3.  **Interaction:** Use a "Neon Bloom" effect for hovered elements. A drop-shadow with a large blur radius (32px+) and low opacity (20%) using the primary cyan `#22D3EE` creates a soft glow that feels like a light source in a dark room.
4.  **Glassmorphism:** Use backdrop blurs (20px+) on navigation bars and overlays to maintain context while ensuring legibility.

## Shapes

The shape language is primarily **Soft-Sharp**. While the overall aesthetic is technical and architectural, a subtle `0.25rem` (4px) corner radius is applied to buttons, cards, and input fields to prevent the UI from feeling overly aggressive. 

This minimal rounding provides a modern, "precision-machined" look. Larger elements like project featured images may use `rounded-lg` (8px) to soften the visual impact of high-contrast photos against the black canvas.

## Components

### Buttons
Primary buttons use a solid `#22D3EE` background with black text. Secondary buttons are "ghost style" with a 1px border and a subtle glow on hover. All buttons should have a transition duration of 200ms for the glow effect.

### Project Cards
Cards should be borderless with high-quality imagery. On hover, the image should scale slightly (1.05x), and a thin primary-colored top border or corner accent should appear to indicate interactivity. Use JetBrains Mono for the "Tech Stack" tags at the bottom of the card.

### Chips/Tags
Tags use a monospaced font and a low-opacity background of the primary color (10-15%). They should be styled with sharp corners or the minimum `roundedness` to maintain the technical aesthetic.

### Input Fields
Inputs are dark-themed with a subtle `1px` border. The border should animate to the primary cyan color upon focus, accompanied by a very soft inner glow.

### Navigation
The header should be a floating "glass" element with a backdrop-filter and a 1px bottom border at 5% opacity. This maintains the "clean and technical" feel as the user scrolls.