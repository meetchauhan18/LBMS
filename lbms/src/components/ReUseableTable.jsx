import React from 'react'

const ReUseableTable = ({
    headers,
    data,
    ...props
}) => {
    return (
        <table {...props}>
            <thead>
                <tr>
                    {headers.map((header) => (
                        <th key={header.id}>{header.label}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr key={index}>
                        {headers.map((header) => (
                            <td key={header.id}>
                                {/* Conditional rendering inside the component */}
                                {header.id === 'action' ? (
                                    <button onClick={() => alert(`Action on ${row.name}`)}>Action</button>
                                ) : header.id === 'options' ? (
                                    <select>
                                        {row.options.map((option, idx) => (
                                            <option key={idx} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    row[header.id]
                                )}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default ReUseableTable
