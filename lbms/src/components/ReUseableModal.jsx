import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material'
import React from 'react'
import { IoCloseCircleOutline } from 'react-icons/io5'

const ReUseableModal = ({ open, onClose, title, children, actions, maxWidth, ...props}) => (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={maxWidth} {...props}>
        <DialogTitle sx={{ m: 0, p: 2 }}>
            {title}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{ position: 'absolute', right: 8, top: 8 }}
                >
                    <IoCloseCircleOutline />
                </IconButton>
            ) : null}
        </DialogTitle>
        <DialogContent dividers>
            {children}
        </DialogContent>
        {actions && <DialogActions>{actions}</DialogActions>}
    </Dialog>
)

export default ReUseableModal
