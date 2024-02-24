'use client';

import { ChangeEvent, FormEvent, } from 'react';

import { ChatRequestOptions } from 'ai';

import { type Message, useChat } from 'ai/react';

import { Button, ScrollArea, Input } from '@/shared/ui';
import { extractOneBlockFromMarkdown } from '@/shared/lib/extractOneBlockFromMarkdown';
import { Mermaid } from '@/entities/mermaid-parser';

export default function Chat() {
    const { messages, input, handleInputChange, handleSubmit } = useChat({
        api: '/api/chat'
    })

    console.log("all messages -> ", messages);
    return (
        <>
            <ChatOutput messages={messages} />
            <ChatInput input={input} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
        </>
    )
}
export { Chat };

const ChatOutput = ({ messages }: { messages: Message[] }) => {
    const processedMessages = messages.map((m) => {
        const codeBlockContent: string | null = extractOneBlockFromMarkdown(m.content)
        return { ...m, codeBlockContent };
    });

    return (
        <ScrollArea className='min-h-full w-full'>
            <ul className=''>
                {processedMessages.map((m, index) => (
                    <li key={index} className='w-full p-4 bg-gray-100'>
                        <p className='bg-black text-white pl-4'>
                            {m.role === 'user' ? 'User: ' : 'AI: '}
                        </p>
                        <p className='text-wrap px-2'>
                            {!m.codeBlockContent ?
                                m.content :
                                <Mermaid chart={m.codeBlockContent} />
                            }
                        </p>
                    </li>
                ))}
            </ul>
        </ScrollArea>
    )
};

const ChatInput = ({ input, handleInputChange, handleSubmit }: {
    input: string,
    handleInputChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    handleSubmit: (e: FormEvent<HTMLFormElement>, chatRequestOptions?: ChatRequestOptions | undefined) => void
}) => {
    return (
        <div className='flex justify-center bg-gray-100 w-full h-fit py-2'>
            <form onSubmit={handleSubmit} className='p-4 space-x-12 flex items-center'>
                <label>
                    <Input className="w-[400px]" value={input} onChange={handleInputChange} />
                </label>
                <Button type="submit">Send</Button>
            </form>
        </div>
    )
};