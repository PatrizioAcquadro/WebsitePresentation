#!/usr/bin/env python3
"""Generate a one-page PDF summary using raw PDF syntax (no external deps)."""

from __future__ import annotations

from pathlib import Path
import textwrap

PAGE_WIDTH = 612  # Letter portrait
PAGE_HEIGHT = 792
LEFT = 54
RIGHT = 558
TOP = 756
BOTTOM = 42


def pdf_escape(text: str) -> str:
    return text.replace('\\', r'\\').replace('(', r'\(').replace(')', r'\)')


def wrap_text(text: str, font_size: int, indent: int) -> list[str]:
    usable_width = RIGHT - indent
    # Heuristic for Helvetica average glyph width.
    avg_char = font_size * 0.53
    max_chars = max(24, int(usable_width / avg_char))
    return textwrap.wrap(text, width=max_chars, break_long_words=False, break_on_hyphens=False)


def build_layout() -> tuple[list[str], float]:
    commands: list[str] = []
    y = TOP

    def line(text: str, x: int, font: str = 'F1', size: int = 10, lead: int = 12) -> None:
        nonlocal y
        safe = pdf_escape(text)
        commands.append(f"BT /{font} {size} Tf 1 0 0 1 {x} {y:.2f} Tm ({safe}) Tj ET")
        y -= lead

    def heading(text: str) -> None:
        nonlocal y
        line(text, LEFT, font='F2', size=12, lead=14)

    def paragraph(text: str, *, indent: int = LEFT, size: int = 10, lead: int = 12) -> None:
        for segment in wrap_text(text, size, indent):
            line(segment, indent, font='F1', size=size, lead=lead)

    def bullets(items: list[str], *, indent: int = LEFT + 10, size: int = 10, lead: int = 12) -> None:
        bullet_indent = indent
        continuation = indent + 10
        for item in items:
            wrapped = wrap_text(f"- {item}", size, bullet_indent)
            for i, seg in enumerate(wrapped):
                line(seg, bullet_indent if i == 0 else continuation, font='F1', size=size, lead=lead)

    line("App Summary - Repo Evidence", LEFT, font='F2', size=16, lead=18)

    heading("What it is")
    paragraph(
        "A Next.js 16 thesis portfolio web app that documents a Vision-Language-Action "
        "research project for bimanual LEGO assembly. It organizes the work into task "
        "definition, SOTA analysis, limitations, and roadmap sections.",
    )
    y -= 4

    heading("Who it is for")
    paragraph(
        "Primary persona: thesis stakeholders and technical readers who need a concise, "
        "navigable view of the research plan and analysis.",
    )
    y -= 4

    heading("What it does")
    bullets(
        [
            "Provides dedicated routes for Home, Task, SOTA, Limitations, and Roadmap views.",
            "Loads structured research content from typed local modules in content/*.ts.",
            "Presents analysis visuals with reusable tables, charts, cards, and carousels.",
            "Shows phased roadmap details, milestones, and phase-specific deep-dive pages.",
            "Uses framer-motion animations and responsive layouts for interactive navigation.",
            "Includes Vercel Analytics and Speed Insights instrumentation in the root layout.",
        ]
    )
    y -= 4

    heading("How it works (architecture)")
    bullets(
        [
            "Shared shell: app/layout.tsx applies global styles, Navigation, Footer, Analytics, and SpeedInsights.",
            "Route layer: app/**/page.tsx files compose section views and import domain data from content/*.ts.",
            "UI layer: components/** provides reusable rendering blocks (task, sota, roadmap, markdown).",
            "Asset layer: public/ images are rendered through next/image for hero and section visuals.",
            "Execution model: most pages/components are client-rendered and animated via use client + framer-motion.",
            "Backend APIs / database services: Not found in repo.",
        ]
    )
    y -= 4

    heading("How to run (minimal)")
    bullets(
        [
            "Install dependencies: npm install",
            "Start dev server: npm run dev",
            "Open http://localhost:3000",
            "Required Node.js version pin (.nvmrc / engines): Not found in repo.",
        ]
    )

    return commands, y


def make_pdf_bytes(content_stream: str) -> bytes:
    objs: list[bytes] = []

    def add_obj(body: str) -> int:
        objs.append(body.encode('latin-1'))
        return len(objs)

    add_obj("<< /Type /Catalog /Pages 2 0 R >>")
    add_obj("<< /Type /Pages /Kids [3 0 R] /Count 1 >>")
    add_obj(
        "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] "
        "/Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> "
        "/Contents 6 0 R >>"
    )
    add_obj("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>")
    add_obj("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>")
    add_obj(f"<< /Length {len(content_stream.encode('latin-1'))} >>\nstream\n{content_stream}\nendstream")

    out = bytearray()
    out.extend(b"%PDF-1.4\n")
    offsets = [0]

    for i, obj in enumerate(objs, start=1):
        offsets.append(len(out))
        out.extend(f"{i} 0 obj\n".encode("latin-1"))
        out.extend(obj)
        out.extend(b"\nendobj\n")

    xref_pos = len(out)
    out.extend(f"xref\n0 {len(objs) + 1}\n".encode("latin-1"))
    out.extend(b"0000000000 65535 f \n")
    for off in offsets[1:]:
        out.extend(f"{off:010d} 00000 n \n".encode("latin-1"))

    out.extend(
        (
            "trailer\n"
            f"<< /Size {len(objs) + 1} /Root 1 0 R >>\n"
            "startxref\n"
            f"{xref_pos}\n"
            "%%EOF\n"
        ).encode("latin-1")
    )
    return bytes(out)


def main() -> None:
    commands, final_y = build_layout()
    if final_y < BOTTOM:
        raise RuntimeError(f"Layout overflowed the page (y={final_y:.2f}).")

    content = "\n".join(commands)
    pdf = make_pdf_bytes(content)

    output = Path("output/pdf/app-summary-one-page.pdf")
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_bytes(pdf)
    print(output.resolve())
    print(f"Final baseline y: {final_y:.2f}")


if __name__ == "__main__":
    main()
