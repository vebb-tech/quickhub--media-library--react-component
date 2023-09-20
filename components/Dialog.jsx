import { useState } from 'react';
import { forwardRef } from 'react';
import cls from "../utils/cls";
import { useRecoilState } from "recoil";
import { uploadFilesState } from "../atoms/uploadFilesState";
import Input from "./Input";
import Button from "./Button";
import settings from "../settings";

export default forwardRef(({ children, formProps }, ref) => {

    const [files, setFiles] = useRecoilState(uploadFilesState);
    const [isOver, setIsOver] = useState(false);

    const handleDragEnterOver = e => {
        e.preventDefault();
        e.stopPropagation();
        setIsOver(true);
    };

    const handleDragLeaveDrop = e => {
        e.preventDefault();
        e.stopPropagation();
        setIsOver(false);
    };

    // console.log({ isPending })

    const mergedSettings = {
        ...settings.formProps,  // Default
        ...formProps            // User props
    }

    return (
        <dialog
            ref={ref}
            className={cls(
                "vt--rounded-box !p-0 !border-0 relative backdrop:bg-black/70 open:flex z-[100]",
                "min-w-[calc(100vw-1em)] min-h-[calc(100dvh-4em)] md:min-h-[calc(100vh-2em)] md:min-w-[calc(100vw-2em)] lg:min-w-[calc(100vw-100px)] lg:min-h-[calc(100vh-100px)]",
            )}
            onDrop={(e) => {
                handleDragLeaveDrop(e)
                let files = [...e.dataTransfer.files];
                console.log(files)
                setFiles(files)
            }}
            onDragOver={handleDragEnterOver}
            onDragEnter={handleDragEnterOver}
            onDragLeave={handleDragLeaveDrop}
        >
            <div
                className={cls(
                    "absolute inset-0 bg-vt-700 z-10 text-2xl flex items-center justify-center text-white transition-opacity pointer-events-none",
                    isOver ? "" : "opacity-0"
                )}
            >
                Drop file to upload
            </div>

            {files?.length > 0 && (
                <form
                    {...mergedSettings}
                    className={cls(
                        "absolute p-3 flex items-center justify-center inset-0 bg-black/50 z-10",
                        formProps?.className
                    )}
                >
                    {/* sm:flex items-center */}
                    <div className="vt--rounded-box min-w-max gap-4 md:w-80 sm:grid sm:grid-cols-2">

                        <img src={URL.createObjectURL(files[0])} className="block body-color max-h-40 sm:max-h-42 border p-1 aspect-square object-contain mb-6 sm:mb-0 col-span-1" />

                        <div className="col-span-1 row-span-2">
                            <Input
                                label="Name"
                                name="name"
                                defaultValue={files[0].name}
                            />
                            <Input
                                label="Alt"
                                name="alt"
                                placeholder="Alternate text"
                            />
                            <Input
                                label="Caption"
                                name="caption"
                                placeholder="Caption describing the image"
                            />
                            <Input
                                label="Credit"
                                name="credit"
                                placeholder="Photo by Jane Doe"
                            />
                        </div>

                        <div className="flex gap-2 col-span-1 mt-4 sm:mt-0">
                            {/* TODO: send all data via paramater instead of form name */}
                            <Button 
                                onClick={() => mergedSettings.action(12345678)}
                            >
                                Upload
                            </Button>
                            <Button variant="secondary">Cancel</Button>
                        </div>

                    </div>
                </form>
            )}

            {children}

        </dialog>
    );

});