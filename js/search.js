const searchIcon = document.getElementById("search-ico");
const inputSearch = document.querySelector(".input-search");

searchIcon.addEventListener("click", (event) => {
  const fuse = new Fuse(notes, {
    includeScore: true,
    keys: [
      { name: "title", getFn: (note) => note.title },
      { name: "content", getFn: (note) => note.content },
    ],
  });
  console.log(inputSearch.value);
  const result = fuse.search(inputSearch.value);
  console.log(result);
});
