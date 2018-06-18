mangaReader.factory('indexFactory', function () {
  const libraryPath = path.join(__dirname, '/.manga');
  const libraryIndexPath = path.join(libraryPath, 'index.json');

  const getIndex = function () {
    return new Promise(function (res, rej) {
      fs.readFile(libraryIndexPath, 'utf8', function (err, indexContents) {
        if (err) rej(err);
        const index = JSON.parse(indexContents);
        const sortedIndex = lodash.sortBy(index, 'title');
        res(sortedIndex);
      });
    });
  };

  const saveIndex = function (indexObject) {
    return new Promise(function (res, rej) {
      fs.writeFile(libraryIndexPath, JSON.stringify(indexObject), function (err) {
        if (err) rej(err);
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
      const newSeries = lodash.difference(totalSeries, seriesInIndex)

      index.push(...newSeries.map(createIndexEntry));

      const sanitizedIndex = lodash
        .chain(index)
        .filter(title => !Array.isArray(title))
        .filter(title => title !== null)
        .filter(title => typeof title === 'object')
        .map(function(title) {
          for (const key in title) {
            if (typeof title[key] === 'string') {
              title[key] = changeCase.paramCase(title[key]);
            }
          }
          return title;
        })
        .sortBy('title')
        .value();

      return sanitizedIndex;
    })
    .then(saveIndex)
  }

  const updateIndexByTitle = function (mediaName, updatedInfo, index) {
    return getIndex()
      .then(index => {
        for (let i = 0; i < index.length; i++) {
          const media = index[i];
          if (media.title === mediaName) index[i] = updatedInfo;
        }
        console.log(index);
        return index;
      })
      .then(saveIndex);
  };

  const getIndexByTitle = function (title) {
    return getIndex().then(function(index) {
      for (let i = 0; i < index.length; i++) {
        const media = index[i];
        if (media.title === title) return media;
      }
      return null;
    })
  };

  const getSelectedIndex = function(mediaName) {
    const selectedIndexPath = path.join(libraryPath, mediaName, '.index.json');
    return new Promise(function (res, rej) {
      fs.readFile(selectedIndexPath, 'utf8', function (err, indexContents) {
        if (err) rej(err);
        else if (indexContents) res(JSON.parse(indexContents));
        else res(indexContents);
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

  function createThumb(indexObject) {
    return new Promise(function(res, rej) {
      var request = http.get(options, function(res){
        var imagedata = ''
        res.setEncoding('binary')

        res.on('data', function(chunk){
            imagedata += chunk
        })

        res.on('end', function(){
            fs.writeFile('logo.png', imagedata, 'binary', function(err){
                if (err) throw err
                console.log('File saved.')
            })
        })

      })
    });
  }

  return {
    getIndex,
    getSelectedIndex,
    updateSelectedIndex,
    sanitizeIndex,
    getIndexByTitle,
    updateIndexByTitle,
  };
})