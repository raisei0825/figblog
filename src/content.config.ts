import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const articleCollection = defineCollection({
  loader: glob({ base: './src/content/article', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.enum(['ichiban-kuji', 'prize', 'new-arrival']),
    tags: z.array(z.string()).optional(),
    heroImage: z.string().optional(),
    priceRange: z.enum(['under5k', 'under10k', 'under20k', 'over20k']).optional(),
    manufacturer: z.string().optional(),
    rating: z.number().min(0).max(5).optional(),
    featured: z.boolean().optional(),
    draft: z.boolean().optional(),
    affiliateLinks: z.array(z.object({
      store: z.string(),
      url: z.string(),
      price: z.number().optional(),
    })).optional(),
  }),
});

const rankingCollection = defineCollection({
  loader: glob({ base: './src/content/ranking', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    period: z.string(),
    category: z.string().optional(),
  }),
});

const featureCollection = defineCollection({
  loader: glob({ base: './src/content/feature', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()),
  }),
});

export const collections = {
  article: articleCollection,
  ranking: rankingCollection,
  feature: featureCollection,
};
