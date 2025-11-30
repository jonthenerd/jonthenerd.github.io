import {
    EleventyTemplateProps,
    EleventyContentProps,
    BlogPostProps,
} from "./types";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";

export type BaseProps =
    | EleventyTemplateProps
    | EleventyContentProps
    | BlogPostProps;

function isBlogPostProps(props: BaseProps): props is BlogPostProps {
    return (props as BlogPostProps).title !== undefined;
}

export function Base(props: BaseProps) {
    let title = "";
    let summary = "";
    if (isBlogPostProps(props)) {
        title = props.title;
    }

    const { page, site, eleventy, children } = props;

    const pageTitle = title ? `${title} | JonTheNerd` : "JonTheNerd";
    const permalink = new URL(page.url as string, site.url)
        .toString()
        .slice(0, -1);

    return (
        <html lang="en">
            <head prefix="og: http://ogp.me/ns#">
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta name="HandheldFriendly" content="True" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <title>{pageTitle}</title>
                {summary && <meta name="description" content={summary} />}
                <meta name="color-scheme" content="dark light" />
                <meta name="generator" content={eleventy.generator}></meta>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                        if (window.matchMedia("(prefers-color-scheme: dark)").media ==="not all") {
                            document.documentElement.style.display = "none";
                            document.head.insertAdjacentHTML(
                                "beforeend",
                                "<link rel='stylesheet' href='/assets/light.css' onload='document.documentElement.style.display=\\"\\"'>"
                            );
                        }
                        `,
                    }}
                />
                <link
                    rel="stylesheet"
                    media="(prefers-color-scheme: light)"
                    href="/assets/light.css"
                />
                <link
                    rel="stylesheet"
                    media="(prefers-color-scheme: dark)"
                    href="/assets/dark.css"
                />
                <link rel="stylesheet" href="/assets/style.css" />
                <script src="/assets/scripts/main.js" defer />
                <link rel="canonical" href={permalink} />
            </head>
            <body>
                <SiteHeader siteTitle={site.title} />
                <main>{children}</main>
                <SiteFooter />
            </body>
        </html>
    );
}

export const render = Base;
