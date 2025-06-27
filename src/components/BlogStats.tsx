import React from 'react';
import { BookOpen, FileText, Tag, Calendar } from 'lucide-react';
import { Article } from '../types';

interface BlogStatsProps {
  articles: Article[];
}

export const BlogStats: React.FC<BlogStatsProps> = ({ articles }) => {
  const totalArticles = articles.length;
  const totalTags = new Set(articles.flatMap(article => article.tags)).size;
  const totalFields = new Set(articles.map(article => article.field)).size;
  const totalReadTime = articles.reduce((sum, article) => sum + article.readTime, 0);

  const stats = [
    {
      icon: FileText,
      label: '文章总数',
      value: totalArticles,
      color: 'text-blue-600'
    },
    {
      icon: Tag,
      label: '标签数量',
      value: totalTags,
      color: 'text-green-600'
    },
    {
      icon: BookOpen,
      label: '数学分支',
      value: totalFields,
      color: 'text-purple-600'
    },
    {
      icon: Calendar,
      label: '总阅读时长',
      value: `${Math.round(totalReadTime / 60)}h`,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h3 className="font-semibold text-gray-900 mb-4 academic-sans">博客统计</h3>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className={`${stat.color} mb-2 flex justify-center`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div className="text-lg font-bold text-gray-900">{stat.value}</div>
            <div className="text-xs text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};