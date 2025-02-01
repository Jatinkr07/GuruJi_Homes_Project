/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { useRef } from "react";

function Counter({ value, suffix = "", label, duration = 2, delay = 0 }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration,
        delay,
        onUpdate: (latest) => {
          setDisplayValue(latest);
        },
        ease: "easeOut",
      });

      return () => controls.stop();
    }
  }, [isInView, value, duration, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="flex flex-col items-center justify-center p-4"
    >
      <div className="flex items-baseline text-4xl font-[500] md:text-5xl lg:text-5xl">
        <span className="tabular-nums">
          {displayValue.toLocaleString("en-US", {
            maximumFractionDigits: value > 100 ? 0 : 1,
          })}
        </span>
        {suffix && <span className="ml-2 text-blue-600">{suffix}</span>}
      </div>
      <p className="mt-2 text-sm font-medium tracking-wider text-center text-gray-600">
        {label}
      </p>
    </motion.div>
  );
}

export default function CounterSection() {
  return (
    <div className="w-full px-4 mx-auto lg:py-4 max-w-7xl">
      <div className="grid grid-cols-1 lg:gap-8 md:grid-cols-2 lg:grid-cols-4">
        <Counter
          value={10}
          suffix="Million"
          label="SQ. FT. AREA DELIVERED"
          delay={0}
        />
        <Counter
          value={2.5}
          suffix="Million"
          label="SQ. FT. AREA UPCOMING"
          delay={0.2}
        />
        <Counter
          value={5300}
          suffix="+"
          label="SATISFIED FAMILIES"
          delay={0.4}
        />
        <Counter
          value={11}
          suffix="+"
          label="SUCCESSFUL PROJECTS"
          delay={0.6}
        />
      </div>
    </div>
  );
}
