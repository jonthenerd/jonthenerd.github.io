import { Fragment } from "react/jsx-runtime";
import { Base } from "./base.11ty";
import { Post } from "./types";
import { DateTime } from "luxon";
import { safeStringify } from "../../safe-json";

export function Post(props: Post) {
    //return <pre>{safeStringify(props)}</pre>;

    const { title, content, date, site, categories } = props;
    const { author } = site;

    const tags = (props.tags || []).filter(
        (tag) => !["posts", "all"].includes(tag),
    );

    const dt = DateTime.fromJSDate(date, { zone: "utc" });

    const shortDate = dt.toFormat("yyyy-MM-dd");
    const longDate = dt.toLocaleString(DateTime.DATE_FULL);

    /*
    return (
        <Base {...props}>
            <article>
                <h2>{title}</h2>
                <div dangerouslySetInnerHTML={{ __html: content as string }} />
            </article>
        </Base>
    );
    */

    return (
        <Base {...props}>
            <article
                className="single"
                itemScope={true}
                itemType="http://schema.org/BlogPosting"
            >
                <header>
                    <h1 itemProp="name headline">
                        <div className="container">{title}</div>
                    </h1>
                    <div className="post-meta">
                        <div className="container">
                            <time dateTime={shortDate} itemProp="datePublished">
                                {longDate}
                            </time>{" "}
                            by{" "}
                            <span
                                itemProp="author"
                                itemScope
                                itemType="https://schema.org/Person"
                            >
                                <a itemProp="url" href="/about">
                                    <span itemProp="name">{author}</span>
                                </a>
                            </span>
                            {categories && categories.length > 0 && (
                                <>
                                    {" | Posted in"}
                                    {categories.map((category, index) => (
                                        <Fragment key={category}>
                                            {index > 0 ? ", " : " "}
                                            <a
                                                href={`/categories/${category.toLowerCase().replace(/\s+/g, "-")}`}
                                            >
                                                {category}
                                            </a>
                                        </Fragment>
                                    ))}
                                </>
                            )}
                            {tags && tags.length > 0 && (
                                <>
                                    {" | Tagged with"}
                                    {tags.map((tag, index) => (
                                        <Fragment key={tag}>
                                            {index > 0 ? ", " : " "}
                                            <a
                                                href={`/tags/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                                            >
                                                {tag}
                                            </a>
                                        </Fragment>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                </header>
                <div itemProp="articleBody">
                    <div
                        className="container"
                        dangerouslySetInnerHTML={{ __html: content as string }}
                    />
                </div>
            </article>
        </Base>
    );
}

export const render = Post;

/**
 * Format the date to YYYY-MM-DD
 * @param date - input
 * @returns
 */
function formatDate(date: Date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // getMonth() is 0-indexed, add 1, then pad with '0' if single digit
    const day = date.getDate().toString().padStart(2, "0"); // pad with '0' if single digit

    return `${year}-${month}-${day}`;
}
