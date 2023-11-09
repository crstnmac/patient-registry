import UsersTable from "@/features/usersTable"
import { PageContainer } from "@ant-design/pro-components"

const Users = () => {
  return (
    <PageContainer title="Patients">
      <UsersTable />
    </PageContainer>
  )
}

export default Users
