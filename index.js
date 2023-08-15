"use client"

import { forwardRef, useEffect, useRef, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import LeftSideBar from "./components/LeftSideBar";
import RightSideBar from "./components/RightSideBar";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { RecoilRoot, useRecoilState } from "recoil";
import cls from "./utils/cls";



// const MediaLibrary = forwardRef(
function MediaLibrary(props) {

    const ref = useRef(null);

    const {
        isOpen = false,
        onClose = () => {},
        onConfirm = () => {},
    } = props;

    useEffect(() => {
        if (isOpen) ref.current?.showModal();
        else        ref.current?.close();
    }, [isOpen]);

    return <>
        <RecoilRoot>
            <dialog
                ref={ref}
                className={cls(
                    "bg-white dark:bg-neutral-800 rounded-lg border-2 border-t-slate-200/70 border-slate-100 dark:border-neutral-700/30 backdrop:bg-black/70",
                    "open:flex z-[100]",
                    "min-w-[500px] lg:min-w-[calc(100vw-100px)] lg:min-h-[calc(100vh-100px)]"
                )}
                // onBlur={() => ref.current.close()}
            >

                {/* <LeftSideBar /> */}

                <div className="flex flex-col flex-1">
                    <Header ref={ref} />
                    <Main isOpen={isOpen} />
                    <Footer
                        onClose={onClose}
                        onConfirm={onConfirm}
                    />
                </div>

                <RightSideBar />

            </dialog>
        </RecoilRoot>
    </>
}
// )

export default MediaLibrary