"use client";

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function TextToPhoto() {
  const [text, setText] = useState("");
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Text to Photo
          </h1>
          <p className="text-slate-600">
            Type your text and see it on a clean white background
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Enter your text
          </label>
          <Input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type something..."
            className="w-full text-lg h-12 border-slate-300"
          />
        </div>

        {/* Output Section */}
        <div className="flex flex-col items-center">
          <h2 className="text-sm font-medium text-slate-700 mb-4">
            Your Output
          </h2>

          {/* Display Canvas - 1:1 Square */}
          <div
            ref={displayRef}
            className="w-full max-w-2xl aspect-square bg-white rounded-lg shadow-lg border border-slate-200 flex items-center justify-center overflow-hidden"
          >
            {text ? (
              <div className="text-justify p-6  ">
                <p className="text-8xl font-medium text-slate-900 leading-[-1] text-balance w-full">
                  {text}
                </p>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-slate-400 text-lg">
                  Your text will appear here
                </p>
              </div>
            )}
          </div>

          {/* Download Button */}
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

          {/* Info Text */}
          <p className="text-slate-600 text-sm mt-6 text-center">
            No storage • Download for viewing only
          </p>
        </div>
      </div>
    </div>
  );
}
