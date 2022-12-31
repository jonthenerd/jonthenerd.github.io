(() => {
    const themeToggle = document.getElementById("theme-toggle");
    const lightStyles = document.querySelectorAll("link[rel='stylesheet'][media='(prefers-color-scheme: light)']");
    const darkStyles = document.querySelectorAll("link[rel='stylesheet'][media='(prefers-color-scheme: dark)']");
    let isDark;

    function updateText() {
        themeToggle.innerText = `${(isDark) ? "Dark" : "Light"} Mode`;
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

    // Set Initial Text
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    isDark = darkModeMediaQuery.matches;
    updateText();

    // Respond to Toggle Clicks
    themeToggle.addEventListener("click", () => {
        if (isDark) {
            disableStyles(darkStyles);
            enableStyles(lightStyles);
        } else {
            disableStyles(lightStyles);
            enableStyles(darkStyles);
        }
        isDark = !isDark;
        updateText();
    })
})();
