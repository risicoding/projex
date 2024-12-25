import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 p-4">
      <Card className="w-full max-w-md text-center shadow-md">
        <CardHeader>
          <CardTitle className="text-lg text-gray-700 dark:text-gray-200">
            No Projects Found
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
            You currently have no projects. Start by adding a new one to get organized and manage
            your tasks effectively.
          </p>
          <Button className="gap-2" size="lg">
            <Plus size={18} /> Add Project
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
