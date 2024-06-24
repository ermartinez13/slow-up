import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  tags: string[];
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
}

// export function TagsFilter({
//   tags,
//   selectedTags,
//   setSelectedTags,
// }: TagsFilterProps) {
//   return (
//     <ToggleGroup
//       type="multiple"
//       value={selectedTags}
//       onValueChange={(value) => setSelectedTags(value)}
//     >
//       {tags.map((tag) => (
//         <ToggleGroupItem key={tag} value={tag}>
//           {tag}
//         </ToggleGroupItem>
//       ))}
//     </ToggleGroup>
//   );
// }

export function TagsFilter({ tags, selectedTags, setSelectedTags }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          onClick={() => console.log("clicked add filter button")}
        >
          + Add Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="type">Filter Type</Label>
              <Select defaultValue="OR">
                <SelectTrigger id="type" className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AND">AND</SelectItem>
                  <SelectItem value="OR">OR</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {tags.map((tag) => (
              <div className="flex items-center space-x-2">
                <Checkbox id="terms2" disabled />
                <label
                  htmlFor="terms2"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {tag}
                </label>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
