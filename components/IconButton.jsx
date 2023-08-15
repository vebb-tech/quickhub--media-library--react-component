import cls from "../utils/cls"

export default (props) => <button 
    {...props} 
    className={cls(
        "bg-slate-100 hover:bg-slate-200 rounded-md p-2 -mr-2 outline-0", 
        props?.className
    )}
/>