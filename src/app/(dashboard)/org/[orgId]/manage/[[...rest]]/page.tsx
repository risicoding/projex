import { OrganizationProfile } from '@clerk/nextjs';
import React from 'react';

const page = () => {
  return (
    <div className="p-6 flex items-center justify-center">
      <OrganizationProfile />
    </div>
  );
};

export default page;
