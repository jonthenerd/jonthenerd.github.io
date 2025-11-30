// Eleventy Supplied
export interface EleventySpecificMetadata {
    /** Eleventy version */
    version: string;
    /** For use with `<meta name="generator">` */
    generator: string;
    env: {
        /** Absolute path to the directory in which you've run the eleventy command */
      root: string;
      /** Absolute path to the current config file */
      config: string;
      /** The method, either `cli` or `script` */
      source: string;
      /** One of `serve`, `watch`, or `build` */
      runMode?: string;
    };
    /** Project root-relative normalized paths */
    directories?: {
      input: string;
      includes: string;
      data: string;
      output: string;
      layouts?: string;  // If applicable
    };
}
/** Your package.json */
export interface EleventyPackageJson {
    [key: string]: any;
}

export interface EleventyPage {
    /**
     * The URL of the page, relative to the site root. NOTE: This value will be `false` if `permalink` is set to `false`.
     * Example: "/posts/hello/"
     */
    url: string | false;

    /**
     * An excerpt of the content, if excerpts are enabled.
     */
    excerpt?: string;

    /**
     * The file slug, derived from the input filename.
     * Example: "hello"
     */
    fileSlug: string;
    /**
     * The file path stem (no extension).
     * Example: "/posts/hello"
     */
    filePathStem: string;

    /** JS Date object for current page (used to sort collections) */
    date: Date;
    /**
     * The absolute path to the input template file
     * (relative to your project root).
     * Example: "./src/posts/hello.md"
     */
    inputPath: string;
    /**
     * The absolute path to the output HTML file
     * that Eleventy writes into your output dir (`_site` by default).
     * Example: "_site/posts/hello/index.html"
     */
    outputPath: string | false;
    outputFileExtension: string;
    templateSyntax: string;
    /** The raw unparsed/unrendered plaintext content for the current template */
    rawInput?: string;
    /** The default is the value of `defaultLanguage` passed to the i18n plugin */
    lang?: string;       // Available if i18n plugin is enabled (v2+)
}

/** The properties supplied to an Eleventy Template */
export interface EleventyTemplateProps extends RootData {
    /** Package.json content of the local project */
    pkg: EleventyPackageJson;

    /** Collections grouped by tags */
    collections: {
        posts: CollectionItem[];
    };

    /** Page-specific information for the current template */
    page: EleventyPage;

    /** Eleventy-specific metadata and environment information */
    eleventy: EleventySpecificMetadata;

    // Legacy direct process.env access for Eleventy-supplied vars (optional)
    processEnv?: NodeJS.ProcessEnv;

    children?: React.ReactNode;
}


export interface EleventyContentProps extends EleventyTemplateProps {
    /** the rendered content of this template. This does not include layout wrappers. */
    content: string;
    tags: string[];
    layout: string;
}

// ==== Items in _data ======
/** Merged down items i _data */
export interface RootData {
    site: SiteData;
}
export interface SiteData {
    url: string;
    title: string;
    description: string;
    author: string;
}

export interface BlogFrontMatter {
    title: string;
    date: Date;
    categories: string[];
    draft: boolean;
}
export type Post = EleventyContentProps & BlogFrontMatter;

// Here down is WIP
export interface CollectionItemData extends RootData, EleventyTemplateProps {
    tags: unknown;
    layout: string;
    [key: string]: any;
}

/**
 * See https://www.11ty.dev/docs/collections/#collection-item-data-structure
 */
export interface CollectionItem extends EleventyPage {
    page: EleventyPage;
    data: CollectionItemData;
    /** The raw input of the template (before any processing). This does not include front matter. */
    rawInput: string;
    /** the rendered content of this template. This does not include layout wrappers. */
    content: string;

    templateContent: string;
}
