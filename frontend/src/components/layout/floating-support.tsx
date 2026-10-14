'use client'

import { useState, useEffect, useRef } from 'react'
import { MessageSquare, X, Send, Sparkle, Bot } from 'lucide-react'
import { contact } from '@/content'
import { streamAssistantChat } from '@/lib/api-client'

// Custom WhatsApp SVG Icon to look consistent and sharp
function WhatsAppIcon({ className = 'h-5 w-5' }: { className?: string }) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
    )
}

type Message = {
    id: string
    sender: 'user' | 'bot'
    text: string
    timestamp: Date
}

const QUICK_QUESTIONS = [
    'Tell me about Lalibela',
    'Omo Valley Cultural Tours',
    'Best time to visit Ethiopia?',
    'How do I book a private tour?',
]

export function FloatingSupport() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'welcome',
            sender: 'bot',
            text: 'Selam! I am the Extraordinary Ethiopia Tours assistant. How can I help you plan your journey through Ethiopia today? Discover Ethiopia. Experience the Extraordinary!',
            timestamp: new Date(),
        },
    ])
    const [input, setInput] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const [isStreaming, setIsStreaming] = useState(false)
    const chatEndRef = useRef<HTMLDivElement>(null)
    const sessionIdRef = useRef<string | null>(null)
    const activeBotMessageIdRef = useRef<string | null>(null)

    // Auto-scroll to bottom of messages
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages, isTyping])

    // Convert contact whatsapp format to wa.me link
    const formattedWhatsapp = contact.whatsapp.replace(/[^0-9]/g, '')
    const whatsappUrl = `https://wa.me/${formattedWhatsapp}`

    const appendBotMessage = (text: string) => {
        setMessages((prev) => [...prev, {
            id: crypto.randomUUID(),
            sender: 'bot',
            text,
            timestamp: new Date(),
        }])
    }

    const finishStream = () => {
        activeBotMessageIdRef.current = null
        setIsTyping(false)
        setIsStreaming(false)
    }

    const handleSendMessage = (text: string) => {
        if (!text.trim() || isStreaming) return

        const userMessage: Message = {
            id: crypto.randomUUID(),
            sender: 'user',
            text,
            timestamp: new Date(),
        }

        setMessages((prev) => [...prev, userMessage])
        setInput('')
        setIsTyping(true)
        setIsStreaming(true)

        if (!sessionIdRef.current) sessionIdRef.current = crypto.randomUUID()

        void streamAssistantChat(text, sessionIdRef.current, {
            onMeta: (sessionId) => {
                sessionIdRef.current = sessionId
            },
            onDelta: (delta) => {
                if (activeBotMessageIdRef.current === null) {
                    const id = crypto.randomUUID()
                    activeBotMessageIdRef.current = id
                    setIsTyping(false)
                    setMessages((prev) => [...prev, {
                        id,
                        sender: 'bot',
                        text: delta,
                        timestamp: new Date(),
                    }])
                } else {
                    setMessages((prev) => prev.map((message) =>
                        message.id === activeBotMessageIdRef.current
                            ? { ...message, text: message.text + delta }
                            : message
                    ))
                }
            },
            onDone: (done) => {
                if (done.handoff.type !== 'none') {
                    appendBotMessage(
                        'I have reached a limit for now. For a personal tailor-made proposal, please use our Enquiry Form (/contact) or chat with us on WhatsApp.'
                    )
                }
                finishStream()
            },
            onError: (message) => {
                appendBotMessage(message)
                appendBotMessage('For immediate personal help, reach out to us on WhatsApp.')
                finishStream()
            },
        })
    }

    return (
        <>
            {/* Stacked floating action buttons at bottom-right */}
            <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 items-end">
                {/* WhatsApp Float Button */}
                <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Contact us on WhatsApp"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 hover:bg-whatsapp-hover border border-white/10 group relative"
                >
                    <WhatsAppIcon className="h-6 w-6" />
                    <span className="absolute right-14 scale-0 rounded bg-charcoal border border-white/5 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-sand transition-all group-hover:scale-100 whitespace-nowrap shadow-md">
                        Chat on WhatsApp
                    </span>
                </a>

                {/* AI Assistant Chat Toggle Button */}
                <button
                    onClick={() => setIsOpen((prev) => !prev)}
                    aria-label="Open AI Assistant"
                    className={`flex h-14 w-14 items-center justify-center rounded-full shadow-2xl transition-all duration-500 hover:scale-105 active:scale-95 group relative border cursor-pointer ${isOpen
                        ? 'bg-accent border-accent text-accent-foreground hover:bg-sand'
                        : 'bg-accent text-accent-foreground border-accent hover:bg-sand shadow-[0_12px_32px_-12px_oklch(0.705_0.098_76/0.8)]'
                        }`}
                >
                    {isOpen ? (
                        <X className="h-5 w-5" />
                    ) : (
                        <>
                            {/* Pulsating ambient ring */}
                            <span className="absolute inset-0 rounded-full bg-accent/40 animate-ping -z-10 [animation-duration:2.4s]" />
                            <div className="relative flex items-center justify-center">
                                <MessageSquare className="h-6 w-6 text-accent-foreground group-hover:scale-105 transition-transform duration-300" />
                                <Sparkle className="h-3 w-3 text-accent-foreground absolute -top-1.5 -right-1.5 animate-pulse" />
                            </div>
                        </>
                    )}
                    <span className="absolute right-16 scale-0 rounded bg-charcoal border border-white/5 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-sand transition-all group-hover:scale-100 whitespace-nowrap shadow-md">
                        AI travel Assistant
                    </span>
                </button>
            </div>

            {/* Chat Window Panel - Premium Editor styling */}
            <div
                className={`fixed bottom-24 right-6 z-40 w-[350px] sm:w-[400px] h-[525px] bg-neutral-950/95 border border-white/10 shadow-2xl rounded-2xl flex flex-col overflow-hidden transition-all duration-500 origin-bottom-right text-white backdrop-blur-lg ${isOpen
                    ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
                    : 'opacity-0 translate-y-6 scale-90 pointer-events-none'
                    }`}
            >
                {/* Header */}
                <div className="bg-accent px-5 py-4 flex items-center justify-between text-accent-foreground">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-charcoal relative shadow-inner">
                            <Bot className="h-4.5 w-4.5 text-accent" />
                            <Sparkle className="h-2.5 w-2.5 text-white absolute -top-0.5 -right-0.5 animate-pulse" />
                            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-accent"></span>
                        </div>
                        <div>
                            <h3 className="font-serif text-base font-semibold tracking-wide flex items-center gap-1.5 text-accent-foreground">
                                Extraordinary Ethiopia AI Guide
                            </h3>
                            <p className="text-[9px] text-accent-foreground/70 tracking-widest uppercase font-mono">
                                Expert support · Online
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        aria-label="Close Chat"
                        className="text-accent-foreground/70 hover:text-accent-foreground transition-colors p-1 hover:bg-charcoal/10 rounded-full cursor-pointer"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                {/* Message Area */}
                <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-neutral-950/40 custom-scrollbar">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex gap-2.5 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                                }`}
                        >
                            {msg.sender === 'bot' && (
                                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neutral-900 border border-accent/25 shadow-[0_0_10px_rgba(180,130,50,0.08)]">
                                    <Bot className="h-3.5 w-3.5 text-accent" />
                                </div>
                            )}
                            <div
                                className={`rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-md ${msg.sender === 'user'
                                    ? 'bg-accent text-accent-foreground font-semibold rounded-tr-none'
                                    : 'bg-neutral-905 bg-neutral-900/90 text-sand/90 border border-white/5 rounded-tl-none font-sans'
                                    }`}
                            >
                                <p className="whitespace-pre-line">{msg.text}</p>
                            </div>
                        </div>
                    ))}

                    {/* Typing simulation */}
                    {isTyping && (
                        <div className="flex gap-2.5 max-w-[85%] mr-auto items-center">
                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neutral-900 border border-accent/25 shadow-[0_0_10px_rgba(180,130,50,0.08)]">
                                <Bot className="h-3.5 w-3.5 text-accent" />
                            </div>
                            <div className="bg-neutral-900/90 border border-white/5 rounded-2xl rounded-tl-none px-4 py-3.5 flex items-center gap-1 shadow-sm">
                                <span className="h-1.5 w-1.5 rounded-full bg-accent/60 animate-bounce duration-300"></span>
                                <span className="h-1.5 w-1.5 rounded-full bg-accent/60 animate-bounce [animation-delay:0.15s] duration-300"></span>
                                <span className="h-1.5 w-1.5 rounded-full bg-accent/60 animate-bounce [animation-delay:0.3s] duration-300"></span>
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>

                {/* Quick Suggestion Chips */}
                <div className="px-4 py-2 bg-neutral-950 border-t border-white/10 flex gap-2 overflow-x-auto scrollbar-none whitespace-nowrap">
                    {QUICK_QUESTIONS.map((q) => (
                        <button
                            key={q}
                            onClick={() => handleSendMessage(q)}
                            className="text-[10px] font-medium tracking-wide border border-white/10 hover:border-accent bg-neutral-900/60 hover:bg-accent/10 px-3 py-1.5 rounded-full text-sand/70 hover:text-white transition-all duration-200 cursor-pointer"
                        >
                            {q}
                        </button>
                    ))}
                </div>

                {/* Input area */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleSendMessage(input)
                    }}
                    className="border-t border-white/10 p-4 bg-neutral-950 flex items-center gap-2"
                >
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={isStreaming}
                        placeholder="Ask a question about Ethiopia..."
                        className="flex-1 bg-neutral-900/60 border border-white/10 focus:border-accent focus:ring-1 focus:ring-accent rounded-full px-4 py-2.5 text-xs text-white placeholder:text-sand/40 outline-none transition-all duration-200 disabled:opacity-50"
                    />
                    <button
                        type="submit"
                        disabled={isStreaming || !input.trim()}
                        aria-label="Send message"
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md cursor-pointer"
                    >
                        <Send className="h-4 w-4" />
                    </button>
                </form>
            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 5px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 99px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.2);
                }
            `}</style>
        </>
    )
}
