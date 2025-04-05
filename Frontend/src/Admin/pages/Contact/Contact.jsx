import DataTable from "../DataTable";

import { getContacts } from "../../../services/api";

export default function Contacts() {
  return (
    <div className="container py-8 mx-auto">
      <div className="grid grid-cols-1 gap-8 ">
        <DataTable type="contacts" fetchData={getContacts} />
      </div>
    </div>
  );
}
