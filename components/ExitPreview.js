import React from "react";

function ExitPreview() {
  return (
    <div
      className="fixed flex flex-col rounded-md overflow-hidden bg-gray-100 shadow-lg text-center hover:bg-white text-sm transition-colors ease-linear duration-100"
      style={{ top: 24, right: 24 }}
    >
      <p className="bg-gray-800 text-gray-200 py-1 px-2">Preview Mode</p>
      <a className="py-1 px-2 uppercase tracking-wide" href="/api/exit-preview">
        Exit
      </a>
    </div>
  );
}

export default ExitPreview;
