"use client";

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const FONT_WEIGHTS = [
  { label: "Thin", value: 100 },
  { label: "Extra Light", value: 200 },
  { label: "Light", value: 300 },
  { label: "Regular", value: 400 },
  { label: "Medium", value: 500 },
  { label: "Semi Bold", value: 600 },
  { label: "Bold", value: 700 },
  { label: "Extra Bold", value: 800 },
  { label: "Black", value: 900 },
];

const FONTS = [
  {
    label: "Light Sans",
    value: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  },
  { label: "Serif Classic", value: "Georgia, 'Times New Roman', serif" },
  { label: "Mono", value: "'Courier New', Courier, monospace" },
  { label: "System UI", value: "system-ui, sans-serif" },
];

export default function TextToPhoto() {
  const [text, setText] = useState("");
  const [fontFamily, setFontFamily] = useState(FONTS[0].value);
  const [fontSize, setFontSize] = useState(72);
  const [leading, setLeading] = useState(1.15);
  const [fontWeight, setFontWeight] = useState(400);
  const displayRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!displayRef.current || !text) return;
    const htmlToImage = await import("html-to-image");
    try {
      const dataUrl = await htmlToImage.toPng(displayRef.current, {
        backgroundColor: "#ffffff",
        pixelRatio: 2,
      });
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `text-photo-${Date.now()}.png`;
      link.click();
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Text to Photo
          </h1>
          <p className="text-slate-500 text-sm">
            Type your text, style it, and download as an image
          </p>
        </div>

        {/* Input */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-4">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
            Your Text
          </label>
          <Input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type something..."
            className="w-full text-lg h-12 border-slate-200"
          />
        </div>

        {/* Typography Controls */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-5">
            Typography
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Font Family */}
            <div>
              <label className="block text-xs text-slate-500 mb-2 font-medium">
                Font
              </label>
              <div className="flex flex-col gap-2">
                {FONTS.map((f) => (
                  <button
                    key={f.value}
                    onClick={() => setFontFamily(f.value)}
                    className={`text-left px-3 py-2 rounded-lg border text-sm transition-all ${
                      fontFamily === f.value
                        ? "border-slate-900 bg-slate-900 text-white"
                        : "border-slate-200 text-slate-700 hover:border-slate-400"
                    }`}
                    style={{ fontFamily: f.value }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Font Size */}
            <div>
              <label className="block text-xs text-slate-500 mb-2 font-medium">
                Font Size —{" "}
                <span className="text-slate-800 font-semibold">
                  {fontSize}px
                </span>
              </label>
              <input
                type="range"
                min={16}
                max={160}
                step={2}
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full accent-slate-900"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>16</span>
                <span>160</span>
              </div>

              {/* Quick presets */}
              <div className="flex gap-2 mt-3 flex-wrap">
                {[32, 56, 72, 96, 128].map((s) => (
                  <button
                    key={s}
                    onClick={() => setFontSize(s)}
                    className={`text-xs px-2 py-1 rounded border transition-all ${
                      fontSize === s
                        ? "bg-slate-900 text-white border-slate-900"
                        : "border-slate-200 text-slate-600 hover:border-slate-400"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Leading */}
            <div>
              <label className="block text-xs text-slate-500 mb-2 font-medium">
                Leading —{" "}
                <span className="text-slate-800 font-semibold">
                  {leading.toFixed(2)}
                </span>
              </label>
              <input
                type="range"
                min={0.8}
                max={2.5}
                step={0.05}
                value={leading}
                onChange={(e) => setLeading(Number(e.target.value))}
                className="w-full accent-slate-900"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>Tight 0.8</span>
                <span>Loose 2.5</span>
              </div>

              {/* Quick presets */}
              <div className="flex gap-2 mt-3 flex-wrap">
                {[
                  { label: "Tight", val: 0.9 },
                  { label: "Normal", val: 1.15 },
                  { label: "Relaxed", val: 1.5 },
                  { label: "Loose", val: 2.0 },
                ].map((p) => (
                  <button
                    key={p.val}
                    onClick={() => setLeading(p.val)}
                    className={`text-xs px-2 py-1 rounded border transition-all ${
                      leading === p.val
                        ? "bg-slate-900 text-white border-slate-900"
                        : "border-slate-200 text-slate-600 hover:border-slate-400"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Font Weight */}
          <div className="mt-6">
            <label className="block text-xs text-slate-500 mb-3 font-medium">
              Font Weight
            </label>
            <div className="flex flex-wrap gap-2">
              {FONT_WEIGHTS.map((w) => (
                <button
                  key={w.value}
                  onClick={() => setFontWeight(w.value)}
                  className={`px-3 py-1.5 rounded-lg border text-xs transition-all ${
                    fontWeight === w.value
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-200 text-slate-600 hover:border-slate-400"
                  }`}
                  style={{ fontWeight: w.value }}
                >
                  {w.label} · {w.value}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Output */}
        <div className="flex flex-col items-center">
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">
            Preview
          </h2>

          <div
            ref={displayRef}
            className="w-full max-w-2xl aspect-square bg-white rounded-xl shadow-lg border border-slate-200 flex items-center justify-center overflow-hidden"
          >
            {text ? (
              <div className="p-8 w-full h-full flex items-center justify-center">
                <p
                  style={{
                    fontFamily,
                    fontSize: `${fontSize}px`,
                    lineHeight: leading,
                    fontWeight,
                    wordBreak: "break-word",
                    overflowWrap: "break-word",
                    textAlign: "left",
                    color: "#0f172a",
                    width: "100%",
                  }}
                >
                  {text}
                </p>
              </div>
            ) : (
              <p className="text-slate-400 text-base">
                Your text will appear here
              </p>
            )}
          </div>

          {text && (
            <div className="mt-8">
              <Button
                onClick={handleDownload}
                className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-lg font-medium"
              >
                Download as Image
              </Button>
            </div>
          )}

          <p className="text-slate-400 text-xs mt-5 text-center">
            No storage · Download for viewing only
          </p>
        </div>
      </div>
    </div>
  );
}
