import React from 'react';
import { Search, Menu, BookOpen, User, Archive, Tag } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  onSearchToggle: () => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  showSearch: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onPageChange,
  onSearchToggle,
  searchTerm,
  onSearchChange,
  showSearch
}) => {
  const navigation = [
    { id: 'home', label: '首页', icon: BookOpen },
    { id: 'archive', label: '归档', icon: Archive },
    { id: 'tags', label: '标签', icon: Tag },
    { id: 'about', label: '关于', icon: User }
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => onPageChange('home')}
              className="flex items-center space-x-2 text-gray-900 hover:text-gray-600 transition-colors"
            >
              <BookOpen className="h-8 w-8" />
              <div className="academic-sans">
                <div className="text-xl font-bold">My MathBlog</div>
                <div className="text-xs text-gray-500 -mt-1">吕世豪的数学博客</div>
              </div>
            </button>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => onPageChange(id)}
                className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors ${
                  currentPage === id
                    ? 'text-gray-900 border-b-2 border-gray-900'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </button>
            ))}
          </nav>

          {/* Search */}
          <div className="flex items-center space-x-4">
            {showSearch && (
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜索文章..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-64 pl-4 pr-10 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
                <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            )}
            
            <button
              onClick={onSearchToggle}
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Mobile menu button */}
            <button className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-gray-200">
          <nav className="flex space-x-4 py-2">
            {navigation.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => onPageChange(id)}
                className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors ${
                  currentPage === id
                    ? 'text-gray-900 bg-gray-100 rounded'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};