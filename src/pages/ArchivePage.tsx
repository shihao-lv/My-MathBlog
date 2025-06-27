import React, { useState } from 'react';
import { Article } from '../types';
import { ArticleCard } from '../components/ArticleCard';
import { Calendar, Grid, List } from 'lucide-react';

interface ArchivePageProps {
  articles: Article[];
  onArticleClick: (article: Article) => void;
}

export const ArchivePage: React.FC<ArchivePageProps> = ({ articles, onArticleClick }) => {
  // 定义视图模式和排序顺序
  const [viewMode, setViewMode] = useState<'chronological' | 'field'>('chronological');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  // Group articles by year
  const articlesByYear = articles.reduce((acc, article) => {
    const year = new Date(article.date).getFullYear();
    if (!acc[year]) acc[year] = [];
    acc[year].push(article);
    return acc;
  }, {} as { [year: number]: Article[] });

  // Sort years
  const sortedYears = Object.keys(articlesByYear)
    .map(Number)
    .sort((a, b) => sortOrder === 'newest' ? b - a : a - b);

  // Group articles by field
  const articlesByField = articles.reduce((acc, article) => {
    const field = article.field;
    if (!acc[field]) acc[field] = [];
    acc[field].push(article);
    return acc;
  }, {} as { [field: string]: Article[] });

  const getFieldDisplayName = (field: string) => {
    const names: { [key: string]: string } = {
      'algebra': 'Algebra',
      'analysis': 'Analysis',
      'geometry': 'Geometry',
      'topology': 'Topology',
      'number-theory': 'Number Theory',
      'probability': 'Probability',
      'logic': 'Logic',
      'applied-math': 'Applied Mathematics'
    };
    return names[field] || field;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 academic-sans">Archive</h1>
        <p className="text-lg text-gray-600 academic-serif">
          Browse all articles organized by time and mathematical field.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">View:</span>
            <button
              onClick={() => setViewMode('chronological')}
              className={`flex items-center space-x-1 px-3 py-2 text-sm rounded-lg transition-colors ${
                viewMode === 'chronological'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Calendar className="h-4 w-4" />
              <span>By Year</span>
            </button>
            <button
              onClick={() => setViewMode('field')}
              className={`flex items-center space-x-1 px-3 py-2 text-sm rounded-lg transition-colors ${
                viewMode === 'field'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Grid className="h-4 w-4" />
              <span>By Field</span>
            </button>
          </div>
        </div>

        {viewMode === 'chronological' && (
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Sort:</span>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        )}
      </div>

      {/* Chronological View */}
      {viewMode === 'chronological' && (
        <div className="space-y-12">
          {sortedYears.map(year => {
            const yearArticles = articlesByYear[year].sort((a, b) => {
              const dateA = new Date(a.date).getTime();
              const dateB = new Date(b.date).getTime();
              return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
            });

            return (
              <div key={year} className="space-y-6">
                <div className="flex items-center space-x-4">
                  <h2 className="text-2xl font-bold text-gray-900 academic-sans">{year}</h2>
                  <div className="flex-1 h-px bg-gray-200"></div>
                  <span className="text-sm text-gray-500 px-2">
                    {yearArticles.length} articles
                  </span>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {yearArticles.map(article => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      onClick={() => onArticleClick(article)}
                      variant="compact"
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Field View */}
      {viewMode === 'field' && (
        <div className="space-y-12">
          {Object.entries(articlesByField)
            .sort(([, a], [, b]) => b.length - a.length)
            .map(([field, fieldArticles]) => (
              <div key={field} className="space-y-6">
                <div className="flex items-center space-x-4">
                  <h2 className="text-2xl font-bold text-gray-900 academic-sans">
                    {getFieldDisplayName(field)}
                  </h2>
                  <div className="flex-1 h-px bg-gray-200"></div>
                  <span className="text-sm text-gray-500 px-2">
                    {fieldArticles.length} articles
                  </span>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {fieldArticles
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
              </div>
            ))}
        </div>
      )}

      {/* Stats */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-gray-900">{articles.length}</div>
            <div className="text-sm text-gray-600">Total Articles</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {Object.keys(articlesByField).length}
            </div>
            <div className="text-sm text-gray-600">Fields Covered</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {Object.keys(articlesByYear).length}
            </div>
            <div className="text-sm text-gray-600">Years Active</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {Math.round(articles.reduce((sum, a) => sum + a.readTime, 0) / 60)}
            </div>
            <div className="text-sm text-gray-600">Hours of Reading</div>
          </div>
        </div>
      </div>
    </div>
  );
};