'use client';

import { useOrganization, useOrganizationList } from '@clerk/nextjs';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

const OrgSwitcher = ({ children }: { children: React.ReactNode }) => {
  const { orgId } = useParams<{ orgId: string }>();

  const { organization: currentOrganization } = useOrganization();
  const { setActive } = useOrganizationList();

  useEffect(() => {
    if (orgId !== currentOrganization?.id && setActive) {
      console.log('current session');
      setActive({ organization: orgId });
    }
  }, [orgId, currentOrganization?.id, setActive]);

  return <div>{children}</div>;
};

export default OrgSwitcher;
