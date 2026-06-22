/** Read a file, downscale via canvas, return a compact JPEG data URL. */
export function fileToDataUrl(file: File, maxW = 1280, quality = 0.82): Promise<string> {
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
