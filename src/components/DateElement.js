import React from "react";
import format from "date-fns/format";

export default function DateElement({ date }) {
  return (
    <time dateTime={format(date, "yyyy-MM-dd")}>
      {format(date, "MMMM do, yyyy")}
    </time>
  );
}
