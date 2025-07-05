import fs from "fs";
import path from "path";

export type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  categories?: string[];
};

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);
  if (!match) {
    throw new Error("No frontmatter found");
  }

  const frontMatterBlock = match[1];
  const content = fileContent.replace(frontmatterRegex, "").trim();

  const lines = frontMatterBlock.split(/\r?\n/);
  const metadata: Partial<Metadata> = {};

  let currentKey: keyof Metadata | null = null;
  for (let raw of lines) {
    const line = raw.trim();
    // 1) Key with inline value: e.g. "title: Hello"
    let m = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (m) {
      const [, key, val] = m;
      if (val === "") {
        // start of a list block
        currentKey = key as keyof Metadata;
        (metadata[currentKey] as any) = [];
      } else {
        // scalar value
        let v = val.replace(/^['"](.*)['"]$/, "$1");
        // convert to number/boolean if you like, but here keep strings
        (metadata[key as keyof Metadata] as any) = v;
        currentKey = null;
      }
    }
    // 2) List item under currentKey
    else if (currentKey && line.startsWith("- ")) {
      const item = line
        .slice(2)
        .trim()
        .replace(/^['"](.*)['"]$/, "$1");
      (metadata[currentKey] as any[]).push(item);
    }
    // else ignore stray lines
  }

  return { metadata: metadata as Metadata, content };
}

function getMDXFiles(dir) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath) {
  let rawContent = fs.readFileSync(filePath, "utf-8");
  return parseFrontmatter(rawContent);
}

function getMDXData(dir) {
  let mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    let { metadata, content } = readMDXFile(path.join(dir, file));
    let slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

export function getBlogPosts() {
  return getMDXData(path.join(process.cwd(), "app", "blog", "posts"));
}

export function formatDate(date: string, includeRelative = false) {
  let currentDate = new Date();
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }
  let targetDate = new Date(date);

  let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  let daysAgo = currentDate.getDate() - targetDate.getDate();

  let formattedDate = "";

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`;
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`;
  } else {
    formattedDate = "Today";
  }

  let fullDate = targetDate.toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (!includeRelative) {
    return fullDate;
  }

  return `${fullDate} (${formattedDate})`;
}
