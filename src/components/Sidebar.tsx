const Sidebar = () => (
    <div className="hidden md:flex flex-col w-64 bg-secondary text-white h-screen p-4">
      <a href="/" className="mb-4">Dashboard</a>
      <a href="/products" className="mb-4">Products</a>
      <a href="/transactions" className="mb-4">Transactions</a>
    </div>
  );

export default Sidebar;