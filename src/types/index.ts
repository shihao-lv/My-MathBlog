export interface Article {
  id: string; // 文章ID
  title: string; // 文章标题
  abstract: string; // 文章摘要
  content: string; // 文章内容
  author: string; // 作者
  date: string; // 发布日期
  field: MathField; // 数学领域
  contentType: ContentType; // 文章类型
  difficulty: DifficultyLevel; // 难度级别
  tags: string[]; // 标签
  readTime: number; // 阅读时间
  latex?: boolean; // 是否包含LaTeX
}

// 数学领域类型
export type MathField = 
  | 'algebra'
  | 'analysis'
  | 'geometry'
  | 'topology'
  | 'number-theory'
  | 'probability'
  | 'logic'
  | 'applied-math';

// 文章类型类型
export type ContentType = 
  | 'theorem-proof'
  | 'problem-solution'
  | 'study-notes'
  | 'literature-review'
  | 'research-paper'
  | 'tutorial';

// 难度级别类型
export type DifficultyLevel = 'basic' | 'advanced' | 'research';

// 过滤状态接口
export interface FilterState {
  searchTerm: string; // 搜索关键字
  selectedField: MathField | 'all'; // 选中的数学领域
  selectedContentType: ContentType | 'all'; // 选中的文章类型
  selectedDifficulty: DifficultyLevel | 'all'; // 选中的难度级别
  selectedTags: string[]; // 选中的标签
}

// 作者信息接口
export interface AuthorInfo {
  name: string; // 姓名
  title: string; // 职称
  affiliation: string; // 单位
  researchAreas: string[]; // 研究领域
  bio: string; // 个人简介
  email: string; // 邮箱
  orcid?: string; // ORCID
}

// 评论接口
export interface Comment {
  id: string; // 评论ID
  articleId: string; // 文章ID
  author: string; // 评论者
  email: string;
  content: string; // 评论内容
  date: string; // 评论日期
  replies?: Comment[]; // 回复
}

// 树节点接口
export interface TreeNode {
  id: string;
  name: string;
  type: 'folder' | 'file';
  children?: TreeNode[];
  article?: Article;
  expanded?: boolean;
}