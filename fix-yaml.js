const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const prettier = require("prettier");
const { exit } = require("process");

const postsPath = "./content/posts";
const postsPathNew = "./content/posts-new";

function formatDate(strValue) {
    const d = new Date(strValue);
    return `${d.getFullYear()}-${("0" + (d.getMonth() + 1)).slice(-2)}-${(
        "0" + d.getDate()
    ).slice(-2)}`;
}

fs.readdirSync(postsPath)
    .filter((f) => f.endsWith(".md"))
    .forEach((file) => {
        const raw = fs.readFileSync(path.join(postsPath, file), "utf-8");
        const fm = matter(raw);
        const slug = file.substr(11, file.length - 14);
        fm.data.slug = slug;
        fm.data.date = formatDate(fm.data.date);
        const preFormat = matter.stringify(fm.content, fm.data);

        const postFormat = prettier.format(preFormat, {
            printWidth: 80,
            proseWrap: "always",
            parser: "markdown",
        });

        fs.writeFileSync(path.join(postsPath, file), postFormat);
    });
