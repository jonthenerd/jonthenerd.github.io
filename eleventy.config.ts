import "tsx/esm";
import { renderToStaticMarkup } from "react-dom/server";
import { createExcerptExtractor } from "./excerptExtractor";
import * as prettier from "prettier";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import { safeStringify } from "./safe-json";

export default async function(eleventyConfig): ReturnType<import("@11ty/eleventy/src/defaultConfig")> {
    // Access Eleventy's Markdown library
    let markdown: { render: (md: string) => string } = null;

    // Capture the markdown library for our own use
    eleventyConfig.amendLibrary("md", (lib: any) => {
        markdown = lib;
        return lib;
    });

    const extractExcerpt = createExcerptExtractor({
        eleventyConfig,
        separator: "<!-- more -->"
    });

    eleventyConfig.addGlobalData("eleventyComputed", {
        "page.excerpt": (data: any) => {
            if (data.page && typeof data.page.rawInput === "string") {
                return extractExcerpt(data.page.rawInput);
            }
            return "";
        }
    });

    eleventyConfig.addPairedShortcode("aside", (content, type) => {
        const renderedContent = markdown.render(content);
        return `<aside class="is-${type}">${renderedContent}</aside>`;
    });

    eleventyConfig.addPassthroughCopy("./src/assets");

    eleventyConfig.addTemplateFormats("11ty.tsx");
    eleventyConfig.addExtension(["11ty.tsx"], {
        key: "11ty.js",
        compile: function () {
			return async function (data) {
				let content = await this.defaultRenderer(data);
				return renderToStaticMarkup(content);
			};
		}
    });

    // Transform: prepend <!DOCTYPE html> to all HTML files
    eleventyConfig.addTransform("doctype", function (content, outputPath) {
        if (outputPath && outputPath.endsWith(".html")) {
        // Avoid double-injecting if template already has doctype
        if (!content.trimStart().toLowerCase().startsWith("<!doctype")) {
            return "<!doctype html>\n" + content;
        }
        }
        return content;
    });

    eleventyConfig.addTransform("prettier", function (content) {
        if ((this.page.outputPath || "").endsWith(".html")) {

            let prettified = prettier.format(content, {
                bracketSameLine: true,
                printWidth: 512,
                parser: "html",
                tabWidth: 2
            });
            return prettified;
        }
        return content;
    });

    // Add post "categories" into a collection we can use
    eleventyConfig.addCollection('categories', collection => {
        let catSet = {};
        collection.getAll().forEach(item => {
            if (!item.data.categories) return;
            item.data.categories.filter(
                cat => !['posts', 'all'].includes(cat)
            ).forEach(
                cat => {
                    if (!catSet[cat]) { catSet[cat] = []; }
                    catSet[cat].push(item)
                }
            );
        });
        return catSet;
    });

    // Add syntax highlighting
    eleventyConfig.addPlugin(syntaxHighlight);

    return {
        dir: {
            output: "dist",
            input: "src"
        }
    }
}
