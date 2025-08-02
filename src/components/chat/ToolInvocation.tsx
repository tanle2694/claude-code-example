"use client";

import { Loader2, FileEdit, FilePlus, FileText } from "lucide-react";

interface ToolInvocationProps {
  toolName: string;
  state: "call" | "partial-call" | "result";
  result?: any;
  args?: any;
}

const toolMessages: Record<string, { icon: React.ComponentType<any>; getMessage: (args: any) => string }> = {
  str_replace_editor: {
    icon: FileEdit,
    getMessage: (args) => {
      const fileName = args?.filePath?.split('/').pop() || 'file';
      return `Editing ${fileName}`;
    }
  },
  str_replace_based_edit_tool: {
    icon: FileEdit,
    getMessage: (args) => {
      const fileName = args?.filePath?.split('/').pop() || 'file';
      return `Updating ${fileName}`;
    }
  },
  create_file: {
    icon: FilePlus,
    getMessage: (args) => {
      const fileName = args?.path?.split('/').pop() || 'new file';
      return `Creating ${fileName}`;
    }
  },
  edit_file: {
    icon: FileEdit,
    getMessage: (args) => {
      const fileName = args?.path?.split('/').pop() || 'file';
      return `Modifying ${fileName}`;
    }
  },
  read_file: {
    icon: FileText,
    getMessage: (args) => {
      const fileName = args?.path?.split('/').pop() || 'file';
      return `Reading ${fileName}`;
    }
  }
};

export function ToolInvocation({ toolName, state, result, args }: ToolInvocationProps) {
  const toolConfig = toolMessages[toolName] || {
    icon: FileText,
    getMessage: () => toolName
  };

  const Icon = toolConfig.icon;
  const message = toolConfig.getMessage(args);
  const isComplete = state === "result" && result;

  return (
    <div className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 bg-neutral-50 rounded-lg text-xs border border-neutral-200">
      {isComplete ? (
        <>
          <div className="w-2 h-2 rounded-full bg-emerald-500" aria-label="Complete" />
          <Icon className="w-3.5 h-3.5 text-neutral-600" />
          <span className="text-neutral-700">{message}</span>
        </>
      ) : (
        <>
          <Loader2 className="w-3 h-3 animate-spin text-blue-600" aria-label="Loading" />
          <Icon className="w-3.5 h-3.5 text-neutral-600" />
          <span className="text-neutral-700">{message}...</span>
        </>
      )}
    </div>
  );
}