import * as React from "react"
import { cn } from "@/lib/utils"

interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
    value: number;
    min: number;
    max: number;
    onChange: (value: number) => void;
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
    ({ className, value, min, max, onChange, ...props }, ref) => {
        return (
            <div className={cn("relative flex w-full touch-none select-none items-center", className)}>
                <input
                    type="range"
                    ref={ref}
                    min={min}
                    max={max}
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    className="w-full h-2 bg-secondary rounded-full appearance-none outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ring-offset-background cursor-pointer"
                    style={{
                        background: `linear-gradient(to right, hsl(var(--primary)) ${(value - min) / (max - min) * 100}%, hsl(var(--secondary)) ${(value - min) / (max - min) * 100}%)`
                    }}
                    {...props}
                />
                <style dangerouslySetInnerHTML={{
                    __html: `
          input[type=range]::-webkit-slider-thumb {
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: hsl(var(--background));
            border: 2px solid hsl(var(--primary));
            cursor: pointer;
            box-shadow: 0 0 10px hsl(var(--primary));
          }
        `}} />
            </div>
        )
    }
)
Slider.displayName = "Slider"

export { Slider }
