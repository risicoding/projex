import { OrganizationList } from '@clerk/nextjs'

const page = () => {
  return (
  <OrganizationList afterCreateOrganizationUrl='/dashboard' afterSelectOrganizationUrl='/dashboard' hidePersonal/>
  )
}

export default page
