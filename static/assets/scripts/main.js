(() => {
    const themeToggle = document.getElementById("theme-toggle");
    const lightStyles = document.querySelectorAll("link[rel='stylesheet'][media='(prefers-color-scheme: light)']");
    const darkStyles = document.querySelectorAll("link[rel='stylesheet'][media='(prefers-color-scheme: dark)']");
    let forced = false;
    let isDark;

    function updateText() {
        themeToggle.innerText = isDark ? "Dark" : "Light";
    }
    function disableStyles(styles) {
        styles.forEach(style => {
            style.setAttribute("disabled", "disabled");
            style.setAttribute("media", "not all");
        });
    }
    function enableStyles(styles) {
        styles.forEach(style => {
            style.removeAttribute("disabled");
            style.setAttribute("media", "all");
        });
    }
    function toggleTheme() {
        if (isDark) {
            disableStyles(darkStyles);
            enableStyles(lightStyles);
        } else {
            disableStyles(lightStyles);
            enableStyles(darkStyles);
        }
        isDark = !isDark;
        try {
            window.localStorage.setItem("mode", isDark ? "dark" : "light");
            forced = true;
        } catch { }
        updateText();
    }

    // Get Browser Preference
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    isDark = darkModeMediaQuery.matches;

    // Change theme if previously clicked
    try {
        const stored = window.localStorage.getItem("mode");
        if (stored) {
            forced = true;

            if (!((stored === "dark" && isDark) || (stored === "light" && !isDark))) {
                toggleTheme();
            }
        }

    } catch { }

    updateText();

    // Respond to Toggle Clicks
    themeToggle.addEventListener("click", () => {
       toggleTheme();
    })
})();
