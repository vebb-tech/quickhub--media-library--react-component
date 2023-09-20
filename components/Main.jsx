import { useEffect, useRef, useState } from 'react'
import { forwardRef } from 'react';
import { useRecoilState } from "recoil";
import { filesState } from "../atoms/filesState";
import cls from "../utils/cls";
import { selectedFileState } from "../atoms/selectedFileState";

import MountainSun from '../assets/icons/mountain-sun'

import supabase from "@/supabase";
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

const verifyUserAccess = async ({ user, user_tenants, ac }) => {

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
                .abortSignal(ac.signal)

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
        const ac = new AbortController()

        if (!files && isOpen)
            verifyUserAccess({ user, user_tenants, ac })
                .then(data => setFiles(data))

        return () => { ac.abort() }
    }, [isOpen]);

    // console.log(files)

    const classes = "main flex-1 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 content-baseline p-2 md:p-4" // gap-2 md:gap-4

    // Loading state animate-pulse
    if (!files)
        return <div className={classes + " overflow-auto"}>
            {new Array(56)
                .fill({ temp: true })
                .map((file, index) => (
                    <MediaFile key={`media-file-${index}`} {...{ file }} />
                ))}
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
            "p-2 cursor-pointer aspect-square h-max"
        )}
    >
        <div
            className={cls(
                "p-2 border ring-4 aspect-square h-max",
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
    </div>
}