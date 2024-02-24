'use client';

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import { ChatRequestOptions } from 'ai';
import { type Message, useChat } from 'ai/react';
import { Button, ScrollArea, Input } from '@/shared/ui';
import { extractOneBlockFromMarkdown } from '@/shared/lib/extractOneBlockFromMarkdown';
import { Mermaid } from '@/entities/mermaid-parser';
import { TIMEOUT } from 'dns';

export default function Chat() {
    const [response, setResponse] = useState<Message>(null!);
    const { input, messages, handleInputChange, handleSubmit } = useChat({
        api: '/api/chat',
        onFinish: (response: Message) => {
            setResponse(response);
        }
    })
    // extractOneBlockFromMarkdown(response.content).content
    return (
        <>
            <ChatOutput messages={messages} response={response} />
            <ChatInput input={input} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
        </>
    )
}
export { Chat };

const ChatOutput = ({ messages, response }:
    { messages: Message[], response: Message }
) => {
    const [data, setData] = useState<string>();
    useEffect(() => {
        if (response && response.content) {
            setData(extractOneBlockFromMarkdown(response.content).content);
        }
    }, [response]);
    return (
        <ScrollArea className='min-h-full w-full'>
            <ul className=''>
                {messages.map((m, index) => (
                    <li key={index} className='w-full p-4 bg-gray-100'>
                        <p className='bg-black text-white pl-4'>
                            {m.role === 'user' ? 'User: ' : 'Crystal: '}
                        </p>
                        {m.role === 'user' ?
                            <div className='pl-4'>{m.content}</div>
                            :
                            <>
                                {data &&
                                    <Mermaid chart={data} />
                                }
                            </>
                        }
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