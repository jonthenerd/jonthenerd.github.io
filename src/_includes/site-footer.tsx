export function SiteFooter() {
    return (
        <footer>
            <div className="container">
                built with <a href="https://www.11ty.dev">Eleventy</a> and{" "}
                <a href="https://github.com/jonthenerd/jonthenerd.github.io">
                    GitHub Pages
                </a>{" "}
                | <a href="/license">License</a> |{" "}
                <span id="theme-toggle" role="button"></span>
            </div>
        </footer>
    );
}
