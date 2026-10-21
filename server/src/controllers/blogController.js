import { dataStore } from '../utils/dataStore.js';
import { slugify } from '../utils/slugify.js';

const calculateReadingTime = (text) => {
  if (!text) return 1;
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
};

export const getPublicPosts = async (req, res, next) => {
  try {
    const { category, tag, search } = req.query;
    let posts = await dataStore.find('blog', { status: 'published' }, { publishedAt: -1 });

    if (category) {
      posts = posts.filter(
        (p) => p.category && p.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (tag) {
      posts = posts.filter(
        (p) =>
          Array.isArray(p.tags) &&
          p.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
      );
    }

    if (search) {
      const q = search.toLowerCase();
      posts = posts.filter(
        (p) =>
          (p.title && p.title.toLowerCase().includes(q)) ||
          (p.excerpt && p.excerpt.toLowerCase().includes(q)) ||
          (p.content && p.content.toLowerCase().includes(q))
      );
    }

    res.json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};

export const getPublicPostBySlug = async (req, res, next) => {
  try {
    const post = await dataStore.findOne('blog', {
      slug: req.params.slug.toLowerCase(),
      status: 'published',
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found.',
      });
    }

    // Find related posts in the same category
    const allPublished = await dataStore.find('blog', { status: 'published' });
    const related = allPublished
      .filter((p) => (p._id || p.id) !== (post._id || post.id) && p.category === post.category)
      .slice(0, 3);

    res.json({
      success: true,
      data: post,
      related,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllPostsAdmin = async (req, res, next) => {
  try {
    const posts = await dataStore.find('blog', {}, { createdAt: -1 });
    res.json({
      success: true,
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};

export const createPost = async (req, res, next) => {
  try {
    const {
      title,
      slug: customSlug,
      excerpt,
      content,
      featuredImage,
      category,
      tags,
      status,
      seoTitle,
      seoDescription,
    } = req.body;

    if (!title || !excerpt || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title, excerpt, and content are required.',
      });
    }

    const slug = customSlug ? slugify(customSlug) : slugify(title);

    const existing = await dataStore.findOne('blog', { slug });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'A post with this slug or title already exists.',
      });
    }

    const tagArray = Array.isArray(tags)
      ? tags
      : typeof tags === 'string'
      ? tags.split(',').map((t) => t.trim()).filter(Boolean)
      : [];

    const readingTime = calculateReadingTime(content);
    const postStatus = status === 'published' ? 'published' : 'draft';

    const newPost = await dataStore.create('blog', {
      title: title.trim(),
      slug,
      excerpt: excerpt.trim(),
      content,
      featuredImage: featuredImage || '',
      category: category ? category.trim() : 'Technology',
      tags: tagArray,
      status: postStatus,
      publishedAt: postStatus === 'published' ? new Date().toISOString() : null,
      readingTimeMinutes: readingTime,
      seoTitle: seoTitle || title.trim(),
      seoDescription: seoDescription || excerpt.trim(),
    });

    res.status(201).json({
      success: true,
      message: 'Blog post created successfully.',
      data: newPost,
    });
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await dataStore.findById('blog', id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found.',
      });
    }

    const updates = { ...req.body };

    if (updates.title && !updates.slug) {
      updates.slug = slugify(updates.title);
    } else if (updates.slug) {
      updates.slug = slugify(updates.slug);
    }

    if (updates.content) {
      updates.readingTimeMinutes = calculateReadingTime(updates.content);
    }

    if (updates.tags && typeof updates.tags === 'string') {
      updates.tags = updates.tags.split(',').map((t) => t.trim()).filter(Boolean);
    }

    if (updates.status === 'published' && (!post.publishedAt || post.status !== 'published')) {
      updates.publishedAt = new Date().toISOString();
    }

    const updated = await dataStore.findByIdAndUpdate('blog', id, updates);

    res.json({
      success: true,
      message: 'Blog post updated successfully.',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await dataStore.findByIdAndDelete('blog', id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found.',
      });
    }

    res.json({
      success: true,
      message: 'Blog post deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};
