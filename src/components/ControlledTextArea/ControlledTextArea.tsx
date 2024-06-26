import React from "react";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  content: string;
  setContent: (value: string) => void;
  label?: string;
}

export function ControlledTextArea({ content, setContent, label }: Props) {
  const [localContent, setLocalContent] = React.useState<string>(content);

  return (
    <Card className="p-0 w-full min-w-[33ch] rounded-sm">
      <CardContent className="p-1 space-y-1">
        {label && (
          <Label
            htmlFor="textarea"
            className="text-muted-foreground leading-none pl-1"
          >
            {label}
          </Label>
        )}
        <Textarea
          id="textarea"
          value={localContent}
          onChange={(e) => setLocalContent(e.target.value)}
          onBlur={() => setContent(localContent)}
        />
      </CardContent>
    </Card>
  );
}
