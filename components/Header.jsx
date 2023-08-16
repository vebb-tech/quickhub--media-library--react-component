import { useRecoilState } from "recoil";

import IconButton from "./IconButton";
import cls from "../utils/cls";
import { leftSidebarState } from "../atoms/leftSidebarState";

export default ({ onClose }) => {

    const [menuOpen, setMenuOpen] = useRecoilState(leftSidebarState)

    return <header className="border-b px-6 py-2 h-[60px] text-md lg:text-lg flex justify-between items-center relative">

        <div className="flex gap-6">
            {!menuOpen && <IconButton
                className="rotate-180 -ml-2"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="aspect-square h-4" viewBox="0 0 320 512">
                    <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
                </svg>
            </IconButton>}
            <span>Media Library</span>
        </div>

        <div className="hidden lg:block">
            <input
                placeholder="Search..."
                className="outline-0 bg-neutral-200/40 rounded-lg text-sm px-4 py-2 min-w-[320px]"
            />
        </div>

        <IconButton onClick={() => onClose()}>
            <svg xmlns="http://www.w3.org/2000/svg" className="aspect-square h-4" viewBox="0 0 384 512">
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
            </svg>
        </IconButton>
    </header>
}