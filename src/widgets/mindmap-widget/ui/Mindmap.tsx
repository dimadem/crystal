"use client";

import React from 'react';
import { Mermaid } from '@/entities/mermaid-parser';
// import { useChat } from '@/widgets/chat-widget';

const Mindmap = () => {
    // const { messages, input, handleInputChange, handleSubmit } = useChat({
    // api: '/api/chat'
    // })
    return (
        <div className='flex scale-150 bg-red-200 items-center justify-center'>
            <Mermaid chart={`graph LR;
                            A[test]-->B;
                            A-->C;
                            B-->C;
                            B-->D[plop lanflz eknlzeknfz];
                            `} />
        </div>
    );
};

export { Mindmap };