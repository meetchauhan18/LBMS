import React from 'react'
import ReUseableModal from './ReUseableModal'
import { Button } from '@mui/material'
import { useState } from 'react'
import { useEffect } from 'react'

const EditModalExpirimental = ({ open, onClose, data, onSave }) => {
    const [form, setForm] = useState({ author: '', book: '', id: '' });

    useEffect(() => {
        if (data) {
            setForm({ author: data.author || '', book: data.book || '', id: data.id || '' });
        }
    }, [data]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(form);
        onClose();
    };
    return (
        <ReUseableModal open={open} onClose={onClose} title="Edit Book Details" maxWidth="sm" actions={[
            <Button onClick={onClose} key="cancel">Cancel</Button>,
            <Button type='submit' onClick={handleSubmit} variant="contained" color="primary" key="save">Save</Button>
            

        ]}>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="author"
                    value={form.author}
                    onChange={handleChange}
                    placeholder="Author Name"
                    style={{ width: '100%', marginBottom: 12, padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
                    required
                />
                <input
                    type="text"
                    name="book"
                    value={form.book}
                    onChange={handleChange}
                    placeholder="Book Name"
                    style={{ width: '100%', marginBottom: 16, padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
                    required
                />
            </form>

        </ReUseableModal >
    )
}

export default EditModalExpirimental
