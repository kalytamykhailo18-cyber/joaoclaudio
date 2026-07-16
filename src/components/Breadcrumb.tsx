import Link from "next/link";

export default function Breadcrumb({ items }: { items: { name: string; url?: string }[] }) {
  return (
    <div className="breadcrumb">
      {items.map((it, i) => (
        <span key={i}>
          {it.url ? <Link href={it.url}>{it.name}</Link> : it.name}
          {i < items.length - 1 && " ›"}
        </span>
      ))}
    </div>
  );
}
