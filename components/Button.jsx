// 'use client'

import SpinnerThird from "@/assets/icons/spinner-third";
import cls from "@/utils/cls";

export default (props) => {

    let variant;

    switch (props?.variant) {
        case "custom": break;

        case "secondary":
            variant = cls(
                "border-slate-300 bg-slate-100 hover:bg-slate-200/80",
                "dark:border-slate-300/30 dark:bg-slate-900/20 dark:hover:bg-slate-900/40 dark:text-white"
            );
            break;
            
        default:
            variant = "vt--button--variant--default";
            break;
    }

    return <button
        {...{
            ...props,
            className: cls(
                // "mt-4",
                "vt--button",
                variant,
                props?.loading && "flex gap-[0.6em] items-center",
                props?.disabled && "cursor-not-allowed opacity-50",
                props?.className
            )
        }}
    >
        {props?.loading && <SpinnerThird className="w-[1.5em] fill-white animate-spin"/>} {props?.children}
    </button>
}