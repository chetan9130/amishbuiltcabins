# MODULARHOME.COM — PHASE 1 IMPLEMENTATION

## ADMIN BACKEND + CMS FOUNDATION

You are working on the existing **SteelWeb / ModularHome** project.

This is **PHASE 1 ONLY**.

Do NOT implement Phase 2 or Phase 3 features yet.

Do NOT rebuild the existing website from scratch.

The purpose of this phase is to build a secure, production-ready **Admin Backend + CMS foundation** so the ModularHome website can be managed without modifying source code.

---

# 1. CLIENT PHASE 1 REQUIREMENT

Phase 1 must provide:

* Secure admin login
* Authenticated administration area
* Protected admin routes
* Secure session handling
* Role-ready architecture
* Admin dashboard
* Global website settings
* Page management
* Section management
* Product/Home Model management
* Collection management
* Blog management
* SEO management
* Lead data structure
* Quotation data structure

The Phase 1 acceptance criteria are:

1. Admin can log in securely.
2. Logo/global settings can be changed without code changes.
3. Core pages and configured sections can be edited from admin.
4. Products, collections and blogs can be created/edited from admin.
5. SEO fields are available for key content types.
6. Lead/quotation data structures are ready for Phase 3 integrations.

Do not mark Phase 1 complete until all six acceptance criteria are satisfied.

---

# 2. FIRST — AUDIT THE EXISTING PROJECT

Before modifying anything, inspect the entire existing codebase.

Inspect:

* `package.json`
* `src/app`
* `src/components`
* `src/lib`
* `src/data`
* `src/types`
* `src/utils`
* API routes
* Admin routes
* Existing authentication
* Existing admin video dashboard
* Product/model data
* Collection data
* Blog data
* SEO implementation
* Quote Wizard
* Contact forms
* YouTube/video store

Pay particular attention to:

* `globals.css`
* `layout.tsx`
* `page.tsx`
* `Navbar.tsx`
* `QuoteWizard.tsx`
* `videoStore.ts`
* existing admin components
* existing API routes

DO NOT duplicate existing functionality.

Reuse existing components, types, utilities and styling wherever possible.

---

# 3. CREATE A PHASE 1 CHECKLIST

Before implementation, internally classify existing functionality as:

* COMPLETE
* PARTIALLY COMPLETE
* MISSING

Then implement only what is required for Phase 1.

Do not unnecessarily modify already-working public frontend functionality.

---

# 4. DATABASE ARCHITECTURE

Phase 1 requires a proper persistent data layer.

Do NOT use JSON files as the primary production database.

The database must be designed to support the CMS and future Phase 3 functionality.

Create appropriate models/tables/collections for:

### Admin

* AdminUser
* Role/session information

### Website

* GlobalSettings
* Page
* PageSection

### Catalog

* Product
* Collection
* ProductCollection relationship

### Content

* Blog
* BlogCategory/Tag where required

### SEO

SEO fields should be available on:

* Product
* Collection
* Page
* Blog

### Future-ready structures

Create data structures for:

* Lead
* Quotation

These do not need full Phase 3 workflows yet.

Use the database technology already present in the project if it is suitable.

If there is no production database, choose a suitable persistent database that works correctly with the existing Next.js architecture.

Do not introduce unnecessary database complexity.

---

# 5. DATABASE REQUIREMENTS

Use proper relationships.

Example conceptual structure:

```text
AdminUser
   │
   └── Authentication / Roles

GlobalSettings

Page
   │
   └── PageSection[]

Product
   │
   └── Collection[]

Collection

Blog

Lead

Quotation
```

Use stable IDs.

Add:

* createdAt
* updatedAt

where appropriate.

Use indexes for commonly searched fields such as:

* slug
* email
* status
* published
* createdAt

Ensure slugs are unique where required.

---

# 6. ADMIN AUTHENTICATION

Implement secure admin authentication.

Required:

* Login page
* Logout
* Session management
* Protected admin routes
* Protected admin APIs
* Unauthorized response
* Authentication middleware/server checks

Protect:

```text
/admin/*
/api/admin/*
```

Do NOT simply hide pages from unauthenticated users.

Every admin API must verify authentication server-side.

Use secure HTTP-only cookies/session mechanisms where appropriate.

Do not expose passwords or authentication secrets to the client.

Never store plaintext passwords.

Use secure password hashing if implementing username/password authentication.

---

# 7. ROLE-READY ARCHITECTURE

The client requires role-ready architecture.

At minimum design the system so future roles can be introduced.

Example:

```text
ADMIN
EDITOR
```

For Phase 1, it is acceptable if only ADMIN is active.

However, authorization should be structured so additional roles can be added later without rewriting the authentication system.

---

# 8. ADMIN DASHBOARD

Create a professional admin dashboard.

