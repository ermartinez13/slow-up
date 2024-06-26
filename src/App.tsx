import { NotificationsPermission } from "@/components/NotificationsPermission";
import { TimeEntries } from "@/components/TimeEntries";
import { getEntryIndex } from "@/helpers";
import { WorkEntry } from "@/models";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { CurrentEntry } from "@/components/TimeTracking";
import { ThemeProvider } from "@/components/Theme";
import { TagManager } from "@/components/TagManager";
import { INITIAL_ENTRIES } from "./constants";

function App() {
  const [entries, setEntries] = useLocalStorage<WorkEntry[]>(
    "entries",
    INITIAL_ENTRIES
  );

  const [tags, setTags] = useLocalStorage<string[]>("tags", []);

  const saveEntry = (entry: WorkEntry) => {
    setEntries(entries.concat(entry));
  };

  const updateEntry = (entry: WorkEntry) => {
    const nextEntries = window.structuredClone(entries);
    const targetIdx = getEntryIndex(entry, nextEntries);
    Object.assign(nextEntries[targetIdx], entry);
    setEntries(nextEntries);
  };

  const deleteEntry = (entry: WorkEntry) => {
    const targetIdx = getEntryIndex(entry, entries);
    const nextEntries = entries.toSpliced(targetIdx, 1);
    setEntries(nextEntries);
  };

  const addTag = (tag: string) => {
    setTags(tags.concat(tag));
  };

  const deleteTag = (tag: string) => {
    const targetIdx = tags.indexOf(tag);
    const nextTags = tags.toSpliced(targetIdx, 1);
    setTags(nextTags);

    const nextEntries = entries.map((entry) => {
      if (entry.tags) {
        const nextEntryTags = entry.tags.filter((entryTag) => entryTag !== tag);
        return { ...entry, tags: nextEntryTags };
      }
      return entry;
    });
    setEntries(nextEntries);
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main className="grid gap-y-12">
        <section>
          <NotificationsPermission />
          <CurrentEntry saveEntry={saveEntry} tags={tags} />
        </section>
        <section>
          <TagManager tags={tags} addTag={addTag} deleteTag={deleteTag} />
        </section>
        <section>
          <TimeEntries
            entries={entries}
            updateEntry={updateEntry}
            deleteEntry={deleteEntry}
            tags={tags}
          />
        </section>
      </main>
    </ThemeProvider>
  );
}

export default App;
