import React, { memo } from "react";
import mermaid from "mermaid";

mermaid.initialize({
    startOnLoad: false,
    theme: 'default',
    securityLevel: 'loose',
    fontFamily: 'monospace',

});

type MermaidProps = {
    chart: string;
};

const Mermaid = (props: MermaidProps) => {
    React.useEffect(() => {
        if (props.chart) mermaid.contentLoaded();
        mermaid.run();
    }, [props.chart]);

    return <div className="mermaid">{props.chart}</div>;
};

Mermaid.displayName = "Mermaid";

export { Mermaid };