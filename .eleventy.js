const Image = require("@11ty/eleventy-img");

async function imageShortcode(src, alt, sizes="50vw") {
  let metadata = await Image("src/img/" + src, {
    widths: ["auto", 100, 600, 1000, 2000],
    formats: ["svg", "jpeg"],
    outputDir: "public/img",

  });

  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };
  return Image.generateHTML(metadata, imageAttributes);
}

const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
    eleventyConfig.addAsyncShortcode("image", imageShortcode);

    eleventyConfig.addWatchTarget("src/style.scss");

    eleventyConfig.addPassthroughCopy("src/favicon.ico");

    eleventyConfig.addFilter("postDate", (dateObj) => {
      return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
    });

    return {
        dir: {
            input: "src",
            output: "public"
        }
    }
}