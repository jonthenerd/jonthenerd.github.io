export interface CommentsProps {
    canonicalUrl: string;
}

export function Comments({ canonicalUrl }: CommentsProps) {
    return (
        <>
            <div className="feedback">
                <div className="container">
                    <div id="disqus_thread"></div>
                </div>
            </div>
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                var disqus_config = function () {
                    this.page.url = "${canonicalUrl}";
                };
                (function () {
                    var d = document, s = d.createElement('script');
                    s.src = 'https://jonthenerd.disqus.com/embed.js';
                    s.setAttribute('data-timestamp', +new Date());
                    s.setAttribute("defer", "defer");
                    (d.head || d.body).appendChild(s);
                })();
                `,
                }}
            />
        </>
    );
}
