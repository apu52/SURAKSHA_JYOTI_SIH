import { useEffect, useState } from "react";

interface StatsCounterProps {
  value: number;
  label: string;
  icon?: React.ReactNode;
  suffix?: string;
  delay?: number;
}

const StatsCounter = ({ value, label, icon, suffix = "", delay = 0 }: StatsCounterProps) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasStarted(true);
      let start = 0;
      const increment = value / 60; // Animate over ~1 second (60 frames)
      const counter = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(counter);
        } else {
          setCount(Math.floor(start));
        }
      }, 16); // ~60fps

      return () => clearInterval(counter);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <div className={`text-center counter-up hover-lift rounded-xl p-6 bg-card border border-border ${hasStarted ? 'opacity-100' : 'opacity-0'}`}>
      {icon && (
        <div className="flex justify-center mb-3">
          <div className="p-3 rounded-lg bg-secondary/10 text-secondary">
            {icon}
          </div>
        </div>
      )}
      <div className="text-3xl font-bold text-foreground gradient-hero bg-clip-text text-transparent">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm text-muted-foreground mt-1 font-medium">{label}</div>
    </div>
  );
};

export default StatsCounter;