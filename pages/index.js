import React from 'react';
import SEO from '../components/SEO';
import Header from '../components/Header';
import Bio from '../components/Bio';
import PostList from '../components/PostList';
import Footer from '../components/Footer';
import { getAllPosts, getBlogSettings, getAuthor } from '../lib/api';
import { getAuthorTwitterHandle } from '../utils';

function Home({ author, posts, blogSettings, preview }) {
  return (
    <div className="layout">
      <SEO
        siteName={blogSettings.title}
        title={blogSettings.title}
        description={blogSettings.description}
        image={blogSettings.image}
        twitter={blogSettings.twitter}
        url={blogSettings.url}
        twitterCreator={getAuthorTwitterHandle(author)}
      />
      <Header className="mb-8 sm:mb-10" name={blogSettings.title} />
      <Bio className="mb-8 sm:mb-10" author={author} />
      <p className="text-lg mb-3">Latest</p>
      <PostList className="mb-8 sm:mb-10" posts={posts} />
      <Footer socialLinks={author.socialLinks} />
    </div>
  );
}

export async function getStaticProps({ preview = false }) {
  const [posts, blogSettings, author] = await Promise.all([
    getAllPosts(preview),
    getBlogSettings(),
    getAuthor(),
  ]);
  return {
    props: { posts, blogSettings, author, preview },
  };
}

export default Home;
