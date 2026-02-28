export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-20 border-t border-[var(--line)] px-4 pb-14 pt-10 text-[var(--sea-ink-soft)]">
      <div className="page-wrap flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <p className="m-0 text-sm">
          &copy; {year} SJSU SAEC. All rights reserved.
        </p>
        <p className="m-0 text-sm">Built with love by SJSU Students</p>
      </div>
      <div className="mt-4 flex justify-center gap-4">
        <a
          href="https://www.instagram.com/sjsu.saec/"
          target="_blank"
          className="cursor-pointer"
        >
          Instagram
        </a>
        <a
          href="https://discord.com/invite/FX7ZZC8uS9"
          target="_blank"
          className="cursor-pointer"
        >
          Discord
        </a>
        <a
          href="https://www.tiktok.com/@sjsu.saec"
          target="_blank"
          className="cursor-pointer"
        >
          Tiktok
        </a>
      </div>
    </footer>
  )
}
