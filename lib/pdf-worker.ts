// Helper to dynamically load pdfjs-dist and configure the local worker on the client side
let pdfjsLib: typeof import('pdfjs-dist') | null = null;

export async function getPdfJs() {
  if (typeof window === 'undefined') {
    throw new Error('PDF.js can only be loaded in the browser');
  }

  if (!pdfjsLib) {
    const pdfjs = await import('pdfjs-dist');
    pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
    pdfjsLib = pdfjs;
  }

  return pdfjsLib;
}
