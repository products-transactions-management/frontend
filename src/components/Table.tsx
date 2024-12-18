type TableProps = {
    headers: string[];
    data: any[];
    actions?: (id: number) => JSX.Element;
  };
  
  const Table: React.FC<TableProps> = ({ headers, data, actions }) => (
    <div className="sm:overflow-x-auto">
    <table className="w-full border-collapse border border-gray-200 sm:min-w-full sm:table-auto">
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header} className="border border-gray-200 p-2 text-left">{header}</th>
          ))}
          {actions && <th className="border border-gray-200 p-2">Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index} className="hover:bg-gray-100">
            {Object.values(row).map((value, idx) => (
              <td key={idx} className="border border-gray-200 p-2">{value}</td>
            ))}
            {actions && <td className="border border-gray-200 p-2">{actions(row.id)}</td>}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );

export default Table;