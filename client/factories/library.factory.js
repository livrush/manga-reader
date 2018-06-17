mangaReader.factory('libraryFactory', function () {
  const libraryIndexPath = path.join(__dirname, '/.manga/index.json');

  function add({
    path,
    series,
    category,
    number,
    author,
  }) {
    console.log(arguments[0]);
  }

  return {
    add,
  };
})