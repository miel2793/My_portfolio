import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Tag, Share2, Check, ExternalLink, BookOpen } from 'lucide-react';
import { api } from '../services/api';
import { BlogPost } from '../types';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [post, setPost] = useState<BlogPost | null>(null);
  const [related, setRelated] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      try {
        setIsLoading(true);
        const res = await api.getPublicBlogPostBySlug(slug);
        if (res.success && res.data) {
          setPost(res.data);
          setRelated(res.related || []);
          document.title = `${res.data.seoTitle || res.data.title} — MD: Miel Mahmud Sifat`;
        } else {
          navigate('/blog');
        }
      } catch {
        navigate('/blog');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [slug, navigate]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="py-24 text-center font-mono text-sm text-theme-muted animate-pulse">
        Loading article...
      </div>
    );
  }

  if (!post) return null;

  return (
    <article className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12">
      {/* Navigation & Category Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-theme-secondary hover:text-lime-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all articles
        </Link>
        <span className="px-3 py-1 rounded-full bg-lime-400/10 text-lime-400 text-xs font-mono font-semibold uppercase">
          {post.category || 'Technology'}
        </span>
      </div>

      {/* Article Header */}
      <div className="space-y-4">
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-theme-primary tracking-tight leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-theme-muted font-mono pt-2 border-b border-subtle pb-6" style={{ borderColor: 'var(--border-subtle)' }}>
          {post.publishedAt && (
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-lime-400" />
              <span>
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
          )}
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-lime-400" />
            <span>{post.readingTimeMinutes || 3} min read</span>
          </div>
          <span>•</span>
          <span>By MD: Miel Mahmud Sifat</span>
        </div>
      </div>

      {/* Featured Image */}
      {post.featuredImage && (
        <div className="w-full h-72 sm:h-96 rounded-3xl overflow-hidden bg-[#12161f] border border-slate-800 shadow-md">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Article Excerpt Callout */}
      {post.excerpt && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-lime-400/10 via-slate-800/20 to-transparent border-l-4 border-lime-400 text-base sm:text-lg text-theme-primary italic leading-relaxed">
          {post.excerpt}
        </div>
      )}

      {/* Main Content Body (Rich formatted) */}
      <div className="prose dark:prose-invert max-w-none text-theme-secondary text-base sm:text-lg leading-relaxed space-y-6">
        {post.content.split('\n\n').map((paragraph, idx) => {
          if (paragraph.startsWith('### ')) {
            return (
              <h3 key={idx} className="font-heading font-bold text-2xl text-theme-primary pt-4">
                {paragraph.replace('### ', '')}
              </h3>
            );
          }
          if (paragraph.startsWith('#### ')) {
            return (
              <h4 key={idx} className="font-heading font-bold text-xl text-theme-primary pt-3">
                {paragraph.replace('#### ', '')}
              </h4>
            );
          }
          if (paragraph.startsWith('- ')) {
            const listItems = paragraph.split('\n').filter(Boolean);
            return (
              <ul key={idx} className="list-disc pl-6 space-y-2">
                {listItems.map((li, i) => (
                  <li key={i}>{li.replace(/^- /, '')}</li>
                ))}
              </ul>
            );
          }
          return (
            <p key={idx} className="whitespace-pre-line">
              {paragraph}
            </p>
          );
        })}
      </div>

      {/* Tags & Social Share Footer */}
      <div className="pt-8 border-t border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-6" style={{ borderColor: 'var(--border-subtle)' }}>
        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2">
          {post.tags?.map((t, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 text-xs font-mono px-3 py-1 rounded-lg bg-[#151922] border border-slate-800 text-theme-secondary"
            >
              <Tag className="w-3 h-3 text-lime-400" />
              {t}
            </span>
          ))}
        </div>

        {/* Social Share */}
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase font-mono text-theme-muted">Share:</span>
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#151922] border border-slate-800 hover:border-lime-400/40 text-xs font-semibold text-theme-primary transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-lime-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
          </button>
        </div>
      </div>

      {/* Related Posts Section */}
      {related.length > 0 && (
        <div className="pt-12 border-t border-subtle space-y-6" style={{ borderColor: 'var(--border-subtle)' }}>
          <h3 className="font-heading font-bold text-2xl text-theme-primary">
            Related Articles
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {related.map((rel) => (
              <Link
                key={rel._id}
                to={`/blog/${rel.slug}`}
                className="p-5 rounded-2xl bg-[#151922] border border-subtle hover:border-lime-400/40 transition-colors space-y-2 block"
                style={{ backgroundColor: 'var(--bg-card)' }}
              >
                <span className="text-[11px] font-mono text-lime-400 uppercase">
                  {rel.category}
                </span>
                <h4 className="font-heading font-bold text-base text-theme-primary line-clamp-2">
                  {rel.title}
                </h4>
                <p className="text-xs text-theme-secondary line-clamp-2">{rel.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
};
