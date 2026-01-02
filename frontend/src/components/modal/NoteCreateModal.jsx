import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Segmented, message } from 'antd';
import { RichTextEditor } from '../RichTextEditor';
import { RiGlobalLine, RiEyeOffLine, RiLockLine } from "react-icons/ri";
import { useNote } from '@/store/useNote'
import { useAuth } from '@/store/useAuth';

function isEmptyHtml(html) {
    const text = (html || '').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim();
    return text.length === 0;
}

export const NoteCreateModal = ({ open, onClose, onCreated }) => {
    const [status, setStatus] = useState('public');
    const [loading, setLoading] = useState(false);
    const formKey = open ? "open" : "closed";

    const { token } = useAuth();
    const { createNote } = useNote();

    useEffect(() => {
        if (!open) {
            setStatus('public')
        }
    }, [open])

    async function onFinishCreateNote(v) {
        try {
            if (!token) {
                message.warning("Please Login First!")
                onClose?.()
                return
            }
            setLoading(true);

            const payload = {
                title: (v.title || "Untitled").trim(),
                content: (v.content || "").trim(),
                status,
                ...status === "protected"
                    ? { password: v.password, password_hint: v.password_hint }
                    : {}
            }

            const note = await createNote(payload)

            message.success('Note Successfully Created!')
            setStatus('public')
            onCreated?.(note)
        } catch (error) {
            setLoading(false)
            message.error(error?.message || "Note Failed to be Created!")
        } finally {
            setLoading(false)
            onClose?.()
        }
    }

    const SegmentedList = [
        { label: <span className='inline-flex items-center gap-2'><RiGlobalLine />Public</span>, value: 'public' },
        { label: <span className='inline-flex items-center gap-2'><RiEyeOffLine />Private</span>, value: 'private' },
        { label: <span className='inline-flex items-center gap-2'><RiLockLine />Protected</span>, value: 'protected' },
    ]

    return (
        <Modal
            title={<span className='text-xl font-semibold'>Let's Own Your Note!</span>}
            open={open}
            onCancel={onClose}
            okText="Submit"
            centered
            confirmLoading={loading}
            width={640}
            className='!rounded-2xl'
            styles={{ content: { borderRadius: 16 }, body: { paddingTop: 8 } }}
            okButtonProps={{ form: "noteCreateModal", htmlType: 'submit' }}

        >
            <Form
                id="noteCreateModal"
                key={formKey}
                onFinish={onFinishCreateNote}
                preserve={false}
                layout='vertical'
            >
                <Form.Item label="Title" name='title'>
                    <Input placeholder='Note Title (optional)' maxLength={150} />
                </Form.Item>

                <Form.Item label="Content" name="content" valuePropName='value' rules={
                    [{
                        validator: (_, value) =>
                            isEmptyHtml(value)
                                ? Promise.reject(new Error("Note content cannot be empty"))
                                : Promise.resolve(),

                    }]
                }
                >
                    <RichTextEditor placeholder="What's happening today?" />
                </Form.Item>

                <div className='flex items-center justify-between gap-4'>
                    <Form.Item label="Visibility" className='mb-0'>
                        <Segmented
                            value={status}
                            onChange={setStatus}
                            options={SegmentedList}
                        />


                    </Form.Item>

                    {status === "protected" && (
                        <div className='flex-1 grid grid-cols-1 md:grid-cols-2 gap-3'>
                            <Form.Item
                                name="password"
                                label="Password"
                                rules={[{ required: true, message: "Password is required for protected notes" }]}
                                className='mb-0'
                            >
                                <Input.Password placeholder="Enter password for protected notes" />
                            </Form.Item>

                            <Form.Item
                                name="password_hint" label="Hint (optional)" className='mb-0'
                            >
                                <Input placeholder='Example: Your favorite food' />
                            </Form.Item>
                        </div>

                    )}
                </div>

            </Form>


        </Modal>
    )
}

