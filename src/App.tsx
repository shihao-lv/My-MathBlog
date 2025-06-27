import React, { useState } from 'react';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { ArchivePage } from './pages/ArchivePage';
import { TagsPage } from './pages/TagsPage';
import { AboutPage } from './pages/AboutPage';
import { ArticleView } from './components/ArticleView';
import { sampleArticles } from './data/articles';
import { Article } from './types';

type PageType = 'home' | 'archive' | 'tags' | 'about';

// 定义App组件
function App() {
  // 定义当前页面的状态，初始值为'home'
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  // 定义选中的文章的状态，初始值为null
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  // 定义是否显示搜索框的状态，初始值为false
  const [showSearch, setShowSearch] = useState(false);
  // 定义搜索框中的搜索词的状态，初始值为空字符串
  const [searchTerm, setSearchTerm] = useState('');

  // 处理文章点击事件，将选中的文章设置为当前文章
  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
  };

  // 处理返回列表事件，将选中的文章设置为null
  const handleBackToList = () => {
    setSelectedArticle(null);
  };

  // 处理页面切换事件，将当前页面设置为传入的页面，并将选中的文章设置为null
  const handlePageChange = (page: string) => {
    setCurrentPage(page as PageType);
    setSelectedArticle(null);
  };

  // Filter articles based on search term when search is active
  const filteredArticles = showSearch && searchTerm.trim()
    ? sampleArticles.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : sampleArticles;

  // 渲染页面
  const renderPage = () => {
    // 如果有选中的文章，则渲染文章视图
    if (selectedArticle) {
      return <ArticleView article={selectedArticle} onBack={handleBackToList} />;
    }

    // 如果显示搜索且搜索词不为空，则使用过滤后的文章，否则使用示例文章
    const articles = showSearch && searchTerm.trim() ? filteredArticles : sampleArticles;

    // 根据当前页面，渲染不同的页面
    switch (currentPage) {
      case 'home':
        return <HomePage articles={articles} onArticleClick={handleArticleClick} />;
      case 'archive':
        return <ArchivePage articles={articles} onArticleClick={handleArticleClick} />;
      case 'tags':
        return <TagsPage articles={articles} onArticleClick={handleArticleClick} />;
      case 'about':
        return <AboutPage />;
      default:
        return <HomePage articles={articles} onArticleClick={handleArticleClick} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onSearchToggle={() => {
          setShowSearch(!showSearch);
          if (showSearch) {
            setSearchTerm('');
          }
        }}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        showSearch={showSearch}
      />
      
      <main className="pb-16">
        {renderPage()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600 academic-serif">
              © 2025 吕世豪的个人博客。
            </p>
            <p className="text-sm text-gray-500 mt-2">
              数学学习与分享
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;