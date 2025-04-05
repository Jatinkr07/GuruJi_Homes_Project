/* eslint-disable react/prop-types */
import { useState } from "react";
import { Table, Pagination, Popconfirm, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEnquiry, deleteContact } from "../../services/api";

export default function DataTable({ type = "enquiries", fetchData }) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: [type, page, pageSize],
    queryFn: () => fetchData({ page, limit: pageSize }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) =>
      type === "enquiries" ? deleteEnquiry(id) : deleteContact(id),
    onSuccess: () => {
      message.success("Record deleted successfully");
      queryClient.invalidateQueries([type]);
    },
    onError: () => {
      message.error("Failed to delete record");
    },
  });

  const columns = [
    {
      title: "S.No",
      render: (_, __, index) => (page - 1) * pageSize + index + 1,
      width: 70,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    { title: "Phone", dataIndex: "number", key: "number" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Message", dataIndex: "message", key: "message", ellipsis: true },
    ...(type === "enquiries"
      ? [
          {
            title: "Project",
            dataIndex: "projectId",
            key: "projectId",
            render: (project) => project?.title || "Unknown Project",
          },
        ]
      : []),
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => new Date(text).toLocaleDateString(),
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      render: (_, record) => (
        <Popconfirm
          title="Are you sure to delete this record?"
          onConfirm={() => deleteMutation.mutate(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <DeleteOutlined
            className="text-red-500 cursor-pointer hover:text-red-700"
            style={{ fontSize: "18px" }}
          />
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="p-4">
      <Table
        columns={columns}
        dataSource={data?.[type]}
        pagination={false}
        loading={isLoading}
        rowKey="_id"
        scroll={{ x: "max-content" }}
        rowClassName="hover:bg-gray-50 transition-colors"
        bordered
      />
      <Pagination
        current={page}
        pageSize={pageSize}
        total={data?.total}
        showSizeChanger
        pageSizeOptions={["10", "20", "50"]}
        onChange={(newPage, newPageSize) => {
          setPage(newPage);
          setPageSize(newPageSize);
        }}
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} items`
        }
        className="flex justify-end mt-4"
      />
    </div>
  );
}
