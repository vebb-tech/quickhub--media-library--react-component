import { useEffect, useRef } from "preact/hooks"
// import LeftSideBar from "./components/LeftSideBar";
import RightSideBar from "./components/RightSideBar";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { RecoilRoot, useRecoilState } from "recoil";
import Dialog from "./components/Dialog";
import { createPortal } from "preact/compat";


// const MediaLibrary = forwardRef(
function MediaLibraryComponent(props) {

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

const MediaLibrary = (props) => {
    const container = document.getElementById('media-library');
    return container
        ? createPortal(<MediaLibraryComponent {...props}/>, container)
        : <MediaLibraryComponent {...props}/>
}

export default MediaLibrary


// TODO: Change so this component is lazy-loaded
// import { lazy, Suspense } from 'react';

// const MediaLibraryComponent = lazy(() => import('./MediaLibraryComponent.jsx'));

// const MediaLibrary = (props) => <Suspense fallback={<>Loading MediaLibrary</>}>
//     <MediaLibraryComponent {...props} />
// </Suspense>

// export default MediaLibrary