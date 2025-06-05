import React, { useState } from 'react';
import BookTable from '../components/BookTable';
import { Box, Container, List, ListItem, ListItemText, TextField, Typography, InputAdornment, IconButton, Button, Tooltip, Menu, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { MdClear } from 'react-icons/md';
import localStorageService from '../utils/localStorageService';
import EditModalExpirimental from '../components/EditModalExpirimental';
import { toast } from 'react-toastify';
import DeleteDialog from '../components/DeleteDialog';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { IoBookSharp } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { HiFilter, HiPlus } from "react-icons/hi";

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
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [selectedAuthor, setSelectedAuthor] = useState('');

    const handleFilterMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleFilterMenuClose = () => {
        setAnchorEl(null);
    };

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
    const navigate = useNavigate();

    return (
        <Box className="home-page" style={{ minHeight: '100vh', background: '#e6e6e6', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: 80 }}>
            <Container variant="outlined" style={{ maxWidth: 800, display: "flex", flexDirection: "column", gap: "10px"}}>
                <Container sx={{ width: '100%', height: "auto", display: 'flex', flexDirection: "row", gap: 2, backgroundColor: 'white', padding: 2, borderRadius: '10px' }}>
                    <Container sx={{ width: '100%', backgroundColor: '#e6e6e6', display: 'flex', height: "80px", alignItems: 'center', justifyContent: 'space-evenly', borderRadius: '10px'}}>
                        <Typography variant="h6" align="center" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <IoBookSharp /> Total Books: {data.length}
                        </Typography>
                    </Container>
                    <Container sx={{ width: '100%', backgroundColor: '#e6e6e6', display: 'flex', height: "80px", alignItems: 'center', justifyContent: 'space-evenly', borderRadius: '10px' }}>
                        <Typography variant="h6" align="center"  sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <FaUser /> Total Authors: {uniqueAuthors.length}
                        </Typography>
                    </Container>
                </Container>
                <Container sx={{ width: '100%', backgroundColor: 'white', display: 'flex', alignItems: 'center', padding: 2, borderRadius: '10px', position: 'relative' }}>
                    <Box style={{ position: 'relative', width: '100%' }}>
                        <TextField
                            value={search}
                            variant="outlined"
                            onChange={e => { setSearch(e.target.value); setPage(0); }}
                            placeholder="Search Books"
                            style={{ width: '100%', borderRadius: 4, border: '1px solid blue', backgroundColor: 'white' }}
                        />
                        {search && (
                            <Tooltip title={"Clear Search"}>
                                <IconButton
                                    aria-label="clear search"
                                    onClick={() => setSearch("")}
                                    size="small"
                                    style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)' }}
                                >
                                    Clear
                                </IconButton>
                            </Tooltip>

                        )}
                    </Box>
                    <Container>
                        <Tooltip title="Add Book">
                            <IconButton aria-label="add book" onClick={() => { navigate('/form') }}>
                                <HiPlus style={{ fontSize: '24px', color: 'black' }} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Filter by Author">
                            <IconButton
                                aria-label="filter by author"
                                onClick={handleFilterMenuOpen}
                            >
                                <HiFilter style={{ fontSize: '24px', color: 'black' }} />
                            </IconButton>
                        </Tooltip>
                        {open && (<Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleFilterMenuClose}
                            slotProps={{
                                list: {
                                    'aria-labelledby': 'basic-button',
                                },
                            }}
                        >
                            {uniqueAuthors.map((author) => (
                                <MenuItem onClick={() => setSelectedAuthor(author)} key={author} value={author}>
                                    {author}
                                </MenuItem>
                            ))}
                        </Menu>)}

                    </Container>
                </Container>
                <BookTable
                    books={filtered}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onDuplicate={createDuplicate}
                    selectedAuthor={selectedAuthor}
                    setSelectedAuthor={setSelectedAuthor}
                />
                <DeleteDialog open={deleteDialogOpen} onClose={() => { setDeleteDialogOpen(false); setDeleteTarget(null); }}
                    data={deleteTarget ? data.find(item => item.id === deleteTarget) : null}
                    onDelete={row => handleDeleteDialog(row.id)} />
                <EditModalExpirimental open={openReuseableModal} onClose={() => { setReuseableModalOpen(false) }} data={editRow} onSave={handleEditSave} />
            </Container>
            <Container variant="outlined" style={{ maxWidth: 800, }}>
                <Container sx={{ width: '100%', height: "auto", backgroundColor: 'white', display: 'flex', flexDirection: "column", borderRadius: '10px', pt: 2 }}>

                    <Typography variant="h6" align="center" style={{ fontWeight: 600 }}>
                        Searched Books & Author Counts
                    </Typography>
                    <Container sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {search.length > 0 ? (
                            <Container >
                                <Typography variant="body1">
                                    Total Authors in Table: {uniqueAuthors.length}
                                </Typography>
                                <Typography variant="body1">
                                    Total Books in Table: {uniqueBooks.length}
                                </Typography>
                                {/* Author list with book counts */}
                                <List style={{ marginTop: 12, borderBottom: '2px solid red' }} sx={{ display: 'flex', gap: 2, flexDirection: 'column', overflowY: 'auto', maxHeight: '300px' }}>
                                    {Array.from(uniqueAuthors).map(author => {
                                        const count = filtered.filter(book => book?.author === author).length;
                                        return (
                                            <ListItem key={author} style={{ fontSize: 16, padding: '8px 16px', border: '2px solid red' }}>
                                                <ListItemText primary={<b>{author}</b>} secondary={`${count} book${count > 1 ? 's' : ''}`} />
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            </Container>
                        ) : (
                            <Container>
                                <Typography variant="body1">
                                    Total Authors in Table: {uniqueAuthors?.length}
                                </Typography>
                                <Typography variant="body1">
                                    Total Books in Table: {data?.length}
                                </Typography>
                                {/* Author list with book counts */}
                                <List sx={{ display: 'flex', flexDirection: 'column', gap: 2, overflowY: 'auto', maxHeight: '300px' }}>
                                    {Array.from(new Set(data.map(book => book?.author))).map(author => {
                                        const count = author ? data.filter(book => book?.author === author)?.length : 0;
                                        if (count === 0) return null; // Skip authors with no books
                                        return (
                                            <ListItem key={author} style={{ fontSize: 16, border: '2px solid red' }}>
                                                <ListItemText primary={<b>{author}</b>} secondary={`${count} book${count > 1 ? 's' : ''}`} />
                                            </ListItem>
                                        );
                                    })}
                                </List>
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
