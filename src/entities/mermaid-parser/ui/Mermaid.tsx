import React from "react";
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

class Mermaid extends React.Component<MermaidProps> {
    componentDidMount() {
        mermaid.contentLoaded();
    }
    render() {
        return <div className="mermaid">{this.props.chart}</div>;
    }
}

export { Mermaid };