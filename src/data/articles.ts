import { Article } from '../types';

// 导出一个名为sampleArticles的常量，它是一个Article类型的数组
export const sampleArticles: Article[] = [
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