import { type SchemaTypeDefinition } from "sanity";
import { categoryType } from "./categoryTypes";
import { postType } from "./postTypes";
import { projectType } from "./projectTypes";
import { tagType } from "./tagTypes";
import { pageType } from "./pageTypes";
// import { productType } from "./productType"; // Uncomment to enable Product type

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    categoryType,
    postType,
    projectType,
    tagType,
    pageType,
    // productType, // Uncomment to enable Product type
  ],
};
