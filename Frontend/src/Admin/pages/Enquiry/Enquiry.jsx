import DataTable from "../DataTable";

import { getEnquiries } from "../../../services/api";

export default function Enquiry() {
  return (
    <div className="container py-8 mx-auto">
      <div className="grid grid-cols-1 gap-8 ">
        <DataTable type="enquiries" fetchData={getEnquiries} />
      </div>
    </div>
  );
}
