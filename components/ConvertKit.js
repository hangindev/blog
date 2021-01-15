import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

function parseScript(script) {
  try {
    const el = document.createElement("div");
    el.innerHTML = script;
    const scriptEl = el.querySelector("script");
    return {
      uid: scriptEl.dataset.uid,
      src: scriptEl.getAttribute("src"),
    };
  } catch (e) {
    console.log(e);
    return {};
  }
}

function ConvertKit({ className, script }) {
  const wrapperRef = useRef();
  useEffect(() => {
    if (!script) return;
    const wrapperEl = wrapperRef.current;
    const { src, uid } = parseScript(script);
    if (!src || !uid) return;
    const scriptEl = document.createElement("script");
    scriptEl.src = src;
    scriptEl.dataset.uid = uid;
    scriptEl.async = true;
    wrapperEl.appendChild(scriptEl);
  }, [script]);
  return (
    <div className={clsx("wrapper", className)} ref={wrapperRef}>
      <style jsx>{`
        @media (min-width: 680px) {
          div.wrapper {
            padding: 0 20px;
          }
        }
      `}</style>
    </div>
  );
}
ConvertKit.propTypes = {
  script: PropTypes.string.isRequired,
};

export default ConvertKit;
