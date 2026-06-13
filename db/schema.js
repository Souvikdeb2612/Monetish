import { pgTable, text, boolean, integer, timestamp, uniqueIndex } from 'drizzle-orm/pg-core';

// One row per authenticated Clerk user.
export const users = pgTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// Public-facing creator profile. Username is the storefront URL slug.
export const profiles = pgTable(
  'profiles',
  {
    userId: text('user_id').primaryKey().references(() => users.id, { onDelete: 'cascade' }),
    username: text('username').notNull(),
    displayName: text('display_name').notNull().default(''),
    bio: text('bio').notNull().default(''),
    photoUrl: text('photo_url'),
    theme: text('theme').notNull().default('midnight'),
    published: boolean('published').notNull().default(false),
    igHandle: text('ig_handle'),
    igConnected: boolean('ig_connected').notNull().default(false),
    payoutConnected: boolean('payout_connected').notNull().default(false),
    followers: text('followers').notNull().default('0'),
    socials: text('socials').array().notNull().default([]),
    verified: boolean('verified').notNull().default(false),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => ({
    usernameIdx: uniqueIndex('profiles_username_idx').on(t.username),
  }),
);

// Storefront blocks (product, course, community, link, text). `order` controls
// vertical position; we renumber on reorder rather than relying on insertion.
export const blocks = pgTable('blocks', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  type: text('type').notNull(),
  title: text('title').notNull().default(''),
  meta: text('meta').notNull().default(''),
  description: text('description').notNull().default(''),
  price: text('price').notNull().default(''),
  per: text('per').notNull().default(''),
  cta: text('cta').notNull().default(''),
  badge: text('badge').notNull().default(''),
  enabled: boolean('enabled').notNull().default(true),
  order: integer('order').notNull().default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// Keyword → DM automation. productId links to a block so the DM can deep-link
// fans straight to a purchase.
export const automations = pgTable('automations', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  keyword: text('keyword').notNull().default(''),
  dm: text('dm').notNull().default(''),
  productId: text('product_id'),
  alsoReply: boolean('also_reply').notNull().default(true),
  status: text('status').notNull().default('Draft'),
  sends: integer('sends').notNull().default(0),
  ctr: text('ctr').notNull().default('—'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});
