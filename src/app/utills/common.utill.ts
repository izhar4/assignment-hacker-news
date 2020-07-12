export const trackByFn = (index, item) => {
  return index;
};


export const changeQueryParams = (params, activatedRoute, router) => {
  return router.navigate(
    [],
    {
      relativeTo: activatedRoute,
      queryParams: params,
      queryParamsHandling: 'merge'
    });
};

export const updateLocalStorage = (news) => {
  let storedData =
    JSON.parse(localStorage.getItem('newsFedd') || '{}');
  if (Object.keys(storedData).length) {
    if (storedData[news.objectID]) {
      storedData[news.objectID] = { ...news };
    } else {
      storedData = {
        ...storedData,
        [news.objectID]: {
          ...news
        }
      };
    }
  } else {
    storedData = {
      [news.objectID]: {
        ...news
      }
    };
  }
  localStorage.setItem('newsFedd', JSON.stringify(storedData));
};

export const getChartData = (newsFeed) => {
  const data = [];
  const labels = [];
  newsFeed.forEach(news => {
    labels.push(news.objectID);
    data.push(news.points);
  });
  return { data, labels };
};

export const updateVotesAndHidden = (newsFeed) => {
  const storedData = JSON.parse(localStorage.getItem('newsFedd') || '{}');
  if (Object.keys(storedData).length) {
    newsFeed.forEach(news => {
      if (storedData[news.objectID]) {
        news.points = storedData[news.objectID].points;
        news.hidden = storedData[news.objectID].hidden;
      }
    });
  }
};


