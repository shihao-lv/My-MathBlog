import React from 'react';
import { Clock, Calendar, BookOpen, User } from 'lucide-react';
import { Article } from '../types';
import { renderMathInText } from './LaTeX';

interface ArticleCardProps {
  article: Article;
  onClick: () => void;
  variant?: 'full' | 'compact';
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ 
  article, 
  onClick, 
  variant = 'full' 
}) => {
  const getFieldColor = (field: string) => {
    const colors: { [key: string]: string } = {
      'algebra': 'bg-blue-100 text-blue-800',
      'analysis': 'bg-green-100 text-green-800',
      'geometry': 'bg-purple-100 text-purple-800',
      'topology': 'bg-pink-100 text-pink-800',
      'number-theory': 'bg-yellow-100 text-yellow-800',
      'probability': 'bg-indigo-100 text-indigo-800',
      'logic': 'bg-red-100 text-red-800',
      'applied-math': 'bg-teal-100 text-teal-800'
    };
    return colors[field] || 'bg-gray-100 text-gray-800';
  };

  const getContentTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      'theorem-proof': 'Theorem & Proof',
      'problem-solution': 'Problem Solution',
      'study-notes': 'Study Notes',
      'literature-review': 'Literature Review',
      'research-paper': 'Research Paper',
      'tutorial': 'Tutorial'
    };
    return labels[type] || type;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (variant === 'compact') {
    return (
      <div
        onClick={onClick}
        className="article-card bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-md transition-all"
      >
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 academic-sans line-clamp-2">
            {renderMathInText(article.title)}
          </h3>
          <span className={`ml-2 px-2 py-1 text-xs rounded-full whitespace-nowrap ${getFieldColor(article.field)}`}>
            {article.field.replace('-', ' ')}
          </span>
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(article.date)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{article.readTime} min read</span>
          </div>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {renderMathInText(article.abstract)}
        </p>

        <div className="flex items-center justify-between">
          <span className={`tag difficulty-${article.difficulty}`}>
            {article.difficulty}
          </span>
          <span className="text-xs text-gray-500">
            {getContentTypeLabel(article.contentType)}
          </span>
        </div>
      </div>
    );
  }

  return (
    <article
      onClick={onClick}
      className="article-card bg-white border border-gray-200 rounded-lg p-6 cursor-pointer hover:shadow-lg transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-900 mb-2 academic-sans">
            {renderMathInText(article.title)}
          </h2>
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
            <div className="flex items-center space-x-1">
              <User className="h-4 w-4" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(article.date)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{article.readTime} min read</span>
            </div>
          </div>
        </div>
        <span className={`px-3 py-1 text-sm rounded-lg ${getFieldColor(article.field)}`}>
          {article.field.replace('-', ' ')}
        </span>
      </div>

      <p className="text-gray-700 mb-4 academic-serif leading-relaxed">
        {renderMathInText(article.abstract)}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className={`tag difficulty-${article.difficulty}`}>
            {article.difficulty}
          </span>
          <span className="text-sm text-gray-500">
            {getContentTypeLabel(article.contentType)}
          </span>
        </div>
        
        <div className="flex items-center space-x-1 text-gray-600">
          <BookOpen className="h-4 w-4" />
          <span className="text-sm">Read more</span>
        </div>
      </div>

      {article.tags.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex flex-wrap">
            {article.tags.map((tag, index) => (
              <span key={index} className="tag">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  );
};