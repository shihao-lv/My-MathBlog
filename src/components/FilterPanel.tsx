import React from 'react';
import { X, Filter } from 'lucide-react';
import { FilterState, MathField, ContentType, DifficultyLevel } from '../types';

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFilterChange,
  isOpen,
  onToggle
}) => {
  // 定义数学领域选项
  const mathFields: { value: MathField | 'all'; label: string }[] = [
    { value: 'all', label: 'All Fields' },
    { value: 'algebra', label: 'Algebra' },
    { value: 'analysis', label: 'Analysis' },
    { value: 'geometry', label: 'Geometry' },
    { value: 'topology', label: 'Topology' },
    { value: 'number-theory', label: 'Number Theory' },
    { value: 'probability', label: 'Probability' },
    { value: 'logic', label: 'Logic' },
    { value: 'applied-math', label: 'Applied Mathematics' }
  ];

  // 定义内容类型选项
  const contentTypes: { value: ContentType | 'all'; label: string }[] = [
    { value: 'all', label: 'All Types' },
    { value: 'theorem-proof', label: 'Theorem & Proof' },
    { value: 'problem-solution', label: 'Problem Solution' },
    { value: 'study-notes', label: 'Study Notes' },
    { value: 'literature-review', label: 'Literature Review' },
    { value: 'research-paper', label: 'Research Paper' },
    { value: 'tutorial', label: 'Tutorial' }
  ];

  // 定义难度级别选项
  const difficulties: { value: DifficultyLevel | 'all'; label: string }[] = [
    { value: 'all', label: 'All Levels' },
    { value: 'basic', label: 'Basic' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'research', label: 'Research' }
  ];

  // 判断是否有激活的过滤器
  const hasActiveFilters = 
    filters.selectedField !== 'all' ||
    filters.selectedContentType !== 'all' ||
    filters.selectedDifficulty !== 'all' ||
    filters.selectedTags.length > 0;

  // 清除过滤器
  const clearFilters = () => {
    onFilterChange({
      ...filters,
      selectedField: 'all',
      selectedContentType: 'all',
      selectedDifficulty: 'all',
      selectedTags: []
    });
  };

  return (
    <>
      {/* Filter Toggle Button */}
      <button
        onClick={onToggle}
        className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
          isOpen || hasActiveFilters
            ? 'bg-gray-900 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        <Filter className="h-4 w-4" />
        <span>Filters</span>
        {hasActiveFilters && (
          <span className="bg-white text-gray-900 px-2 py-0.5 rounded-full text-xs">
            Active
          </span>
        )}
      </button>

      {/* Filter Panel */}
      {isOpen && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 academic-sans">
              Filter Articles
            </h3>
            <div className="flex items-center space-x-2">
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Clear all
                </button>
              )}
              <button
                onClick={onToggle}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Mathematical Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mathematical Field
              </label>
              <select
                value={filters.selectedField}
                onChange={(e) =>
                  onFilterChange({
                    ...filters,
                    selectedField: e.target.value as MathField | 'all'
                  })
                }
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              >
                {mathFields.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            {/* Content Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content Type
              </label>
              <select
                value={filters.selectedContentType}
                onChange={(e) =>
                  onFilterChange({
                    ...filters,
                    selectedContentType: e.target.value as ContentType | 'all'
                  })
                }
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              >
                {contentTypes.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty Level
              </label>
              <select
                value={filters.selectedDifficulty}
                onChange={(e) =>
                  onFilterChange({
                    ...filters,
                    selectedDifficulty: e.target.value as DifficultyLevel | 'all'
                  })
                }
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              >
                {difficulties.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </>
  );
};