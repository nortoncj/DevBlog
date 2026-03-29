import { defineField, defineType } from "sanity";

/**
 * Product Type with Table Support
 * Example document type that uses tables for size charts, specifications, etc.
 */
export const productType = defineType({
  name: "product",
  title: "Product",
  type: "document",
  icon: () => "🛍️",
  fields: [
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "image",
      title: "Product Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "sizeChart",
      title: "Size Chart",
      type: "table",
      description: "Product size chart with measurements",
    }),
    defineField({
      name: "specifications",
      title: "Technical Specifications",
      type: "table",
      description: "Product specifications and features",
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "inStock",
      title: "In Stock",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
      price: "price",
    },
    prepare({ title, media, price }) {
      return {
        title,
        subtitle: price ? `$${price.toFixed(2)}` : "Price not set",
        media,
      };
    },
  },
});
