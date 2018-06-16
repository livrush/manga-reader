mangaReader.component('viewer', {
  bindings: {
  },
  controllerAs: 'viewer',
  controller: function ($scope, $location, mangaFactory, indexFactory) {
    const viewer = this;

    viewer.test = (val) => console.log('Working!', val);

    viewer.pages = [ './assets/placeholder.png' ];
    viewer.pdfPages = null;
    viewer.index = 0;
    viewer.back = () => {
      if (viewer.index > 0) viewer.index--;
      viewer.updateIndex();
    };

    viewer.forward = () => {
      if (viewer.index < viewer.pages.length - 1) viewer.index++;
      if (viewer.index === viewer.pages.length - 1) { console.log('end'); }
      displayPdfPage(viewer.pdfPages, viewer.index);
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
          const collectionItemType = typeof collection[0];
          switch(collectionItemType) {
            case 'object':
              viewer.pages = collection;
              displayPdfPage(collection, 0);
              break;
            case 'string':
              viewer.pages = collection;
              break;
          }
          console.log(typeof collection[0])
          console.log(collection);
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

    function displayPdfPage(pages, index) {
      const page = pages[index];
      console.log(pages.length, index, page);
      var scale = 1.5;
      var viewport = page.getViewport(scale);

      // Prepare canvas using PDF page dimensions.
      var canvas = document.getElementById('pdf-container');
      var context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      // Render PDF page into canvas context.
      var renderContext = {
        canvasContext: context,
        viewport: viewport
      };

      page.render(renderContext);
    }
  },
  templateUrl: './components/viewer/viewer.template.html'
});