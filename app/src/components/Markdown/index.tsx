import React from 'react'
import ReactMarkdown from 'react-markdown/with-html'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { darcula } from 'react-syntax-highlighter/dist/cjs/styles/hljs'

interface CodeBlockProps {
  language: string
  value: string | React.ReactNode
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, value }) => (
  <SyntaxHighlighter language={language} style={darcula}>
    {value}
  </SyntaxHighlighter>
)

interface MarkdownProps {
  markdownSrc?: string
  withStyle?: boolean
}

const Markdown: React.FC<MarkdownProps> = ({ markdownSrc, withStyle = true }) => {
  if (withStyle) {
    return (
      <div className="rc-md-editor">
        <div className="custom-html-style">
          <ReactMarkdown source={markdownSrc} renderers={{ code: CodeBlock }} />
        </div>
      </div>
    )
  }
  return <ReactMarkdown source={markdownSrc} renderers={{ code: CodeBlock }} />
}
export default Markdown
