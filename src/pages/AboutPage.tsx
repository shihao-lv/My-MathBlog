import React from 'react';
import { Mail, ExternalLink, BookOpen, Award, Users, GraduationCap } from 'lucide-react';
import { authorInfo } from '../data/articles';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="mb-6">
          <div className="w-32 h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Users className="h-16 w-16 text-gray-600" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2 academic-sans">
          吕世豪
        </h1>
        <p className="text-xl text-gray-600 mb-2 academic-serif">
          大三在读
        </p>
        <p className="text-lg text-gray-500">
          中南大学
        </p>
      </div>

      {/* Quick Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
          <GraduationCap className="h-8 w-8 text-gray-600 mx-auto mb-2" />
          <div className="text-lg font-semibold text-gray-900">研究方向</div>
          <div className="text-sm text-gray-600 mt-1">
            代数组合学
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
          <BookOpen className="h-8 w-8 text-gray-600 mx-auto mb-2" />
          <div className="text-lg font-semibold text-gray-900">学术发表</div>
          <div className="text-sm text-gray-600 mt-1">
            无
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
          <Award className="h-8 w-8 text-gray-600 mx-auto mb-2" />
          <div className="text-lg font-semibold text-gray-900">在读年级</div>
          <div className="text-sm text-gray-600 mt-1">
            大三在读
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 academic-sans">关于我</h2>
        <div className="prose prose-lg max-w-none academic-serif">
          <p className="text-gray-700 leading-relaxed mb-4">
            作者为大三学生，对代数组合学领域感兴趣。
          </p>
          <p className="text-gray-700 leading-relaxed">
            这个博客旨在分享个人数学见解，探索优雅的证明，讨论纯数学之美。
            每篇文章都经过精心编写，在保持数学严谨性的同时，
            力求让具有相应数学背景的读者能够理解和欣赏。
          </p>
        </div>
      </div>

      {/* Research Areas */}
      <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 academic-sans">研究领域</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {authorInfo.researchAreas.map((area, index) => (
            <div key={index} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <span className="text-gray-900 font-medium">{area}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Philosophy */}
      <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 academic-sans">数学思考</h2>
        <div className="space-y-4 academic-serif">
          <div className="border-l-4 border-gray-300 pl-6">
            <p className="text-gray-700 italic text-lg leading-relaxed">
              "数学不仅仅是解决问题——它是理解支配我们宇宙的底层结构。
              每个定理都讲述一个故事，每个证明都揭示一个真理，
              每个洞察都为探索开辟新的道路。"
            </p>
          </div>
          
          <p className="text-gray-700 leading-relaxed">
            我的理解：
          </p>
          
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>严谨的数学阐述与清晰的直觉相结合</li>
            <li>看似不相关的数学领域之间的联系</li>
            <li>历史背景和数学思想的关系</li>
            <li>纯数学在现实问题中的应用</li>
            <li>数学结构中的美与优雅</li>
          </ul>
        </div>
      </div>

      {/* Current Projects */}
      <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 academic-sans">当前项目</h2>
        <div className="space-y-6">
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              计数组合学学习笔记
            </h3>
            <p className="text-gray-700 academic-serif">
              暂无1
            </p>
          </div>
          
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              暂无2
            </h3>
            <p className="text-gray-700 academic-serif">
              暂无3
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              暂无4
            </h3>
            <p className="text-gray-700 academic-serif">
              暂无5
            </p>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="bg-white border border-gray-200 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 academic-sans">联系方式</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-3 text-gray-700">
            <Mail className="h-5 w-5 text-gray-400" />
            <a 
              href={`mailto:${authorInfo.email}`}
              className="hover:text-gray-900 transition-colors"
            >
              {authorInfo.email}
            </a>
          </div>
          
          {authorInfo.orcid && (
            <div className="flex items-center space-x-3 text-gray-700">
              <ExternalLink className="h-5 w-5 text-gray-400" />
              <a 
                href={`https://orcid.org/${authorInfo.orcid}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-900 transition-colors"
              >
                ORCID: 无
              </a>
            </div>
          )}
          
          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 academic-serif">
              博客为作者个人记录使用，若对博客文章的任何疑问，欢迎联系进行数学讨论。
          
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};