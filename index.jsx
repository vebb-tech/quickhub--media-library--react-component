import { forwardRef, useEffect, useRef, useState } from "react"
// import LeftSideBar from "./components/LeftSideBar";
import RightSideBar from "./components/RightSideBar";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { RecoilRoot, useRecoilState } from "recoil";
import Dialog from "./components/Dialog";



// const MediaLibrary = forwardRef(
function MediaLibrary(props) {

    const ref = useRef(null);

    const {
        isOpen = false,
        onClose = () => { },
        onConfirm = () => { },

        formProps = {},
    } = props;

    useEffect(() => {
        if (isOpen) ref.current?.showModal();
        else ref.current?.close();
    }, [isOpen]);

    return <>
        <RecoilRoot>
            <Dialog ref={ref} formProps={formProps}>

                {/* <LeftSideBar /> */}

                <div className="flex flex-col flex-1">
                    <Header onClose={onClose} />
                    <Main isOpen={isOpen} />
                    <Footer
                        onClose={onClose}
                        onConfirm={onConfirm}
                    />
                </div>

                <RightSideBar />

            </Dialog>
        </RecoilRoot>
    </>
}
// )

export default MediaLibrary