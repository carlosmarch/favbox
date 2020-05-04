import React from 'react';

import Card from '../components/Card';
import BlockTitle from '../components/BlockTitle';
import Musiccard from '../components/Musiccard';
import Podcastcard from '../components/Podcastcard';
import Articlelist from '../components/Articlelist';
import Videocard from '../components/Videocard';
import Appcard from '../components/Appcard';


import {ReactComponent as MusicIcon} from '../icons/Album.svg';
import {ReactComponent as PodcastIcon} from '../icons/Podcast.svg';
import {ReactComponent as MagazineIcon} from '../icons/Magazine.svg';
import {ReactComponent as ShowIcon} from '../icons/Show.svg';
import {ReactComponent as VideoIcon} from '../icons/Video.svg';
import {ReactComponent as BookIcon} from '../icons/Book.svg';
import {ReactComponent as ArticleIcon} from '../icons/Article.svg';
import {ReactComponent as AppIcon} from '../icons/App.svg';
import {ReactComponent as NewsletterIcon} from '../icons/Newsletter.svg';
import {ReactComponent as MovieIcon} from '../icons/Movie.svg';
import {ReactComponent as WebIcon} from '../icons/Globe.svg';


import * as Helpers from '../Helpers';


export const catTemplate = {
  card:         ['book', 'magazine'],
  musiccard:    ['music'],
  podcastcard : ['podcast'],
  articlelist : ['article', 'web', 'newsletter'],
  videocard:    ['video'],
  appcard:      ['app'],
  cinemacard:   ['movie', 'show']
};

export const getCategoryIcon = (category, classname) => {
  switch(category){
    case 'music':
      return <MusicIcon className={classname} />

    case 'podcast':
      return <PodcastIcon className={classname} />

    case 'magazine':
      return <MagazineIcon className={classname} />

    case 'show':
      return <ShowIcon className={classname} />

    case 'video':
      return <VideoIcon className={classname} />

    case 'book':
      return <BookIcon className={classname} />

    case 'article':
      return <ArticleIcon className={classname} />

    case 'web':
      return <WebIcon className={classname} />

    case 'app':
      return <AppIcon className={classname} />

    case 'newsletter':
      return <NewsletterIcon className={classname} />

    case 'movie':
      return <MovieIcon className={classname} />
    default:
      return ''
  }
}

// Render items by Template Blocks
// First define item types to render in groups
// Then render items in blocks with title & templates

function renderCardItems(recommendations, contributors) {
  return (
    <div className="GridCard">
        <div className="container container-xl">
            <div className="grid">
              {Helpers.getBlockCategoryItems(recommendations, catTemplate.card).map((records) =>
                <Card {...records.fields} key={records.id} itemId={records.id} autor={Helpers.getContributor(contributors, records.fields.contribuidor)}/>
              )}
            </div>
        </div>
    </div>
  )
}

function renderMusicItems(recommendations, contributors, pagetype) {
  return(
    <div className="MusicGrid-detail mt-l">
      <BlockTitle title={pagetype==='categories' ? '' : 'Music'}/>
      <div className="container">
          <div className="grid">
              {Helpers.getBlockCategoryItems(recommendations, catTemplate.musiccard).map((records) =>
                <Musiccard {...records.fields} key={records.id} itemId={records.id} autor={Helpers.getContributor(contributors, records.fields.contribuidor)}/>
              )}
          </div>
      </div>
    </div>
  )
}

function renderPodcastItems(recommendations, contributors, pagetype){
  return(
    <div className="PodcastGrid mt-l">
      <div className="container mt-l">
        <BlockTitle title={pagetype==='categories' ? '' : 'Listen'}/>
        <div className="grid">
            {Helpers.getBlockCategoryItems(recommendations, catTemplate.podcastcard).map((records) =>
              <Podcastcard {...records.fields} key={records.id} itemId={records.id} autor={Helpers.getContributor(contributors, records.fields.contribuidor)}/>
            )}
        </div>
      </div>
    </div>
  )
}

function renderArticleItems(recommendations, contributors, pagetype){
  return(
    <div className="ArticlesGrid mt-l">
      <BlockTitle title={pagetype==='categories' ? '' : 'More'} />
      <div className="container">
        <div className="grid">
            {Helpers.getBlockCategoryItems(recommendations, catTemplate.articlelist).map((records) =>
              <Articlelist {...records.fields} key={records.id} itemId={records.id} autor={Helpers.getContributor(contributors, records.fields.contribuidor)}/>
            )}
        </div>
      </div>
    </div>
  )
}

function renderVideoItems(recommendations, contributors, pagetype){
  return(
    <div className="ArticlesGrid mt-l">
      <BlockTitle title={pagetype==='categories' ? '' : 'Videos'} />
      <div className="container">
        <div className="grid">
            {Helpers.getBlockCategoryItems(recommendations, catTemplate.videocard).map((records) =>
              <Videocard {...records.fields} key={records.id} itemId={records.id} autor={Helpers.getContributor(contributors, records.fields.contribuidor)}/>
            )}
        </div>
      </div>
    </div>
  )
}

function renderAppItems(recommendations, contributors, pagetype){
  return(
    <div className="AppGrid-detail mt-l">
        <BlockTitle title={pagetype==='categories' ? '' : 'Apps'} />
        <div className="container">
              <div className="grid">
                  {Helpers.getBlockCategoryItems(recommendations, catTemplate.appcard).map((records) =>
                    <Appcard {...records.fields} key={records.id} itemId={records.id} autor={Helpers.getContributor(contributors, records.fields.contribuidor)}/>
                  )}
              </div>
        </div>
    </div>
  )
}

function renderCinemaItems(recommendations, contributors, pagetype) {
  return (
    <div className="GridCard">
        <BlockTitle title={pagetype==='categories' ? '' : 'Movies & Series'} />
        <div className="container container-xl">
            <div className="grid">
              {Helpers.getBlockCategoryItems(recommendations, catTemplate.cinemacard).map((records) =>
                <Card {...records.fields} key={records.id} itemId={records.id} autor={Helpers.getContributor(contributors, records.fields.contribuidor)}/>
              )}
            </div>
        </div>
    </div>
  )
}

export {
   renderCardItems,
   renderMusicItems,
   renderPodcastItems,
   renderArticleItems,
   renderVideoItems,
   renderAppItems,
   renderCinemaItems
};
