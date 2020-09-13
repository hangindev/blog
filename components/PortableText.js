import React from "react";
import clsx from "clsx";
import Link from "next/link";
import BlockContent from "@sanity/block-content-to-react";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";
import ReactPlayer from "react-player/lazy";
import styles from "./PortableText.module.css";
import Figure from "./Figure";

function InternalLink({ mark: { slug, type }, children }) {
  const preflix = type === "post" ? "/blog" : "";
  if (!slug || !type) return null;
  return (
    <Link href={`${preflix}/${slug}`}>
      <a>{children}</a>
    </Link>
  );
}
function ExternalLink({ mark: { href }, children }) {
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}
function PortableFigure({
  node: { alt, caption, captionUrl, url, lqip, aspectRatio }
}) {
  if (!url) return null;
  return (
    <Figure
      imageClassName="md:rounded shadow-xl"
      alt={alt}
      src={url}
      lqip={lqip}
      aspectRatio={aspectRatio}
      caption={caption}
      captionUrl={captionUrl}
    />
  );
}
function VideoPlayer({ node: { url } }) {
  if (!url) return null;
  return (
    <div className="relative w-full mb-4" style={{ paddingTop: "56.25%" }}>
      <ReactPlayer
        className="absolute top-0 left-0"
        url={url}
        width="100%"
        height="100%"
      />
    </div>
  );
}
function EmbedHTML({ node: { html } }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

function resolveLanguage(lang) {
  return lang === "sh" ? "bash" : lang;
}
function CodeBlock({ node: { code, language } }) {
  return (
    <Highlight
      {...defaultProps}
      code={code}
      language={resolveLanguage(language)}
      theme={theme}
    >
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <pre style={{ ...style }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}

const serializers = {
  marks: {
    internalLink: InternalLink,
    link: ExternalLink
  },
  types: {
    figure: PortableFigure,
    code: CodeBlock,
    video: VideoPlayer,
    embedHTML: EmbedHTML
  }
};

function PortableText({ className, ...props }) {
  return (
    <BlockContent
      serializers={serializers}
      {...props}
      className={clsx(styles.md, className)}
    />
  );
}

export default PortableText;
