import AdminNav from "../../../components/layouts/AdminNav";

function AdminPassword() {
  return (
    <div className="container mx-auto px-8 py-4 flex">
      <aside className="w-1/4">
        <AdminNav />
      </aside>

      <div className="w-3/4">
        <h2 className="text-base font-semibold mb-4">Admin Password</h2>
      </div>
    </div>
  );
}

export default AdminPassword;
