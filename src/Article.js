export default function Article({ title, url, created_at }) {
  return (
    <li>
      <a
        className="text-decoration-none link-dark"
        href={url}
        rel="noreferrer"
        target="_blank"
      >
        {title}
      </a>
    </li>
  );
}
