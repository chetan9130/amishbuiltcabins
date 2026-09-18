import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  adminUsers: defineTable({
    email: v.string(),
    passwordHash: v.string(),
    name: v.string(),
    role: v.string(), // "ADMIN", "EDITOR"
    status: v.string(), // "ACTIVE", "INACTIVE"
    lastLoginAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_email", ["email"]),

  sessions: defineTable({
    sessionToken: v.string(),
    userId: v.id("adminUsers"),
    expiresAt: v.number(),
    createdAt: v.number(),
  })
    .index("by_sessionToken", ["sessionToken"])
    .index("by_userId", ["userId"]),

  globalSettings: defineTable({
    key: v.string(), // "default"
    companyName: v.string(),
    logoUrl: v.string(),
    faviconUrl: v.string(),
    phone: v.string(),
    email: v.string(),
    address: v.string(),
    socialLinks: v.string(), // JSON string
    announcementEnabled: v.boolean(),
    announcementText: v.string(),
    announcementLink: v.string(),
    navLinks: v.string(), // JSON string
    footerText: v.string(),
    footerLinks: v.string(), // JSON string
    defaultSeoTitle: v.string(),
    defaultMetaDescription: v.string(),
    ctaLabel: v.string(),
    ctaLink: v.string(),
    updatedAt: v.number(),
  }).index("by_key", ["key"]),

  pages: defineTable({
    title: v.string(),
    slug: v.string(),
    subtitle: v.optional(v.string()),
    content: v.optional(v.string()),
    status: v.string(), // "PUBLISHED", "DRAFT", "ARCHIVED"
    featuredImage: v.optional(v.string()),
    seoTitle: v.optional(v.string()),
    metaDescription: v.optional(v.string()),
    canonicalUrl: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_status", ["status"]),

  pageSections: defineTable({
    pageId: v.id("pages"),
    type: v.string(),
    title: v.optional(v.string()),
    subtitle: v.optional(v.string()),
    content: v.optional(v.string()), // JSON string or text
    order: v.number(),
    isVisible: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_pageId", ["pageId"])
    .index("by_pageId_order", ["pageId", "order"]),

  products: defineTable({
    name: v.string(),
    slug: v.string(),
    tagline: v.optional(v.string()),
    description: v.optional(v.string()),
    shortDescription: v.optional(v.string()),
    category: v.string(),
    series: v.optional(v.string()),
    architecturalStyle: v.optional(v.string()),
    sqft: v.number(),
    bedrooms: v.number(),
    bathrooms: v.number(),
    stories: v.number(),
    startingPrice: v.number(),
    dimensions: v.optional(v.string()),
    frameType: v.optional(v.string()),
    roofPitch: v.optional(v.string()),
    windRating: v.optional(v.string()),
    snowLoad: v.optional(v.string()),
    warranty: v.optional(v.string()),
    primaryImage: v.string(),
    gallery: v.optional(v.string()), // JSON string array
    floorPlanImage: v.optional(v.string()),
    videoUrl: v.optional(v.string()),
    features: v.optional(v.string()), // JSON string array
    specs: v.optional(v.string()), // JSON string array of {label, value}
    customizableOptions: v.optional(v.string()), // JSON string array
    isPublished: v.boolean(),
    isFeatured: v.boolean(),
    displayOrder: v.number(),
    seoTitle: v.optional(v.string()),
    metaDescription: v.optional(v.string()),
    imageAltText: v.optional(v.string()),
    canonicalUrl: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_category", ["category"])
    .index("by_isPublished", ["isPublished"]),

  collections: defineTable({
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
    tagline: v.optional(v.string()),
    bannerImage: v.optional(v.string()),
    image: v.optional(v.string()),
    displayOrder: v.number(),
    isFeatured: v.boolean(),
    status: v.string(), // "PUBLISHED", "DRAFT"
    seoTitle: v.optional(v.string()),
    metaDescription: v.optional(v.string()),
    imageAltText: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_slug", ["slug"]),

  productCollections: defineTable({
    productId: v.id("products"),
    collectionId: v.id("collections"),
    assignedAt: v.number(),
  })
    .index("by_productId", ["productId"])
    .index("by_collectionId", ["collectionId"])
    .index("by_product_collection", ["productId", "collectionId"]),

  blogs: defineTable({
    title: v.string(),
    slug: v.string(),
    excerpt: v.optional(v.string()),
    content: v.string(),
    featuredImage: v.optional(v.string()),
    author: v.string(),
    publishedAt: v.number(),
    status: v.string(), // "PUBLISHED", "DRAFT", "ARCHIVED"
    categories: v.optional(v.string()), // JSON string array
    tags: v.optional(v.string()), // JSON string array
    embeddedVideoUrl: v.optional(v.string()),
    seoTitle: v.optional(v.string()),
    metaDescription: v.optional(v.string()),
    imageAltText: v.optional(v.string()),
    canonicalUrl: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_status", ["status"])
    .index("by_publishedAt", ["publishedAt"]),

  leads: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    location: v.optional(v.string()),
    zip: v.optional(v.string()),
    enquiryDetails: v.optional(v.string()),
    source: v.string(), // CONTACT_FORM, AI_CHAT, QUOTE_WIZARD, FLOOR_PLAN_UPLOAD, WEBSITE
    status: v.string(), // NEW, CONTACTED, QUALIFIED, QUOTE_SENT, FOLLOW_UP, WON, LOST
    notes: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_status", ["status"])
    .index("by_createdAt", ["createdAt"]),

  quotations: defineTable({
    customerName: v.string(),
    customerEmail: v.string(),
    customerPhone: v.optional(v.string()),
    customerZip: v.optional(v.string()),
    modelSlug: v.optional(v.string()),
    modelName: v.optional(v.string()),
    sqft: v.optional(v.number()),
    dimensions: v.optional(v.string()),
    options: v.optional(v.string()),
    pricingInputs: v.optional(v.string()),
    estimatedAmount: v.optional(v.number()),
    timeline: v.optional(v.string()),
    requirements: v.optional(v.string()),
    status: v.string(), // PENDING, REVIEWED, ESTIMATE_SENT, ACCEPTED, DECLINED
    source: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_customerEmail", ["customerEmail"])
    .index("by_status", ["status"])
    .index("by_createdAt", ["createdAt"]),
});
