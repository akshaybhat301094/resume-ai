'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Message } from '@/types/chat'

type Props = {
    message: Message
    isLoading?: boolean
    isLast?: boolean
}

export default function ChatMessage({ message, isLoading, isLast }: Props) {
    const { role, content } = message

    return (
        <div className={`flex flex-col ${role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className="flex items-center gap-2 mb-2">
                <span className="mono-label text-[8px] bg-black text-white px-1">
                    {role.toUpperCase()}
                </span>
            </div>
            <div
                className={`max-w-[95%] sm:max-w-[85%] brutalist-border px-6 py-4 text-sm leading-relaxed brutalist-shadow
                    ${role === 'user'
                        ? 'bg-black text-white whitespace-pre-wrap'
                        : 'bg-white text-black'
                    }`}
            >
                {role === 'assistant' ? (
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            h1: ({ children }) => <h1 className="font-display font-bold text-xl uppercase mb-4 border-b-2 border-black pb-1 flex items-center gap-2"><span className="text-xs">■</span> {children}</h1>,
                            h2: ({ children }) => <h2 className="font-display font-bold text-lg uppercase mb-3 flex items-center gap-2"><span className="text-[10px]">■</span> {children}</h2>,
                            h3: ({ children }) => <h3 className="font-mono font-bold text-sm uppercase mb-2 flex items-center gap-2 underline">{children}</h3>,
                            p: ({ children }) => <p className="mb-4 last:mb-0 leading-relaxed">{children}</p>,
                            ul: ({ children }) => <ul className="brutalist-ul">{children}</ul>,
                            ol: ({ children }) => <ol className="list-decimal ml-6 space-y-2 mb-4 font-mono text-xs">{children}</ol>,
                            li: ({ children }) => <li className="brutalist-li">{children}</li>,
                            code: ({ children }) => <code className="bg-gray-100 px-1.5 py-0.5 brutalist-border-sm font-mono text-xs">{children}</code>,
                            pre: ({ children }) => <pre className="bg-[#F9F9F9] brutalist-border p-4 my-4 font-mono text-xs overflow-x-auto brutalist-shadow-sm">{children}</pre>,
                            a: ({ children, href }) => <a href={href} target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] font-bold hover:underline">{children}</a>,
                            hr: () => <hr className="border-t-2 border-black my-6" />,
                            table: ({ children }) => <div className="overflow-x-auto my-6"><table className="w-full brutalist-border text-xs">{children}</table></div>,
                            th: ({ children }) => <th className="bg-black text-white font-mono uppercase p-2 border-r border-white last:border-0">{children}</th>,
                            td: ({ children }) => <td className="p-2 border-t border-r border-black last:border-r-0 font-mono italic">{children}</td>,
                        }}
                    >
                        {content}
                    </ReactMarkdown>
                ) : (
                    content
                )}
                
                {isLoading && isLast && role === 'assistant' && (
                    <span className="inline-block w-2 h-4 bg-gray-400 ml-1 animate-pulse" />
                )}
            </div>
        </div>
    )
}
