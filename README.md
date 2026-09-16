I want you to recreate the website from the provided reference HTML file
inside my EXISTING PROJECT.

IMPORTANT:
DO NOT create a new project.

The attached HTML file is the visual/layout reference and source of truth for the website structure.

The existing project is the actual project that must be modified.

============================================================
1. FIRST INSPECT THE EXISTING PROJECT
============================================================

Before writing code:

1. Inspect the complete project structure.
2. Identify the framework.
3. Identify whether it uses Next.js/React.
4. Inspect package.json.
5. Inspect the current homepage.
6. Inspect existing components.
7. Inspect existing CSS/Tailwind configuration.
8. Inspect existing assets/images.
9. Inspect existing routing.
10. Inspect existing backend/API code.
11. Identify which components can be reused.

DO NOT blindly overwrite the project.

Preserve:
- existing backend
- existing APIs
- existing database
- existing authentication
- existing routes
- existing components that are still useful

The current task is primarily to build the FRONTEND/UI.

============================================================
2. REFERENCE HTML
============================================================

Use the attached HTML file as the main visual and structural reference.

The reference contains a complete ModularHome-style building website with:

- top utility bar
- sticky navigation
- hero section
- trust/benefit cards
- home search/filter section
- home categories
- available homes
- budget categories
- homes near you
- trending homes
- customization section
- floor plans
- quote form
- how-it-works
- financing section
- payment calculator
- video section
- testimonials
- latest resources/blog
- final CTA
- footer
- responsive mobile behavior

Recreate the SAME overall structure and visual hierarchy.

Do not simply paste the HTML into the project.

Convert it into proper reusable React/Next.js components.

============================================================
3. IMPORTANT BRANDING CHANGE
============================================================

The reference HTML uses ModularHome.com branding.

DO NOT use ModularHome.com branding in the final website.

Use the existing project's actual company branding/logo/content if available.

The reference HTML's branding, company name, contact details and content should be treated as PLACEHOLDER content.

The existing project's building/cabin company identity should be used instead.

============================================================
4. DESIGN STYLE
============================================================

Create a premium modern building/home website.

Visual style:

- clean
- professional
- architectural
- premium
- trustworthy
- conversion focused
- image-heavy
- modern construction aesthetic

Primary colors:

RED:
#E20B16

DARK:
#101114

WHITE:
#FFFFFF

LIGHT GRAY:
#F6F7F9

BORDER:
#E7E9EE

MUTED:
#6B7280

Use red for:
- CTA buttons
- prices
- active navigation
- important links
- small accents

Keep the overall page mostly white/light with strong red CTA elements.

============================================================
5. TYPOGRAPHY
============================================================

Use:

Inter / Manrope / DM Sans

Headings:
font-weight 700–900

Body:
400–500

Use large bold headings.

Keep typography similar to the reference HTML.

Do not use futuristic fonts.

============================================================
6. GLOBAL CONTAINER
============================================================

Use a maximum content width around:

1440px

with responsive horizontal padding.

Desktop:
28–40px

Tablet:
24px

Mobile:
16px

Maintain consistent spacing throughout the website.

============================================================
7. TOP BAR
============================================================

Create a slim top utility bar.

Desktop:

LEFT:
- Social links
- Facebook
- Instagram
- YouTube
- Trust message

RIGHT:
- Financing
- Blog
- Customer Reviews
- Track Order

Mobile:
Hide the desktop utility bar.

============================================================
8. NAVBAR
============================================================

Create a sticky header.

Desktop:

LEFT:
Existing project logo.

CENTER:
Navigation links.

Example:

Modular Homes
Prefab Homes
Barndominiums
House Kits
Tiny Homes
Cabins
ADUs
Floor Plans

RIGHT:
Phone number
Get a Quote

Use a white background.

Add:
- subtle border
- backdrop blur
- sticky positioning

Mobile:

LEFT:
Logo

RIGHT:
Phone/call button
Hamburger

Clicking hamburger opens a mobile menu.

============================================================
9. HERO SECTION
============================================================

Create a large full-width hero.

Use a high-quality building/home image.

Hero should have:

- background image
- dark gradient overlay
- large heading
- description
- two CTA buttons

Example structure:

