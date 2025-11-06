# Image Directory Structure

This directory contains all static images used throughout the Yoga Booking System.

## Directory Structure

```
public/images/
├── hero/           # Hero section background images
├── classes/        # Class type images
├── instructors/    # Instructor profile photos
├── backgrounds/    # Background textures and patterns
└── README.md       # This documentation file
```

## Image Requirements

### Hero Images (`hero/`)

- **Dimensions**: 1920x1080px (16:9 aspect ratio)
- **Format**: WebP preferred, JPEG fallback
- **Size**: < 500KB optimized
- **Content**: Serene yoga poses in natural settings
- **Usage**: Homepage hero section backgrounds

### Class Type Images (`classes/`)

- **Dimensions**: 800x600px (4:3 aspect ratio)
- **Format**: WebP preferred, JPEG fallback
- **Size**: < 200KB optimized
- **Content**: Representative images for each yoga style
- **Usage**: Class type cards, schedule listings, class detail pages

### Instructor Photos (`instructors/`)

- **Dimensions**: 400x400px (1:1 aspect ratio)
- **Format**: WebP preferred, JPEG fallback
- **Size**: < 100KB optimized
- **Content**: Professional headshots with natural backgrounds
- **Usage**: Instructor profiles, class detail pages, about sections

### Background Textures (`backgrounds/`)

- **Dimensions**: 1920x1080px or tileable patterns
- **Format**: WebP preferred, PNG for transparency
- **Size**: < 300KB optimized
- **Content**: Subtle textures (linen, paper, organic patterns)
- **Usage**: Section backgrounds, overlays

## Naming Conventions

### Hero Images

- `hero-main.webp` - Primary homepage hero
- `hero-about.webp` - About page hero
- `hero-schedule.webp` - Schedule page hero

### Class Type Images

- `class-[type-slug].webp` - e.g., `class-hatha-yoga.webp`
- Use kebab-case for class type names
- Include fallback JPEG versions

### Instructor Photos

- `instructor-[name-slug].webp` - e.g., `instructor-sarah-johnson.webp`
- Use kebab-case for instructor names
- Include fallback JPEG versions

### Background Textures

- `texture-[name].webp` - e.g., `texture-linen.webp`
- `pattern-[name].webp` - e.g., `pattern-organic.webp`

## Optimization Guidelines

1. **Use Next.js Image component** for all images
2. **Provide multiple formats** (WebP + JPEG/PNG fallback)
3. **Include responsive sizes** for different screen sizes
4. **Add proper alt text** for accessibility
5. **Use lazy loading** for below-the-fold images
6. **Set priority loading** for above-the-fold images

## Fallback Strategy

When custom images are not available:

1. Use Unsplash API for yoga-related stock photos
2. Generate placeholder images with appropriate colors
3. Use default avatar with initials for instructor photos
4. Apply subtle background colors instead of textures

## Tools for Optimization

- **ImageOptim** (macOS) or **TinyPNG** (web) for compression
- **Squoosh** (web) for format conversion
- **GIMP** or **Photoshop** for resizing and editing
