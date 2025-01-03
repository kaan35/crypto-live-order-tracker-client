import { ArrowPathIcon } from '@heroicons/react/24/outline';
import React from 'react';

interface LoadingProps {
  content?: string;
}

export default function Loading({ content }: LoadingProps) {
  return (
    <div className="flex justify-center">
      <div className="flex flex-row gap-2 items-center">
        <ArrowPathIcon className="size-6 text-gray-300 animate-spin" />
        <div className="text-default">{content ?? 'Loading'}</div>
      </div>
    </div>
  );
}
