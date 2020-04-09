import React from 'react';

import Card from '../components/Card';
import BlockTitle from '../components/BlockTitle';
import LoadingSpinner from '../components/LoadingSpinner';
import Musiccard from '../components/Musiccard';
import Podcastcard from '../components/Podcastcard';
import Articlelist from '../components/Articlelist';
import Videocard from '../components/Videocard';
import Appcard from '../components/Appcard';

import * as Helpers from '../Helpers';


const catTemplate = {
  card:         ['libro', 'revista'],
  musiccard:    ['música'],
  podcastcard : ['podcast'],
  articlelist : ['artículo', 'web', 'newsletter'],
  videocard:    ['video'],
  appcard:      ['app'],
  cinemacard:   ['película', 'serie']
};


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
      <BlockTitle title={pagetype==='categorias' ? '' : 'Música'} titleclass={pagetype==='favoritos' ? 'small-title' : ''}/>
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
        <BlockTitle title={pagetype==='categorias' ? '' : 'Para escuchar'} titleclass={pagetype==='favoritos' ? 'small-title' : ''}/>
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
      <BlockTitle title={pagetype==='categorias' ? '' : 'Más'} titleclass={pagetype==='favoritos' ? 'small-title' : ''} />
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
      <BlockTitle title={pagetype==='categorias' ? '' : 'Videos'} titleclass={pagetype==='favoritos' ? 'small-title' : ''} />
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
        <BlockTitle title={pagetype==='categorias' ? '' : 'Apps'} titleclass={pagetype==='favoritos' ? 'small-title' : ''} />
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


export {
   renderCardItems,
   renderMusicItems,
   renderPodcastItems,
   renderArticleItems,
   renderVideoItems,
   renderAppItems
};