MODERN. AFFORDABLE. BUILT FOR LIFE.

MODULAR HOMES
FOR A BETTER TOMORROW

Explore beautiful homes, floor plans and flexible options designed around your lifestyle, location and budget.

Buttons:

GET A QUOTE →

BROWSE HOMES

Hero height:

Desktop:
560–650px

Mobile:
500–620px

Text should remain readable over the image.

============================================================
10. TRUST / BENEFITS
============================================================

Immediately below hero.

Create four cards:

Faster Build Times
Lower Costs
Energy Efficient
Nationwide Delivery

Use icons.

Desktop:
4 columns

Tablet:
2 columns

Mobile:
2 columns

Cards should have:
- white background
- border
- subtle shadow
- rounded corners

============================================================
11. FIND YOUR PERFECT HOME
============================================================

Create a search/filter card.

Heading:

Find Your Perfect Home

Subheading:

Search homes based on your requirements.

Filters:

Home Type
Budget
Bedrooms
Bathrooms
Location

Button:

Search Homes →

Desktop:
6-column style layout.

Mobile:
Stack filters vertically.

Make the controls visually functional even if they use mock data initially.

============================================================
12. SHOP BY HOME TYPE
============================================================

Create a light-gray section.

Heading:

Shop by Home Type

Subheading:

Explore our most popular home categories.

Create category cards for:

- Modular Homes
- Prefab Homes
- Barndominiums
- House Kits
- Tiny Homes
- Cabins
- ADUs
- Park Models
- A-Frames
- Commercial

Desktop:
5-column grid.

Tablet:
3 columns.

Mobile:
2 columns or horizontally scrollable cards.

Each card:

Image
Category name
Arrow

Use large high-quality building images.

============================================================
13. HOMES / BUILDINGS AVAILABLE
============================================================

Heading:

Homes Available Right Now

Subheading:

Move-in ready and quick-ship homes.

Create product cards.

Each product:

Image
Badge
Name
Bedrooms
Bathrooms
Square footage
Price
View Home button

Example:

The Aspen
3 Bed | 2 Bath | 1,586 Sq Ft
$189,000

Use mock data.

Create at least 8 products.

Desktop:
5-column layout where space permits.

Tablet:
3 columns.

Mobile:
1 column.

============================================================
14. BUDGET SECTION
============================================================

Create:

Find a Home in Your Budget

Cards:

Under $75K
$75K – $150K
$150K – $250K
$250K+

Each card:
- image
- budget
- short description

============================================================
15. HOMES NEAR YOU
============================================================

Create a location section.

LEFT:
ZIP code search.

CENTER:
Map placeholder.

RIGHT:
Nationwide delivery information.

Include:

Delivered to your site
Professional installation
Nationwide availability

CTA:

Learn More →

For now, the map can be a styled placeholder.

Keep architecture ready for Google Maps or another map API later.

============================================================
16. TRENDING HOMES
============================================================

Create another product grid.

Heading:

Trending Homes

Show 5 products.

Use the same reusable ProductCard component.

Do NOT duplicate component code.

============================================================
17. CUSTOMIZATION
============================================================

Create a split section.

LEFT:
Large interior/building image.

RIGHT:

Customize Your Dream Home

Description.

Features:

✓ Multiple floor plans
✓ Premium finishes
✓ Energy-efficient options
✓ Expert support

CTA:

Start Customizing →

============================================================
18. FLOOR PLANS
============================================================

Create:

Floor Plans & House Plans

Display floor-plan cards.

Each:

Floor plan preview
Bedrooms
Bathrooms
Square footage
View Plan button

Use a realistic floor-plan visual or existing assets.

============================================================
19. QUOTE SECTION
============================================================

Create a large quote form.

Heading:

Get Your Custom Quote

Fields:

Full Name
Email Address
Phone Number
State
Home Type
Budget
Project Details
Floor Plan Upload

Button:

Submit Quote →

Frontend only for now.

Implement:
- validation
- loading state
- success state
- error state

Do not connect to backend unless existing API already supports it.

============================================================
20. HOW IT WORKS
============================================================

Create five steps:

1. Browse
2. Quote
3. Customize
4. Build
5. Deliver

