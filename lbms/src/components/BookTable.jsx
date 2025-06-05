import React, { useMemo, useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Tooltip, TablePagination, Button, Typography, Container } from '@mui/material';
import { MdDelete, MdEdit } from 'react-icons/md';
import { HiDocumentDuplicate } from 'react-icons/hi';
import { FaSort, FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const BookTable = ({
    books,
    page,
    rowsPerPage,
    onPageChange,
    onRowsPerPageChange,
    onDelete,
    onDuplicate,
    selectedAuthor,
    setSelectedAuthor
}) => {
    const navigate = useNavigate();
    const [authorSort, setAuthorSort] = useState(null); // null, 'asc', 'desc'
    const [bookSort, setBookSort] = useState(null); // null, 'asc', 'desc'

    const uniqueAuthors = useMemo(() => [...new Set(books.map(b => b.author))], [books]);

    // Filter books by selectedAuthor if provided (case-insensitive, trimmed)
    const filteredBooks = selectedAuthor
        ? books.filter(b => (b.author || '').trim().toLowerCase() === selectedAuthor.trim().toLowerCase())
        : books;
    console.log('Filtered Books:', filteredBooks);
    console.log('Selected Author:', selectedAuthor);

    // Pagination should use filteredBooks
    const paginatedBooks = filteredBooks.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    const handleSort = (column, direction) => {
        if (column === 'author') {
            setAuthorSort(direction);

            books.sort((a, b) => {
                if (direction === 'asc') {
                    return a.author.localeCompare(b.author);
                } else if (direction === 'desc') {
                    return b.author.localeCompare(a.author);
                } else {
                    return 0; // No sorting
                }
            });
        } else if (column === 'book') {
            setBookSort(direction);
            books.sort((a, b) => {
                if (direction === 'asc') {
                    return a.book.localeCompare(b.book);
                } else if (direction === 'desc') {
                    return b.book.localeCompare(a.book);
                } else {
                    return 0; // No sorting
                }
            });
        }
        // Reset page to 0 when sorting
        onPageChange(0);
    };

    const actionButtons = [
        {
            title: "Edit",
            color: "primary",
            icon: <MdEdit size={24} />,
            onClick: (book) => navigate(`/edit/${book.id}`),
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
        filteredBooks.length === 0 ? (
            selectedAuthor ? (
                <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
                    <Table>
                        <TableHead sx={{ backgroundColor: '#e5e5e5', color: '#fff' }}>
                            <TableRow>
                                {["Sr No.", 'Author Name', 'Book Name', 'Action'].map((header) => (
                                    <TableCell sx={{ fontWeight: 'bold', border: '2px solid red' }} align='center' key={header}>{header}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan={4} align='center'>
                                    <Container sx={{ textAlign: 'center', padding: '20px' }}>
                                        <Typography variant="h6" color="textSecondary">No Books Found for "{selectedAuthor}"</Typography>
                                    </Container>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
                    <Table>
                        <TableHead sx={{ backgroundColor: '#e5e5e5', color: '#fff' }}>
                            <TableRow>
                                {["Sr No.", 'Author Name', 'Book Name', 'Action'].map((header) => (
                                    <TableCell sx={{ fontWeight: 'bold', border: '2px solid red' }} align='center' key={header}>{header}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan={4} align='center'>
                                    <Container sx={{ textAlign: 'center', padding: '20px' }}>
                                        <Typography variant="h6" color="textSecondary">No Books Found</Typography>
                                    </Container>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>)
        ) : (
            <TableContainer component={Paper} sx={{ borderRadius: '10px', overflowX: 'auto' }}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#e5e5e5', color: '#fff' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', border: '2px solid red' }} align='center'>Sr No.</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', border: '2px solid red' }} align='center'>
                                Author Name
                                <IconButton size="small" onClick={() => handleSort('author', authorSort === 'asc' ? 'desc' : 'asc')} sx={{ p: 0, ml: 1, verticalAlign: 'middle' }}>
                                    {authorSort === 'asc' ? <FaSortAlphaUp /> : authorSort === 'desc' ? <FaSortAlphaDown /> : <FaSort />}
                                </IconButton>
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold', border: '2px solid red' }} align='center'>
                                Book Name
                                <IconButton size="small" onClick={() => handleSort('book', bookSort === 'asc' ? 'desc' : 'asc')} sx={{ p: 0, ml: 1, verticalAlign: 'middle' }}>
                                    {bookSort === 'asc' ? <FaSortAlphaUp /> : bookSort === 'desc' ? <FaSortAlphaDown /> : <FaSort />}
                                </IconButton>
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold', border: '2px solid red' }} align='center'>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedBooks.map((book, idx) => (
                            <TableRow key={book?.uuid || book?.id || idx}>
                                <TableCell align='center'>{page * rowsPerPage + idx + 1}</TableCell>
                                <TableCell align='center'>{book?.author} </TableCell>
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
                    count={filteredBooks.length}
                    page={page}
                    onPageChange={(event, newPage) => onPageChange(newPage)}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={event => onRowsPerPageChange(parseInt(event.target.value, 10))}
                    rowsPerPageOptions={[5, 10, 25]}
                />
            </TableContainer>
        )
    );
}

export default BookTable