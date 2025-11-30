interface MarkdownLibrary {
    render: (markdown: string) => string;
}

export interface ExcerptExtractorOptions {
    eleventyConfig?: any;

    /**
     * The separator string to look for in the raw content to denote the excerpt break.
     * Default is "<!-- more -->".
     */
    separator?: string;
}

export function createExcerptExtractor(options: ExcerptExtractorOptions) {
    const { eleventyConfig, separator = "<!-- more -->" } = options;
    let markdownLibrary: MarkdownLibrary = null;

    // Get access to the markdown library used by Eleventy
    eleventyConfig.amendLibrary("md", (lib: any) => {
        console.log("[excerptExtractor] Captured markdown library.");
        markdownLibrary = lib;
        return lib;
    });

    function markerToRegex(marker: string): RegExp {
        // Extract the inner text between <!-- and -->
        // Example: "<!-- more -->" → "more"
        const inner = marker
            .replace(/^<!--/, "")
            .replace(/-->$/, "")
            .trim();

        // Allow arbitrary spacing around the content
        // Produces: /<!--\s*more\s*-->/i
        return new RegExp(`<!--\\s*${inner}\\s*-->`, "i");
    }

    function getFirstMarkdownParagraph(md) {
        if (!md) return "";

        // Normalize line endings and trim leading/trailing space
        md = md.replace(/\r\n/g, "\n").trim();

        // Split on blank lines (one or more)
        const paragraphs = md.split(/\n\s*\n+/);

        // First paragraph
        return paragraphs[0].trim();
    }

    return function extractExcerpt(raw: string): string {
        console.log("[extractExcerpt] markdownLibrary is", markdownLibrary ? "available" : "NOT available");

        if (!raw) {
            console.log("[excerptExtractor] No raw content provided.");
            return "";
        }

        const separatorRegex = markerToRegex(separator);

        const match = raw.match(separatorRegex);

        // 1. Explicit excerpt uses raw markdown before <!-- more -->,
        //    rendered using Eleventy's own markdown processor.
        if (match?.index !== undefined) {
            console.log("[excerptExtractor] Found excerpt separator.");
            const markdownExcerpt = raw.substring(0, match.index).trim();
            const htmlExcerpt = markdownLibrary.render(markdownExcerpt).trim();
            return htmlExcerpt;
        }

        // 2. Fallback to first paragraph in markdown
        const firstParagraph = getFirstMarkdownParagraph(raw);

        return firstParagraph;
    }
}
