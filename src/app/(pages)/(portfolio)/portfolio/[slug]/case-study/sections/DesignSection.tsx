// import Image from "next/image";
import { diagramCSItems } from "@/lib/data/portfolioData";
import NextImageModal from "@/components/ui/customs/next-image-modal";

type DiagramItem = (typeof diagramCSItems)[number];

interface DesignSectionProps {
  diagram?: DiagramItem;
}

export default function DesignSection({ diagram }: DesignSectionProps) {
  if (!diagram) return <p className="text-muted">Belum ada diagram.</p>;

  return (
    <div className="d-flex flex-column gap-4">
      {diagram.context && (
        <div id="context-diagram">
          <h5>Context Diagram</h5>
          <NextImageModal
            src={diagram.context}
            alt="Context Diagram"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            className="img-fluid border rounded shadow-sm"
            zoom
          />
        </div>
      )}
      {diagram.dfd_0 && (
        <div id="dfd-0">
          <h5>DFD Level 0</h5>
          <NextImageModal
            src={diagram.dfd_0}
            alt="DFD Level 0"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            className="img-fluid border rounded shadow-sm"
            zoom
          />
        </div>
      )}
      {diagram.pdm && (
        <div id="pdm">
          <h5>Physical Diagram Model</h5>
          <NextImageModal
            src={diagram.pdm}
            alt="Framework"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            className="img-fluid border rounded shadow-sm"
            zoom
          />
        </div>
      )}
    </div>
  );
}
