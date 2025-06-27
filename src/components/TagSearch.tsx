import React, { useState } from 'react';
import { Search, Tag, X } from 'lucide-react';
import { Article } from '../types';

interface TagSearchProps {
  articles: Article[];
  onTagSelect: (tag: string) => void;
  selectedTag?: string;
  onClearTag?: () => void;
}

export const TagSearch: React.FC<TagSearchProps> = ({ 
  articles, 
  onTagSelect, 
  selectedTag,
  onClearTag 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Get all tags with counts
  const tagCounts = articles.reduce((acc, article) => {
    article.tags.forEach(tag => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {} as { [tag: string]: number });

  // Filter tags based on search term
  const filteredTags = Object.entries(tagCounts)
    .filter(([tag]) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);

  const handleTagClick = (tag: string) => {
    onTagSelect(tag);
    setSearchTerm('');
    setShowSuggestions(false);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-center space-x-2 mb-3">
        <Tag className="h-5 w-5 text-gray-600" />
        <h3 className="font-semibold text-gray-900 academic-sans">标签搜索</h3>
      </div>

      {selectedTag && (
        <div className="mb-3 flex items-center space-x-2">
          <span className="text-sm text-gray-600">当前标签:</span>
          <div className="flex items-center space-x-1 bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
            <span>#{selectedTag}</span>
            {onClearTag && (
              <button
                onClick={onClearTag}
                className="hover:text-blue-900"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
        </div>
      )}

      <div className="relative">
        <div className="relative">
          <input
            type="text"
            placeholder="搜索标签..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            className="w-full pl-8 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
        </div>

        {showSuggestions && searchTerm && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
            {filteredTags.length > 0 ? (
              filteredTags.map(([tag, count]) => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center justify-between"
                >
                  <span className="text-sm">#{tag}</span>
                  <span className="text-xs text-gray-500">{count}</span>
                </button>
              ))
            ) : (
              <div className="px-3 py-2 text-sm text-gray-500">
                未找到匹配的标签
              </div>
            )}
          </div>
        )}
      </div>

      {/* Popular tags */}
      <div className="mt-4">
        <div className="text-sm text-gray-600 mb-2">热门标签:</div>
        <div className="flex flex-wrap gap-1">
          {Object.entries(tagCounts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 8)
            .map(([tag, count]) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded transition-colors"
              >
                #{tag} ({count})
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};