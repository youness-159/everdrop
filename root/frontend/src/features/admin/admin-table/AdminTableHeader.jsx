function AdminTableHeader({ children }) {
  return (
    <thead>
      <tr className={"border-b "}>{children}</tr>
    </thead>
  );
}

export default AdminTableHeader;
