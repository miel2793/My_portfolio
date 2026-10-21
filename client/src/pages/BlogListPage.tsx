import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Search, Clock, Calendar, Tag, ArrowRight } from 'lucide-react';
import { api } from '../services/api';
import { BlogPost } from '../types';

export const BlogListPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const res = await api.getPublicBlogPosts({
          search: search || undefined,
          category: selectedCategory !== 'All' ? selectedCategory : undefined,
        });
        if (res.success) {
          setPosts(res.data);
        }
      } catch (err) {
        console.error('Error fetching blog posts:', err);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(fetchPosts, 250);
    return () => clearTimeout(timer);
  }, [search, selectedCategory]);

  const categories = ['All', 'Mobile Development', 'Technology', 'Flutter', 'Software Engineering'];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12 min-h-[75vh]">
      {/* Page Header */}
      <div className="space-y-4 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-lime-400/10 text-lime-400 text-xs font-mono font-semibold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          Technical Blog
        </div>
        <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-theme-primary tracking-tight">
          Articles & Insights
        </h1>
        <p className="text-base text-theme-secondary leading-relaxed">
          Sharing tutorials, architecture patterns, and reflections on Flutter, mobile engineering, and tech events.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-6 border-b border-subtle" style={{ borderColor: 'var(--border-subtle)' }}>
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-lime-400 text-black font-semibold'
                  : 'bg-[#151922] text-theme-secondary hover:text-theme-primary border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-theme-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#151922] border border-slate-800 text-sm text-theme-primary placeholder-slate-500 focus:outline-none focus:border-lime-400"
          />
        </div>
      </div>

      {/* Post Grid or Empty State */}
      {isLoading ? (
        <div className="py-20 text-center text-theme-muted font-mono text-sm animate-pulse">
          Loading articles...
        </div>
      ) : posts.length === 0 ? (
        <div className="bg-[#151922] border border-subtle rounded-3xl p-12 text-center max-w-xl mx-auto space-y-4" style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-card)' }}>
          <div className="w-12 h-12 rounded-2xl bg-lime-400/10 text-lime-400 flex items-center justify-center mx-auto">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-bold text-xl text-theme-primary">
            No Published Articles Yet
          </h3>
          <p className="text-sm text-theme-secondary leading-relaxed">
            Technical articles are currently being written. Check back soon or visit my GitHub repository for active code samples.
          </p>
          <div className="pt-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-lime-400 hover:text-lime-300"
            >
              Back to Home
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post._id}
              to={`/blog/${post.slug}`}
              className="group bg-[#151922] border border-subtle hover:border-lime-400/50 rounded-3xl p-6 sm:p-7 shadow-sm transition-all flex flex-col justify-between space-y-6"
              style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-card)' }}
            >
              <div className="space-y-4">
                {post.featuredImage && (
                  <div className="w-full h-44 rounded-2xl overflow-hidden bg-[#12161f]">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                <div className="flex items-center justify-between text-xs text-theme-muted font-mono">
                  <span className="px-2.5 py-0.5 rounded-full bg-lime-400/10 text-lime-400 font-semibold uppercase">
                    {post.category || 'Article'}
                  </span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readingTimeMinutes || 3} min read</span>
                  </div>
                </div>

                <h3 className="font-heading font-bold text-xl text-theme-primary group-hover:text-lime-400 transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-sm text-theme-secondary leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {post.tags.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-[#12161f] text-theme-secondary border border-slate-800"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs">
                <span className="text-theme-muted font-mono">
                  {post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })
                    : ''}
                </span>
                <span className="font-semibold text-lime-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Read Article
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
