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
        console.log(e);
        if (e.keyCode == '38') {
          // up arrow
        } else if (e.keyCode == '40') {
          // down arrow
        } else if (e.keyCode == '37') {
          // left arrow
          document.getElementById('viewer-back').click();
        } else if (e.keyCode == '39') {
          // right arrow
          document.getElementById('viewer-forward').click();
        }

      }
    }

    viewer.$onDestroy = function () {
      document.onkeydown = null;
    }
  },
  templateUrl: './components/viewer/viewer.template.html'
});