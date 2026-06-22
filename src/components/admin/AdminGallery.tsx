"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useStore } from "@/store/store";

const presets = [
  "/gallery/nouilles-sautees.jpg",
  "/gallery/pho-boeuf.jpg",
  "/gallery/poulet-croustillant.jpg",
  "/gallery/gyoza.jpg",
];

/** Read a file, downscale via canvas, return a compact JPEG data URL. */
function fileToDataUrl(file: File, maxW = 1280, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const el = document.createElement("img");
    el.onload = () => {
      const scale = Math.min(1, maxW / el.width);
      const w = Math.round(el.width * scale);
      const h = Math.round(el.height * scale);
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("no ctx"));
      ctx.drawImage(el, 0, 0, w, h);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", quality));
    };
    el.onerror = reject;
    el.src = url;
  });
}

export default function AdminGallery() {
  const { gallery, addGalleryImage, removeGalleryImage } = useStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setBusy(true);
    setError(null);
    try {
      for (const file of Array.from(files)) {
        if (!file.type.startsWith("image/")) continue;
        const src = await fileToDataUrl(file);
        const caption = file.name.replace(/\.[^.]+$/, "");
        addGalleryImage({ src, fr: caption, en: caption });
      }
    } catch {
      setError("Impossible de charger ce fichier.");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-8">
      {/* current */}
      <div>
        <h3 className="mb-3 font-display text-xl text-ink">
          Photos en ligne ({gallery.length})
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {gallery.map((img) => (
            <div
              key={img.id}
              className="group relative aspect-square overflow-hidden rounded-xl border border-line"
            >
              <Image
                src={img.src}
                alt={img.fr}
                fill
                sizes="200px"
                unoptimized={img.src.startsWith("data:")}
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-2 text-xs text-paper">
                {img.fr}
              </div>
              <button
                onClick={() => removeGalleryImage(img.id)}
                className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-paper/90 text-sm text-chili opacity-0 transition group-hover:opacity-100"
                aria-label="Retirer"
              >
                ✕
              </button>
            </div>
          ))}
          {gallery.length === 0 && (
            <p className="col-span-full rounded-xl border border-dashed border-line p-8 text-center text-sm text-ink-soft">
              Aucune photo. Ajoutez-en ci-dessous.
            </p>
          )}
        </div>
      </div>

      {/* upload from computer */}
      <div>
        <h3 className="mb-3 font-display text-xl text-ink">Ajouter des photos</h3>
        <div
          onClick={() => !busy && inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            handleFiles(e.dataTransfer.files);
          }}
          className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed p-10 text-center transition ${
            dragOver ? "border-chili bg-chili/5" : "border-line bg-paper hover:border-ink/30"
          } ${busy ? "pointer-events-none opacity-60" : ""}`}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
          <div className="grid h-12 w-12 place-items-center rounded-full bg-cream-deep text-2xl">
            {busy ? "⏳" : "↑"}
          </div>
          <div className="text-sm font-semibold text-ink">
            {busy ? "Traitement…" : "Cliquez ou glissez vos images ici"}
          </div>
          <div className="text-xs text-ink-soft">
            JP, PNG, WEBP · plusieurs fichiers possibles · redimensionnées automatiquement
          </div>
          {error && <div className="text-xs text-chili">{error}</div>}
        </div>
      </div>

      {/* quick add from library */}
      <div>
        <h3 className="mb-3 font-display text-xl text-ink">Ou depuis la bibliothèque</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {presets.map((src) => (
            <button
              key={src}
              onClick={() =>
                addGalleryImage({ src, fr: "Spécialité maison", en: "House specialty" })
              }
              className="group relative aspect-square overflow-hidden rounded-xl border border-line transition hover:ring-2 hover:ring-chili"
            >
              <Image src={src} alt="" fill sizes="200px" className="object-cover" />
              <span className="absolute inset-0 grid place-items-center bg-ink/0 text-2xl text-paper opacity-0 transition group-hover:bg-ink/40 group-hover:opacity-100">
                +
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
