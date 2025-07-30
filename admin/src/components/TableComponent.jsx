import React from "react";

export default function TableComponent({ columns, data }) {
    return (
        <table className="w-full border-collapse text-sm border border-gray-400">
            <thead>
                <tr className="bg-[#082290] text-white font-semibold text-left">
                    {columns.map((col, index) => (
                        <th key={index} className={`p-2 ${col.className || ''}`}>
                            {col.header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex} className={`${rowIndex % 2 === 0 ? "bg-[#00000]" : "bg-[#d3d3d3]"} hover:bg-[#082290] hover:text-white cursor-pointer`}>
                        {columns.map((col, colIndex) => (
                            <td key={colIndex} className={`p-2 ${col.className || ''}`}>
                                {col.render ? col.render(row) : row[col.accessor]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}