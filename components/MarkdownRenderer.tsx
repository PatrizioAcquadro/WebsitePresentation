import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Components } from 'react-markdown'

interface MarkdownRendererProps {
  content: string
}

const components: Components = {
  table: ({ children }) => (
    <div className="overflow-x-auto my-6 rounded-lg border border-slate-600">
      <table className="min-w-full divide-y divide-slate-600">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-slate-800">{children}</thead>
  ),
  th: ({ children }) => (
    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-200">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-3 text-sm text-slate-300 border-t border-slate-700">
      {children}
    </td>
  ),
  tr: ({ children }) => (
    <tr className="hover:bg-slate-800/50 transition-colors">{children}</tr>
  ),
  code: ({ className, children }) => {
    const isInline = !className
    if (isInline) {
      return (
        <code className="bg-slate-800 px-1.5 py-0.5 rounded text-emerald-400 text-sm font-mono">
          {children}
        </code>
      )
    }
    return (
      <pre className="bg-slate-800 p-4 rounded-lg overflow-x-auto my-4 border border-slate-700">
        <code className="text-sm text-slate-200 font-mono">{children}</code>
      </pre>
    )
  },
  h1: ({ children }) => (
    <h1 className="text-3xl font-bold mt-8 mb-4 text-slate-100">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-100 border-b border-slate-700 pb-2">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl font-semibold mt-6 mb-3 text-slate-200">{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-lg font-medium mt-4 mb-2 text-slate-300">{children}</h4>
  ),
  p: ({ children }) => (
    <p className="my-4 text-slate-300 leading-relaxed">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="my-4 ml-6 list-disc space-y-2 text-slate-300">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="my-4 ml-6 list-decimal space-y-2 text-slate-300">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="text-slate-300">{children}</li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-primary-500 pl-4 my-4 italic text-slate-400">
      {children}
    </blockquote>
  ),
  a: ({ href, children }) => (
    <a href={href} className="text-primary-400 hover:text-primary-300 underline transition-colors" target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ),
  strong: ({ children }) => (
    <strong className="font-bold text-slate-100">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic text-slate-200">{children}</em>
  ),
  hr: () => (
    <hr className="my-8 border-slate-700" />
  ),
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {content}
    </ReactMarkdown>
  )
}
