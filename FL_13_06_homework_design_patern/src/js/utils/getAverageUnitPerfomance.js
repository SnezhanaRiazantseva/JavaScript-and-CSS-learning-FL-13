const performancePalete = {
  low: -1,
  average: 0,
  top: 1,
  '-1': 'low',
  '0': 'average',
  '1': 'top',
};

export default function getAverageUnitPerfomance(node) {
  let averageLowPerfomance = node.children.reduce((acum, employee) => {
    if (performancePalete[employee.performance] === -1) {
      acum++;
    }
    return acum;
  }, 0);
  let averageAveragePerfomance = node.children.reduce((acum, employee) => {
    if (performancePalete[employee.performance] === 0) {
      acum++;
    }
    return acum;
  }, 0);
  let averageHighPerfomance = node.children.reduce((acum, employee) => {
    if (performancePalete[employee.performance] === 1) {
      acum++;
    }
    return acum;
  }, 0);
  if (node.performance === 'average') {
    averageAveragePerfomance++;
  } else if (node.performance === 'low') {
    averageLowPerfomance++;
  } else {
    averageHighPerfomance++;
  }
  let allPerfomances = [
    averageAveragePerfomance,
    averageLowPerfomance,
    averageHighPerfomance,
  ];
  let unitAveragePerfomance;
  let maxQuantityPerfomance = Math.max.apply(null, allPerfomances);
  if (maxQuantityPerfomance === allPerfomances[0]) {
    unitAveragePerfomance = performancePalete[0];
  } else if (maxQuantityPerfomance === allPerfomances[1]) {
    unitAveragePerfomance = performancePalete[-1];
  } else {
    unitAveragePerfomance = performancePalete[1];
  }
  const averagePerfomanceData = {
    averageHighPerfomance,
    averageAveragePerfomance,
    averageLowPerfomance,
    unitAveragePerfomance,
  };
  return averagePerfomanceData;
}
