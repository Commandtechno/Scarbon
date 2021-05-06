const { getHighlighter, loadTheme } = require("shiki");
const { Image, createCanvas } = require("canvas");
const { getSVGRenderer } = require("shiki-renderer-svg");
const { format } = require("prettier");

module.exports = class {
  constructor(
    {
      formatter: {
        format: parser = "babel",
        trailingComma = "none",
        tab: tabWidth = 2,
        length: printWidth = 80,
        bracketSpacing = true,
        semicolon: semi = true,
        singleQuote = false,
        disabled = false
      } = {
        parser: "babel",
        trailingComma: "none",
        tabWidth: 2,
        printWidth: 80,
        bracketSpacing: true,
        singleQuote: false,
        semi: true,
        disabled: false
      },
      background: bg,
      padding = 8,
      width = 1200,
      radius: bgCornerRadius = 12,
      size: fontSize = 24,
      font: fontFamily = "Consolas",
      base = "rgb(171, 184, 195)",
      lang = "javascript",
      theme = "VS Code"
    } = {
        formatter: {
          parser: "babel",
          trailingComma: "none",
          tabWidth: 2,
          printWidth: 80,
          bracketSpacing: true,
          singleQuote: false,
          semi: true,
          disabled: false
        },
        padding: 8,
        bgCornerRadius: 12,
        fontSize: 24,
        width: 1200,
        lang: "javascript",
        theme: "VS Code",
        fontFamily: "Consolas",
        base: "rgb(171, 184, 195)",
        bg: null
      }
  ) {
    this._config = {
      formatter: {
        parser,
        trailingComma,
        bracketSpacing,
        tabWidth,
        printWidth,
        singleQuote,
        semi,
        disabled
      },
      base,
      lang,
      width,
      padding,
      fontFamily,
      fontSize,
      bgCornerRadius,
      bg
    };

    return load(theme).then((theme) => {
      if (!this._config.bg) this._config.bg = theme.bg;

      return Promise.all([
        getHighlighter({
          theme
        }),

        getSVGRenderer({
          fontFamily,
          fontSize,
          bgCornerRadius
        })
      ]).then(([{ codeToThemedTokens }, { renderToSVG }]) => {
        this._highlight = codeToThemedTokens;
        this._render = renderToSVG;
        return this;
      });
    });
  }

  svg(
    code,
    {
      formatter: {
        format: parser = this._config.formatter.parser,
        trailingComma = this._config.formatter.trailingComma,
        tab: tabWidth = this._config.formatter.tabWidth,
        length: printWidth = this._config.formatter.printWidth,
        bracketSpacing = this._config.formatter.bracketSpacing,
        singleQuote = this._config.formatter.singleQuote,
        semicolon: semi = this._config.formatter.semi,
        disabled = this._config.formatter.disabled
      } = this._config.formatter,
      background: bg = this._config.bg,
      lang = this._config.lang
    } = {
        formatter: {
          parser: this._config.formatter.parser,
          trailingComma: this._config.formatter.trailingComma,
          tabWidth: this._config.formatter,
          printWidth: this._config.formatter.printWidth,
          bracketSpacing: this._config.formatter.bracketSpacing,
          singleQuote: this._config.formatter.singleQuote,
          semi: this._config.formatter.semi,
          disabled: this._config.formatter.disabled
        },
        bg: this._config.bg,
        lang: this._config.lang
      }
  ) {
    if (!disabled)
      code = format(code, {
        parser,
        trailingComma,
        tabWidth,
        printWidth,
        bracketSpacing,
        singleQuote,
        semi
      });

    return this._render(this._highlight(code, lang), { bg });
  }

  png(
    code,
    {
      formatter: {
        format: parser = this._config.formatter.parser,
        trailingComma = this._config.formatter.trailingComma,
        tab: tabWidth = this._config.formatter.tabWidth,
        length: printWidth = this._config.formatter.printWidth,
        bracketSpacing = this._config.formatter.bracketSpacing,
        singleQuote = this._config.formatter.singleQuote,
        semicolon: semi = this._config.formatter.semi,
        disabled = this._config.formatter.disabled
      } = this._config.formatter,
      background: bg = this._config.bg,
      lang = this._config.lang
    } = {
        formatter: {
          parser: this._config.formatter.parser,
          trailingComma: this._config.formatter.trailingComma,
          tabWidth: this._config.formatter,
          printWidth: this._config.formatter.printWidth,
          bracketSpacing: this._config.formatter.bracketSpacing,
          singleQuote: this._config.formatter.singleQuote,
          semi: this._config.formatter.semi,
          disabled: this._config.formatter.disabled
        },
        bg: this._config.bg,
        lang: this._config.lang
      }
  ) {
    if (!disabled)
      code = format(code, {
        parser,
        trailingComma,
        bracketSpacing,
        tabWidth,
        printWidth,
        singleQuote,
        semi
      });

    const tokens = this._highlight(code, lang);
    const svg = this._render(tokens, { bg });
    const image = new Image();
    image.src = "data:image/svg+xml;charset=utf-8," + svg;

    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, image.width, image.height);

    const out = canvas.toBuffer();
    out.svg = svg;
    out.size = [canvas.width, canvas.height];

    return out;
  }

  pretty(
    code,
    {
      formatter: {
        format: parser = this._config.formatter.parser,
        trailingComma = this._config.formatter.trailingComma,
        tab: tabWidth = this._config.formatter.tabWidth,
        length: printWidth = this._config.formatter.printWidth,
        bracketSpacing = this._config.formatter.bracketSpacing,
        singleQuote = this._config.formatter.singleQuote,
        semicolon: semi = this._config.formatter.semi,
        disabled = this._config.formatter.disabled
      } = this._config.formatter,
      background: bg = this._config.bg,
      base = this._config.base,
      lang = this._config.lang,
      width = this._config.width,
      padding = this._config.padding
    } = {
        formatter: {
          parser: this._config.formatter.parser,
          trailingComma: this._config.formatter.trailingComma,
          tabWidth: this._config.formatter,
          printWidth: this._config.formatter.printWidth,
          bracketSpacing: this._config.formatter.bracketSpacing,
          singleQuote: this._config.formatter.singleQuote,
          semi: this._config.formatter.semi,
          disabled: this._config.formatter.disabled
        },
        bg: this._config.bg,
        base: this._config.base,
        lang: this._config.lang,
        width: this._config.width,
        padding: this._config.padding
      }
  ) {
    if (!disabled)
      code = format(code, {
        parser,
        trailingComma,
        bracketSpacing,
        tabWidth,
        printWidth,
        singleQuote,
        semi
      });

    const tokens = this._highlight(code, lang);
    const svg = this._render(tokens, { bg });
    const image = new Image();

    image.src = "data:image/svg+xml;charset=utf-8," + svg;
    image.height = (image.height / image.width) * width;
    image.width = width;

    const canvas = createCanvas(
      width * (1 + 1 / padding),
      width / padding + image.height
    );
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = width / 100;
    ctx.shadowBlur = width / 30;
    ctx.shadowColor = "rgba(0, 0, 0, .55)";

    ctx.drawImage(
      image,
      width / padding / 2,
      width / padding / 2,
      width,
      image.height
    );

    const out = canvas.toBuffer();
    out.svg = svg;
    out.size = [canvas.width, canvas.height];

    return out;
  }

  static list() {
    const { readdirSync } = require("fs");
    return readdirSync(__dirname + "/themes").map((theme) =>
      theme.replace(/\.json$/, "")
    );
  }

  static register(name, theme) {
    const { writeFile } = require("fs/promises");
    return load(theme).then((theme) =>
      writeFile(__dirname + "/themes/" + name + ".json", JSON.stringify(theme))
    );
  }
};

function load(theme) {
  if (typeof theme === "object") {
    if (theme._shiki) return { then: () => theme };
    const path = __dirname + "/" + Date.now() + ".json";
    const { writeFile, unlink } = require("fs/promises");

    theme = writeFile(path, JSON.stringify(theme)).then(() => {
      const res = loadTheme(path);
      res._shiki = true;
      res.then = (callback) => callback(theme);
      return res;
    });

    theme.then(() => unlink(path));
    return theme;
  } else if (typeof theme === "string") {
    if (theme.startsWith("http")) {
      const { get } = require("https");
      return new Promise((resolve, reject) => {
        get(theme, (req) => {
          let res = "";

          req
            .on("end", () => resolve(load(JSON.parse(res))))
            .on("data", (data) => (res += data))
            .on("error", reject);
        }).on("error", reject);
      });
    }

    if (!theme.endsWith(".json"))
      theme = require("./themes/" + theme + ".json");
    else theme = loadTheme(theme);

    theme._shiki = true;
    theme.then = (callback) => callback(theme);
    return theme;
  }
}