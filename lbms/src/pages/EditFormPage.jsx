import React, { useState, useEffect } from 'react'
import localStorageService from '../utils/localStorageService.js'
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, TextField } from '@mui/material';
import { toast } from 'react-toastify';

const EditFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ id: '', author: '', book: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const data = localStorageService.get('libraryData', []);
    const bookToEdit = data?.find(bookData => bookData?.id === id);
    if (bookToEdit) {
      setForm(bookToEdit);
    } else {
      toast.error('Book not found.');
      setTimeout(() => {
        navigate('/');
      }, 1000);
    }
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form?.author || !form?.book) {
      setMessage('All fields are required.');
      return;
    }
    const data = localStorageService.get('libraryData', []);
    const idx = data.findIndex(bookData => bookData.id === id);
    console.log('Index of book to edit:', idx);
    const IfNoChanges =
      form?.author === data[idx]?.author &&
      form?.book === data[idx]?.book;

    if (IfNoChanges) {
      setMessage('No changes detected.');
      return;
    }
    if (idx !== -1) {
      data[idx] = { ...form };
      localStorageService.set('libraryData', data);
      toast.success('Book updated successfully.');
      setTimeout(() => navigate('/'), 1000);
    } else {
      toast.error('Book Edit failed.');
    }
  };

  return (
    <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '80vh', background: '#f7f7f7', paddingTop: 40 }}>
      <form onSubmit={handleSubmit} style={{ background: '#fff', padding: 24, borderRadius: 8, minWidth: 320 }}>
        <h2 style={{ marginBottom: 16, fontWeight: 600, fontSize: 24 }}>Edit Book</h2>
        <TextField
          type="text"
          name="author"
          value={form.author}
          onChange={handleChange}
          placeholder="Author Name"
          style={{ width: '100%', marginBottom: 12, padding: 8, borderRadius: 4, border: '1px solid blue' }}
          required
        />
        <TextField
          type="text"
          name="book"
          value={form.book}
          onChange={handleChange}
          placeholder="Book Name"
          style={{ width: '100%', marginBottom: 16, padding: 8, borderRadius: 4, border: '1px solid blue' }}
          required
        />
        <Button type="submit" style={{ width: '100%', padding: 10, borderRadius: 4, background: 'grey', color: 'white', cursor: "pointer", border: 'none', fontWeight: 600 }}>Update</Button>
        {message ? (<div style={{ marginTop: 12, color: 'red', textAlign: 'center' }}>{message}</div>) : (null)}
      </form>
    </Box>
  )
}

export default EditFormPage;
