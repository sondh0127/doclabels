import MarkdownIt from 'markdown-it'
import React, { useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false,
})
import { useControllableValue } from '@umijs/hooks'
import Markdown from '@/components/Markdown'

const PLUGINS = undefined
// const PLUGINS = ['header', 'image', 'full-screen'];

interface MarkdownEditorProps {
  value?: string
  onChange?: (value: string) => void
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = (props) => {
  const [state, setState] = useControllableValue(props)

  // const mdEditor = useRef<MdEditor | null>(null)
  const mdParser = useRef(MarkdownIt)

  useEffect(() => {
    // initial a parser

    // @ts-ignore
    mdParser.current = new MarkdownIt({
      html: true,
      linkify: true,
      typographer: true,
      highlight(str, lang) {
        /*
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(lang, str).value
          } catch (__) {}
        }
        return '' // use external default escaping
        */
      },
    })
  }, [])

  const handleEditorChange = (it: { text: string; html: string }, event: any) => {
    setState(it.text)
  }

  const handleImageUpload = (file: File): Promise<string> =>
    new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = (data) => {
        // @ts-ignore
        resolve(data.target.result)
      }
      reader.readAsDataURL(file)
    })

  const onCustomImageUpload = (event: any): Promise<any> => {
    console.log('onCustomImageUpload', event)
    return new Promise((resolve, reject) => {
      const result = window.prompt('Please enter image url here...') as string
      resolve({ url: result })
      // custom confirm message pseudo code
      // YourCustomDialog.open(() => {
      //   setTimeout(() => {
      //     // setTimeout 模拟oss异步上传图片
      //     // 当oss异步上传获取图片地址后，执行calback回调（参数为imageUrl字符串），即可将图片地址写入markdown
      //     const url = 'https://avatars0.githubusercontent.com/u/21263805?s=80&v=4'
      //     resolve({url: url, name: 'pic'})
      //   }, 1000)
      // })
    })
  }

  const renderHTML = (text: string) => (
    // return this.mdParser.render(text);
    // Using react-markdown
    <Markdown markdownSrc={text} withStyle={false} />
  )

  return (
    <div style={{ width: '100%', height: 500 }}>
      <MdEditor
        // ref={mdEditor}
        value={state}
        style={{ height: '500px', width: '100%' }}
        renderHTML={renderHTML}
        plugins={PLUGINS}
        config={{
          view: {
            menu: true,
            md: true,
            html: true,
            fullScreen: true,
            hideMenu: true,
          },
          table: {
            maxRow: 5,
            maxCol: 6,
          },
          imageUrl: 'https://octodex.github.com/images/minion.png',
          syncScrollMode: ['leftFollowRight', 'rightFollowLeft'],
        }}
        onChange={handleEditorChange}
        onImageUpload={handleImageUpload}
        // onCustomImageUpload={this.onCustomImageUpload}
      />
    </div>
  )
}

export default React.memo(MarkdownEditor)
