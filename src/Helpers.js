  //Stores in window global var unique topics from all the records
  function storeUniqueTopics(records){
    //store window unique topics
    var topics = records.map(function(item) {return item.fields.topics;})
    const mergeAllTopics = Array.prototype.concat.apply([], topics);
    const uniqueTopics = mergeAllTopics.filter((val,id,array) => array.indexOf(val) === id);
    //global variable for the dropdown
    window.$topics = uniqueTopics.filter(function(e){return e}); //remove empty ones
  }

  //Stores in window global var unique categories from all the records
  function storeUniqueCategories(records){
    //store window unique categories
    var categories = records.map(function(item) {return item.fields.categories;})
    const mergeAllCategories = Array.prototype.concat.apply([], categories);
    const uniqueCategories = mergeAllCategories.filter((val,id,array) => array.indexOf(val) === id);
    //global variable for the dropdown
    window.$categories = uniqueCategories.filter(function(e){return e}); //remove empty ones
  }

  //Returns unique categories from all the records
  function getUniqueCategories(records){
    var categories = records.map(function(item) {return item.fields.categories;})
    const mergeAllCategories = Array.prototype.concat.apply([], categories);
    return mergeAllCategories.filter((val,id,array) => array.indexOf(val) === id);
  }

  //Returns unique topics from all the records
  function getUniqueTopics(records){
    var topics = records.map(function(item) {return item.fields.topics;})
    const mergeAllTopics = Array.prototype.concat.apply([], topics);
    return mergeAllTopics.filter((val,id,array) => array.indexOf(val) === id);
  }

  //Returns last second part of the url
  function getUrlCategory(){
    return decodeURIComponent(window.location.pathname.split("/")[1]);
  }

  //Returns last part of the url
  function getUrlTopic(){
    return decodeURIComponent(window.location.pathname.split("/").pop());
  }

  //-------------------------//
  //-------------------------//
  //-------------------------//
  //  RENDER ITEM HELPERS
  //-------------------------//
  //-------------------------//
  //-------------------------//


  //Get contributor data by contributor ID "rec9p8GxW7FJxPtg5" "recbofdaqGgFjL20L"
  function getContributor(contributors, contributorIdArray){
    const contributorId = contributorIdArray && contributorIdArray[0]; //check if exists
    return contributors.filter(contributor => contributor.id.indexOf(contributorId) !== -1);
  }

  //Get items by category name
  function getCategoryItems(recommendations, categoryName, size){
    return recommendations.filter(recommendation => recommendation.fields.categories?.includes(categoryName)).slice(0, size)
  }

  //Get items by topic name
  function getTopicItems(recommendations, topicName, size){
    const topicItems = [];
    recommendations.filter(recommendation => recommendation.fields.topics?.includes(topicName)).map(filteredTopicItem => (
        topicItems.push(filteredTopicItem)
   ));
   return topicItems.slice(0, size)
  }


  //Get items by collection name
  function getCollectionItems(recommendations, collectionName, size){
    const collections = [];
    recommendations.filter(recommendation => recommendation.fields.collection?.includes(collectionName)).map(filteredCollectionItem => (
        collections.push(filteredCollectionItem)
   ));
   return collections.slice(0, size)
  }


  //Get all items which includes any of categories in passed array
  function getBlockCategoryItems(recommendations, catArr){
    return recommendations.filter( (recommendation) => catArr.some((tag) => recommendation.fields.categories?.includes(tag)) );
  }


  //@UTILS
  //Truncates text
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

  function dayDifference(pubDate){
    const start = new Date(pubDate) //clone
    const end = new Date() //clone
    let dayCount = 0

    while (end > start) {
      dayCount++
      start.setDate(start.getDate() + 1)
    }
    return dayCount
  }

  export {
     storeUniqueTopics,
     storeUniqueCategories,
     getUniqueCategories,
     getUniqueTopics,
     getUrlCategory,
     getUrlTopic,
     truncateText,
     getContributor,
     getCategoryItems,
     getTopicItems,
     getCollectionItems,
     getBlockCategoryItems,
     dayDifference
  };
