import { useRef, useState } from "react"
import { NUsersTable, useGetUsersQuery } from "./usersTableApi"
import {
  ActionType,
  FormInstance,
  ProColumns,
  ProTable,
} from "@ant-design/pro-components"
import { useNavigate } from "react-router-dom"
import { TableOutlined } from "@ant-design/icons"
import { Badge, Button, Space, Table, Tag } from "antd"
import { useAppSelector } from "@/app/hooks"

export default function UsersTable() {
  const [url, setUrl] = useState<string>("")

  const [params, setParams] = useState<Partial<NUsersTable.SearchParams>>({
    page: 1,
    rowsPerPage: 10,
    search: "",
    orderBy: "createdAt",
    order: "desc",
  })

  const navigate = useNavigate()

  const { data, refetch, isLoading, isError } = useGetUsersQuery(url)

  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([])

  const [filters, setFilters] = useState<Record<string, string>>({})

  const formRef = useRef<FormInstance>()
  const actionRef = useRef<ActionType>()

  const user = useAppSelector((state) => state.global.userInfo)

  const columns: ProColumns<NUsersTable.User>[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: true,
      width: 150,
      ellipsis: true,
      search: false,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: true,
      width: 150,
      ellipsis: true,
      search: false,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      sorter: true,
      width: 150,
      ellipsis: true,
      search: false,
      render(_, record) {
        const isSelf = user?.user_id === record._id
        return (
          <Space>
            {
              <Tag
                color={
                  record.role === "admin"
                    ? "volcano"
                    : record.role === "operator"
                    ? "green"
                    : "geekblue"
                }
                style={{ cursor: "pointer" }}
                key={record._id}
              >
                {record.role} {isSelf && "(You)"}
              </Tag>
            }
          </Space>
        )
      },
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: true,
      width: 150,
      ellipsis: true,
      search: false,
      valueType: "date",
      fieldProps: {
        format: "DD/MM/YYYY",
      },
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      sorter: true,
      width: 150,
      ellipsis: true,
      search: false,
      valueType: "date",
      fieldProps: {
        format: "DD/MM/YYYY",
      },
    },
  ]

  const filterLabels: { [key: string]: { text: string } } = columns.reduce(
    (acc, state) => {
      acc[state.dataIndex as string] = {
        text: state.title as string,
      }
      return acc
    },
    {} as { [key: string]: { text: string } },
  )

  return (
    <div>
      <ProTable<NUsersTable.User, NUsersTable.SearchParams>
        scroll={{
          x: "max-content",
        }}
        bordered
        onRow={(record) => ({
          onClick: () => {
            navigate(`/users/${record._id}`, {
              state: { isEdit: true, userId: record._id },
            })
          },
          style: { cursor: "pointer", whiteSpace: "nowrap" },
        })}
        tableLayout="auto"
        options={{
          setting: {
            checkable: true,
            draggable: true,
            listsHeight: 150,
            settingIcon: <TableOutlined />,
          },
          density: false,
          reload: () => {
            refetch()
          },
        }}
        // columnsState={{
        //   persistenceKey: "patientTable",
        //   persistenceType: "localStorage",
        //   defaultValue: {

        //   },
        // }}
        actionRef={actionRef}
        formRef={formRef}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRowKeys(selectedRows.map((row) => row._id))
          },
          selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
        }}
        columns={columns}
        rowKey="_id"
        pagination={{
          current: params?.page || 1,
          pageSize: params?.rowsPerPage || 10,
          showQuickJumper: true,
          pageSizeOptions: ["10", "20", "30", "40", "50"],
          defaultCurrent: 1,
          total: data?.totalCount,
          onChange(page, pageSize) {
            const newParams = { ...params, page, rowsPerPage: pageSize }
            setParams(newParams)
            const urlSearchParams = new URLSearchParams(
              newParams as unknown as Record<string, string>,
            )
            const url = urlSearchParams.toString()
            setUrl(url)
          },
          showSizeChanger: true,
        }}
        toolbar={{
          title: `Total (${data?.totalCount})`,
          filter: (
            <Space
              size={[10, "middle"]}
              wrap
              style={{
                marginBottom: 16,
              }}
            >
              {Object.entries(filters).map(([key, value]) => {
                return (
                  <Button
                    type="dashed"
                    key={key}
                    onClick={() => {
                      const newParams: Record<string, any> = { ...params }
                      delete newParams[key]
                      setParams(newParams)
                      const newFilters: Record<string, any> = { ...filters }
                      delete newFilters[key]
                      setFilters(newFilters)
                      const urlSearchParams = new URLSearchParams(
                        newParams as Record<string, string>,
                      )
                      const url = urlSearchParams.toString()
                      setUrl(url)
                    }}
                  >
                    {filterLabels[key].text}: {value}
                  </Button>
                )
              })}
            </Space>
          ),
          multipleLine: true,
        }}
        dataSource={data?.users || []}
        loading={isLoading}
        search={false}
        columnEmptyText="NA"
        dateFormatter="string"
      />
    </div>
  )
}
