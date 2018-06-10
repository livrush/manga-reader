mangaReader.factory('mangaFactory', function () {
  const libraryIndexPath = path.join(__dirname, '/.manga/index.json');

  let filePath = '/Users/liv/Itoshi-no-Nekokke-ch30.zip';
  const getFilePath = () => filePath;
  const setFilePath = (newFilePath) => filePath = newFilePath;

  let selectedManga = 'itoshi-no-nekkoke';
  const getSelectedManga = () => selectedManga;
  const setSelectedManga = (newSelectedManga) => selectedManga = newSelectedManga;

  const getIndex = function() {
    return new Promise(function(res, rej) {
      fs.readFile(libraryIndexPath, 'utf8', function(err, indexContents) {
        res(JSON.parse(indexContents));
      });
    });
  }

  const getCollection = function(filePath) {
    return new Promise(function(res, rej) {
      fs.readFile(filePath, function(err, data) {
        if (err) rej(err);
        const zip = new JSZip();
        zip.loadAsync(data).then(function ({ files }) {
          const onlyFiles = lodash
            .chain(files)
            .filter(file => !file.dir)
            .filter(file => path.extname(file.name) === '.png')
            .filter(file => !file.name.includes('__MACOSX'))
            .map(file => {
              return file.async('blob').then(function(blob) {
                var urlCreator = window.URL || window.webkitURL;
                return urlCreator.createObjectURL(blob);
              });
            })
            .value();
          const pAll = Promise.all(onlyFiles);
          res(pAll);
        });

      });
    });
  };

  const getSomeFromPath = function(filePath, isDirectory) {
    console.log(filePath);
    return new Promise(function(res, rej) {
      fs.readdir(filePath, function(err, files) {
        if (err) rej(err);
        const filteredFiles = files
          .filter(file => file[0] !== '.')
          .filter(file => fs.lstatSync(path.join(filePath, file)).isDirectory() === isDirectory)
        res(filteredFiles);
      });
    });
  }

  const getFoldersFromPath = function(filePath) {
    return getSomeFromPath(filePath, true);
  }

  const getFilesFromPath = function(filePath) {
    return getSomeFromPath(filePath, false);
  }

  return {
    getIndex,
    getCollection,
    getSelectedManga,
    setSelectedManga,
    getFilePath,
    setFilePath,
    getFilesFromPath,
    getFoldersFromPath,
  };
})