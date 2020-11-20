const chunkArray = (a, marks) => {
  return (marks.map(
    (mark, markIdx) => a.slice(
      markIdx === 0 ? 0 : marks[markIdx - 1],
      mark,
    ),
  ).concat([
    a.slice(marks.slice(-1)[0]),
  ])).filter(arr => arr.length > 0);
};
