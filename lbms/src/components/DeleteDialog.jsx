import React from 'react'
import ReUseableModal from './ReUseableModal.jsx'
import { Button } from '@mui/material'

const DeleteDialog = ({ open, onClose, data, onDelete }) => {
    return (
        <ReUseableModal open={open} onClose={onClose} title="Delete Book" maxWidth="sm" actions={[
            <Button onClick={onClose} key="cancel">Cancel</Button>,
            <Button type='submit' onClick={() => onDelete(data)} variant="contained" color="primary" key="delete">Delete</Button>
        ]}>
            <div>
                {data ? (
                    <>
                        <p>Are you sure you want to delete the book <strong>{data.book}</strong> by <strong>{data.author}</strong>?</p>
                        <p>This action cannot be undone.</p>
                    </>
                ) : (
                    <p>No book selected for deletion.</p>
                )}
            </div>
        </ReUseableModal >
    )
}

export default DeleteDialog
