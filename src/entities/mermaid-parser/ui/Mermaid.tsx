import React, { memo } from "react";
import mermaid from "mermaid";

mermaid.initialize({
    startOnLoad: true,
    theme: 'default',
    securityLevel: 'loose',
    fontFamily: 'monospace',
});

type MermaidProps = {
    chart: string;
};

const Mermaid = memo((props: MermaidProps) => {
    React.useEffect(() => {
        mermaid.contentLoaded();
    }, []);

    return <div className="mermaid">{props.chart}</div>;
});

Mermaid.displayName = "Mermaid";

export { Mermaid };