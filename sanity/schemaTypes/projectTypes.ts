import { defineField, defineType } from "sanity";
export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  icon: () => "🚀",
  fields: [
    defineField({
      name: "title",
      title: "Project Title",
      type: "string",
      validation: (Rule) => Rule.required().min(5).max(80),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      name: "link",
      title: "Live URL",
      type: "url",
      validation: (Rule) => Rule.required(),
      description: "Live project URL or demo link",
    }),
    defineField({
      name: "github",
      title: "GitHub URL",
      type: "url",
      description: "GitHub repository link (optional)",
    }),
    defineField({
      name: "image",
      title: "Project Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "caption",
          title: "Caption",
          type: "string",
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "video",
      title: "Demo Video URL",
      type: "url",
      description: "Optional demo video",
    }),
    defineField({
      name: "description",
      title: "Project Description",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Number", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    title: "URL",
                    type: "url",
                  },
                  {
                    name: "blank",
                    title: "Open in new tab",
                    type: "boolean",
                  },
                ],
              },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().min(50).max(200),
      description: "Brief project summary for cards (50-200 characters)",
    }),
    defineField({
      name: "techStack",
      title: "Technology Stack",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      validation: (Rule) => Rule.required().min(1).max(15),
      description: "Technologies used in this project",
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
      validation: (Rule) => Rule.min(1).max(3),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "reference", to: { type: "tag" } }],
      validation: (Rule) => Rule.max(8),
    }),
    defineField({
      name: "modal",
      title: "Use Modal",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "featured",
      title: "Featured Project",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "status",
      title: "Project Status",
      type: "string",
      options: {
        list: [
          { title: "Live", value: "live" },
          { title: "In Development", value: "development" },
          { title: "Completed", value: "completed" },
          { title: "Archived", value: "archived" },
        ],
      },
      initialValue: "live",
    }),
    defineField({
      name: "timeline",
      title: "Project Timeline",
      type: "object",
      fields: [
        {
          name: "startDate",
          title: "Start Date",
          type: "date",
        },
        {
          name: "endDate",
          title: "End Date",
          type: "date",
        },
        {
          name: "duration",
          title: "Duration",
          type: "string",
          placeholder: "e.g., 3 months",
        },
      ],
    }),
    defineField({
      name: "client",
      title: "Client Information",
      type: "object",
      fields: [
        {
          name: "name",
          title: "Client Name",
          type: "string",
        },
        {
          name: "industry",
          title: "Industry",
          type: "string",
        },
        {
          name: "testimonial",
          title: "Client Testimonial",
          type: "text",
          rows: 4,
        },
      ],
    }),
    defineField({
      name: "metrics",
      title: "Project Metrics",
      type: "object",
      fields: [
        {
          name: "performance",
          title: "Performance Improvements",
          type: "array",
          of: [{ type: "string" }],
          options: { layout: "tags" },
        },
        {
          name: "results",
          title: "Business Results",
          type: "array",
          of: [{ type: "string" }],
          options: { layout: "tags" },
        },
      ],
    }),
  ],
  orderings: [
    {
      title: "Featured First",
      name: "featuredFirst",
      by: [
        { field: "featured", direction: "desc" },
        { field: "_createdAt", direction: "desc" },
      ],
    },
    {
      title: "Newest First",
      name: "newest",
      by: [{ field: "_createdAt", direction: "desc" }],
    },
    {
      title: "Title A-Z",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "shortDescription",
      media: "image",
      status: "status",
    },
    prepare({ title, subtitle, media, status }) {
      return {
        title,
        subtitle: subtitle ? subtitle.slice(0, 60) + "..." : "",
        media,
        description: status ? `Status: ${status}` : "",
      };
    },
  },
});
