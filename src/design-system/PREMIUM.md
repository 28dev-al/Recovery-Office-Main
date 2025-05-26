# Premium Financial Design System

This document describes the professional financial design system components created for Recovery Office. These components follow industry standards for financial services websites while maintaining the sacred geometry principles of the original design system.

## Getting Started

To use the premium components, import them from the premium module:

```tsx
import { 
  ThemeProvider, 
  premiumTheme, 
  PremiumLayout, 
  PremiumNavBar, 
  PremiumFooter,
  PageSection 
} from '../design-system/premium';
```

## Premium Theme

The premium theme provides a sophisticated financial services color palette with navy blue and gold accents:

```tsx
// Wrap your application with the ThemeProvider
<ThemeProvider theme="premium">
  <YourApp />
</ThemeProvider>
```

## Core Components

### PremiumLayout

The `PremiumLayout` component provides a consistent page structure with the premium navbar, breadcrumbs, content area, and footer:

```tsx
<PremiumLayout
  logo={<YourLogo />}
  companyName="Recovery Financial"
  pageTitle="Financial Services"
  navItems={navigationItems}
  navCTAs={[
    { label: "Get Started", href: "/contact", isPrimary: true }
  ]}
  footerColumns={footerColumns}
  socialLinks={socialLinks}
  regulatoryInfo={{
    registrationInfo: "Registered Company 123456",
    regulatoryBody: "Financial Conduct Authority",
    regulatoryBodyUrl: "https://www.fca.org.uk/",
    additionalInfo: "Authorized and regulated financial services."
  }}
  disclaimerText="Investment involves risk. The value of investments can go down as well as up and you may get back less than you invested."
>
  {/* Your page content here */}
</PremiumLayout>
```

### PremiumNavBar

The `PremiumNavBar` component provides a professional navigation system with support for dropdown menus, CTAs, and a login button:

```tsx
<PremiumNavBar
  logo={<YourLogo />}
  items={[
    { label: "Home", href: "/" },
    { 
      label: "Services", 
      href: "/services",
      subItems: [
        { label: "Financial Planning", href: "/services/planning" },
        { label: "Investment Management", href: "/services/investments" }
      ]
    },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" }
  ]}
  ctas={[
    { label: "Free Consultation", href: "/book", isPrimary: true }
  ]}
  showLoginButton={true}
  loginButtonText="Client Login"
  loginButtonUrl="/login"
  isTransparent={false}
  isSticky={true}
  animateOnScroll={true}
/>
```

### PremiumFooter

The `PremiumFooter` component provides a comprehensive footer with support for regulatory information, disclaimers, and multiple links sections:

```tsx
<PremiumFooter
  logo={<YourLogo />}
  companyName="Recovery Financial"
  columns={[
    {
      title: "Services",
      links: [
        { label: "Financial Planning", url: "/services/planning" },
        { label: "Investment Management", url: "/services/investments" },
        { label: "Retirement Planning", url: "/services/retirement" }
      ]
    },
    {
      title: "Company",
      links: [
        { label: "About Us", url: "/about" },
        { label: "Team", url: "/team" },
        { label: "Careers", url: "/careers" }
      ]
    },
    {
      title: "Resources",
      links: [
        { label: "Blog", url: "/blog" },
        { label: "FAQs", url: "/faq" },
        { label: "Client Portal", url: "/login", isHighlighted: true }
      ]
    }
  ]}
  socialLinks={[
    { platform: "linkedin", url: "https://linkedin.com/company/recovery-financial" },
    { platform: "twitter", url: "https://twitter.com/recoveryfinancial" },
    { platform: "facebook", url: "https://facebook.com/recoveryfinancial" }
  ]}
  regulatoryInfo={{
    registrationInfo: "Recovery Financial Ltd. Registered in England and Wales (No. 123456)",
    regulatoryBody: "Financial Conduct Authority",
    regulatoryBodyUrl: "https://www.fca.org.uk/",
    additionalInfo: "Authorized and regulated by the Financial Conduct Authority (Reference No. 123456)"
  }}
  disclaimerText="Investment involves risk. The value of investments can go down as well as up and you may get back less than you invested. Past performance is not a reliable indicator of future performance."
  showNewsletter={true}
  newsletterTitle="Stay Informed"
  newsletterDescription="Subscribe to our newsletter for financial insights and market updates."
/>
```

### PageSection

The `PageSection` component provides a consistent section structure with support for different sizes, botanical elements, and responsive behavior:

```tsx
<PageSection
  variant="primary"
  size="large"
  showBotanical={true}
  botanicalType="smallFlourish"
  botanicalPosition="bottom-right"
  id="services-section"
>
  <h2>Our Services</h2>
  <p>We provide comprehensive financial services to help you achieve your goals.</p>
  
  <Grid>
    {/* Service cards or content */}
  </Grid>
</PageSection>
```

## Page Structure Guidelines

For consistent page structure, follow these guidelines:

1. Use the `PremiumLayout` as the base container for all pages
2. Divide content into logical sections using `PageSection`
3. Use appropriate section variants for visual hierarchy:
   - `primary` (navy blue) for key call-to-action sections
   - `light` for most informational sections
   - `accent` (gold) sparingly for important highlights
   - `transparent` for sections that need to blend with the background

4. Maintain proper spacing using the PageSection size property:
   - `small` for compact sections with minimal content
   - `medium` (default) for standard content sections
   - `large` for featured content with more white space
   - `hero` for hero banners and key landing sections

## Responsive Design

All premium components are fully responsive and will adapt to different screen sizes. The system uses these standard breakpoints:

- Mobile: < 768px
- Tablet: 768px - 991px
- Desktop: 992px - 1199px
- Large Desktop: ≥ 1200px

## Sacred Geometry Integration

While the premium components follow financial industry standards, they maintain the sacred geometry principles through:

1. Golden ratio (1.618) spacing relationships
2. Fibonacci sequence for all padding and margin values
3. Botanical elements as visual accents
4. Harmonious proportions in layout grids

These principles ensure the design remains visually pleasing while meeting the professional requirements of financial services websites. 