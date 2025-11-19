import React, { useState } from "react";
import "./CalculatorPage.css";

// Allowed keypad layout
const BUTTONS = [
  ["7", "8", "9", "÷"],
  ["4", "5", "6", "×"],
  ["1", "2", "3", "-"],
  ["0", ".", "=", "+"],
  ["C"],
];

function evaluateExpr(expr) {
  // Replace symbols for JS and eval safely
  try {
    // Only allow numbers, . + - * / and no consecutive ops
    const safeExpr = expr.replace(/×/g, "*").replace(/÷/g, "/").replace(/[^0-9+\-*/.]/g, "");
    // eslint-disable-next-line
    // Public: safe within this context, no user input is executed as a function
    return String(eval(safeExpr));
  } catch {
    return "Err";
  }
}

// PUBLIC_INTERFACE
export default function CalculatorPage() {
  const [display, setDisplay] = useState("0");
  const [accum, setAccum] = useState("");
  const [lastPressed, setLastPressed] = useState(null);

  function press(val) {
    if (val === "C") {
      setDisplay("0");
      setAccum("");
      setLastPressed(null);
      return;
    }
    if (val === "=") {
      const result = evaluateExpr(accum || display);
      setDisplay(result);
      setAccum("");
      setLastPressed("=");
      return;
    }
    // If op, only allow after number
    if ("÷×+-".includes(val)) {
      if (accum && !"+-×÷".includes(accum.slice(-1))) {
        setAccum((a) => a + val);
        setDisplay(val);
        setLastPressed(val);
      } else if (!accum && display !== "0" && !"+-×÷".includes(display)) {
        setAccum(display + val);
        setDisplay(val);
        setLastPressed(val);
      }
      return;
    }
    // number/dot
    if (lastPressed === "=") {
      setDisplay(val === "." ? "0." : val);
      setAccum(val === "." ? "0." : val);
      setLastPressed(val);
      return;
    }
    // Append
    let newDisp = display === "0" && val !== "." ? val : display + val;
    if (val === "." && display.includes(".")) return;
    setDisplay(newDisp);
    setAccum((a) => a + val);
    setLastPressed(val);
  }

  // Keyboard support
  React.useEffect(() => {
    function handler(e) {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if ("0123456789".includes(e.key)) press(e.key);
      if (e.key === ".") press(".");
      if (e.key === "c" || e.key === "C") press("C");
      if (e.key === "Enter" || e.key === "=") press("=");
      if (e.key === "+" || e.key === "-") press(e.key);
      if (e.key === "*") press("×");
      if (e.key === "/") press("÷");
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line
  }, [accum, lastPressed, display]);

  return (
    <div className="calculator-container ocean-theme-bg">
      <div className="calculator-panel">
        <div className="calculator-display">{display}</div>
        <div className="calculator-keypad">
          {BUTTONS.flat().map((btn, i) =>
            <button
              key={i}
              className={
                "calculator-btn" +
                (btn === "="
                  ? " calculator-btn-eq"
                  : btn === "C"
                  ? " calculator-btn-clr"
                  : "calculator-btn-op"
                )
              }
              onClick={() => press(btn)}
            >
              {btn}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
