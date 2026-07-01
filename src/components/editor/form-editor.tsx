// src\components\editor\form-editor.tsx

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

import { useEffect } from "react";

import { cn } from "@/shared/lib/utils";

interface FormEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function FormEditor({
  value,
  onChange,
  placeholder = "Start typing...",
  className,
}: FormEditorProps): React.JSX.Element {
  const editor = useEditor({
    extensions: [
      StarterKit,

      Placeholder.configure({
        placeholder,
      }),
    ],

    content: value,

    immediatelyRender: false,

    editorProps: {
      attributes: {
        class:
          "min-h-[250px] w-full rounded-md border bg-background px-4 py-3 outline-none focus-visible:ring-2 focus-visible:ring-ring",
      },
    },

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) {
      return;
    }

    if (editor.getHTML() !== value) {
      editor.commands.setContent(value);
    }
  }, [editor, value]);

  return (
    <div className={cn("overflow-hidden rounded-md", className)}>
      <EditorContent editor={editor} />
    </div>
  );
}
