var kitsu = require("kitsu")

const api = new kitsu();


mangaReader.component('library', {
  controllerAs: 'library',
  controller: function(mangaFactory) {
    api.get('anime', {
      page: { limit: 20 },
      sort: 'popularityRank',
    })
      .then(function({ data }) {
        library.manga = data.map(anime => {
          return {
            cover: anime.posterImage.medium,
            name: anime.canonicalTitle,
            pages: anime.episodeCount,
          };
        })
      })
      .catch(console.log)
    const library = this;
    library.manga = mangaFactory.list;
    library.selected = {};
    library.select = (selected) => {
      console.log(selected);
      library.selected = selected;
    }
  },
  templateUrl: './components/library/library.template.html'
});