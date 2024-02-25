import { useState, useEffect } from 'react';
import { capitalize } from 'n12';

const useExtractCodeBlocksFromMarkdown = (markdown: string) => {
    const [codeBlocks, setCodeBlocks] = useState<{ language: string | null; content: string }[]>([]);

    useEffect(() => {
        const extractCodeBlocks = ({ markdown }: { markdown: string }) => {
            const lines = markdown.split('\n');
            const extractedBlocks = [];
            let currentCodeBlock = null;

            for (const line of lines) {
                if (line.startsWith('```')) {
                    const language = line.slice(3).trim() || null;

                    if (currentCodeBlock === null) {
                        currentCodeBlock = { language, content: '' };
                    } else {
                        if (language !== null) {
                            throw new Error(
                                `${capitalize(
                                    currentCodeBlock.language || 'the'
                                )} code block was not closed and already opening new ${language} code block`
                            );
                        }
                        extractedBlocks.push(currentCodeBlock);
                        currentCodeBlock = null;
                    }
                } else if (currentCodeBlock !== null) {
                    if (currentCodeBlock.content !== '') {
                        currentCodeBlock.content += '\n';
                    }

                    currentCodeBlock.content += line.split('\\`\\`\\`').join('```');
                }
            }

            if (currentCodeBlock !== null) {
                throw new Error(
                    `${capitalize(
                        currentCodeBlock.language || 'the'
                    )} code block was not closed at the end of the markdown`
                );
            }

            return extractedBlocks;
        };

        try {
            const extractedBlocks = extractCodeBlocks({ markdown });
            setCodeBlocks(extractedBlocks);
        } catch (error: any) {
            console.error('Error extracting code blocks:', (error as Error).message);
        }
    }, [markdown]);

    return codeBlocks;
};

export default useExtractCodeBlocksFromMarkdown;
