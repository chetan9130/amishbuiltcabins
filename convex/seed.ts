import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const seedDatabase = mutation({
  args: {
    adminPasswordHash: v.string(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    // 1. Seed Global Settings
    const existingSettings = await ctx.db
      .query("globalSettings")
      .withIndex("by_key", (q) => q.eq("key", "default"))
      .first();

    if (!existingSettings) {
      await ctx.db.insert("globalSettings", {
        key: "default",
        companyName: "ModularHome",
        logoUrl: "/images/logo.png",
        faviconUrl: "/favicon.ico",
        phone: "+1 (800) 555-MODU",
        email: "info@modularhome.com",
        address: "100 Industrial Parkway, Austin, TX 78701",
        socialLinks: JSON.stringify([
          { platform: "youtube", url: "https://youtube.com/@modularhome" },
          { platform: "instagram", url: "https://instagram.com/modularhome" },
          { platform: "facebook", url: "https://facebook.com/modularhome" },
          { platform: "linkedin", url: "https://linkedin.com/company/modularhome" },
        ]),
        announcementEnabled: true,
        announcementText: "✨ Spring 2026 Promo: Free Foundation Engineering on all 3+ Bedroom models!",
        announcementLink: "/models",
        navLinks: JSON.stringify([
          { label: "Home", href: "/" },
          { label: "Models", href: "/models" },
          { label: "Collections", href: "/collections" },
          { label: "Gallery & Videos", href: "/videos" },
          { label: "Instant Quote", href: "/quote" },
          { label: "Blog", href: "/blog" },
          { label: "Contact", href: "/contact" },
        ]),
        footerText: "ModularHome is the leading precision steel-frame and modular home manufacturer delivering sustainable, energy-efficient luxury homes in record time.",
        footerLinks: JSON.stringify([
          { label: "Privacy Policy", href: "/privacy" },
          { label: "Terms of Service", href: "/terms" },
          { label: "Warranty Info", href: "/warranty" },
          { label: "Admin Portal", href: "/admin" },
        ]),
        defaultSeoTitle: "ModularHome | Premium Precision Engineered Modular & Steel Homes",
        defaultMetaDescription: "Discover next-generation precision-engineered steel modular homes. Rapid build, hurricane-rated durability, luxury architectural finishes.",
        ctaLabel: "Build Your Dream Home",
        ctaLink: "/quote",
        updatedAt: now,
      });
    }

    // 2. Seed Admin User
    const existingAdmin = await ctx.db
      .query("adminUsers")
      .withIndex("by_email", (q) => q.eq("email", "admin@modularhome.com"))
      .first();

    if (!existingAdmin) {
      await ctx.db.insert("adminUsers", {
        email: "admin@modularhome.com",
        passwordHash: args.adminPasswordHash,
        name: "Admin Superuser",
        role: "ADMIN",
        status: "ACTIVE",
        createdAt: now,
        updatedAt: now,
      });
    }

    // 3. Seed Collections
    const existingCollections = await ctx.db.query("collections").collect();
    let modernCollectionId;
    let luxuryCollectionId;
    let compactCollectionId;

    if (existingCollections.length === 0) {
      modernCollectionId = await ctx.db.insert("collections", {
        name: "Modern Minimalist",
        slug: "modern-minimalist",
        tagline: "Clean architectural lines with panoramic glass walls",
        description: "Engineered for contemporary lifestyles with open-concept layouts, high ceilings, and seamless indoor-outdoor living spaces.",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
        bannerImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
        displayOrder: 1,
        isFeatured: true,
        status: "PUBLISHED",
        seoTitle: "Modern Minimalist Modular Homes | ModularHome",
        metaDescription: "Explore our signature Modern Minimalist steel-framed modular homes featuring floor-to-ceiling glass and smart home integration.",
        createdAt: now,
        updatedAt: now,
      });

      luxuryCollectionId = await ctx.db.insert("collections", {
        name: "Luxury Signature Series",
        slug: "luxury-signature",
        tagline: "Multi-level grandeur with commercial-grade steel spans",
        description: "Expansive multi-generational estate homes built with zero interior load-bearing walls for ultimate floorplan customization.",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
        bannerImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop",
        displayOrder: 2,
        isFeatured: true,
        status: "PUBLISHED",
        seoTitle: "Luxury Signature Modular Homes | ModularHome",
        metaDescription: "Multi-story estate modular homes with premium steel engineering and bespoke architectural finishes.",
        createdAt: now,
        updatedAt: now,
      });

      compactCollectionId = await ctx.db.insert("collections", {
        name: "Compact & ADU Series",
        slug: "compact-adu",
        tagline: "High-yield backyard suites and efficient modern dwellings",
        description: "Optimized for accessory dwelling units, guest houses, and rental properties with ultra-fast 30-day site delivery.",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
        bannerImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop",
        displayOrder: 3,
        isFeatured: true,
        status: "PUBLISHED",
        seoTitle: "Modular ADUs & Compact Homes | ModularHome",
        metaDescription: "Turnkey accessory dwelling units and compact steel homes. Fully finished and delivered to your foundation.",
        createdAt: now,
        updatedAt: now,
      });
    }

    // 4. Seed Products if empty
    const existingProducts = await ctx.db.query("products").collect();
    if (existingProducts.length === 0) {
      const sampleProducts = [
        {
          name: "Apex 2400 Steel Villa",
          slug: "apex-2400",
          tagline: "Flagship 3-Bedroom Single Story Steel Residence",
          category: "Residential",
          series: "Apex Series",
          architecturalStyle: "Modern Minimalist",
          sqft: 2400,
          bedrooms: 3,
          bathrooms: 2.5,
          stories: 1,
          startingPrice: 389000,
          dimensions: "60' x 40'",
          frameType: "Galvanized Light Gauge Steel",
          roofPitch: "Flat / Low Slope (1:12)",
          windRating: "180 mph Category 5 Rated",
          snowLoad: "60 PSF",
          warranty: "50-Year Structural Frame Warranty",
          primaryImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
          gallery: JSON.stringify([
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
          ]),
          floorPlanImage: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1200&auto=format&fit=crop",
          features: JSON.stringify([
            "Thermally broken aluminum triple-glazed windows",
            "Standing seam metal roof with solar-ready brackets",
            "Continuous exterior R-28 rigid insulation",
            "Integrated Smart Home HVAC automation",
          ]),
          isPublished: true,
          isFeatured: true,
          displayOrder: 1,
          seoTitle: "Apex 2400 Steel Villa - Modern Modular Home",
          metaDescription: "The Apex 2400 is our flagship 3-bedroom, 2.5-bathroom modular steel home offering unmatched durability and open-plan luxury.",
        },
        {
          name: "Solstice 3200 Two-Story Estate",
          slug: "solstice-3200",
          tagline: "4-Bedroom Double Height Architectural Showcase",
          category: "Residential",
          series: "Solstice Series",
          architecturalStyle: "Contemporary Luxury",
          sqft: 3200,
          bedrooms: 4,
          bathrooms: 3.5,
          stories: 2,
          startingPrice: 520000,
          dimensions: "52' x 36'",
          frameType: "Structural Steel Post & Beam + LGS",
          roofPitch: "Monopitch (3:12)",
          windRating: "200 mph Extreme Weather Rated",
          snowLoad: "75 PSF",
          warranty: "50-Year Structural Frame Warranty",
          primaryImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
          gallery: JSON.stringify([
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200&auto=format&fit=crop",
          ]),
          features: JSON.stringify([
            "Double-height 20ft ceiling living salon",
            "Private upstairs master terrace",
            "Commercial acoustic separation between floors",
            "EV charging & Powerwall storage ready",
          ]),
          isPublished: true,
          isFeatured: true,
          displayOrder: 2,
          seoTitle: "Solstice 3200 Two-Story Estate - Luxury Steel Modular Home",
          metaDescription: "Spacious 4-bedroom 2-story precision engineered steel modular estate with expansive glass and soaring ceilings.",
        },
        {
          name: "Pod 650 Studio & ADU",
          slug: "pod-650",
          tagline: "Turnkey 1-Bedroom Studio / Backyard Guest Suite",
          category: "ADU",
          series: "Pod Series",
          architecturalStyle: "Modern Compact",
          sqft: 650,
          bedrooms: 1,
          bathrooms: 1,
          stories: 1,
          startingPrice: 135000,
          dimensions: "26' x 25'",
          frameType: "Galvanized Cold-Formed Steel",
          roofPitch: "Flat / Low Slope",
          windRating: "160 mph",
          snowLoad: "50 PSF",
          warranty: "50-Year Structural Frame Warranty",
          primaryImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
          features: JSON.stringify([
            "Fully finished interior with quartz countertops",
            "Built-in Murphy bed and custom cabinetry",
            "Plug-and-play utility connections",
            "Fits in standard urban backyards",
          ]),
          isPublished: true,
          isFeatured: true,
          displayOrder: 3,
          seoTitle: "Pod 650 Studio ADU - Backyard Modular Guest Home",
          metaDescription: "Quick-install 650 sq ft modular ADU with full kitchen, bathroom, and modern finishes for rental or guest living.",
        },
      ];

      for (const prod of sampleProducts) {
        const prodId = await ctx.db.insert("products", {
          ...prod,
          createdAt: now,
          updatedAt: now,
        });

        // Link to collection
        if (modernCollectionId && prod.slug === "apex-2400") {
          await ctx.db.insert("productCollections", {
            productId: prodId,
            collectionId: modernCollectionId,
            assignedAt: now,
          });
        } else if (luxuryCollectionId && prod.slug === "solstice-3200") {
          await ctx.db.insert("productCollections", {
            productId: prodId,
            collectionId: luxuryCollectionId,
            assignedAt: now,
          });
        } else if (compactCollectionId && prod.slug === "pod-650") {
          await ctx.db.insert("productCollections", {
            productId: prodId,
            collectionId: compactCollectionId,
            assignedAt: now,
          });
        }
      }
    }

    // 5. Seed sample Blog if empty
    const existingBlogs = await ctx.db.query("blogs").collect();
    if (existingBlogs.length === 0) {
      await ctx.db.insert("blogs", {
        title: "Why Light Gauge Steel is Replacing Traditional Wood Framing in Modern Homes",
        slug: "why-steel-is-replacing-wood-framing",
        excerpt: "Discover why precision-manufactured steel framing offers superior thermal efficiency, fire resistance, and zero warping compared to lumber.",
        content: `
## The Future of Residential Construction is Steel

For decades, traditional wood stick-framing was the default building method for North American homes. However, escalating lumber volatility, termite vulnerability, and climate extremes have caused homeowners and architects to demand superior materials.

### 1. Unmatched Structural Integrity
Unlike wood, galvanized steel does not warp, rot, shrink, or split. Every component is CNC-manufactured to 1mm tolerances in a climate-controlled factory.

### 2. Extreme Fire & Weather Resistance
Steel is non-combustible. Combined with non-flammable exterior cladding, our modular homes achieve Class-A fire ratings and withstand 180+ MPH hurricane winds.

### 3. Sustainability and Zero Waste
Every piece of steel framing is 100% recyclable, and factory pre-fabrication reduces jobsite construction waste by up to 90%.
        `,
        author: "ModularHome Engineering Team",
        featuredImage: "https://images.unsplash.com/photo-1541888946425-d0fbb1861564?q=80&w=1200&auto=format&fit=crop",
        status: "PUBLISHED",
        categories: JSON.stringify(["Engineering", "Sustainability"]),
        tags: JSON.stringify(["Steel Construction", "Modular Building", "Eco Friendly"]),
        publishedAt: now,
        seoTitle: "Why Light Gauge Steel is Replacing Wood Framing | ModularHome Blog",
        metaDescription: "An in-depth look at why precision steel frame modular homes outperform traditional wood framing in longevity, safety, and energy efficiency.",
        createdAt: now,
        updatedAt: now,
      });
    }

    // 6. Seed sample Pages if empty
    const existingPages = await ctx.db.query("pages").collect();
    if (existingPages.length === 0) {
      const homePageId = await ctx.db.insert("pages", {
        title: "Home",
        slug: "home",
        subtitle: "Next-Gen Precision Engineered Modular Homes",
        content: "Welcome to ModularHome, where precision engineering meets sustainable architectural design.",
        status: "PUBLISHED",
        seoTitle: "ModularHome - Precision Engineered Modular Homes",
        metaDescription: "Explore modular steel homes manufactured with aerospace precision.",
        createdAt: now,
        updatedAt: now,
      });

      await ctx.db.insert("pageSections", {
        pageId: homePageId,
        type: "HERO",
        title: "Build the Future of Sustainable Living",
        subtitle: "Luxury steel-framed homes delivered in 12 weeks with zero compromise.",
        order: 1,
        isVisible: true,
        createdAt: now,
        updatedAt: now,
      });

      await ctx.db.insert("pageSections", {
        pageId: homePageId,
        type: "FEATURES",
        title: "Engineered for Lifetime Performance",
        subtitle: "Precision tolerances, seismic resilience, and supreme thermal insulation.",
        order: 2,
        isVisible: true,
        createdAt: now,
        updatedAt: now,
      });
    }

    return { success: true };
  },
});