Use numbered circles.

Desktop:
horizontal layout.

Mobile:
vertical layout.

============================================================
21. FINANCING
============================================================

Create:

Financing Your Modular Home

Benefits:

✓ Competitive rates
✓ Multiple loan options
✓ Fast approval process
✓ Trusted lenders

CTA:

Learn More →

Right side:

Estimate Your Monthly Payment

Fields:

Home Price
Down Payment
Loan Term
Rate

Show:

Estimated Monthly Payment

Make the calculator actually work on the frontend.

When values change, calculate an approximate monthly payment using the standard loan payment formula.

Do not hardcode the final value.

============================================================
22. VIDEO SECTION
============================================================

Create:

Watch Our Home Tours

Display video cards.

Each card:

Thumbnail
Play button
Title

Use:

- building tours
- interior tours
- construction
- barndominiums
- customer stories

Clicking a video should open a modal or YouTube embed.

For now, use mock YouTube video IDs if real IDs are not available.

IMPORTANT:

Create the video component in a way that later supports automatic YouTube synchronization.

Future architecture:

YouTube
↓
Backend sync
↓
Database
↓
API
↓
VideoSection

Do not expose YouTube API keys in frontend.

============================================================
23. TESTIMONIALS
============================================================

Create:

What Our Customers Say

Three testimonial cards.

Each:

Stars
Customer quote
Customer name
Location

Desktop:
3 columns.

Mobile:
Carousel or one card at a time.

Use subtle animations.

============================================================
24. LATEST NEWS / RESOURCES
============================================================

Create:

Latest News & Resources

Three article cards.

Each:

Image
Title
Category/date
Read More →

Use reusable ArticleCard.

============================================================
25. FINAL CTA
============================================================

Create a large visual CTA.

Background:
High-quality home/building image.

Overlay:

Ready to Build Your Dream Home?

Get a personalized quote and take the first step today.

Button:

Get a Quote →

============================================================
26. FOOTER
============================================================

Create a professional multi-column footer.

Column 1:
Logo
Description
Social icons

Column 2:
Quick Links

Column 3:
Home Types & Resources

Column 4:
Contact Us

Include:

Phone
Email
Location

Newsletter:

Email input
Join button

Bottom:

Copyright
Privacy Policy
Terms
Sitemap

Mobile:
Stack columns vertically.

============================================================
27. RESPONSIVE DESIGN
============================================================

The website MUST be responsive.

Test:

375px
390px
768px
1024px
1280px
1440px

Desktop:
- large hero
- multi-column grids
- horizontal navigation
- spacious layout

Tablet:
- reduce columns
- maintain visual hierarchy

Mobile:
- hamburger navigation
- stacked sections
- horizontal/compact cards where appropriate
- full-width buttons
- smaller typography
- reduced spacing
- touch-friendly controls

NO horizontal overflow.

============================================================
28. COMPONENT ARCHITECTURE
============================================================

Create reusable components.

Suggested:

components/
├── Header/
├── TopBar/
├── Navbar/
├── MobileMenu/
├── Hero/
├── TrustBar/
├── HomeSearch/
├── CategoryCard/
├── CategoryGrid/
├── ProductCard/
├── ProductGrid/
├── BudgetCard/
├── LocationSection/
├── CustomizeSection/
├── FloorPlanCard/
├── QuoteForm/
├── HowItWorks/
├── FinancingCalculator/
├── VideoCard/
├── VideoSection/
├── TestimonialCard/
├── Testimonials/
├── ArticleCard/
├── Resources/
├── CTASection/
└── Footer/

Use shared Button, Card, SectionHeading and Container components if appropriate.

============================================================
29. MOCK DATA
============================================================

Create centralized mock data.

Example:

data/
├── homes.ts
├── categories.ts
├── floorPlans.ts
├── videos.ts
├── testimonials.ts
└── articles.ts

Do not hardcode product information directly inside JSX.

Example:

{
  id: "aspen",
  name: "The Aspen",
  category: "Modular Home",
  image: "...",
  bedrooms: 3,
  bathrooms: 2,
  sqft: 1586,
  price: 189000
}

============================================================
30. ROUTES
============================================================

Homepage:

/

Prepare architecture for:

