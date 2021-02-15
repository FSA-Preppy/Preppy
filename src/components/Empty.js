import React, { useRef, useState, useEffect, useCallback } from "react";
import { render } from "react-dom";
import { useTransition, animated } from "react-spring";
import "../styles/emptystyle.css";

const Empty = () => {
  const [didMount, setDidMount] = useState(false);
  const ref = useRef([]);
  const [items, set] = useState([]);
  const transitions = useTransition(items, null, {
    from: {
      opacity: 0,
      height: 0,
      innerHeight: 0,
      transform: "perspective(600px) rotateX(0deg)",
      color: "#8fa5b6",
    },
    enter: [
      { opacity: 1, height: 80, innerHeight: 80 },
      { transform: "perspective(600px) rotateX(180deg)", color: "#28d79f" },
      { transform: "perspective(600px) rotateX(0deg)" },
    ],
    leave: [
      { color: "#c23369" },
      { innerHeight: 0 },
      { opacity: 0, height: 0 },
    ],
    update: { color: "#28b4d7" },
  });

  const reset = useCallback(() => {
    ref.current.map(clearTimeout);
    ref.current = [];
    set([]);
    ref.current.push(setTimeout(() => set(["Please", "Add", "Items"]), 2000));
    ref.current.push(setTimeout(() => set(["Please", "Items"]), 5000));
    ref.current.push(setTimeout(() => set(["Please", "Add", "Items"]), 8000));
  }, []);

  useEffect(() => {
    setDidMount(true);
    void reset();
    return () => setDidMount(false);
  }, []);
  if (!didMount) {
    return null;
  }
  return (
    <>
      <div className="fridge-animation-area">
        <div className="fridge-header-container">
          <div>
            {transitions.map(
              ({ item, props: { innerHeight, ...rest }, key }) => (
                <animated.div
                  className="transitions-item"
                  key={key}
                  style={rest}
                  onClick={reset}
                >
                  <animated.div
                    style={{ overflow: "hidden", height: innerHeight }}
                  >
                    {item}
                  </animated.div>
                </animated.div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

render(<Empty />, document.getElementById("root"));

export default Empty;
