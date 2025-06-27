import React, { useState } from 'react';
import { Article } from '../types';
import { ArticleCard } from '../components/ArticleCard';
import { Tag, Hash, TrendingUp } from 'lucide-react';

interface TagsPageProps {
  articles: Article[];
  onArticleClick: (article: Article) => void;
}

export const TagsPage: React.FC<TagsPageProps> = ({ articles, onArticleClick }) => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Get all tags with counts
  const tagCounts = articles.reduce((acc, article) => {
    article.tags.forEach(tag => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {} as { [tag: string]: number });

  // Sort tags by frequency
  const sortedTags = Object.entries(tagCounts)
    .sort(([, a], [, b]) => b - a);

  // Get articles for selected tag
  const filteredArticles = selectedTag
    ? articles.filter(article => article.tags.includes(selectedTag))
    : [];

  // Get tag categories
  const getTagCategory = (tag: string) => {
    const categories: { [key: string]: string } = {
      // Mathematical concepts
      'complex-analysis': 'concepts',
      'topology': 'concepts',
      'polynomials': 'concepts',
      'measure-theory': 'concepts',
      'lebesgue': 'concepts',
      'integration': 'concepts',
      'linear-algebra': 'concepts',
      'eigenvalues': 'concepts',
      'matrices': 'concepts',
      'vectors': 'concepts',
      'zeta-function': 'concepts',
      // Theorems and results
      'fundamental-theorem': 'theorems',
      'riemann-hypothesis': 'theorems',
      // Methods and techniques
      'analysis': 'methods',
      'number-theory': 'methods',
      // Problems and topics
      'unsolved-problems': 'problems'
    };
    return categories[tag] || 'general';
  };

  const categorizedTags = sortedTags.reduce((acc, [tag, count]) => {
    const category = getTagCategory(tag);
    if (!acc[category]) acc[category] = [];
    acc[category].push([tag, count]);
    return acc;
  }, {} as { [category: string]: [string, number][] });

  const getCategoryName = (category: string) => {
    const names: { [key: string]: string } = {
      'concepts': 'Mathematical Concepts',
      'theorems': 'Theorems & Results',
      'methods': 'Methods & Fields',
      'problems': 'Problems & Topics',
      'general': 'General'
    };
    return names[category] || category;
  };

  const getTagSize = (count: number, maxCount: number) => {
    const ratio = count / maxCount;
    if (ratio > 0.8) return 'text-2xl';
    if (ratio > 0.6) return 'text-xl';
    if (ratio > 0.4) return 'text-lg';
    if (ratio > 0.2) return 'text-base';
    return 'text-sm';
  };

  const maxTagCount = Math.max(...Object.values(tagCounts));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 academic-sans">Tags</h1>
        <p className="text-lg text-gray-600 academic-serif">
          Explore articles by topic and theme. Click on any tag to see related articles.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
          <Hash className="h-8 w-8 text-gray-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{sortedTags.length}</div>
          <div className="text-sm text-gray-600">Unique Tags</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
          <TrendingUp className="h-8 w-8 text-gray-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{sortedTags[0]?.[1] || 0}</div>
          <div className="text-sm text-gray-600">Most Popular Tag</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
          <Tag className="h-8 w-8 text-gray-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">
            {Math.round(articles.reduce((sum, a) => sum + a.tags.length, 0) / articles.length)}
          </div>
          <div className="text-sm text-gray-600">Avg Tags per Article</div>
        </div>
      </div>

      {!selectedTag ? (
        <>
          {/* Tag Cloud */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 academic-sans">Popular Tags</h2>
            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <div className="flex flex-wrap gap-3 justify-center">
                {sortedTags.slice(0, 20).map(([tag, count]) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`tag hover:bg-gray-200 transition-colors cursor-pointer ${getTagSize(count, maxTagCount)}`}
                  >
                    #{tag} ({count})
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Categorized Tags */}
          <section className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 academic-sans">All Tags by Category</h2>
            
            {Object.entries(categorizedTags).map(([category, tags]) => (
              <div key={category} className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 academic-sans">
                  {getCategoryName(category)}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map(([tag, count]) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className="tag hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                      #{tag} ({count})
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </section>
        </>
      ) : (
        /* Selected Tag View */
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-bold text-gray-900 academic-sans">
                Articles tagged with "#{selectedTag}"
              </h2>
              <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                {filteredArticles.length} articles
              </span>
            </div>
            <button
              onClick={() => setSelectedTag(null)}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              ← Back to all tags
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredArticles
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map(article => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  onClick={() => onArticleClick(article)}
                  variant="compact"
                />
              ))}
          </div>

          {/* Related Tags */}
          <div className="mt-8 bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 academic-sans">
              Related Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {Array.from(
                new Set(
                  // 过滤出所有文章的标签，并去除已选中的标签
                  filteredArticles
                    .flatMap(article => article.tags)
                    .filter(tag => tag !== selectedTag)
                )
              ).map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className="tag hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  #{tag} ({tagCounts[tag]})
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};