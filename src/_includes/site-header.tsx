export interface SiteHeaderProps {
    siteTitle: string;
}

export function SiteHeader({ siteTitle }: SiteHeaderProps) {
    return (
        <header className="site-header">
            <h1>
                <a href="/">{siteTitle}</a>
            </h1>
            <nav>
                <ul>
                    <li>
                        <a href="/about">About</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
