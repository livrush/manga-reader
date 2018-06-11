mangaReader.component('viewer', {
  bindings: {
    filePath: '@',
  },
  controllerAs: 'viewer',
  controller: function ($scope, mangaFactory) {
    const viewer = this;

    viewer.test = (val) => console.log('Working!', val);

    viewer.pages = [];
    viewer.index = 0;
    viewer.back = () => {
      if (viewer.index > 0) viewer.index--;
    };
    viewer.forward = () => {
      if (viewer.index < viewer.pages.length - 1) viewer.index++;
    };

    viewer.$onInit = function () {
      const filePath = mangaFactory.getFilePath();
      mangaFactory.getCollection(filePath)
        .then(function (blobUrls) {
          viewer.pages = blobUrls;
          $scope.$apply();
        });

      document.onkeydown = checkKey;

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
    }

    viewer.$onDestroy = function () {
      document.onkeydown = null;
    }
  },
  templateUrl: './components/viewer/viewer.template.html'
});