function storeUniqueTopics(records){
  //store window unique topics
  var topics = records.map(function(item) {return item.fields.temas;})
  const mergeAllTopics = Array.prototype.concat.apply([], topics);
  const uniqueTopics = mergeAllTopics.filter((val,id,array) => array.indexOf(val) === id);
  //global variable for the dropdown
  window.$topics = uniqueTopics.filter(function(e){return e}); //remove empty ones
}

function storeUniqueCategories(records){
  //store window unique categories
  var categories = records.map(function(item) {return item.fields.categorias;})
  const mergeAllCategories = Array.prototype.concat.apply([], categories);
  const uniqueCategories = mergeAllCategories.filter((val,id,array) => array.indexOf(val) === id);
  //global variable for the dropdown
  window.$categories = uniqueCategories.filter(function(e){return e}); //remove empty ones
}


function getUniqueCategories(records){
  var categories = records.map(function(item) {return item.fields.categorias;})
  const mergeAllCategories = Array.prototype.concat.apply([], categories);
  const uniqueCategories = mergeAllCategories.filter((val,id,array) => array.indexOf(val) === id);
  return uniqueCategories
}

function getUniqueTopics(records){
  var topics = records.map(function(item) {return item.fields.temas;})
  const mergeAllTopics = Array.prototype.concat.apply([], topics);
  const uniqueTopics = mergeAllTopics.filter((val,id,array) => array.indexOf(val) === id);
  return uniqueTopics
}

function getUrlCategory(){
  return decodeURIComponent(window.location.pathname.split("/")[1]);
}


function getUrlTopic(){
  return decodeURIComponent(window.location.pathname.split("/").pop());
}

function truncateText(str, length, ending) {
    if (length == null) {
      length = 20;
    }
    if (ending == null) {
      ending = '...';
    }
    if (str.length > length) {
      return str.substring(0, length - ending.length) + ending;
    } else {
      return str;
    }
  }


  function getFavs() {
    var archive = [],
        keys = Object.keys(localStorage),
        i = 0, key;
    for (; key = keys[i]; i++) {
        archive.push( key );
    }
    return archive;
  }



export {
   storeUniqueTopics,
   storeUniqueCategories,
   getUniqueCategories,
   getUniqueTopics,
   getUrlCategory,
   getUrlTopic,
   truncateText,
   getFavs
};
