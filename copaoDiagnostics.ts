// Development-only observation harness; absent from production output.
let frame = 0;
let observer: PerformanceObserver | undefined;
export function startCopaoDiagnostics() {
  const output = document.createElement("output");
  output.hidden = true;
  output.id = "copao-diagnostics";
  document.body.append(output);
  let shifts = 0, frames = 0, start = 0;
  if (PerformanceObserver.supportedEntryTypes.includes("layout-shift")) {
    observer = new PerformanceObserver(list => {
      for (const entry of list.getEntries()) {
        const shift = entry as PerformanceEntry & { value: number; hadRecentInput: boolean };
        if (!shift.hadRecentInput) shifts += shift.value;
      }
    });
    observer.observe({ type: "layout-shift", buffered: true });
  }
  function sample(now: number) {
    if (!start) start = now;
    frames++;
    output.textContent = JSON.stringify({
      sampledFrames: frames, fps: frames > 1 ? Math.round((frames - 1) * 1000 / (now - start) * 10) / 10 : 0,
      cls: shifts, modes: [...document.querySelectorAll<HTMLElement>("[data-copao-mode]")].map(element => element.dataset.copaoMode),
      resources: performance.getEntriesByType("resource").filter(entry => entry.name.includes("copao-sem-mao")).map(entry => {
        const resource = entry as PerformanceResourceTiming;
        return { initiator: resource.initiatorType, transferBytes: resource.transferSize, encodedBytes: resource.encodedBodySize };
      }),
    });
    if (frames < 240) frame = requestAnimationFrame(sample);
  }
  frame = requestAnimationFrame(sample);
  window.addEventListener("pagehide", () => { cancelAnimationFrame(frame); observer?.disconnect(); }, { once: true });
}
