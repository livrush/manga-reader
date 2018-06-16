mangaReader.component('viewer', {
  bindings: {
  },
  controllerAs: 'viewer',
  controller: function ($scope, $location, mangaFactory, indexFactory) {
    const viewer = this;

    viewer.test = (val) => console.log('Working!', val);

    viewer.pages = [ './assets/placeholder.png' ];

    viewer.index = 0;
    viewer.back = () => {
      if (viewer.index > 0) viewer.index--;
      viewer.updateIndex();
    };

    viewer.forward = () => {
      if (viewer.index < viewer.pages.length - 1) viewer.index++;
      if (viewer.index === viewer.pages.length - 1) { console.log('end'); }
      viewer.updateIndex();
    };

    viewer.updateIndex = () => {
      const selectedManga = mangaFactory.getSelectedManga();
      indexFactory.updateSelectedIndex(selectedManga, {
        currentPage: viewer.index,
        currentFile: viewer.filePath,
      });
    }

    viewer.$onInit = function () {
      const selectedFile = mangaFactory.getSelectedFile();
      if (!selectedFile) return $location.path('/');

      viewer.index = selectedFile.currentPage;
      viewer.filePath = selectedFile.currentFile;

      viewer.fileType = path.extname(viewer.filePath);

      mangaFactory.getCollection(selectedFile.currentFile)
        .then(function (collection) {
          viewer.pages = collection;
          $scope.$apply();
        });

      document.onkeydown = checkKey;
    }

    viewer.$onDestroy = function () {
      document.onkeydown = null;
    }

    function checkKey(e) {
      e = e || window.event;
      switch (e.keyCode) {
        case  37:
        case '37':
          document.getElementById('viewer-back').click();
          break;
        case  39:
        case '39':
          document.getElementById('viewer-forward').click();
          break;
      };
    }

  },
  templateUrl: './components/viewer/viewer.template.html'
});