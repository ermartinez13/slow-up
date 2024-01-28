interface Props {
  entry: { start: number; end: number; text: string };
}

export function TimeEntry({ entry }: Props) {
  const dateOne = new Date(entry.start);
  const dateTwo = new Date(entry.end);
  const dateOneFormatted = `${(dateOne.getMonth() + 1)
    .toString()
    .padStart(2, "0")} / ${dateOne.getDate().toString().padStart(2, "0")}`;
  const dateTwoFormatted = `${(dateTwo.getMonth() + 1)
    .toString()
    .padStart(2, "0")} / ${dateTwo.getDate().toString().padStart(2, "0")}`;
  const timeStart = `${(dateOne.getHours() === 12
    ? 12
    : dateOne.getHours() % 12
  )
    .toString()
    .padStart(2, "0")}:${dateOne.getMinutes().toString().padStart(2, "0")}${
    dateOne.getHours() >= 12 ? "pm" : "am"
  }`;
  const timeEnd = `${(dateTwo.getHours() === 12 ? 12 : dateTwo.getHours() % 12)
    .toString()
    .padStart(2, "0")}:${dateTwo.getMinutes().toString().padStart(2, "0")}${
    dateOne.getHours() >= 12 ? "pm" : "am"
  }`;
  const totalMinutes = Math.floor((entry.end - entry.start) / 1000 / 60);
  const totalSeconds = Math.floor((entry.end - entry.start) / 1000) % 60;
  return (
    <div
      style={{
        border: "1px dashed gray",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <p style={{ marginBlockStart: "0", marginBlockEnd: "0" }}>
        {dateOneFormatted}{" "}
        {dateOneFormatted !== dateTwoFormatted ? `- ${dateTwoFormatted}` : null}
      </p>
      <p style={{ marginBlockStart: "0", marginBlockEnd: "0" }}>
        {timeStart} - {timeEnd}
      </p>
      <p style={{ marginBlockStart: "0", marginBlockEnd: "0" }}>
        {totalMinutes === 0 ? "" : `${totalMinutes}min`} {totalSeconds}s
      </p>
    </div>
  );
}