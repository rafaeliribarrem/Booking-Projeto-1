# Design System Guidelines

## Core Principles

1. **NO GRADIENTS** - Use solid colors only
2. **Minimal Color Palette** - Use only approved colors
3. **Consistent Typography** - Inter for body, Playfair Display ONLY for hero titles
4. **Consistent Spacing** - Use design tokens
5. **Touch-Friendly** - 44px minimum tap targets

## Colors

### Use ONLY These Colors

**Primary Actions**

- `bg-terracotta-500` + `text-cream-50` (buttons, CTAs)
- `hover:bg-terracotta-600`
- `active:bg-terracotta-700`

**Secondary Actions**

- `bg-sage-500` + `text-cream-50`
- `hover:bg-sage-600`

**Backgrounds**

- `bg-cream-50` - Main page background
- `bg-sand-50` - Section backgrounds
- `bg-cream-100` - Card backgrounds

**Text**

- `text-sand-900` - Headings, primary text
- `text-sand-700` - Body text, secondary text
- `text-sand-600` - Tertiary text
- `text-cream-50` - Text on dark backgrounds

**Borders**

- `border-sand-200` - Default borders
- `border-sand-300` - Strong borders

**Icons**

- Always use `text-sand-700` OR inherit from parent text color
- Never use custom icon colors

**Status**

- Success: `text-sage-600` or `bg-sage-600`
- Warning: `text-clay-500` or `bg-clay-500`
- Error: `text-terracotta-600` or `bg-terracotta-600`

## Typography

### Font Families

**Body Text (Default)**

```tsx
// Use Inter for ALL text by default
className = "text-base"; // No font-family needed, it's the default
```

**Display Font (Hero Titles Only)**

```tsx
// Use Playfair Display ONLY for:
// - Page hero titles (h1)
// - Large landing page section headings (h2)
// - Logo

className = "font-display text-5xl font-bold";
```

**DO NOT use font-display for:**

- Card titles
- Small headings
- Body text
- Buttons
- Form labels
- Navigation
- Dashboard headings

### Font Sizes

- `text-sm` - Small text, labels
- `text-base` - Body text
- `text-lg` - Large body text
- `text-xl` - Small headings
- `text-2xl` - Medium headings
- `text-3xl` - Large headings
- `text-4xl` - Extra large headings
- `text-5xl` - Hero titles (with font-display)

## Buttons

### Variants

**Primary (Default)**

```tsx
<Button>Click Me</Button>
// bg-terracotta-500 hover:bg-terracotta-600 text-cream-50
```

**Secondary**

```tsx
<Button variant="secondary">Click Me</Button>
// bg-sage-500 hover:bg-sage-600 text-cream-50
```

**Outline**

```tsx
<Button variant="outline">Click Me</Button>
// border-sand-300 text-sand-900 hover:bg-sand-50
```

**Ghost**

```tsx
<Button variant="ghost">Click Me</Button>
// text-sand-900 hover:bg-sand-100
```

### Sizes

- `size="sm"` - Small (h-10)
- `size="default"` - Default (h-11, min-h-44px)
- `size="lg"` - Large (h-12)

## Cards

### Always Use These Backgrounds

```tsx
<Card className="p-6">
  // bg-cream-100 by default
</Card>

<Card variant="elevated" className="p-6">
  // bg-cream-100 with shadow-md
</Card>
```

## Icons

### Color Rules

```tsx
// Option 1: Use sand-700 (default icon color)
<Calendar className="w-5 h-5 text-sand-700" />

// Option 2: Inherit from parent
<div className="text-terracotta-600">
  <Calendar className="w-5 h-5" /> // Will be terracotta-600
</div>
```

## Spacing

### Section Spacing

```tsx
<section className="py-20">
  // 80px vertical padding between major sections
</section>
```

### Card Padding

```tsx
<Card className="p-6">  // Standard cards
<Card className="p-8">  // Large cards
```

### Container

```tsx
<div className="container mx-auto px-4 lg:px-8">
  // Consistent container with responsive padding
</div>
```

## Common Mistakes to Avoid

❌ **DON'T**

- Use gradients anywhere
- Use font-display on small headings or body text
- Use custom colors not in the approved list
- Use different icon colors
- Mix button styles

✅ **DO**

- Use solid colors only
- Use font-display only for hero titles
- Stick to the approved color palette
- Use consistent icon colors (sand-700)
- Use standard button variants

## Component Checklist

When creating or updating a component:

- [ ] No gradients used
- [ ] Only approved colors used
- [ ] font-display only on hero titles
- [ ] Icons use sand-700 or inherit color
- [ ] Buttons use standard variants
- [ ] Cards use cream-100 background
- [ ] Consistent spacing applied
- [ ] Touch targets are 44px minimum
