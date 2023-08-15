import { useRecoilState } from "recoil"
import cls from "../utils/cls"
import { rightSidebarState } from "../atoms/rightSidebarState"
import { selectedFileState } from "../atoms/selectedFileState"

export default () => {

    const [menuOpen, setMenuOpen] = useRecoilState(rightSidebarState)
    const [selectedFile, setSelectedFile] = useRecoilState(selectedFileState)

    // if( !selectedFile ) return <></>

    return <aside className={cls(
        "right border-l p-4",
        menuOpen ? "w-64" : "" // w-12
    )}>
        {selectedFile && (
            <div className="border p-2">
                <img src={selectedFile?.signedUrl} />
            </div>
        )}
    </aside>

}