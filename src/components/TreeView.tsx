import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Folder, FolderOpen, FileText, Calendar, Clock } from 'lucide-react';
import { TreeNode, Article } from '../types';

interface TreeViewProps {
  articles: Article[];
  onArticleClick: (article: Article) => void;
  searchTerm?: string;
}

export const TreeView: React.FC<TreeViewProps> = ({ articles, onArticleClick, searchTerm = '' }) => {
  // 定义一个状态，用于存储当前展开的节点
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['root', 'by-field', 'by-type', 'by-difficulty']));

  // 定义一个函数，用于切换节点的展开状态
  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  // 定义一个函数，用于获取数学领域的显示名称
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

  // 定义一个函数，用于获取内容类型的显示名称
  const getContentTypeDisplayName = (type: string) => {
    const names: { [key: string]: string } = {
      'theorem-proof': 'Theorems & Proofs',
      'problem-solution': 'Problem Solutions',
      'study-notes': 'Study Notes',
      'literature-review': 'Literature Reviews',
      'research-paper': 'Research Papers',
      'tutorial': 'Tutorials'
    };
    return names[type] || type;
  };

  // 定义一个函数，用于获取难度级别的显示名称
  const getDifficultyDisplayName = (difficulty: string) => {
    const names: { [key: string]: string } = {
      'basic': 'Basic Level',
      'advanced': 'Advanced Level',
      'research': 'Research Level'
    };
    return names[difficulty] || difficulty;
  };

  // Filter articles based on search term
  const filteredArticles = searchTerm
    ? articles.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : articles;

  // Group articles by different criteria
  const articlesByField = filteredArticles.reduce((acc, article) => {
    if (!acc[article.field]) acc[article.field] = [];
    acc[article.field].push(article);
    return acc;
  }, {} as { [key: string]: Article[] });

  const articlesByType = filteredArticles.reduce((acc, article) => {
    if (!acc[article.contentType]) acc[article.contentType] = [];
    acc[article.contentType].push(article);
    return acc;
  }, {} as { [key: string]: Article[] });

  const articlesByDifficulty = filteredArticles.reduce((acc, article) => {
    if (!acc[article.difficulty]) acc[article.difficulty] = [];
    acc[article.difficulty].push(article);
    return acc;
  }, {} as { [key: string]: Article[] });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const TreeNodeComponent: React.FC<{ 
    nodeId: string; 
    label: string; 
    children?: React.ReactNode; 
    isFolder?: boolean;
    count?: number;
  }> = ({ nodeId, label, children, isFolder = true, count }) => {
    const isExpanded = expandedNodes.has(nodeId);
    const hasChildren = React.Children.count(children) > 0;

    return (
      <div className="select-none">
        <div
          className={`flex items-center space-x-2 py-1 px-2 rounded hover:bg-gray-100 cursor-pointer ${
            isFolder ? 'font-medium text-gray-700' : 'text-gray-600'
          }`}
          onClick={() => hasChildren && toggleNode(nodeId)}
        >
          {hasChildren && (
            <div className="w-4 h-4 flex items-center justify-center">
              {isExpanded ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
            </div>
          )}
          {!hasChildren && <div className="w-4" />}
          
          <div className="w-4 h-4 flex items-center justify-center">
            {isFolder ? (
              isExpanded ? <FolderOpen className="h-4 w-4" /> : <Folder className="h-4 w-4" />
            ) : (
              <FileText className="h-4 w-4" />
            )}
          </div>
          
          <span className="flex-1">{label}</span>
          {count !== undefined && (
            <span className="text-xs text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">
              {count}
            </span>
          )}
        </div>
        
        {isExpanded && hasChildren && (
          <div className="ml-6 border-l border-gray-200 pl-2">
            {children}
          </div>
        )}
      </div>
    );
  };

  const ArticleNode: React.FC<{ article: Article }> = ({ article }) => (
    <div
      className="flex items-center space-x-2 py-1 px-2 rounded hover:bg-blue-50 cursor-pointer text-sm"
      onClick={() => onArticleClick(article)}
    >
      <div className="w-4" />
      <FileText className="h-4 w-4 text-blue-600" />
      <div className="flex-1 min-w-0">
        <div className="truncate font-medium text-gray-900">{article.title}</div>
        <div className="flex items-center space-x-3 text-xs text-gray-500 mt-1">
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3" />
            <span>{formatDate(article.date)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-3 w-3" />
            <span>{article.readTime}min</span>
          </div>
          <span className={`px-1.5 py-0.5 rounded text-xs difficulty-${article.difficulty}`}>
            {article.difficulty}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 font-mono text-sm">
      <div className="mb-4 pb-2 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900 academic-sans">文章目录</h3>
        {searchTerm && (
          <p className="text-xs text-gray-600 mt-1">
            搜索结果: {filteredArticles.length} 篇文章
          </p>
        )}
      </div>

      <div className="space-y-1">
        {/* By Mathematical Field */}
        <TreeNodeComponent 
          nodeId="by-field" 
          label="按数学领域分类" 
          count={Object.keys(articlesByField).length}
        >
          {Object.entries(articlesByField)
            .sort(([, a], [, b]) => b.length - a.length)
            .map(([field, fieldArticles]) => (
              <TreeNodeComponent
                key={`field-${field}`}
                nodeId={`field-${field}`}
                label={getFieldDisplayName(field)}
                count={fieldArticles.length}
              >
                {fieldArticles
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map(article => (
                    <ArticleNode key={`field-${field}-${article.id}`} article={article} />
                  ))}
              </TreeNodeComponent>
            ))}
        </TreeNodeComponent>

        {/* By Content Type */}
        <TreeNodeComponent 
          nodeId="by-type" 
          label="按内容类型分类"
          count={Object.keys(articlesByType).length}
        >
          {Object.entries(articlesByType)
            .sort(([, a], [, b]) => b.length - a.length)
            .map(([type, typeArticles]) => (
              <TreeNodeComponent
                key={`type-${type}`}
                nodeId={`type-${type}`}
                label={getContentTypeDisplayName(type)}
                count={typeArticles.length}
              >
                {typeArticles
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map(article => (
                    <ArticleNode key={`type-${type}-${article.id}`} article={article} />
                  ))}
              </TreeNodeComponent>
            ))}
        </TreeNodeComponent>

        {/* By Difficulty */}
        <TreeNodeComponent 
          nodeId="by-difficulty" 
          label="按难度级别分类"
          count={Object.keys(articlesByDifficulty).length}
        >
          {['basic', 'advanced', 'research']
            .filter(difficulty => articlesByDifficulty[difficulty])
            .map(difficulty => (
              <TreeNodeComponent
                key={`difficulty-${difficulty}`}
                nodeId={`difficulty-${difficulty}`}
                label={getDifficultyDisplayName(difficulty)}
                count={articlesByDifficulty[difficulty].length}
              >
                {articlesByDifficulty[difficulty]
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map(article => (
                    <ArticleNode key={`difficulty-${difficulty}-${article.id}`} article={article} />
                  ))}
              </TreeNodeComponent>
            ))}
        </TreeNodeComponent>

        {/* Recent Articles */}
        <TreeNodeComponent 
          nodeId="recent" 
          label="最新文章"
          count={Math.min(5, filteredArticles.length)}
        >
          {filteredArticles
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 5)
            .map(article => (
              <ArticleNode key={`recent-${article.id}`} article={article} />
            ))}
        </TreeNodeComponent>
      </div>
    </div>
  );
};