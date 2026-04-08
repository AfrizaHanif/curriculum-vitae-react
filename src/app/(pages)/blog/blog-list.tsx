"use client";

import { formatDate } from "@/lib/utils";
import Card from "@/components/ui/bootstrap/card";
import PaginatedList from "@/components/ui/bootstrap/paginated-list";
import { BlogItem } from "@/types/customs/data-type";
import { resolveAssetUrl } from "@/lib/assets";

interface BlogListProps {
  items: BlogItem[];
}

export default function BlogList({ items }: BlogListProps) {
  return (
    <PaginatedList
      items={items}
      itemsPerPage={9}
      renderItem={(item) => (
        <Card
          key={item.id}
          header={formatDate(item.date)}
          image={resolveAssetUrl(item.image)}
          footer={`Oleh ${item.author}`}
          url={`/blog/${item.slug}`}
          buttonName="Lihat"
          insideGroup
          fullHeight
          clickable
        >
          <h5 className="card-title">{item.title}</h5>
          <p>{item.summary}</p>
        </Card>
      )}
    />
  );
}