Dashboard navigation should include:

```text
Dashboard

Website
 ├── Global Settings
 ├── Pages
 └── Sections

Catalog
 ├── Products
 └── Collections

Content
 └── Blogs

SEO

Leads

Quotations

Settings
```

Leads and Quotations are Phase 3 modules, but Phase 1 should establish their database/data foundation.

Do not implement complete AI lead generation or quotation workflows yet.

---

# 9. ADMIN DASHBOARD OVERVIEW

Create useful dashboard summary cards.

For example:

* Total Products
* Total Collections
* Total Pages
* Published Blogs
* Draft Blogs
* Leads
* Quotations

These should come from the database.

Do not hard-code numbers.

---

# 10. GLOBAL SETTINGS CMS

Create a complete Global Settings module.

Admin must be able to edit:

### Branding

* Logo
* Favicon
* Company name

### Contact

* Phone
* Email
* Address

### Social

* Social media links

### Announcement

* Announcement/top bar content
* Enable/disable announcement if appropriate

### Header

* Navigation/menu configuration

### Footer

* Footer content
* Footer links
* Social links

### CTA

* Reusable CTA labels
* CTA links where configured

### SEO

* Default SEO title
* Default meta description
* Default site information

All changes must be persisted to the database.

---

# 11. PUBLIC WEBSITE CONNECTION

The public website must be able to consume GlobalSettings.

For example:

```text
Database
   ↓
GlobalSettings
   ↓
Server/API
   ↓
Navbar / Footer / Header / SEO
```

Do not require source-code changes when the admin changes:

* Logo
* Company name
* Phone
* Email
* Social links
* Announcement
* Navigation
* Footer

---

# 12. PAGE MANAGEMENT

Create a Page CMS.

Admin must be able to:

* Create page
* Edit page
* Publish page
* Unpublish page
* Delete/archive page
* Edit slug
* Edit SEO fields

Page fields:

* Title
* Subtitle
* Body/content
* Slug
* Status
* Featured image if applicable
* SEO title
* Meta description
* Canonical URL where appropriate

---

# 13. SECTION MANAGEMENT

Pages must support reusable sections.

Admin should be able to manage supported section types such as:

* Hero
* Feature
* Product
* Collection
* Trust
* Gallery
* FAQ
* Testimonials
* CTA
* Rich content
* Video

Each section should support appropriate fields.

For example:

### Hero

* Heading
* Subtitle
* Image
* Video
* CTA text
* CTA link

### Feature

* Heading
* Description
* Image
* Features

### CTA

* Heading
* Description
* Button text
* Button link

---

# 14. SECTION VISIBILITY

Admin must be able to:

* Show section
* Hide section
* Reorder sections

Use an ordering field such as:

```text
order: 1
order: 2
order: 3
```

The public frontend should render sections according to the saved order.

Hidden sections must not appear publicly.

---

# 15. PRODUCT / HOME MODEL CMS

Create complete product management.

Admin capabilities:

* Create
* Edit
* Publish
* Unpublish
* Archive/delete
* Feature
* Change display order

Product fields:

```text
Name
Slug
Description
Short Description
Images
Gallery
Price
Pricing fields
Specifications
Features
Options
Published
Featured
Display Order
```

SEO:

```text
SEO Title
Meta Description
Image Alt Text
Canonical URL where required
```

---

# 16. PRODUCT FRONTEND DATA

Do not redesign the product frontend.

Instead, prepare it so existing product pages can eventually consume database data.

Current/static model data may remain temporarily if required for Phase 1, but create the database/API architecture so Phase 2 can replace it with migrated Shopify data.

Do not break existing product pages.

---

# 17. COLLECTION CMS

Admin must be able to:

* Create collection
* Edit collection
* Publish/unpublish if required
* Archive/delete
* Assign products
* Change display order
* Mark featured

Fields:

```text
Name
Slug
Description
Banner Image
Collection Image
Products
Display Order
Featured
Status
```

SEO:

```text
SEO Title
Meta Description
Image Alt Text
```

---

# 18. PRODUCT ↔ COLLECTION RELATIONSHIP

Implement proper product-to-collection relationships.

Admin must be able to:

```text
Collection
   ↓
Select Products
```

and:

```text
Product
   ↓
Assign Collections
```

Ensure the relationship is stored correctly in the database.

---

# 19. BLOG CMS

Create/complete the Blog CMS.

Admin must be able to:

* Create
* Edit
* Publish
* Unpublish
* Archive/delete

Fields:

```text
Title
Slug
Featured Image
Content
Author
Publish Date
Status
Categories
Tags
Embedded Video
```

SEO:

```text
SEO Title
Meta Description
Image Alt Text
Canonical URL
```

---

# 20. BLOG EDITOR

