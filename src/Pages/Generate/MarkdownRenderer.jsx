import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function MarkdownRenderer({ content }) {
    return (
        <div className="markdown-content">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    code({ className, children }) {
                        const match = /language-(\w+)/.exec(className || "");

                        if (match) {
                            return (
                                <CodeBlock
                                    language={match[1]}
                                    code={String(children).replace(/\n$/, "")}
                                />
                            );
                        }

                        return (
                            <code className="inline-code">
                                {children}
                            </code>
                        );
                    },

                    table({ children }) {
                        return (
                            <div className="table-responsive">
                                <table className="table table-dark table-striped table-bordered">
                                    {children}
                                </table>
                            </div>
                        );
                    }
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}

function CodeBlock({ language, code }) {
    const [copied, setCopied] = useState(false);

    const copyCode = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return (
        <div className="code-wrapper">
            <div className="code-header">
                <span>{language}</span>

                <button
                    className="btn btn-sm btn-outline-light"
                    onClick={copyCode}
                    type="button"
                >
                    {copied ? "Copied" : "Copy"}
                </button>
            </div>

            <SyntaxHighlighter
                language={language}
                style={oneDark}
                customStyle={{
                    margin: 0,
                    borderRadius: 0,
                    background: "#0d1117"
                }}
            >
                {code}
            </SyntaxHighlighter>
        </div>
    );
}