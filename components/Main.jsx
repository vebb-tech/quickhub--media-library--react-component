import { forwardRef, useEffect, useRef, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRecoilState } from "recoil";
import { filesState } from "../atoms/filesState";
import cls from "../utils/cls";
import { selectedFileState } from "../atoms/selectedFileState";

import MountainSun from '../assets/icons/mountain-sun'

const supabase = createClientComponentClient()

// supabase
//     .storage
//     .getBucket(`media-library`)
//     .then(({ data, error }) => console.log(data, error))


const fetchFiles = async ({
    user_tenants,
    // path = '',
    search
}) => {

    const from = `media-library`;

    let { data, error } = await supabase
        .storage
        .from(from)
        .list(user_tenants.tenant_id, {
            limit: 100,
            offset: 0,
            sortBy: { column: 'name', order: 'asc' },
            search
        })

    console.log(data)

    if (Array.isArray(data) && data.length) {
        data = data
            .filter(({ id }) => id)
            .map(({ name }) => `${user_tenants.tenant_id}/${name}`)

        if (data.length) {
            const { data: paths, error } = await supabase
                .storage
                .from(from)
                .createSignedUrls(data, 86400) // 86400 === 1 day

            return paths
        }
    }


    return []

}

const verifyUserAccess = async ({ user, user_tenants }) => {

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

    if (user_tenants?.tenant_id)
        return await fetchFiles({ user_tenants })

    return { error: 'No tenant_id' }

}

export default ({ isOpen, user, user_tenants }) => {

    const [files, setFiles] = useRecoilState(filesState)

    useEffect(() => {
        if (!files && isOpen)
            verifyUserAccess({ user, user_tenants })
                .then(data => setFiles(data))
    }, [isOpen]);

    console.log(files)

    const classes = "main flex-1 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-8 gap-4 p-4"

    // Loading state animate-pulse
    if (!files)
        return <div className={classes}>
            {[
                { temp: true },
                { temp: true },
                { temp: true },
                { temp: true }
            ].map((file, index) => <MediaFile key={`media-file-${index}`} {...{ file }} />)}
        </div>

    return <div className={classes}>
        {files.map((file, index) => <MediaFile key={`media-file-${index}`} {...{ file }} />)}
    </div>
}

const MediaFile = ({
    file
}) => {

    const [selectedFile, setSelectedFile] = useRecoilState(selectedFileState)

    return <div
        onClick={() => setSelectedFile(file)}
        className={cls(
            "aspect-square p-2 cursor-pointer",
            "border ring-4",
            file?.temp
                ? "ring-transparent"
                : (selectedFile?.path === file?.path ? "ring-vt-500" : "ring-transparent hover:ring-vt-200")
        )}
    >
        {file?.temp
            ? <MountainSun className="p-2 h-full w-full fill-slate-200 animate-pulse" />
            : <img src={file.signedUrl} />
        }
    </div>
}