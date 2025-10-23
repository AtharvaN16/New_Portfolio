import type { MDXComponents } from 'mdx/types'
import Image, { type ImageProps } from 'next/image'

/**
 * MDX Components Configuration
 *
 * This file defines custom components that replace default HTML elements
 * in MDX files. This gives you styled, consistent components automatically.
 */

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Custom h1-h6 with consistent styling
    h1: ({ children }) => (
      <h1 className="mb-6 mt-8 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mb-4 mt-8 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-6 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
        {children}
      </h3>
    ),

    // Custom paragraph with proper spacing
    p: ({ children }) => (
      <p className="mb-4 text-base leading-relaxed text-text-primary">
        {children}
      </p>
    ),

    // Custom links with hover effects
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:text-primary-hover hover:decoration-primary"
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),

    // Custom lists
    ul: ({ children }) => (
      <ul className="mb-4 ml-6 list-disc space-y-2 text-text-primary">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="mb-4 ml-6 list-decimal space-y-2 text-text-primary">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="leading-relaxed">{children}</li>,

    // Custom blockquote
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-primary pl-6 italic text-text-secondary">
        {children}
      </blockquote>
    ),

    // Custom code blocks
    code: ({ children }) => (
      <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-sm text-accent">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="my-4 overflow-x-auto rounded-lg bg-surface p-4 font-mono text-sm">
        {children}
      </pre>
    ),

    // Custom images (optimized with Next.js Image)
    img: (props) => (
      <Image
        {...(props as ImageProps)}
        alt={props.alt || ''}
        width={1200}
        height={675}
        className="my-6 rounded-lg"
      />
    ),

    // Custom horizontal rule
    hr: () => <hr className="my-8 border-border" />,

    // Custom table
    table: ({ children }) => (
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse">{children}</table>
      </div>
    ),
    th: ({ children }) => (
      <th className="border border-border bg-surface px-4 py-2 text-left font-semibold">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border border-border px-4 py-2">{children}</td>
    ),

    // Allow custom components to be passed through
    ...components,
  }
}
