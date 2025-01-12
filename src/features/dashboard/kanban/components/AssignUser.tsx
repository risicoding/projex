import React, { useEffect, useState } from 'react';
import { useAuth, useOrganization } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { UserIcon } from 'lucide-react';
import { AvatarImage } from '@radix-ui/react-avatar';

interface AssignUserProps {
  value: string[];
  onChange: (users: string[]) => void;
}

const AssignUser = ({ value, onChange }: AssignUserProps) => {
  const [selectedUser, setSelectedUser] = useState<(string | undefined)[]>(value);
  const { userId } = useAuth();

  const org = useOrganization();

  const { data: members } = useQuery({
    queryKey: ['userList'],
    queryFn: async () => {
      const memberships = await org.organization?.getMemberships();
      const publicUserData = memberships?.data.map((member) => member.publicUserData) || [];
      return publicUserData;
    },
  });

  const [availableUsers, setAvailableUsers] = useState(members);

  useEffect(() => {
    if (!members) return;

    const currentUser = members.find((user) => user.userId === userId);
    if (!currentUser) return;
    if (!currentUser.userId) return;

    onChange([currentUser.userId]);
    setSelectedUser([currentUser.userId]);
    console.log(value);

    // Update `availableUsers` only if it has changed
    setAvailableUsers(members.filter((member) => member.userId !== currentUser.userId));
  }, []);

  const handleUserSelection = (id: string) => {
    if (value.includes(id)) return;

    setAvailableUsers((prev) => prev?.filter((user) => user.userId !== id));
    setSelectedUser([...selectedUser, id]);
    onChange([...selectedUser, id]);
  };

  return (
    <Popover>
      <div>
        <PopoverTrigger asChild>
          <div className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base text-muted-foreground shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm">
            {value.length === 0 ? (
              'Select a member'
            ) : (
              <div className="flex gap-1">
                {value.map((id) => {
                  const user = members?.find((u) => u.userId === id);
                  return user?.imageUrl && user?.userId ? (
                    <Avatar className="size-6">
                      <AvatarImage src={user.imageUrl} />
                      <AvatarFallback>
                        <UserIcon />
                      </AvatarFallback>
                    </Avatar>
                  ) : null;
                })}
              </div>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent className="space-y-3">
          {availableUsers?.length ? (
            availableUsers.map((user) => {
              if (user && user?.userId) {
                return (
                  <div
                    key={user.userId}
                    onClick={() => {
                      if (!user.userId) return;
                      handleUserSelection(user.userId);
                    }}
                    className="flex items-center rounded-md p-2 cursor-pointer hover:bg-gray-200"
                  >
                    <Avatar className="size-6">
                      <AvatarImage src={user.imageUrl} />
                      <AvatarFallback>
                        <UserIcon />
                      </AvatarFallback>
                    </Avatar>
                    <p className="ml-2 text-sm text-gray-700">{user.firstName}</p>
                  </div>
                );
              }
            })
          ) : (
            <p className="p-2 text-sm text-gray-500">No members found</p>
          )}
        </PopoverContent>
      </div>
    </Popover>
  );
};

export default AssignUser;
