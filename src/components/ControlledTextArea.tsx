import React from "react";

interface Props {
  content: string;
  setContent: (value: string) => void;
}

export function ControlledTextArea({ content, setContent }: Props) {
  const [localContent, setLocalContent] = React.useState<string>(content);

  return (
    <textarea
      className="content"
      rows={6}
      cols={40}
      value={localContent}
      onChange={(e) => setLocalContent(e.target.value)}
      onBlur={() => setContent(localContent)}
    ></textarea>
  );
}
