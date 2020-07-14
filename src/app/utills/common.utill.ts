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
      storedData[news.objectID] = {
        points: news.points,
        hidden: news.hidden
      };
    } else {
      storedData = {
        ...storedData,
        [news.objectID]: {
          points: news.points,
          hidden: news.hidden
        }
      };
    }
  } else {
    storedData = {
      [news.objectID]: {
        points: news.points,
        hidden: news.hidden
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
    newsFeed = newsFeed.map(news => {
      if (storedData[news.objectID] && !storedData[news.objectID].hidden) {
        return {...news, points: storedData[news.objectID].points};
      } else if (!storedData[news.objectID]) {
        return {...news};
      }
    }).filter(res => res);
  }
  return newsFeed;
};



