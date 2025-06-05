import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React, { useState } from 'react';

const ReUseableTable = ({ headers, data, rowsPerPage = 5 }) => {
  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  // Sorting logic
  const sortedData = React.useMemo(() => {
    if (!sortBy) return data;
    return [...data].sort((a, b) => {
      const valA = a[sortBy] ?? '';
      const valB = b[sortBy] ?? '';
      return sortOrder === 'asc'
        ? valA.toString().localeCompare(valB.toString(), undefined, { sensitivity: 'base' })
        : valB.toString().localeCompare(valA.toString(), undefined, { sensitivity: 'base' });
    });
  }, [data, sortBy, sortOrder]);

  // Pagination logic
  const paginatedData = React.useMemo(() =>
    sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [sortedData, page, rowsPerPage]
  );

  // Handle column sorting
  const handleSort = (columnId) => {
    setSortBy((prev) => prev === columnId ? prev : columnId);
    setSortOrder((prev) => (sortBy === columnId ? (prev === 'asc' ? 'desc' : 'asc') : 'asc'));
    setPage(0);
  };

  return (
    <Box>
      <Table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <th
                key={header.id}
                style={{ cursor: 'pointer', borderBottom: '2px solid #ccc', padding: '10px' }}
                onClick={() => handleSort(header.id)}
              >
                {header.label}
                {sortBy === header.id && ` (${sortOrder})`}
              </th>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={headers.length} style={{ textAlign: 'center', padding: '10px' }}>
                No data found.
              </TableCell>
            </TableRow>
          ) : paginatedData.map((row, index) => (
            <TableRow
              key={index}
              style={{ cursor: 'pointer', borderBottom: '1px solid #eee' }}
            >
              {headers.map((header) => (
                <td key={header.id} style={{ padding: '10px' }}>
                  {header.id === 'action' ? (
                    <button
                      onClick={e => { e.stopPropagation(); alert(`Action on ${row.name}`); }}
                    >
                      Action
                    </button>
                  ) : header.id === 'options' ? (
                    <select onClick={e => e.stopPropagation()}>
                      {(row.options || []).map((option, idx) => (
                        <option key={idx} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : (
                    row[header.id]
                  )}
                </td>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Pagination Controls (uncomment if needed)
      <Box style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <Button onClick={() => setPage((p) => Math.max(p - 1, 0))} disabled={page === 0}>
          Previous
        </Button>
        <span>Page {page + 1}</span>
        <Button
          onClick={() => setPage((p) => ((p + 1) * rowsPerPage < sortedData.length ? p + 1 : p))}
          disabled={(page + 1) * rowsPerPage >= sortedData.length}
        >
          Next
        </Button>
      </Box>
      */}
    </Box>
  );
};

export default ReUseableTable;
