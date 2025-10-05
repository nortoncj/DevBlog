import { type SchemaTypeDefinition } from "sanity";
import { categoryType } from "./categoryTypes";
import { postType } from "./postTypes";
import { projectType } from "./projectTypes";
import { tagType } from "./tagTypes";
import { pageType } from "./pageTypes";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [categoryType, postType, projectType, tagType, pageType],
};
