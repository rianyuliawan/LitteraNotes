import React from 'react';
import { Card, Avatar, Tooltip } from 'antd';
import { RiLockLine, RiStarFill, RiShareForwardFill } from "react-icons/ri";

const CardNote = ({ note }) => {
    return (
        <div className='relative'>
            <Card
                className='note-card !border !rounded-2xl cursor-pointer'
                hoverable
                tabIndex={0}
            >
                <h3 className='font-semibold mb-2 text-neutral-800 text-xl sm:text-base'>
                    {note?.title}
                </h3>

                <div
                    className='text-sm text-neutral-800 font-normal break-words'
                    dangerouslySetInnerHTML={{ __html: note?.content }}
                />

                <div className='flex flex-row justify-between gap-3 mt-4'>
                    <div className='flex items-center gap-3 '>
                        <Avatar
                            src={note?.user?.profile || undefined}
                            alt='image user'
                            size={42}
                            className='shrink-0'
                        />

                        <div className='flex flex-col'>
                            <h4 className='text-base font-semibold truncate'>{note?.user?.username}</h4>
                            <p className='text-xs font-normal'>{note.date}</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-3'>
                        <Tooltip title={"Private"}>
                            <RiLockLine size={18} className='text-neutral-600'/>
                        </Tooltip>

                        <Tooltip title={"Favorite"}>
                            <RiStarFill size={25} className='text-neutral-600'/>
                        </Tooltip>

                        <Tooltip title={"Share"}>
                            <RiShareForwardFill size={27} className='text-neutral-600'/>
                        </Tooltip>
                    </div>

                </div>

            </Card>

        </div>
    )
}

export default CardNote