Use a suitable content editor for blog content.

The editor must support practical rich content such as:

* Headings
* Paragraphs
* Lists
* Links
* Images
* Embedded YouTube/video where required

Do not introduce a complex editor unless necessary.

Keep the admin editing experience simple.

---

# 21. SEO MANAGEMENT

Create reusable SEO fields.

At minimum:

```text
SEO Title
Meta Description
Slug
Image Alt Text
Canonical URL
```

Apply to:

* Products
* Collections
* Pages
* Blogs

Do not implement the complete Shopify redirect migration in Phase 1.

That belongs to Phase 2.

---

# 22. SEO VALIDATION

Add reasonable admin validation:

* SEO title length warning
* Meta description length warning
* Missing alt text warning
* Duplicate slug prevention

Do not block publishing unnecessarily unless a field is truly required.

---

# 23. LEAD DATA FOUNDATION

Phase 1 must prepare the lead structure for Phase 3.

Create a Lead model/table supporting:

```text
Name
Email
Phone
Location
Enquiry Details
Source
Status
Notes
Created At
Updated At
```

Possible source values:

```text
CONTACT_FORM
AI_CHAT
QUOTE
WEBSITE
```

Possible future statuses:

```text
NEW
CONTACTED
QUALIFIED
QUOTE_SENT
FOLLOW_UP
WON
LOST
```

Do not implement the full AI lead-generation workflow in Phase 1.

Only create the data foundation and basic admin readiness if appropriate.

---

# 24. QUOTATION DATA FOUNDATION

Create a quotation data structure for Phase 3.

Support future fields such as:

```text
Customer
Contact Details
Selected Model
Dimensions
Square Footage
Options
Pricing Inputs
Estimated Amount
Requirements
Status
Source
Created At
Updated At
```

Do not implement AI quotation logic yet.

Do not modify the existing QuoteWizard unnecessarily.

Phase 3 will connect the QuoteWizard to this structure.

---

# 25. API ARCHITECTURE

Create clean API endpoints for admin operations.

Conceptually:

```text
/api/admin/auth/*
/api/admin/settings
/api/admin/pages
/api/admin/pages/[id]
/api/admin/products
/api/admin/products/[id]
/api/admin/collections
/api/admin/collections/[id]
/api/admin/blogs
/api/admin/blogs/[id]
/api/admin/leads
/api/admin/quotations
```

Use appropriate HTTP methods:

```text
GET
POST
PUT/PATCH
DELETE
```

Every admin endpoint must verify authentication.

---

# 26. API VALIDATION

Validate all incoming data server-side.

Validate:

* Required fields
* Email format
* URLs
* Slugs
* Prices
* IDs
* Status values
* Enum values

Never trust client-side validation alone.

Return consistent JSON responses.

Example structure:

```text
{
  success: true,
  data: ...
}
```

or:

```text
{
  success: false,
  error: {
    message: "...",
    code: "..."
  }
}
```

Do not expose internal errors or secrets.

---

# 27. ADMIN UI STATES

Every admin CRUD interface should include:

* Loading state
* Empty state
* Success state
* Error state
* Confirmation for destructive operations

Prevent accidental deletion.

Use confirmation dialogs for destructive actions.

---

# 28. IMAGE / MEDIA HANDLING

For Phase 1, create the media architecture needed by:

* Logo
* Favicon
* Product images
* Collection images
* Blog images
* Page images

Do not store large images as base64 in the database.

Use appropriate storage architecture.

If external media storage credentials are not available, create a clean abstraction and document the required configuration.

---

# 29. EXISTING YOUTUBE ADMIN

Do not remove the existing YouTube/video management system.

Keep it working.

If it is currently independent from the CMS, leave the Phase 3 automation integration for later.

Only make changes required to support the Phase 1 admin architecture.

---

# 30. EXISTING FRONTEND

Do not redesign the frontend in Phase 1.

Preserve:

* Playfair Display
* Manrope
* Existing responsive layout
* Existing animations
* Existing Quote Wizard
* Existing AI assistant UI
* Existing video pages
* Existing navigation design

Only connect frontend elements to GlobalSettings where practical without destabilizing the existing site.

---

# 31. BRAND REQUIREMENT

The final ModularHome site must use the client's approved warm orange/light neutral brand direction.

Do not introduce red as the primary brand color.

However, do not perform a full Phase 2 visual redesign during Phase 1.

Only ensure the CMS/admin design does not establish a conflicting primary brand identity.

---

# 32. SECURITY REQUIREMENTS

Implement:

* Secure authentication
* Password hashing if applicable
* Protected routes
* Protected APIs
* HTTP-only session cookies where applicable
* CSRF protection where applicable
* Input validation
* Authorization checks
* Rate limiting for login
* Secure environment variables

Never:

