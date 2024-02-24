import { extractAllBlocksFromMarkdown } from './extractAllBlocksFromMarkdown';

/**
 * Extracts exactly ONE code block from markdown.
 *
 * Note: This function is similar to extractAllBlocksFromMarkdown but it validates that there is exactly one code block.
 * Note: If there are multiple or no code blocks the function throws an error
 *
 * @param markdown any valid markdown
 * @returns code block with language and content
 */
export function extractOneBlockFromMarkdown(markdown: string): string | null {
    const codeBlocks = extractAllBlocksFromMarkdown(markdown);


    if (codeBlocks.length !== 1) {
        return null;
    }

    return codeBlocks[0]!.content;
}