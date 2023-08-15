import { forwardRef } from "react";
import { useRecoilState } from "recoil";
import { selectedFileState } from "../atoms/selectedFileState";
import cls from "../utils/cls";

export default forwardRef(({
    onClose,
    onConfirm,
}, ref) => {

    const [selectedFile, setSelectedFile] = useRecoilState(selectedFileState)

    return <footer className="border-t px-2 py-2">
        <div className="flex gap-2">

            <button
                onClick={() => {
                    if( selectedFile ){
                        onConfirm(selectedFile)
                        setSelectedFile(null)
                    }
                }}
                disabled={!selectedFile}
                className={cls(
                    "vt--button vt--button--variant--default",
                    selectedFile ? "" : "opacity-50 cursor-not-allowed"
                )}
            >
                Select
            </button>

            <button
                className="vt--button vt--text-color"
                onClick={()=>{
                    onClose();
                    setSelectedFile(null)
                }}
            >
                Cancel
            </button>
            
        </div>
    </footer>
});