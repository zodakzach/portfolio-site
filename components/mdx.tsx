import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { highlight } from "sugar-high";
import React from "react";

// Utility to extract text from React elements
function extractText(content: React.ReactNode): string {
  if (typeof content === "string") return content;
  if (typeof content === "number") return String(content);
  if (Array.isArray(content)) {
    return content.map(extractText).join("");
  }
  if (React.isValidElement(content)) {
    const props = content.props as Record<string, unknown>;
    return extractText(props.children as React.ReactNode);
  }
  return "";
}

// Utility to slugify headings
function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-and-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

// Table Component
interface TableData {
  headers: string[];
  rows: string[][];
}

function Table({ data }: { data: TableData }) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          {data.headers.map((header, i) => (
            <th
              key={i}
              className="border border-neutral-200 bg-neutral-100 px-4 py-2 text-left dark:border-neutral-700 dark:bg-neutral-800"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td
                key={j}
                className="border border-neutral-200 px-4 py-2 dark:border-neutral-700"
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Custom Link Component
interface CustomLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
}

function CustomLink({ href, ...props }: CustomLinkProps) {
  if (!href) return <a {...props} />;

  if (href.startsWith("/")) {
    return <Link href={href} {...props} />;
  }

  if (href.startsWith("#")) {
    return <a href={href} {...props} />;
  }

  return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />;
}

// Rounded Image Component
function RoundedImage(props: React.ComponentProps<typeof Image>) {
  return <Image className="rounded-lg" {...props} />;
}

// Heading Factory
function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
  const Heading = ({ children }: { children: React.ReactNode }) => {
    const text = extractText(children);
    const slug = slugify(text);

    return React.createElement(
      `h${level}`,
      { id: slug, className: "group scroll-mt-20" },
      React.createElement(
        "a",
        {
          href: `#${slug}`,
          className:
            "anchor mr-2 opacity-0 group-hover:opacity-100 transition-opacity",
          "aria-label": `Link to ${text}`,
        },
        "#",
      ),
      children,
    );
  };

  Heading.displayName = `Heading${level}`;
  return Heading;
}

// Pre Component (Code Block)
function Pre({
  children,
  className = "",
  ...props
}: React.ComponentProps<"pre">) {
  if (!children) {
    return (
      <pre
        className={`overflow-x-auto rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-sm dark:border-neutral-700 dark:bg-neutral-900 ${className}`}
        {...props}
      />
    );
  }

  const codeElement = React.Children.only(children);

  if (!React.isValidElement(codeElement)) {
    const code = extractText(children);
    const highlighted = highlight(code);

    return (
      <pre
        className={`overflow-x-auto rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-sm dark:border-neutral-700 dark:bg-neutral-900 ${className}`}
        {...props}
      >
        <code
          dangerouslySetInnerHTML={{ __html: highlighted }}
          className="text-neutral-800 dark:text-neutral-100"
        />
      </pre>
    );
  }

  const codeProps = codeElement.props as Record<string, unknown>;
  const code = extractText(codeProps.children as React.ReactNode);
  const highlighted = highlight(code);

  return (
    <pre
      className={`overflow-x-auto rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-sm dark:border-neutral-700 dark:bg-neutral-900 ${className}`}
      {...props}
    >
      <code
        dangerouslySetInnerHTML={{ __html: highlighted }}
        className="text-neutral-800 dark:text-neutral-100"
      />
    </pre>
  );
}

// Code Component (Inline & Block)
function Code({
  children,
  className = "",
  ...props
}: React.ComponentProps<"code">) {
  const isBlock = /language-/.test(className);

  if (!isBlock) {
    return (
      <code
        className={`rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-sm text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200 ${className}`}
        {...props}
      >
        {children}
      </code>
    );
  }

  return (
    <code className={className} {...props}>
      {children}
    </code>
  );
}

// MDX Components Map
const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  pre: Pre,
  code: Code,
  Table,
};

// Main MDX Component
export function CustomMDX(
  props: React.ComponentProps<typeof MDXRemote> & {
    components?: Record<string, React.ComponentType<unknown>>;
  },
) {
  return (
    <MDXRemote
      {...props}
      components={{
        ...components,
        ...(props.components || {}),
      }}
    />
  );
}
