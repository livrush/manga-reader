mangaReader.factory('indexFactory', function () {
  const libraryPath = path.join(__dirname, '/.manga');
  const libraryIndexPath = path.join(libraryPath, 'index.json');

  const getIndex = function () {
    return new Promise(function (res, rej) {
      fs.readFile(libraryIndexPath, 'utf8', function (err, indexContents) {
        const index = JSON.parse(indexContents);
        const sortedIndex = lodash.sortBy(index, 'title');
        res(sortedIndex);
      });
    });
  };

  const saveIndex = function (indexObject) {
    return new Promise(function (res, rej) {
      fs.writeFile(libraryIndexPath, JSON.stringify(indexObject), function (err) {
        rej(err);
        res(indexObject);
      });
    });
  };

  const sanitizeIndex = function() {
    getIndex()
    .then(function(index) {
      const totalSeries = fs.readdirSync(libraryPath)
        .filter(file => fs.lstatSync(path.join(libraryPath, file)).isDirectory());
      const seriesInIndex = lodash.map(index, 'title');
      console.log(totalSeries, seriesInIndex);
      const newSeries = lodash.difference(totalSeries, seriesInIndex)
      console.log(newSeries);

      index.push(...newSeries.map(createIndexEntry));

      const sanitizedIndex = lodash
        .chain(index)
        .filter(title => !Array.isArray(title))
        .map(function(title) {
          for (const key in title) {
            if (typeof title[key] === 'string') {
              title[key] = title[key].toLowerCase();
            }
          }
          return title;
        })
        .sortBy('title')
        .value();

      console.log(sanitizedIndex);
      return sanitizedIndex;
    })
    .then(saveIndex)
    .then(console.log)
  }

  const updateIndex = function (mediaName, updatedInfo) {
    getIndex().then(index => {
      debugger;
    });
  };

  const getSelectedIndex = function(mediaName) {
    const selectedIndexPath = path.join(libraryPath, mediaName, '.index.json');
    return new Promise(function (res, rej) {
      fs.readFile(selectedIndexPath, 'utf8', function (err, indexContents) {
        if (indexContents) res(JSON.parse(indexContents));
        else res(indexContents);
        rej(err);
      });
    });
  };

  const updateSelectedIndex = function(mediaName, updatedInfo) {
    const selectedIndexPath = path.join(libraryPath, mediaName, '.index.json');
    return new Promise(function (res, rej) {
      fs.readFile(selectedIndexPath, 'utf8', function (err, indexContents) {
        let index;
        if (updatedInfo) {
          if (indexContents && indexContents !== 'undefined') index = lodash.extend(JSON.parse(indexContents), updatedInfo);
          else index = updatedInfo;
        } else {
          index = updatedInfo;
        }
        fs.writeFile(selectedIndexPath, JSON.stringify(index), function(err) { if (err) throw err });
      });
    });
  };

  function createIndexEntry(title) {
    return { title };
  }

  return {
    getIndex,
    updateIndex,
    getSelectedIndex,
    updateSelectedIndex,
    sanitizeIndex,
  };
})