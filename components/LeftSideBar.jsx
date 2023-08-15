"use client";

import { useRecoilState } from "recoil"
import { leftSidebarState } from "../atoms/leftSidebarState"
import cls from "../utils/cls"
import IconButton from "./IconButton"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

const supabase = createClientComponentClient()

const fetchFiles = async ({ 
    user_tenants, 
    path = '',
    search
}) => {
    return await supabase
        .storage
        .from(`media-library${path}`)
        .list(user_tenants.tenant_id, {
            limit: 100,
            offset: 0,
            sortBy: { column: 'name', order: 'asc' },
            search
        })

}


export default ({ user, user_tenants }) => {

    const [files, setFiles] = useState([]);
    console.log(files)

    useEffect(() => {

        const verifyUserAccess = async () => {

            if (!user_tenants) {

                if (!user) {
                    const { data, error } = await supabase.auth.getUser()
                    user = data?.user
                }

                if (user?.id) {
                    const { data, error } = await supabase
                        .from('user_tenants')
                        .select('*, tenants(*)')
                        .eq('user_id', user.id)
                        .single()

                    user_tenants = data
                }
            }

            if (user_tenants?.tenant_id) {

                const { data, error } = await fetchFiles({ user_tenants })

                if (data)
                    setFiles(data)
            }


        }

        verifyUserAccess();

    }, [])

    const [menuOpen, setMenuOpen] = useRecoilState(leftSidebarState)
    const [bucketName, setBucketName] = useState();

    return <aside className={cls(
        "left border-r",
        menuOpen ? "w-64" : "hidden" //"w-12"
    )}>

        {/* <HEADER> */}
        <div className="border-b px-6 py-2 h-[60px] text-lg flex justify-between items-center">
            <span>Folders</span>

            <IconButton onClick={() => setMenuOpen(!menuOpen)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="aspect-square h-4" viewBox="0 0 320 512">
                    <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
                </svg>
            </IconButton>
        </div>
        {/* </HEADER> */}


        {/* <MAIN> */}
        <div className="px-6 py-3">
            <input
                type="file"
                // value={bucketName}
                onChange={(e) => setBucketName(e.target.files[0])}
            />
            <button
                onClick={() => {
                    supabase
                        .storage
                        .from('media-library')
                        .upload('e7270cff-6cb0-4fad-9d95-4af16a35dd67/test/avatar3.png', bucketName, {
                            cacheControl: '3600',
                            upsert: false
                        })
                        .then(({ data, error }) => {
                            console.log({ data, error })
                        })
                }}
                className="px-2.5 py-1 mb-4 text-xs rounded-full border text-slate-500 border-slate-400 hover:border-slate-900 hover:bg-slate-900 hover:text-white"
            >
                New Folder +
            </button>

            <ul className="text-sm">
                {files.map(({ id, name }, index) => {

                    return <li
                        key={`folder-path-${index}`}
                        className="mb-2"
                    >
                        <span
                            className={cls(
                                "hover:underline cursor-pointer flex gap-2 items-center",
                                id ? "font-[300]" : "font-[500]"
                            )}
                        >
                            {name}{!id && <ChevronUp className="rotate-180" />}
                        </span>

                    </li>
                })}
            </ul>
        </div>
        {/* </MAIN> */}

    </aside>

}

const ChevronUp = (props) => <svg xmlns="http://www.w3.org/2000/svg" className={cls("h-2.5", props?.className)} viewBox="0 0 512 512">
    <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z" />
</svg>