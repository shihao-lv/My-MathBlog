import React, { useState } from 'react';
import { Article } from '../types';
import { TreeView } from '../components/TreeView';
import { LiveClock } from '../components/LiveClock';
import { BlogStats } from '../components/BlogStats';
import { TagSearch } from '../components/TagSearch';
import { ArticleCard } from '../components/ArticleCard';
import { Search, X } from 'lucide-react';

interface HomePageProps {
  articles: Article[];
  onArticleClick: (article: Article) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ articles, onArticleClick }) => {
  // 定义搜索词和选中标签的状态
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Filter articles based on search term and selected tag
  const filteredArticles = articles.filter(article => {
    const matchesSearch = !searchTerm || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesTag = !selectedTag || article.tags.includes(selectedTag);

    return matchesSearch && matchesTag;
  });

  const handleTagSelect = (tag: string) => {
    setSelectedTag(tag);
  };

  const handleClearTag = () => {
    setSelectedTag(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 academic-sans">
          My MathBlog
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto academic-serif leading-relaxed">
          这里是吕世豪的个人数学博客，用于展示学习数学的过程和思考。
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Live Clock */}
          <LiveClock />
          
          {/* Blog Stats */}
          <BlogStats articles={articles} />
          
          {/* Tag Search */}
          <TagSearch 
            articles={articles} 
            onTagSelect={handleTagSelect}
            selectedTag={selectedTag || undefined}
            onClearTag={handleClearTag}
          />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="搜索文章、标签或内容..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-10 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Active Filters */}
          {(searchTerm || selectedTag) && (
            <div className="mb-6 flex items-center space-x-2 text-sm">
              <span className="text-gray-600">当前筛选:</span>
              {searchTerm && (
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  搜索: "{searchTerm}"
                </span>
              )}
              {selectedTag && (
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                  标签: #{selectedTag}
                </span>
              )}
              <span className="text-gray-500">
                ({filteredArticles.length} 篇文章)
              </span>
            </div>
          )}

          {/* Articles List */}
          {selectedTag ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 academic-sans">
                标签 "#{selectedTag}" 相关文章
              </h2>
              <div className="space-y-4">
                {filteredArticles.map(article => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onClick={() => onArticleClick(article)}
                    variant="compact"
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {searchTerm ? (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 academic-sans">
                    搜索结果
                  </h2>
                  <div className="space-y-4">
                    {filteredArticles.map(article => (
                      <ArticleCard
                        key={article.id}
                        article={article}
                        onClick={() => onArticleClick(article)}
                        variant="compact"
                      />
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 academic-sans">
                    最新文章
                  </h2>
                  <div className="space-y-4">
                    {articles
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .slice(0, 5)
                      .map(article => (
                        <ArticleCard
                          key={article.id}
                          article={article}
                          onClick={() => onArticleClick(article)}
                          variant="full"
                        />
                      ))}
                  </div>
                </>
              )}
            </div>
          )}

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">未找到相关文章</h3>
              <p className="text-gray-600">
                请尝试调整搜索条件或浏览其他内容。
              </p>
            </div>
          )}
        </div>

        {/* Right Sidebar - Tree View */}
        <div className="lg:col-span-1">
          <TreeView 
            articles={filteredArticles} 
            onArticleClick={onArticleClick}
            searchTerm={searchTerm}
          />
        </div>
      </div>
    </div>
  );
};
