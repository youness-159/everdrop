import AdminOutletSectionHeader from "../../../features/admin/AdminOutletSectionHeader.jsx";
import AdminTable from "../../../features/admin/admin-table/AdminTable.jsx";
import AdminTableHeader from "../../../features/admin/admin-table/AdminTableHeader.jsx";
import AdminTableHeaderColumn from "../../../features/admin/admin-table/AdminTableHeaderColumn.jsx";
import AdminTableBody from "../../../features/admin/admin-table/AdminTableBody.jsx";
import AdminTableBodyRow from "../../../features/admin/admin-table/AdminTableBodyRow.jsx";
import AdminTableBodyColumn from "../../../features/admin/admin-table/AdminTableBodyColumn.jsx";
import AdminTableOperations from "../../../features/admin/admin-table/AdminTableOperations.jsx";
import Loader from "../../../ui/Loader.jsx";
import useCollections from "../../../hooks/collections/useCollections.js";
import useDeleteCollection from "../../../hooks/collections/useDeleteCollection.js";

function Collections() {
  const { collections, isLoading } = useCollections();

  if (isLoading) return <Loader />;

  return (
    <>
      <AdminOutletSectionHeader
        title={"Collections"}
        buttonName={"Add Collection"}
        buttonLink={"new"}
      />
      <AdminTable>
        <AdminTableHeader>
          <AdminTableHeaderColumn>ID</AdminTableHeaderColumn>
          <AdminTableHeaderColumn>Collection Name</AdminTableHeaderColumn>
          <AdminTableHeaderColumn>Code</AdminTableHeaderColumn>
        </AdminTableHeader>
        <AdminTableBody>
          {collections?.map((collection) => (
            <AdminTableBodyRow key={collection._id}>
              <AdminTableBodyColumn>{collection._id}</AdminTableBodyColumn>
              <AdminTableBodyColumn>
                {collection.name ?? "??"}
              </AdminTableBodyColumn>
              <AdminTableBodyColumn>{collection.uniqueId}</AdminTableBodyColumn>
              <AdminTableBodyColumn>
                <CollectionsTableOperations id={collection._id} />
              </AdminTableBodyColumn>
            </AdminTableBodyRow>
          ))}
        </AdminTableBody>
      </AdminTable>
    </>
  );
}

export default Collections;

function CollectionsTableOperations({ id }) {
  const { mutate } = useDeleteCollection();
  return <AdminTableOperations id={id} mutate={mutate} />;
}
