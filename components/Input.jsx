import cls from "@/utils/cls";
import { useId } from "preact/hooks";


export default (props) => {

    const {
        id = useId(),
        type,
        // help,
        label,
        outerClassName,
    } = props

    const newProps = {...props}

    delete newProps.outerClassName;

    if( !props?.pattern )
        switch (type) {
            case "password":
                newProps.pattern = "(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                newProps.title = "Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
                break;
        }

    return <div className={cls(
        "relative group mt-1.5",
        // help ? "mb-3" : "mb-8",
        "mb-5 last:mb-0",
        outerClassName
    )}>
        
        {/* TEL COUNTRY */}
        {/* TODO: Country code select/search */}
        {type === 'tel' && (<></>)}

        {/* PASSWORD */}
        {/* TODO: Reveal password */}
        {type === 'password' && (<></>)}

        <input
            {...{
                id,
                ...newProps,
                // Does nothing to the element but removing from front-end
                help: undefined,
                label: undefined,
                // outerClassName: undefined,
            }}
            className={cls(
                "vt--rounded-box--color peer w-full px-3 py-3 md:px-4 md:py-3 rounded-lg text-sm md:text-md font-[300]",
                "outline outline-1 outline-slate-300/70 group-hover:outline-slate-400/70 focus:!outline-vt-500 placeholder-neutral-400/80",
                // DARK
                "dark:placeholder-neutral-500 dark:outline-neutral-600 dark:text-white",
                props?.className
            )}
        />

        {/* LABEL */}
        {label && (
            <label htmlFor={id} className={cls(
                "vt--rounded-box--color absolute w-max -top-2 left-2 md:left-3 px-1 text-xs text-slate-500/80 group-hover:text-slate-500 peer-focus:text-vt-500 z-[1]",
                // DARK
                "dark:text-slate-400/80"
            )}>
                {label}
            </label>
        )}

        {/* HELP */}
        {props?.help && (
            <p className={cls(
                "mx-3 mt-1 text-xs text-slate-500/70 peer-focus:text-slate-500 group-hover:text-slate-500",
                // DARK
                "dark:text-slate-400/80 dark:peer-focus:text-slate-400 group-hover:text-slate-400",
            )}>
                {props.help}
            </p>
        )}

    </div>
}