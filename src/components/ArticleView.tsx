import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, User, Tag, BookOpen } from 'lucide-react';
import { Article, Comment } from '../types';
import { renderMathInText } from './LaTeX';
import { CommentSection } from './CommentSection';

interface ArticleViewProps {
  article: Article;
  onBack: () => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({ article, onBack }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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

  const handleAddComment = (commentData: Omit<Comment, 'id' | 'date'>) => {
    const newComment: Comment = {
      ...commentData,
      id: Date.now().toString(),
      date: new Date().toISOString()
    };
    setComments([...comments, newComment]);
  };

  const renderContent = (content: string) => {
    const lines = content.split('\n');
    const elements: JSX.Element[] = [];
    let currentIndex = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (!line) {
        elements.push(<br key={`br-${currentIndex++}`} />);
        continue;
      }

      // Headers
      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={`h1-${currentIndex++}`} className="text-3xl font-bold text-gray-900 mt-8 mb-4 academic-sans">
            {renderMathInText(line.substring(2))}
          </h1>
        );
      } else if (line.startsWith('## ')) {
        elements.push(
          <h2 key={`h2-${currentIndex++}`} className="text-2xl font-semibold text-gray-900 mt-6 mb-3 academic-sans">
            {renderMathInText(line.substring(3))}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        elements.push(
          <h3 key={`h3-${currentIndex++}`} className="text-xl font-semibold text-gray-900 mt-5 mb-2 academic-sans">
            {renderMathInText(line.substring(4))}
          </h3>
        );
      } else if (line.startsWith('**') && line.endsWith('**')) {
        // Bold paragraphs (definitions, theorems)
        const content = line.substring(2, line.length - 2);
        elements.push(
          <p key={`bold-${currentIndex++}`} className="font-semibold text-gray-900 mb-3 academic-serif">
            {renderMathInText(content)}
          </p>
        );
      } else if (line.startsWith('- ')) {
        // List items
        elements.push(
          <li key={`li-${currentIndex++}`} className="mb-1 academic-serif">
            {renderMathInText(line.substring(2))}
          </li>
        );
      } else {
        // Regular paragraphs
        elements.push(
          <p key={`p-${currentIndex++}`} className="mb-4 academic-serif leading-relaxed">
            {renderMathInText(line)}
          </p>
        );
      }
    }

    return elements;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>返回文章列表</span>
      </button>

      {/* Article Header */}
      <header className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <h1 className="text-4xl font-bold text-gray-900 academic-sans leading-tight flex-1 mr-4">
            {renderMathInText(article.title)}
          </h1>
          <span className={`px-3 py-1 text-sm rounded-lg whitespace-nowrap ${getFieldColor(article.field)}`}>
            {article.field.replace('-', ' ')}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
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
            <span>{article.readTime} 分钟阅读</span>
          </div>
          <div className="flex items-center space-x-1">
            <BookOpen className="h-4 w-4" />
            <span className="capitalize">{article.contentType.replace('-', ' ')}</span>
          </div>
          <span className={`tag difficulty-${article.difficulty}`}>
            {article.difficulty}
          </span>
        </div>

        {/* Abstract */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-3 academic-sans">摘要</h2>
          <p className="text-gray-700 academic-serif leading-relaxed">
            {renderMathInText(article.abstract)}
          </p>
        </div>
      </header>

      {/* Article Content */}
      <div className="math-content prose prose-lg max-w-none">
        {renderContent(article.content)}
      </div>

      {/* Tags */}
      {article.tags.length > 0 && (
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center space-x-2 mb-4">
            <Tag className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900 academic-sans">标签</h3>
          </div>
          <div className="flex flex-wrap">
            {article.tags.map((tag, index) => (
              <span key={index} className="tag">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Comments Section */}
      <CommentSection
        articleId={article.id}
        comments={comments}
        onAddComment={handleAddComment}
      />
    </div>
  );
};