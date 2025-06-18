import { Generator, livereloadProcessor } from "@forsakringskassan/docs-generator";

const docs = new Generator(import.meta.url, {
    site: {
        name: "EHMDS on FKUI Test Documentation",
    },
    setupPath: "docs/src/setup.ts",
    processors: [livereloadProcessor({ enabled: true })],
    vendor: [
        {
            package: "vue",
            alias: "vue/dist/vue.esm-bundler.js",
        },
    ],
});

// Compile styles
docs.compileStyle("docs", "./docs/src/style.scss", {
    appendTo: "head",
});

export default docs;