* hard-code credentials
* expose secrets
* trust client-side authorization
* expose database credentials
* return sensitive server errors

---

# 33. ENVIRONMENT VARIABLES

Create/update:

`.env.example`

Include variable names only.

For example:

```text
DATABASE_URL=
AUTH_SECRET=
ADMIN_SESSION_SECRET=
STORAGE_URL=
STORAGE_ACCESS_KEY=
STORAGE_SECRET_KEY=
```

Use only variables actually required by the selected architecture.

Never place real secrets in the repository.

---

# 34. DATABASE SEEDING

Create safe development seed data if useful.

Seed:

* One development admin
* Sample global settings
* Sample page
* Sample sections
* Sample product
* Sample collection
* Sample blog

Clearly distinguish development seed data from production data.

Do not allow sample/dummy content to accidentally become production content.

---

# 35. MIGRATION COMPATIBILITY

Prepare the schema so Phase 2 can import Shopify data.

Do not implement the complete Shopify migration now.

Ensure the following fields can be mapped later:

* Product handle
* Collection
* Blog slug
* SEO metadata
* Images
* Product relationships

---

# 36. TESTING

After implementation, test every Phase 1 module.

### Authentication

* Login works
* Invalid login rejected
* Logout works
* Unauthenticated admin access rejected
* Unauthenticated admin API rejected

### Global Settings

* Create/update settings
* Save
* Reload
* Verify persistence

### Pages

* Create
* Edit
* Publish
* Unpublish
* Delete/archive
* Slug validation

### Sections

* Create
* Edit
* Hide/show
* Reorder

### Products

* Create
* Edit
* Publish/unpublish
* Images
* SEO
* Collections

### Collections

* Create
* Edit
* Product assignment

### Blogs

* Create
* Edit
* Publish/unpublish
* SEO

### Leads

* Database record can be created
* Fields persist

### Quotations

* Database structure works
* Records can be stored

---

# 37. RESPONSIVE ADMIN

Admin should work correctly on:

* Desktop
* Tablet
* Mobile

Prioritize desktop because it is the primary CMS environment, but do not allow the interface to become unusable on smaller screens.

---

# 38. CODE QUALITY

Maintain:

* TypeScript
* Clean component structure
* Reusable components
* Reusable API utilities
* Proper types
* No unnecessary duplication
* No dead code
* No console errors
* No TypeScript errors

Do not silently ignore existing errors.

If you encounter an existing unrelated issue, document it.

---

# 39. DO NOT IMPLEMENT THESE IN PHASE 1

Do NOT implement the following unless required to make Phase 1 function:

* Shopify migration
* 301 migration redirects
* Complete AI chatbot backend
* AI lead-generation workflow
* YouTube-to-blog AI automation
* Payment gateway
* Floor-plan e-commerce
* Cart/checkout
* Digital downloads
* Order management
* Final production deployment
* Training video

These belong to Phase 2/3.

---

# 40. PHASE 1 ACCEPTANCE TEST

Before declaring Phase 1 complete, verify:

### Acceptance 1

Admin can securely log in.

### Acceptance 2

Admin can change:

* Logo
* Global settings
* Contact information
* Navigation
* Footer

without changing code.

### Acceptance 3

Admin can manage:

* Pages
* Sections
* Section visibility
* Section order

without code changes.

### Acceptance 4

Admin can:

* Create/edit products
* Create/edit collections
* Create/edit blogs

### Acceptance 5

SEO fields are available for:

* Products
* Collections
* Pages
* Blogs

### Acceptance 6

Lead and quotation database structures are ready for Phase 3.

---

# 41. FINAL PHASE 1 REPORT

After implementation, provide a concise report containing:

## COMPLETED

List every Phase 1 requirement implemented.

## PARTIALLY COMPLETED

List anything requiring external credentials or client input.

## NOT COMPLETED

Only list genuinely unfinished Phase 1 work.

## DATABASE

Describe the implemented models/tables.

## API

List the implemented admin API routes.

## AUTHENTICATION

Explain how admin authentication/protection works.

## TESTING

List the tests performed and results.

## ENVIRONMENT VARIABLES

List required `.env` variable names.

## PHASE 2 PREPARATION

Briefly explain what has been prepared for:

* Shopify migration
* Frontend data integration
* SEO migration

Do not implement Phase 2 features yet.

---

# FINAL INSTRUCTION

Work directly on the existing SteelWeb project.

First inspect.

Then implement.

Then test.

Do not just provide a plan.

Do not rebuild working components unnecessarily.

Do not mark requirements complete without verifying them.

Keep the existing public website functional throughout the implementation.

The final Phase 1 result should be a **secure, database-backed, manageable ModularHome Admin CMS foundation ready for Phase 2 Shopify migration and frontend integration.*