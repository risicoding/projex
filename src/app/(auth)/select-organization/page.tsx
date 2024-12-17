import { OrganizationList, RedirectToSignIn, SignedIn, SignedOut } from '@clerk/nextjs'

const page = () => {
  return (
    <>
      <SignedIn>
        <OrganizationList
          afterCreateOrganizationUrl="/org/:id"
          afterSelectOrganizationUrl="/org/:id"
          hidePersonal
        />
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  )
}

export default page