/homes
/homes/[slug]
/floor-plans
/floor-plans/[slug]
/videos
/videos/[slug]
/quote
/about
/contact

The homepage should be the primary focus.

============================================================
31. INTERACTIONS
============================================================

Implement functional frontend interactions:

- Mobile menu
- Sticky navbar
- Search filters
- Product filtering
- Category filtering
- Quote form validation
- File selection
- Financing calculator
- Video modal
- Testimonial carousel
- Newsletter success state
- Smooth scrolling
- Hover effects

Do not leave obvious dead buttons.

============================================================
32. ANIMATIONS
============================================================

Use subtle animations.

Hero:
- fade in
- slide up

Cards:
- slight hover lift
- image zoom

Buttons:
- arrow movement

Sections:
- scroll reveal

Navbar:
- smooth sticky transition

Do NOT overuse animations.

The website must remain fast.

============================================================
33. IMAGES
============================================================

Use existing project assets first.

If suitable assets don't exist, use high-quality placeholders temporarily.

Prefer:

- modular homes
- cabins
- barndominiums
- steel buildings
- tiny homes
- modern homes
- architectural interiors
- construction
- floor plans

Images must:
- maintain aspect ratio
- use object-cover
- be responsive
- be optimized

============================================================
34. SEO
============================================================

Implement:

- proper title
- meta description
- Open Graph metadata
- semantic HTML
- H1/H2 hierarchy
- image alt text
- canonical-ready URLs
- sitemap-ready structure

Do not use the reference site's exact SEO text.

Use the existing company's information.

============================================================
35. ACCESSIBILITY
============================================================

Implement:

- semantic HTML
- accessible navigation
- keyboard support
- focus states
- form labels
- alt text
- accessible buttons
- sufficient contrast

============================================================
36. PERFORMANCE
============================================================

Optimize for:

- fast initial load
- optimized images
- lazy loading below fold
- minimal JavaScript
- reusable components
- no unnecessary dependencies
- no layout shift
- responsive images

============================================================
37. VERY IMPORTANT: REFERENCE MATCH
============================================================

The attached HTML is the design reference.

Match its:

- section order
- spacing
- card proportions
- typography hierarchy
- CTA placement
- grid layouts
- hero proportions
- navigation structure
- footer structure
- responsive behavior
- overall visual density

However:

DO NOT simply copy/paste the HTML.

Convert the design into a clean modern component-based implementation.

============================================================
38. EXISTING PROJECT INTEGRATION
============================================================

If the existing project already has:

Navbar
Footer
Product components
API services
Database models
Authentication
Images
Design system

reuse them where possible.

Do not create duplicate implementations.

If existing backend functionality exists, don't break it.

If backend functionality is not ready, use mock data.

============================================================
39. FINAL TESTING
============================================================

After implementation:

1. Start the development server.
2. Open homepage.
3. Check console.
4. Check desktop at 1440px.
5. Check mobile at 375px.
6. Check tablet.
7. Test navbar.
8. Test mobile menu.
9. Test every CTA.
10. Test filters.
11. Test product cards.
12. Test quote form.
13. Test file upload UI.
14. Test calculator.
15. Test video modal.
16. Test testimonials.
17. Test newsletter.
18. Check footer.
19. Check image loading.
20. Check for horizontal overflow.
21. Fix all console errors.
22. Fix all visual spacing issues.

============================================================
40. FINAL DESIGN GOAL
============================================================

The finished website should feel like a polished,
production-quality American building/home company website.

It should NOT look like:

- a basic HTML template
- a SaaS dashboard
- a generic AI-generated website
- a simple Bootstrap page

It should look like a real commercial website with:

PREMIUM IMAGERY
+
STRONG TYPOGRAPHY
+
CLEAN WHITE SPACE
+
RED CTA ACCENTS
+
PROFESSIONAL PRODUCT CARDS
+
HIGH-CONVERSION SECTIONS
+
EXCELLENT MOBILE RESPONSIVENESS

Most importantly:

BUILD THIS INSIDE THE EXISTING PROJECT.

DO NOT CREATE A NEW PROJECT.

Use the attached HTML reference as the structural and visual source of truth, while adapting the branding and content to the existing project.