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

export {
   storeUniqueTopics,
   storeUniqueCategories,
   getUniqueCategories,
   getUniqueTopics,
   getUrlCategory,
   getUrlTopic,
};
