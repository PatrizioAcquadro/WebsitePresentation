import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Components } from 'react-markdown'

interface MarkdownRendererProps {
  content: string
}

const components: Components = {
  table: ({ children }) => (
    <div className="overflow-x-auto my-6 rounded-lg border border-[#453027]">
      <table className="min-w-full divide-y divide-[#453027]">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-[#1d1a1d]">{children}</thead>
  ),
  th: ({ children }) => (
    <th className="px-4 py-3 text-left text-sm font-semibold text-white">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-3 text-sm text-[#BABABA] border-t border-[#453027]">
      {children}
    </td>
  ),
  tr: ({ children }) => (
    <tr className="hover:bg-[#453027]/30 transition-colors">{children}</tr>
  ),
  code: ({ className, children }) => {
    const isInline = !className
    if (isInline) {
      return (
        <code className="bg-[#1d1a1d] px-1.5 py-0.5 rounded text-[#FF6D29] text-sm font-mono">
          {children}
        </code>
      )
    }
    return (
      <pre className="bg-[#1d1a1d] p-4 rounded-lg overflow-x-auto my-4 border border-[#453027]">
        <code className="text-sm text-white font-mono">{children}</code>
      </pre>
    )
  },
  h1: ({ children }) => (
    <h1 className="text-3xl font-semibold mt-8 mb-4 text-white">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl font-semibold mt-8 mb-4 text-white border-b border-[#453027] pb-2">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl font-semibold mt-6 mb-3 text-white">{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-lg font-medium mt-4 mb-2 text-[#BABABA]">{children}</h4>
  ),
  p: ({ children }) => (
    <p className="my-4 text-[#BABABA] leading-relaxed">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="my-4 ml-6 list-disc space-y-2 text-[#BABABA]">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="my-4 ml-6 list-decimal space-y-2 text-[#BABABA]">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="text-[#BABABA]">{children}</li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-[#FF6D29] pl-4 my-4 italic text-[#BABABA]">
      {children}
    </blockquote>
  ),
  a: ({ href, children }) => (
    <a href={href} className="text-[#FF6D29] hover:text-[#ff8c4a] underline transition-colors" target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-white">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic text-white">{children}</em>
  ),
  hr: () => (
    <hr className="my-8 border-[#453027]" />
  ),
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {content}
    </ReactMarkdown>
  )
}
