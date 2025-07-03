import { Article } from '../types';

// 导出一个名为sampleArticles的常量，它是一个Article类型的数组
export const sampleArticles: Article[] = [
  //计数组合学1.1笔记
     {
    id: '1-1',
    title: '计数组合学1.1',
    content: `# 计数组合学（第一卷）第一章 §1.1 
以此开始《计数组合学》学习，计划每日一小节，以知识点总结为主，力求精简，方便个人回顾。
                        --by 2025.06.30 shihao-lv
## 核心问题
计数组合学的核心问题是计算有限集合的元素个数。给定无限集族 \(\{S_i\}_{i\in I}\)，目标是统一计数每个有限集 \(S_i\) 的元素数 \(f(i)\)。

## 计数函数的四种表示方法

### 1. 显式闭公式
**特点**：最理想形式，仅含基本函数且无求和符号  
**例子**：
- 幂集计数：\( f(n)=2^n \)（\([n]\)的子集数）
- 错位排列：\( f(n)=n!\sum_{i=1}^n \frac{(-1)^i}{i!} \)
- 0-1矩阵：每行每列恰三个1的\(n×n\)矩阵数公式复杂但可计算

### 2. 递推关系
**特点**：用已知\(f(j)\)表示\(f(i)\)  
**例子**：
- 非连续子集数：\( f(n)=f(n-1)+f(n-2) \)
- 显式解：\( f(n)=\frac{1}{\sqrt{5}}(\tau^{n+2}-\bar{\tau}^{n+2}) \)，其中\(\tau=\frac{1+\sqrt{5}}{2}\)

### 3. 渐近估计
**表示方法**：\( f(n)\sim g(n) \) ；当 \( \lim_{n\to\infty}\frac{f(n)}{g(n)}=1 \)  
**应用**：复杂显式公式的近似计算

### 4. 生成函数
**类型**：
| 类型 | 表达式 | 适用场景 |
|------|--------|----------|
| 一般生成函数 | \( \sum_{n\geq0}f(n)x^n \) | 普通计数问题 |
| 指数生成函数 | \( \sum_{n\geq0}f(n)\frac{x^n}{n!} \) | 排列相关问题 |
| 多变量生成函数 | \( \sum_{l,m,n}f(l,m,n)x^ly^m\frac{z^n}{n!} \) | 多维计数问题 |

## 生成函数运算

### 基本运算规则
1. **加法**：\( \sum_{n\geq0} a_nx^n + \sum_{n\geq0} b_nx^n = \sum_{n\geq0}(a_n+b_n)x^n \)
2. **乘法**：
   - 一般型：\( (\sum_{n\geq0} a_nx^n)(\sum_{n\geq0} b_nx^n) = \sum_{n\geq0}(\sum_{i=0}^n a_ib_{n-i})x^n \)
   - 指数型：\( (\sum_{n\geq0} a_n\frac{x^n}{n!})(\sum_{n\geq0} b_n\frac{x^n}{n!}) = \sum_{n\geq0}(\sum_{i=0}^n\binom{n}{i}a_ib_{n-i})\frac{x^n}{n!} \) (此处需注意系数的计算，组合数的出现是因为\(\frac{x^n}{n!}\))

### 复杂运算
1. **复合运算**：若\( G(0)=0 \)，则\( F(G(x))=\sum_{n\geq0}  a_nG(x)^n \)良定义
2. **微分运算**：\( F'(x)=\sum(n+1)a_{n+1}x^n \) 满足：
   - 线性性
   - 乘积法则：\( (FG)'=F'G+FG' \)
   - 链式法则：\( F(G(x))'=G'(x)F'(G(x)) \)

## 重点例子

### 例1：斐波那契生成函数
**递推关系**：\( a_n=a_{n-1}+a_{n-2} \)  
**推导过程**：
\[
\begin{aligned}
F(x) &= 1 + x + \sum_{n\geq2}(a_{n-1}+a_{n-2})x^n \\
&= 1 + x + x(F(x)-1) + x^2F(x) \\
\Rightarrow F(x) &= \frac{1}{1-x-x^2}
\end{aligned}
\]

### 例2：指数生成函数
**递推关系**：\( a_n=a_{n-1}+(n-1)a_{n-2} \)  
**求解步骤**：
1. 设\( F(x)=\sum a_n\frac{x^n}{n!} \)
2. 通过微分得：\( F'(x)=(1+x)F(x) \)
3. 解得：\( F(x)=\exp\left(x+\frac{x^2}{2}\right) \)

### 例3：Möbius函数
**构造**：\( F(x)=\prod_{n\geq1}(1-x^n)^{-\mu(n)/n} \)  
**关键推导**：（取自然对数）
\[
\log F(x) = x \Rightarrow F(x)=e^x
\]

## 证明方法

### 组合证明
**核心思想**：构造显式双射  （不好找组合对象，双射也难以想到）
**典型案例**：
1. 子集序列计数：\( |\{(X_1,...,X_k):\cap X_i=\emptyset\}|=(2^k-1)^n \)
   **注意**：子集序列与k真子集划分一一对应
2. Vandermonde恒等式：
\[
\sum_{i=0}^n \binom{a}{i}\binom{b}{n-i}=\binom{a+b}{n}
\]

### 非组合证明
**常用方法**：
- 利用生成函数进行代数运算（技巧性强）
- 递推关系求解
- 渐近方法

**组合证明提供直观洞察，非组合方法提供技术工具**
`
,

    abstract: '计数组合学1.1笔记',
    author: '吕世豪',
    date: '2025-06-30',
    field: 'algebra',
    contentType: 'study-notes',
    difficulty: 'advanced',
    tags: ['algebra', 'Combinatorial',],
    readTime: 10,
  },
    {
    id: '0',
    title: '对称函数发展历史',
    content: `# 对称函数理论与Macdonald多项式发展全览

## 一、对称函数理论的起源与发展

### 1. 古典时期（18-19世纪）
**发展脉络**：
- 1750年代：Vandermonde在研究方程根的关系时首次系统使用对称多项式
- 1770-1780年代：Lagrange和Waring将对称函数应用于代数方程理论
- 1815年：Cauchy发表里程碑论文《论对称函数》，首次建立完整理论框架

**关键贡献**：
- 基本对称函数与方程根的关系
- 牛顿恒等式的发现
- 对称函数作为不变量理论的基础

**经典文献**：
- Cauchy, A.-L. (1815). *Mémoire sur les fonctions qui ne peuvent obtenir que deux valeurs égales*
- Waring, E. (1782). *Meditationes Algebraicae*

### 2. 现代理论形成（20世纪初期）
**突破性进展**：
- 1901年：Schur在其博士论文中将对称函数与群表示论联系
- 1920-1930年代：Littlewood发展对称函数的组合方法
- 1934年：Littlewood-Richardson规则的确立

**核心工具**：
- Young图表的引入
- 特征标理论的对应
- 对称群表示的组合描述

**奠基性著作**：
- Littlewood, D. E. (1950). *The Theory of Group Characters*
- Schur, I. (1901). *Über eine Klasse von Matrizen*

## 二、Macdonald多项式理论体系

### 1. 理论背景（1950-1980）
**前驱工作**：
- 1950年代：Hall和Littlewood研究素数幂参数对称函数
- 1970年代：Jack引入单参数变形对称函数
- 1980年代初：Stanley等发展对称函数的组合应用

**关键突破点**：
- 传统对称函数的局限性
- 量子群理论带来的新视角
- 组合数学对多参数理论的需求

### 2. Macdonald的革新（1988-1995）
**理论构建**：
- 1988年：Macdonald首次提出两参数族
- 1995年：完整理论体系在第二版专著中呈现

**核心创新**：
- 双参数正交性
- 差分算子实现
- 特殊参数退化的一致性

**里程碑文献**：
- Macdonald, I. G. (1988). *A new class of symmetric functions*
- Macdonald, I. G. (1995). *Symmetric Functions and Hall Polynomials* (2nd ed.)

### 3. 理论完善（1995-2010）
**重要进展**：
- 1999年：Garsia-Haiman提出几何解释
- 2005年：Haglund等获得显式组合公式
- 2008年：Bergeron建立代数组合框架

**突破性成果**：
- n!猜想解决
- 组合公式的发现
- 与交换代数的新联系

**关键论文**：
- Haiman, M. (2001). *Hilbert schemes and Macdonald polynomials*
- Haglund, J. (2005). *A combinatorial model for the Macdonald polynomials*

## 三、理论分支与联系

### 1. 表示论方向
**发展历程**：
- 1990年代：Cherednik引入双仿射Hecke代数
- 2000年代：Sahi等研究量子群联系
- 2010年代：Bezrukavnikov等发展几何表示论

**主要成果**：
- 仿射李代数的实现
- 量子Schur-Weyl对偶
- 范畴化理论

**重要文献**：
- Cherednik, I. (1993). *Double affine Hecke algebras*
- Rouquier, R. (2008). *Categorification of the braid groups*

### 2. 组合数学方向
**研究进展**：
- 1990年代：表格求和公式
- 2000年代：parking function应用
- 2010年代：Carlsson-Mellit证明Shuffle猜想

**核心工具**：
- 填充统计量
- 反演数几何
- 路径组合

**经典工作**：
- Garsia, A. (1999). *The Bergeron-Garsia nabla operator*
- Haglund, J. (2008). *The q,t-Catalan numbers*

### 3. 数学物理应用
**交叉领域**：
- 量子可积系统
- 规范场论
- 统计力学模型

**重要发现**：
- AGT对应中的出现
- 拓扑弦理论应用
- 随机过程联系

**关键文献**：
- Nekrasov, N. (2003). *Seiberg-Witten theory*
- Okounkov, A. (2016). *Macdonald processes*

## 四、当代研究前沿

### 1. 活跃方向（2020-）
**热点领域**：
- 高维推广
- 模表示理论
- 机器学习应用

**最新突破**：
- 2021年：Macdonald多项式在神经网络中的对称性应用
- 2022年：椭圆推广的进展
- 2023年：量子计算中的新应用

**前沿论文**：
- Mellit, A. (2020). *Toric symmetry*
- Gorsky, E. (2022). *Elliptic Macdonald polynomials*

### 2. 开放问题
**经典难题**：
1. 组合正性猜想的完整证明
2. 高秩情形的显式构造
3. 物理意义的完全阐释

**工具需求**：
- 新的范畴化方法
- 几何表示的显式实现
- 计算机代数的高效算法

## 五、学习路径建议

### 1. 入门路线
1. Stanley《Enumerative Combinatorics》Vol.2
2. Sagan《The Symmetric Group》
3. Macdonald《Symmetric Functions》第1-3章

### 2. 进阶研究
1. 重点研读Macdonald第二版第6章
2. 掌握Garsia-Haiman的几何方法
3. 跟踪最新J. Combin. Theory Ser. A论文

### 3. 工具掌握
- SageMath的对称函数包
- 李代数软件LiE
- 组合计算工具ACE

> "Macdonald多项式理论就像一座正在建设中的大教堂，每个十年都增添新的侧厅和尖塔。" - Andrei Okounkov

    
    `,

    abstract: '简要阐述了对称函数理论的发展和形成',
    author: '吕世豪',
    date: '2025-06-27',
    field: 'algebra',
    contentType: 'tutorial',
    difficulty: 'advanced',
    tags: ['algebra', 'symmetric-functions', 'macdonald-polynomials', 'history'],
    readTime: 10,
  },
  //第一篇'代数学基本定理的拓扑证明'
  {
    // 文章ID
    id: '1',
    // 文章标题
    title: 'The Fundamental Theorem of Algebra: A Topological Proof',
    // 文章摘要
    abstract: 'We present a complete topological proof of the Fundamental Theorem of Algebra, demonstrating that every non-constant polynomial with complex coefficients has at least one complex root.',
    // 文章内容
    content: `# The Fundamental Theorem of Algebra: A Topological Proof

## Introduction

The Fundamental Theorem of Algebra states that every non-constant polynomial $p(z) = a_n z^n + a_{n-1} z^{n-1} + \\cdots + a_1 z + a_0$ with complex coefficients has at least one complex root.

## Theorem Statement

**Theorem (Fundamental Theorem of Algebra):** Let $p(z) = \\sum_{k=0}^{n} a_k z^k$ where $a_k \\in \\mathbb{C}$, $a_n \\neq 0$, and $n \\geq 1$. Then there exists $z_0 \\in \\mathbb{C}$ such that $p(z_0) = 0$.

## Proof Outline

We proceed by contradiction. Assume $p(z) \\neq 0$ for all $z \\in \\mathbb{C}$.

Consider the function $f: \\mathbb{C} \\to \\mathbb{C}^*$ defined by $f(z) = \\frac{p(z)}{|p(z)|}$.

### Step 1: Behavior at Infinity

For large $|z|$, we have:
$$p(z) = a_n z^n \\left(1 + \\frac{a_{n-1}}{a_n z} + \\cdots + \\frac{a_0}{a_n z^n}\\right)$$

As $|z| \\to \\infty$, the term in parentheses approaches 1, so $p(z) \\sim a_n z^n$.

### Step 2: Topological Argument

The map $z \\mapsto z^n$ on the circle $|z| = R$ (for large $R$) has degree $n$. Since $p(z)$ is homotopic to $a_n z^n$ on large circles, the induced map on $S^1$ also has degree $n$.

However, if $p(z)$ never vanishes, then $f$ extends to a continuous map from $\\mathbb{C}$ to $S^1$. This would make the map $z \\mapsto \\frac{p(z)}{|p(z)|}$ on $|z| = R$ null-homotopic, contradicting the fact that it has degree $n > 0$.

Therefore, $p(z)$ must vanish somewhere. $\\square$

## Applications

This theorem is fundamental to:
- Complex analysis
- Algebraic geometry  
- Galois theory
- Algebraic topology`,
    // 作者
    author: '吕世豪',
    // 日期
    date: '2025-06-27',
    // 领域
    field: 'algebra',
    // 内容类型
    contentType: 'theorem-proof',
    // 难度
    difficulty: 'advanced',
    // 标签
    tags: ['complex-analysis', 'topology', 'polynomials', 'fundamental-theorem'],
    // 阅读时间
    readTime: 12,
    // 是否包含LaTeX
    latex: true
  },
  // 第二篇'测度论'介绍
  {
    id: '2',
    title: 'Introduction to Measure Theory',
    abstract: 'A comprehensive introduction to measure theory, covering σ-algebras, measures, and the construction of the Lebesgue measure.',
    content: `# Introduction to Measure Theory

## Motivation

Measure theory provides the foundation for modern probability theory and analysis. It allows us to rigorously define concepts like "length," "area," and "probability."

## Algebras

**Definition:** A collection $\\mathcal{F}$ of subsets of a set $\\Omega$ is called a σ-algebra if:
1. $\\emptyset \\in \\mathcal{F}$
2. If $A \\in \\mathcal{F}$, then $A^c \\in \\mathcal{F}$
3. If $A_1, A_2, \\ldots \\in \\mathcal{F}$, then $\\bigcup_{i=1}^{\\infty} A_i \\in \\mathcal{F}$

## Measures

**Definition:** A measure $\\mu$ on $(\\Omega, \\mathcal{F})$ is a function $\\mu: \\mathcal{F} \\to [0, \\infty]$ such that:
1. $\\mu(\\emptyset) = 0$
2. For disjoint sets $A_1, A_2, \\ldots \\in \\mathcal{F}$:
   $$\\mu\\left(\\bigcup_{i=1}^{\\infty} A_i\\right) = \\sum_{i=1}^{\\infty} \\mu(A_i)$$

## The Lebesgue Measure

The Lebesgue measure on $\\mathbb{R}$ extends the notion of length to more general sets. It is constructed using:

1. **Outer measure:** $\\mu^*(E) = \\inf \\left\\{\\sum_{i=1}^{\\infty} |I_i| : E \\subset \\bigcup_{i=1}^{\\infty} I_i\\right\\}$

2. **Measurable sets:** Sets $E$ such that for all $A \\subset \\mathbb{R}$:
   $$\\mu^*(A) = \\mu^*(A \\cap E) + \\mu^*(A \\cap E^c)$$

## Applications

Measure theory is essential for:
- Integration theory (Lebesgue integral)
- Probability theory
- Functional analysis
- Harmonic analysis`,
    author: 'lvshihao',
    date: '2024-01-10',
    field: 'analysis',
    contentType: 'tutorial',
    difficulty: 'advanced',
    tags: ['measure-theory', 'lebesgue', 'integration', 'analysis'],
    readTime: 15,
    latex: true
  },
  // 第三篇'线性代数：特征值与特征向量'介绍
  {
    id: '3',
    title: 'Linear Algebra: Eigenvalues and Eigenvectors',
    abstract: 'Understanding eigenvalues and eigenvectors through geometric intuition and algebraic computation.',
    content: `# Linear Algebra: Eigenvalues and Eigenvectors

## Introduction

Eigenvalues and eigenvectors are fundamental concepts in linear algebra with applications in physics, engineering, and data science.

## Definitions

**Definition:** Let $A$ be an $n \\times n$ matrix. A non-zero vector $v \\in \\mathbb{R}^n$ is called an **eigenvector** of $A$ if there exists a scalar $\\lambda$ such that:
$$Av = \\lambda v$$

The scalar $\\lambda$ is called the **eigenvalue** corresponding to the eigenvector $v$.

## Characteristic Polynomial

To find eigenvalues, we solve the characteristic equation:
$$\\det(A - \\lambda I) = 0$$

The polynomial $p(\\lambda) = \\det(A - \\lambda I)$ is called the characteristic polynomial.

## Example

Consider the matrix $A = \\begin{pmatrix} 3 & 1 \\\\ 0 & 2 \\end{pmatrix}$.

The characteristic polynomial is:
$$p(\\lambda) = \\det\\begin{pmatrix} 3-\\lambda & 1 \\\\ 0 & 2-\\lambda \\end{pmatrix} = (3-\\lambda)(2-\\lambda)$$

So the eigenvalues are $\\lambda_1 = 3$ and $\\lambda_2 = 2$.

For $\\lambda_1 = 3$:
$$(A - 3I)v = \\begin{pmatrix} 0 & 1 \\\\ 0 & -1 \\end{pmatrix}v = 0$$

This gives us the eigenvector $v_1 = \\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix}$.

## Geometric Interpretation

- Eigenvectors are directions that remain unchanged under the linear transformation
- Eigenvalues represent the scaling factor in those directions
- In 2D, eigenvectors show the principal axes of transformation

## Applications

- Principal Component Analysis (PCA)
- Quantum mechanics (observables)
- Stability analysis of differential equations
- Google's PageRank algorithm`,
    author: 'lsh',
    date: '2024-01-08',
    field: 'algebra',
    contentType: 'study-notes',
    difficulty: 'basic',
    tags: ['linear-algebra', 'eigenvalues', 'matrices', 'vectors'],
    readTime: 8,
    latex: true
  },
  // 第四篇'黎曼猜想：当前状态'介绍
  {
    id: '4',
    title: 'The Riemann Hypothesis: Current Status',
    abstract: 'A review of recent developments and approaches to the Riemann Hypothesis, one of the most important unsolved problems in mathematics.',
    content: `# The Riemann Hypothesis: Current Status

## The Riemann Zeta Function

The Riemann zeta function is defined for $\\Re(s) > 1$ by:
$$\\zeta(s) = \\sum_{n=1}^{\\infty} \\frac{1}{n^s}$$

It can be analytically continued to the entire complex plane except for a simple pole at $s = 1$.

## The Hypothesis

**Riemann Hypothesis:** All non-trivial zeros of the Riemann zeta function have real part equal to $\\frac{1}{2}$.

Equivalently, all non-trivial zeros lie on the critical line $\\Re(s) = \\frac{1}{2}$.

## Known Results

1. **Zero-free regions:** There are no zeros in regions of the form $\\Re(s) \\geq 1 - \\frac{c}{\\log|\\Im(s)|}$

2. **Numerical verification:** The first $10^{13}$ non-trivial zeros lie on the critical line

3. **Density results:** At least 40% of all zeros lie on the critical line

## Equivalent Formulations

The Riemann Hypothesis is equivalent to:

1. **Prime Number Theorem:** $\\pi(x) = \\text{li}(x) + O(\\sqrt{x} \\log x)$

2. **Möbius function:** $\\sum_{n \\leq x} \\mu(n) = O(x^{1/2+\\epsilon})$

3. **Divisor function:** $\\sum_{n \\leq x} d(n) = x \\log x + (2\\gamma - 1)x + O(x^{1/2+\\epsilon})$

## Recent Approaches

### Computational Methods
- Verification of billions of zeros
- Improved algorithms for zero-counting

### Analytic Methods
- Study of the critical line
- Moment calculations
- Random matrix theory connections

### Algebraic Approaches
- Connections to L-functions
- Langlands program implications

## Implications

A proof of RH would:
- Provide precise error bounds for the Prime Number Theorem
- Resolve many open problems in analytic number theory
- Impact cryptography and computer science
- Advance our understanding of prime distribution

## Current Challenges

The main obstacles include:
- Lack of algebraic structure in the zero distribution
- Difficulty in proving lower bounds
- Technical complexity of analytic methods
- Need for new mathematical tools`,
    author: 'lvshihao',
    date: '2024-01-05',
    field: 'number-theory',
    contentType: 'literature-review',
    difficulty: 'research',
    tags: ['riemann-hypothesis', 'zeta-function', 'number-theory', 'unsolved-problems'],
    readTime: 20,
    latex: true
  },
  // 第五篇'微分几何：曲率和拓扑'介绍
  {
    id: '5',
    title: 'Differential Geometry: Curvature and Topology',
    abstract: 'Exploring the relationship between curvature and topological properties of manifolds.',
    content: `# Differential Geometry: Curvature and Topology

## Introduction

Differential geometry studies smooth manifolds and their geometric properties using calculus and linear algebra.

## Riemannian Manifolds

A Riemannian manifold $(M, g)$ is a smooth manifold $M$ equipped with a Riemannian metric $g$.

## Curvature Tensor

The Riemann curvature tensor is defined by:
$$R(X,Y)Z = \\nabla_X \\nabla_Y Z - \\nabla_Y \\nabla_X Z - \\nabla_{[X,Y]} Z$$

## Gauss-Bonnet Theorem

For a compact oriented surface $S$:
$$\\int_S K \\, dA = 2\\pi \\chi(S)$$

where $K$ is the Gaussian curvature and $\\chi(S)$ is the Euler characteristic.`,
    author: '吕世豪',
    date: '2024-01-12',
    field: 'geometry',
    contentType: 'study-notes',
    difficulty: 'advanced',
    tags: ['differential-geometry', 'curvature', 'manifolds', 'topology'],
    readTime: 18,
    latex: true
  },
  // 第六篇'概率论：中心极限定理'介绍
  {
    id: '6',
    title: 'Probability Theory: Central Limit Theorem',
    abstract: 'A detailed proof and applications of the Central Limit Theorem.',
    content: `# Probability Theory: Central Limit Theorem

## Statement

Let $X_1, X_2, \\ldots$ be independent random variables with $E[X_i] = \\mu$ and $\\text{Var}(X_i) = \\sigma^2$.

Then:
$$\\frac{\\bar{X}_n - \\mu}{\\sigma/\\sqrt{n}} \\xrightarrow{d} N(0,1)$$

## Proof Sketch

We use characteristic functions and show convergence to the standard normal.

## Applications

- Statistical inference
- Quality control
- Financial modeling`,
    author: '吕世豪',
    date: '2024-01-07',
    field: 'probability',
    contentType: 'theorem-proof',
    difficulty: 'advanced',
    tags: ['probability', 'central-limit-theorem', 'statistics'],
    readTime: 10,
    latex: true
  }
];

export const authorInfo = {
  name: '吕世豪',
  title: 'student',
  affiliation: '中南大学',
  researchAreas: [
    'Algebraic Combinatorics'
  ],
  bio: '作者为大三学生，对代数组合学领域感兴趣。',
  email: '1766602480@qq.com',
  orcid: ''
};
