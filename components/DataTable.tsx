
import React from 'react';

interface Column<T> {
  header: string;
  accessor: keyof T;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  title?: string;
}

const DataTable = <T extends object,>(props: DataTableProps<T>): React.ReactNode => {
  const { columns, data, title } = props;

  return (
    <div className="bg-white rounded-lg shadow-card overflow-hidden">
      {title && <h3 className="text-lg font-semibold text-black px-6 py-4 border-b border-neutral-200">{title}</h3>}
      <div className="overflow-x-auto">
        <table className="w-full text-base text-left text-neutral-500">
          <thead className="text-sm text-neutral-700 uppercase bg-neutral-100">
            <tr>
              {columns.map((col, index) => (
                <th key={index} scope="col" className="px-6 py-3 font-medium tracking-wider">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-10 text-neutral-500">
                  <h4 className="font-semibold">No data available</h4>
                  <p className="text-sm">There are no items matching your current filters.</p>
                </td>
              </tr>
            ) : (
              data.map((item, rowIndex) => (
                <tr key={rowIndex} className="bg-white border-b border-neutral-200 hover:bg-neutral-50">
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                      {col.render ? col.render(item) : String(item[col.accessor] ?? '')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {data.length > 0 && (
         <div className="px-6 py-3 border-t border-neutral-200 flex items-center justify-between">
            <span className="text-sm text-neutral-500">Showing 1 to {data.length} of {data.length} results</span>
            <div className="inline-flex rounded-md shadow-sm">
                <button className="px-3 py-1 text-base border border-neutral-300 rounded-l-md hover:bg-neutral-100">Previous</button>
                <button className="px-3 py-1 text-base border-t border-b border-r border-neutral-300 rounded-r-md hover:bg-neutral-100">Next</button>
            </div>
         </div>
      )}
    </div>
  );
};

export default DataTable;