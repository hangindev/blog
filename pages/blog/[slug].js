import React from "react";
import SEO from "../../components/SEO";
import Header from "../../components/Header";
import Bio from "../../components/Bio";
import Post from "../../components/Post";
import PostNav from "../../components/PostNav";
import Footer from "../../components/Footer";
import ExitPreview from "../../components/ExitPreview";
import {
  getAllPostWithSlugs,
  getPost,
  getAuthor,
  getBlogSettings,
  imageBuilder
} from "../../lib/api";
import { getAuthorTwitterHandle } from "../../utils";
import ConvertKit from "../../components/ConvertKit";

function BlogPost({ preview, post, blogSettings, author, next, prev }) {
  let image = null;
  if (post.coverImage) {
    image = {
      src: imageBuilder
        .image(post.coverImage.src)
        .width(1200)
        .height(630)
        .url(),
      alt: post.coverImage.alt,
      ext: post.coverImage.ext,
      dimensions: { width: 1200, height: 630 }
    };
  }
  return (
    <div className="layout">
      <SEO
        siteName={blogSettings.title}
        type="article"
        title={`${post.title} | ${blogSettings.title}`}
        description={post.excerpt}
        twitter={blogSettings.twitter}
        twitterCreator={getAuthorTwitterHandle(author)}
        image={image}
        publishedAt={post.publishedAt}
        url={`${blogSettings.url}/blog/${post.slug}`}
      />
      <Header className="mb-4 sm:mb-5" name={blogSettings.title} />
      <Post className="mb-8 sm:mb-10" {...post} />
      {blogSettings.convertKit && (
        <ConvertKit
          className="mb-8 sm:mb-10"
          script={blogSettings.convertKit}
        />
      )}
      <Bio className="mb-12 sm:mb-16" author={author} />
      <PostNav className="mb-12 sm:mb-16" next={next} prev={prev} />
      <Footer socialLinks={author.socialLinks} />
      {preview && <ExitPreview />}
    </div>
  );
}

export default BlogPost;

export async function getStaticProps({ params, preview = false }) {
  const [post, author, blogSettings, allPosts] = await Promise.all([
    getPost(params.slug, preview),
    getAuthor(),
    getBlogSettings(),
    getAllPostWithSlugs()
  ]);
  const postIndex = allPosts.findIndex(p => p.slug === params.slug);
  return {
    props: {
      preview,
      post,
      blogSettings,
      author,
      next: allPosts[postIndex - 1] || null,
      prev: allPosts[postIndex + 1] || null
    }
  };
}

export async function getStaticPaths() {
  const posts = await getAllPostWithSlugs();
  return {
    paths:
      posts.map(({ slug }) => ({
        params: { slug }
      })) || [],
    fallback: false
  };
}
