import { forwardRef } from 'preact/compat';
import { useRecoilState } from "recoil";
import { selectedFileState } from "../atoms/selectedFileState";
import cls from "../utils/cls";
import { uploadFilesState } from "../atoms/uploadFilesState";

export default forwardRef(({
    onClose,
    onConfirm,
}, ref) => {

    const [selectedFile, setSelectedFile] = useRecoilState(selectedFileState)
    const [files, setFiles] = useRecoilState(uploadFilesState);

    return <footer className="border-t px-2 py-2 flex flex-wrap justify-between">

        <div className="flex gap-2">
            <button
                onClick={() => {
                    if (selectedFile) {
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
                onClick={() => {
                    onClose();
                    setSelectedFile(null)
                }}
            >
                Cancel
            </button>
        </div>

        <div>
            <label
                htmlFor="upload-button"
                className="vt--button vt--text-color cursor-pointer block"
            >
                Upload
            </label>
            <input
                type="file"
                id="upload-button"
                className="hidden"
                // value={bucketName}
                onChange={(e) => {
                    let files = [...e.target.files];
                    setFiles(files)
                }}
            />
        </div>

    </footer>
});