import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Tooltip, TablePagination, Button, Typography, Container } from '@mui/material';
import { MdDelete, MdEdit } from 'react-icons/md';
import { HiDocumentDuplicate } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const BookTable = ({
    books,
    page,
    rowsPerPage,
    onPageChange,
    onRowsPerPageChange,
    onEdit,
    onDelete,
    onDuplicate
}) => {
    const navigate = useNavigate();
    // Calculate the paginated data
    const paginatedBooks = books.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    const actionButtons = [
        {
            title: "Edit",
            color: "primary",
            icon: <MdEdit size={24} />,
            onClick: onEdit,
        },
        {
            title: "Delete",
            color: "error",
            icon: <MdDelete size={24} />,
            onClick: (book) => onDelete(book.id),
        },
        {
            title: "Duplicate",
            color: "success",
            icon: <HiDocumentDuplicate size={24} />,
            onClick: (book) => onDuplicate(book.id),
        },
    ];

    return (
        books.length === 0 ? (
            <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <Typography sx={{ textAlign: 'center', marginTop: '20px', fontSize: '18px', color: '#888' }}>
                No Books Found
            </Typography>
            <Button variant="contained" color="primary" sx={{ marginTop: '20px' }} onClick={() => navigate('/form')}>
                Add Book
            </Button>
            </Container>
        ) : (
            <TableContainer component={Paper} sx={{ borderRadius: '10px', overflowX: 'auto' }}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#e5e5e5', color: '#fff' }}>
                        <TableRow>
                            {["Sr No.", 'Author Name', 'Book Name', 'Action'].map((header) => (
                                <TableCell sx={{ fontWeight: 'bold', border: '2px solid red' }} align='center' key={header}>{header}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedBooks.map((book, idx) => (
                            <TableRow key={book?.uuid || book?.id || idx}>
                                <TableCell align='center'>{page * rowsPerPage + idx + 1}</TableCell>
                                <TableCell align='center'>{book?.author}</TableCell>
                                <TableCell align='center'>{book?.book}</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }} align='center'>
                                    {actionButtons.map(({ title, color, icon, onClick }, index) => (
                                        <Tooltip key={index} title={title}>
                                            <IconButton 
                                                color={color}
                                                onClick={() => onClick(book)}
                                                sx={{ margin: '0 4px' }}
                                            >
                                                {icon}
                                            </IconButton>
                                        </Tooltip>
                                    ))}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    count={books.length}
                    page={page}
                    onPageChange={onPageChange}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={onRowsPerPageChange}
                    rowsPerPageOptions={[5, 10, 25]}
                />
            </TableContainer>
        )
    );
}

export default BookTable