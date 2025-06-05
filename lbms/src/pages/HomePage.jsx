import React, { useState } from 'react';
import BookTable from '../components/BookTable';
import { Box, Container, List, ListItem, ListItemText, TextField, Typography, InputAdornment, IconButton, Button } from '@mui/material';
import { MdClear } from 'react-icons/md';
import localStorageService from '../utils/localStorageService';
import EditModalExpirimental from '../components/EditModalExpirimental';
import { toast } from 'react-hot-toast';
import DeleteDialog from '../components/DeleteDialog';
import { v4 as uuidv4 } from 'uuid';


const HomePage = () => {
    const [search, setSearch] = useState('');
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editRow, setEditRow] = useState(null);
    const [data, setData] = useState(() => localStorageService.get('libraryData', []));
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const filtered = data.filter(row =>
        row.author?.toLowerCase().includes(search.toLowerCase()) || row.id?.toLowerCase().includes(search.toLowerCase()) || row.book?.toLowerCase().includes(search.toLowerCase())
    );
    const uniqueAuthors = [...new Set(data.map(book => book.author))];
    const uniqueBooks = [...new Set(filtered?.map(book => book.book))];
    const [openReuseableModal, setReuseableModalOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);



    const handleEdit = (data) => {
        setEditRow(data);
        setReuseableModalOpen(true);
    };

    const handleDelete = (row) => {
        setDeleteTarget(row);
        setDeleteDialogOpen(true);
    };

    const handleEditSave = (currentBookdata) => {
        const newEditedData = data.map(bookData => bookData.id === currentBookdata.id ? currentBookdata : bookData);
        setData(newEditedData);
        localStorageService.set('libraryData', newEditedData);
        setEditModalOpen(false);
        setEditRow(null);
        toast(`${currentBookdata.author} updated successfully.`);
    };

    const handleDeleteDialog = (id) => {
        const newData = data.filter(item => item.id !== id);
        const deletedData = data.find(item => item.id === id)?.author;
        setData(newData);
        toast(`${deletedData} deleted successfully.`);
        localStorageService.set('libraryData', newData);
        setDeleteDialogOpen(false);
        setDeleteTarget(null);
    };

    const createDuplicate = (id) => {
        const book = data.find(row => row.id === id);
        if (book) {
            const duplicateBook = { ...book, id: uuidv4(), book: `${book.book} (Copy)` };
            toast(`${book.author} book duplicated successfully.`);
            const duplicateBookData = [...data, duplicateBook];
            setData(duplicateBookData);
            localStorageService.set('libraryData', duplicateBookData);
        }
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Box className="home-page" style={{ minHeight: '100vh', background: '#e6e6e6', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: 40 }}>
            <Container variant="outlined" style={{ maxWidth: 800, display: "flex", flexDirection: "column", gap: "10px" }}>
                <Container sx={{ width: '100%', backgroundColor: 'white', display: 'flex', height: "80px", alignItems: 'center', justifyContent: 'space-evenly', borderRadius: '10px' }}>
                    <Typography variant="h6" align="center">
                        Total Books: {data.length}
                    </Typography>
                    <Typography variant="h6" align="center">
                        Total Authors: {uniqueAuthors.length}
                    </Typography>
                </Container>
                <div style={{ position: 'relative', width: '100%' }}>
                    <TextField
                        value={search}
                        variant="outlined"
                        onChange={e => { setSearch(e.target.value); setPage(0); }}
                        placeholder="Search Books"
                        style={{ width: '100%', borderRadius: 4, border: '1px solid blue', backgroundColor: 'white' }}
                    />
                    {search && (
                        <IconButton
                            aria-label="clear search"
                            onClick={() => setSearch("")}
                            size="small"
                            style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)' }}
                        >
                            <MdClear />
                        </IconButton>
                    )}
                </div>
                <BookTable
                    books={filtered}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onDuplicate={createDuplicate}
                />
                <DeleteDialog open={deleteDialogOpen} onClose={() => { setDeleteDialogOpen(false); setDeleteTarget(null); }}
                    data={deleteTarget ? data.find(item => item.id === deleteTarget) : null}
                    onDelete={row => handleDeleteDialog(row.id)} />
                <EditModalExpirimental open={openReuseableModal} onClose={() => { setReuseableModalOpen(false) }} data={editRow} onSave={handleEditSave} />
            </Container>
            <Container variant="outlined" style={{ maxWidth: 800 }}>
                <Container sx={{ width: '100%', height: "400px", backgroundColor: 'white', display: 'flex', flexDirection: "column", borderRadius: '10px', pt: 2 }}>

                    <Typography variant="h6" align="center" style={{ fontWeight: 600 }}>
                        Searched Books & Author Counts
                    </Typography>
                    <Container sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {search.length > 0 ? (
                            <Container>
                                <Typography variant="body1">
                                    Total Authors in Table: {uniqueAuthors.length}
                                </Typography>
                                <Typography variant="body1">
                                    Total Books in Table: {uniqueBooks.length}
                                </Typography>
                                {/* Author list with book counts */}
                                <List style={{ marginTop: 12 }}>
                                    {Array.from(uniqueAuthors).map(author => {
                                        const count = filtered.filter(book => book.author === author).length;
                                        return (
                                            <ListItem key={author} style={{ fontSize: 16 }}>
                                                <ListItemText primary={<b>{author}</b>} secondary={`${count} book${count > 1 ? 's' : ''}`} />
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            </Container>
                        ) : (
                            <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                                <Typography variant="h6" style={{ fontWeight: 600 }}>
                                    No data Found
                                </Typography>
                            </Container>
                        )
                        }
                    </Container>
                </Container>
            </Container>
        </Box>
    );
};

export default HomePage;
