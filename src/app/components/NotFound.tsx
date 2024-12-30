import { XCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';

interface NotFoundProps {
  content?: string;
}

export default function NotFound({ content }: NotFoundProps) {
  return (
    <div className="flex justify-center">
      <div className="flex flex-row gap-2 items-center">
        <XCircleIcon className="size-6 text-gray-300" />
        <div className="text-default">{content ?? 'Not Found'}</div>
      </div>
    </div>
  );
}
