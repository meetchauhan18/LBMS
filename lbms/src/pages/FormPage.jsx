import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import localStorageService from '../utils/localStorageService';
import { Box, Button, TextField } from '@mui/material';

const FormPage = () => {
  const [form, setForm] = useState({ id: '', author: '', book: '' })
  const [message, setMessage] = useState('');
  const navigate = useNavigate();


  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value, id:uuidv4() })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.author || !form.book) {
      setMessage('All fields are required.')
      return
    }
    const data = localStorageService.get('libraryData', []);
    data.push({ ...form })
    localStorageService.set('libraryData', data);
    toast("Book added Successfully.")
    setForm({ id: '', author: '', book: '' })
    navigate('/');
  }

  return (
    <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '80vh', background: '#f7f7f7', paddingTop: 40 }}>
      <form onSubmit={handleSubmit} style={{ background: '#fff', padding: 24, borderRadius: 8, minWidth: 320 }}>
        <h2 style={{ marginBottom: 16, fontWeight: 600, fontSize: 24 }}>Add Book</h2>
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
        <Button type="submit" style={{ width: '100%', padding: 10, borderRadius: 4, background: 'grey', color: 'white', cursor: "pointer",  border: 'none', fontWeight: 600 }}>Add</Button>
        {message ?  (<div style={{ marginTop: 12, color: '#1976d2' }}>{message}</div>) : (null)}
      </form>
    </Box>
  )
}

export default FormPage
