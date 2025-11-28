import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function App() {
  const [url, setUrl] = useState("");
  const qrRef = useRef<HTMLDivElement>(null);

  const downloadQR = () => {
    if (!qrRef.current) return;
    const canvas = qrRef.current.querySelector("canvas");
    if (!canvas) return;
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "qr-code.png";
    downloadLink.click();
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 to-slate-700 flex flex-col items-center justify-center px-4">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl max-w-md w-full border border-white/20">
        
        <h1 className="text-white text-3xl font-bold text-center mb-6">
          QR Code Generator
        </h1>

        <input
          type="text"
          placeholder="Enter a URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:ring-2 focus:ring-blue-400 outline-none"
        />

        {url && (
          <div className="flex flex-col items-center mt-6">
            <div ref={qrRef} className="bg-white p-4 rounded-xl shadow-lg">
              <QRCodeCanvas value={url} size={200} />
            </div>

            <button
              onClick={downloadQR}
              className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg transition-all"
            >
              Download QR Code
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
