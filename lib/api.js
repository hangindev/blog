import sanityImage from '@sanity/image-url';
import client, { previewClient } from './sanity';

const getUniquePosts = posts => {
  const slugs = new Set();
  return posts.filter(post => {
    if (slugs.has(post.slug)) {
      return false;
    }
    slugs.add(post.slug);
    return true;
  });
};

const getClient = preview => (preview ? previewClient : client);

export const imageBuilder = sanityImage(client);

export function getFavicon() {
  return client
    .fetch(
      /* groq */ `
      *[_type == "blogSettings"]{ 'icon': icon.asset->url }[0]
    `
    )
    .then(s => s.icon);
}

export function getBlogSettings() {
  return client.fetch(/* groq */ `
    *[_type == "blogSettings"]{ 
      title, 
      description, 
      url, 
      twitter,
      'image': {
        'src': image.asset->url,    
        'ext': image.asset->extension,
        'dimensions': image.asset->metadata.dimensions,
        'alt': image.alt,
      }
    }[0]
  `);
}

export function getAuthor() {
  return client.fetch(/* groq */ `
    *[_type == "author"]{
      name,
      bio,
      'socialLinks': socialLinks[]{ type, url },
      'picture': picture.asset->url,
    }[0]
    `);
}

export async function getAllPostWithSlugs() {
  const posts = await client.fetch(/* groq */ `
      *[_type == "post" && hide == false] | order(publishedAt desc, _updatedAt desc){ 
        title,
        'slug': slug.current 
      }
    `);
  return posts || [];
}

export async function getAllPosts(preview) {
  const results = await getClient(preview).fetch(/* groq */ `
      *[_type == "post" && hide == false] | order(publishedAt desc, _updatedAt desc){
        title,
        publishedAt,
        excerpt,
        'coverImage': {
          'alt': coverImage.alt,
          'url': coverImage.image.asset->url,
          'lqip': coverImage.image.asset->metadata.lqip,
        },
        'slug': slug.current,
      }
    `);
  return getUniquePosts(results);
}

export async function getPost(slug, preview) {
  const curClient = getClient(preview);
  return curClient.fetch(
    /* groq */ `
      *[_type == "post"  && hide == false && slug.current == $slug] | order(_updatedAt desc) {
        title,
        publishedAt,
        excerpt,
        'slug': slug.current,
        'coverImage': {
          'alt': coverImage.alt,
          'src': coverImage.image.asset->url,
          'ext': coverImage.image.asset->extension,
          'lqip': coverImage.image.asset->metadata.lqip,
          'aspectRatio': coverImage.image.asset->metadata.dimensions.aspectRatio,
          'caption': coverImage.caption,
          'captionUrl': coverImage.captionUrl,
        },
        content[]{
          ...,
          _type == "figure" => {
             "url": @.image.asset->url,       
             "lqip": @.image.asset->metadata.lqip,
             "aspectRatio": @.image.asset->metadata.dimensions.aspectRatio, 
          },
          markDefs[]{
            ...,
            _type == "internalLink" => { 
              'type': @->_type,
              'slug': @->slug.current,
            }
          }
        },
      }[0]
    `,
    { slug }
  );
}
