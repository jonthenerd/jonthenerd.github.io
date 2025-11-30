import { Base } from "./_includes/base.11ty";
import { DateTime } from "luxon";
import { EleventyTemplateProps } from "./_includes/types";

export default function Index(props: EleventyTemplateProps) {
    const { posts } = props.collections;
    const sortedPosts = posts
        .slice()
        .sort((a, b) => b.date.getTime() - a.date.getTime());

    return (
        <Base {...props}>
            <div className="container">
                <div className="post-list">
                    {sortedPosts.map((post) => {
                        const { title, page } = post.data;
                        if (page.url === false) {
                            return;
                        }

                        const pageDate = DateTime.fromJSDate(page.date, {
                            zone: "utc",
                        });
                        const shortDate = pageDate.toFormat("yyyy-MM-dd");
                        const fullDate = pageDate.toLocaleString(
                            DateTime.DATE_FULL,
                        );

                        return (
                            <>
                                <article>
                                    <h2>
                                        <a href={page.url}>{title}</a>
                                    </h2>
                                    <div className="post-meta">
                                        <time
                                            dateTime={shortDate}
                                            itemProp="datePublished"
                                        >
                                            {fullDate}
                                        </time>
                                    </div>
                                    <div
                                        className="summary"
                                        dangerouslySetInnerHTML={{
                                            __html: page.excerpt,
                                        }}
                                    />
                                    <div className="if-truncated">
                                        <div>
                                            <a className="pill" href={page.url}>
                                                Read More...
                                            </a>
                                        </div>
                                    </div>
                                </article>
                                <hr />
                            </>
                        );
                    })}
                </div>
            </div>
        </Base>
    );
}
