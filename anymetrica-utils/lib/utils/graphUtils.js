'use strict';

/* @flow */
var _require = require('./checks'),
    isEmpty = _require.isEmpty;

var toposort = function toposort(tasksToSort /*: Array<any>*/, cachedTasksMap /*: Object*/) {
  var getUpstream /*: (Object) => any*/ = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (task) {
    return task.input();
  };

  var lookupById = cachedTasksMap || {};
  tasksToSort.forEach(function (t /*: any*/) {
    lookupById[t.id] = t;
  });
  var topologicalSortHelper = function topologicalSortHelper(task, visited, temp, tts /*: Array<any>*/, result) {
    temp[task.id] = true;
    getUpstream(task).forEach(function (upstreamId) {
      if (temp[upstreamId] === true) {
        throw new Error('The graph is not a DAG');
      }
      if (visited[upstreamId] !== true) {
        topologicalSortHelper(lookupById[upstreamId], visited, temp, tts, result);
      }
    });
    temp[task.id] = false;
    visited[task.id] = true;
    task.topoOrder = result.length;
    result.push(task);
  };
  var totalResult = [];
  var visited = [];
  var temp = [];
  tasksToSort.forEach(function (task) {
    if (!visited[task.id] && !temp[task.id]) {
      topologicalSortHelper(task, visited, temp, tasksToSort, totalResult);
    }
  });
  return totalResult;
};


/**
 * Input:
 *
 * @example:
 * result = {
 *   titles: ['a', 'b', ...],
 *   rowKeys: ['a', 'b', ...],
 *   dataArray: resultArray: [1,2,....,4,5,....],
 * }
 *
 * @param matrixData
 * @return {{nodes: *, links: Array, nodesDict}}
 */
/*:: type MdInputType = { rows: Array<any>, titles: Array<string> }*/
var matrixToGraph = function matrixToGraph(matrixData /*: MdInputType*/) {
  var links = [];
  var rows = matrixData.rows,
      titles = matrixData.titles;

  var nodesDict = {};
  if (isEmpty(titles)) {
    return {
      nodes: [],
      links: links,
      nodesDict: nodesDict
    };
  }
  var nodes /*: Array<{
                id: number,
                agent: string,
                value: number
              }>*/ = matrixData.titles.map(function (agentName /*: string*/, i /*: number*/) {
    var id = i + 1;
    nodesDict[agentName] = id;
    return {
      id: id,
      agent: agentName,
      value: 1
    };
  });
  rows.forEach(function (row, rowIdx) {
    var agentAName = titles[rowIdx];
    row.elements.forEach(function (col, colIdx) {
      if (rowIdx < colIdx) {
        var weight = parseFloat(col) || 0.0;
        var agentBName = titles[colIdx];
        links.push({
          source: nodesDict[agentAName],
          target: nodesDict[agentBName],
          weight: weight
        });
      }
    });
  });
  return {
    nodes: nodes,
    links: links,
    nodesDict: nodesDict
  };
};
// var fillMissingTasksPositions = function (tasks, processedTasksDict, minTimeMs, maxTimeMs) {
//   // Defining position for tasks without time
//   var rMaxTimelessTasksChain = 0;
//   return tasks.map(function (task) {
//     if (task.start === 'number' && typeof task.end === 'number') {
//       return task;
//     }
//     if (task.status === TASK_STATUS_PENDING || task.status === TASK_STATUS_UNKNOWN
//      || task.status === TASK_STATUS_COMPLETELY_UNKNOWN) {
//       task.start = undefined;
//       task.end = undefined;
//     }
//     var rTimeMin = task.end;
//     if (!rTimeMin) {
//       var drillRight = function (t, level) {
//         level = level || 1;
//         rMaxTimelessTasksChain = Math.max(level, rMaxTimelessTasksChain);
//         t.requiredFor.forEach(function (neighbourId) {
//           if (processedTasksDict[neighbourId].start) {
//             if (rTimeMin) {
//               rTimeMin = Math.min(rTimeMin, processedTasksDict[neighbourId].start);
//             } else {
//               rTimeMin = processedTasksDict[neighbourId].start;
//             }
//           }
//         });
//         if (!rTimeMin || !t.start) {
//           t.requiredFor.forEach(function (requirementId) {
//             drillRight(processedTasksDict[requirementId], level + 1);
//           });
//         }
//       };
//       drillRight(task);
//     }
//
//     var lTimeMin = task.start;
//     var lTimeMax = task.start;
//     var lMaxTimelessTasksChain = 0;
//     var lMinTimelessTasksChain = 0;
//
//     if (!lTimeMin) {
//       var drillLeft = function (t, level) {
//         level = level || 1;
//         lMaxTimelessTasksChain = Math.max(level, lMaxTimelessTasksChain);
//         t.dependencies.forEach(function (neighbourId) {
//           if (processedTasksDict[neighbourId].end) {
//             if (lTimeMin) {
//               lTimeMin = Math.max(lTimeMin || minTimeMs, processedTasksDict[neighbourId].end);
//             } else {
//               lMinTimelessTasksChain = Math.max(level, lMinTimelessTasksChain);
//               lTimeMin = processedTasksDict[neighbourId].end;
//             }
//             if (lTimeMax) {
//               lTimeMax = Math.min(lTimeMax || maxTimeMs, processedTasksDict[neighbourId].end);
//             } else {
//               lTimeMax = processedTasksDict[neighbourId].end;
//             }
//           }
//         });
//         if (!lTimeMin || !t.end) {
//           t.dependencies.forEach(function (requirementId) {
//             drillLeft(processedTasksDict[requirementId], level + 1);
//           });
//         }
//       };
//       drillLeft(task);
//     }
//     rTimeMin = rTimeMin || maxTimeMs;
//     lTimeMin = lTimeMin || minTimeMs;
//     lTimeMax = lTimeMax || maxTimeMs;
//     if (!task.end) {
//       task.end = rTimeMin;
//     }
//     if (!task.start) {
//       task.start = rTimeMin - Math.min(
//         (rTimeMin - lTimeMin) / (lMinTimelessTasksChain || 1),
//         (rTimeMin - lTimeMax) / (lMaxTimelessTasksChain || 1),
//       );
//     }
//
//     if (task.end - task.start < TASK_MIN_DURATION_MS) {
//       task.end = TASK_MIN_DURATION_MS + task.start;
//     }
//     if (task.end - task.start > TASK_MAX_AUTO_DURATION_MS) {
//       task.start = task.start - TASK_MAX_AUTO_DURATION_MS;
//     }
//     task.duration = task.end - task.start;
//     return task;
//   }).reverse();
// };
//
// var findCriticalPaths = function (tasks, tasksDict, headTaskClass) {
//
//   var lengths = {};
//   var stack = tasks.slice(0, tasks.length).reverse();
//   tasks.forEach(function (task) {
//     lengths[task.id] = 0;
//   });
//
//   var headToId = {};
//   var headToCriticalDependencyChains = {};
//   var idToHead = {};
//
//
//   while (stack.length > 0) {
//     var task = stack.pop();
//     if (task.class === headTaskClass) {
//       idToHead[task.id] = {};
//       idToHead[task.id][task.id] = true;
//       headToId[task.id] = {};
//       headToId[task.id][task.id] = true;
//       headToCriticalDependencyChains[task.id] = {};
//     }
//     task.dependencies.forEach(function (depId) {
//       Object.keys(idToHead[task.id] || {}).forEach(function (headId) {
//         headToId[headId][depId] = true;
//         idToHead[depId] = idToHead[depId] || {};
//         idToHead[depId][headId] = true;
//         if (lengths[depId] <= lengths[task.id] + tasksDict[depId].duration
//         || TASK_MIN_DURATION_MS) {
//           lengths[depId] = lengths[task.id] + tasksDict[depId].duration || TASK_MIN_DURATION_MS;
//           headToCriticalDependencyChains[headId][depId] = task.id;
//         }
//       });
//     });
//   }
//
//   var earliestByHead = {};
//   Object.keys(headToId).forEach(function (headId) {
//     earliestByHead[headId] = Object.keys(headToId[headId]).map(function (taskId) {
//       return [lengths[taskId], taskId];
//     }).sort(function (a, b) {
//       return a[0] < b[0] ? 1 : a[0] > b[0] ? -1 : 0;
//     }).map(function (pair) {
//       return pair[1];
//     });
//   });
//
//
//   var makePath = function (currentId, headId, path) {
//     path = path || [];
//     path.push(currentId);
//     if (headToCriticalDependencyChains[headId][currentId] !== undefined) {
//       makePath(headToCriticalDependencyChains[headId][currentId], headId, path);
//     }
//     return path;
//   };
//
//   return Object.keys(earliestByHead).map(function (startTask) {
//     return makePath(earliestByHead[startTask][0], startTask);
//   });
// };
//
// var paramsToString = function (paramsDict) {
//   return Object.keys(paramsDict || {}).sort().map(function (paramKey) {
//     return [paramKey, paramsDict[paramKey]].join(':');
//   }).join(' ');
// };
//
// var groupTasksByIntervals = function (dependencies) {
//   var intervalTree = new IntervalTree();
//   var noTimeIntervals = [];
//   dependencies.forEach(function (dep) {
//     if (!(dep.start && dep.end)) {
//       noTimeIntervals.push(dep);
//     } else {
//       var node = intervalTree.add([dep.start, dep.end]);
//       node.task = dep;
//     }
//   });
//   var intervals = noTimeIntervals ? [noTimeIntervals] : [];
//   if (intervalTree.root) {
//     var traverse = function (node, intervals, currentInterval) {
//       intervals = intervals || [];
//
//       if (currentInterval === undefined) {
//         currentInterval = [];
//         intervals.push(currentInterval);
//       }
//
//       if (node.interval) {
//         currentInterval.push(node.task);
//       }
//       if (node.left) {
//         if (node.left.interval[1] < node.interval[0]) {
//           traverse(node.left, intervals);
//         } else {
//           traverse(node.left, intervals, currentInterval);
//         }
//       }
//       if (node.right) {
//         if (node.right.interval[0] > node.interval[1]) {
//           traverse(node.right, intervals);
//         } else {
//           traverse(node.right, intervals, currentInterval);
//         }
//       }
//       return intervals;
//     };
//     intervals = traverse(intervalTree.root, intervals);
//   }
//   return intervals;
// };
//
// var makeConglomerate = function (tasks, tasksDict) {
//   if (!tasks) {
//     return;
//   }
//   var conglomerateId = 'conglomerate_' + tasks[0].id + '_' + tasks[0].class;
//   var conglomerate = {
//     id: conglomerateId,
//     isConglomerate: true,
//     name: conglomerateId,
//     class: tasks[0].class,
//     size: tasks.length,
//     tasks: tasks,
//     status: tasks.reduce(function (a, b) {
//       return TASK_STATUS_LEVELS[a.status] > TASK_STATUS_LEVELS[b.status] ? a.status : b.status;
//     }),
//     parametersList: {},
//     requiredFor: [],
//     dependencies: [],
//   };
//
//   tasksDict[conglomerateId] = conglomerate;
//   tasks.forEach(function (task) {
//     tasksDict[task.id].inConglomerate = true;
//   });
//
//   [
//     ['dependencies', 'requiredFor'],
//     ['requiredFor', 'dependencies'],
//   ].forEach(function (depAttrs) {
//     var depAttr = depAttrs[0];
//     var depAttrOpposite = depAttrs[1];
//
//     tasks.forEach(function (task) {
//       task[depAttr].forEach(function (depTaskId) {
//         tasksDict[depTaskId][depAttrOpposite] =
//          tasksDict[depTaskId][depAttrOpposite].filter(function (dependencyId) {
//           return dependencyId !== task.id;
//         });
//         tasksDict[depTaskId][depAttrOpposite].push(conglomerateId);
//         tasksDict[depTaskId][depAttrOpposite] =
//          makeUnique(tasksDict[depTaskId][depAttrOpposite]);
//       });
//       conglomerate[depAttr] = conglomerate[depAttr].concat(task[depAttr]);
//       task[depAttr] = [];
//     });
//
//     conglomerate[depAttr] = makeUnique(conglomerate[depAttr]).filter(function (depId) {
//       return depId !== conglomerateId;
//     });
//     conglomerate[depAttrOpposite] = makeUnique(conglomerate[depAttrOpposite])
//       .filter(function (depId) {
//         return depId !== conglomerateId;
//       });
//
//     conglomerate.start = tasks.map(function (task) {
//       return task.start;
//     }).reduce(function (a, b) {
//       if (a !== undefined && b !== undefined) {
//         return Math.min(a, b);
//       }
//
//     });
//     conglomerate.end = tasks.map(function (task) {
//       return task.end;
//     }).reduce(function (a, b) {
//       if (a !== undefined && b !== undefined) {
//         return Math.max(a, b);
//       }
//     });
//     conglomerate.duration = conglomerate.end - conglomerate.start;
//   });
//   return conglomerate;
// };
//
// var combineTasks = function (tasks, tasksDict) {
//   var conglomerates = [];
//   tasks.forEach(function (task) {
//     [
//       'dependencies',
//       'requiredFor',
//     ].forEach(function (depAttr) {
//       if (task.inConglomerate !== true) {
//
//         var dependenciesByClass = {};
//         task[depAttr].forEach(function (depId) {
//           var depTask = tasksDict[depId];
//           dependenciesByClass[depTask.class] = dependenciesByClass[depTask.class] || [];
//           dependenciesByClass[depTask.class].push(depTask);
//         });
//
//         Object.keys(dependenciesByClass).forEach(function (depClass) {
//           groupTasksByIntervals(dependenciesByClass[depClass]).forEach(
//             function (tasksInInterval) {
//               var filteredTasksInInterval = tasksInInterval.filter(function (intervalTask) {
//                 return intervalTask.inConglomerate !== true;
//               });
//               if (filteredTasksInInterval.length > CONGLOMERATE_TASKS_COUNT_THRESHOLD) {
//                 conglomerates.push(makeConglomerate(filteredTasksInInterval, tasksDict));
//               }
//             },
//           );
//         });
//       }
//     });
//   });
//   return tasks.filter(function (task) {
//     return task.inConglomerate !== true;
//   }).concat(conglomerates);
// };
//
//
// /**
//  * Input:
//  *
//  * @example:
//  * result = {
//  *   titles: ['a', 'b', ...],
//  *   rowKeys: ['a', 'b', ...],
//  *   dataArray: resultArray: [1,2,....,4,5,....],
//  * }
//  *
//  * @param matrixData
//  * @return {{nodes: *, links: Array, nodesDict}}
//  */
// const matrixToGraph = (matrixData) => {
//   console.log(matrixData);
//   const links = [];
//   const { rows, titles } = matrixData;
//
//   const nodesDict = {};
//   if (isEmpty(titles)) {
//     return {
//       nodes: [],
//       links,
//       nodesDict,
//     };
//   }
//   const nodes = titles.map((agentName, i) => {
//     const id = i + 1;
//     nodesDict[agentName] = id;
//     return {
//       id,
//       agent: agentName,
//       value: 1,
//     };
//   });
//
//   rows.forEach(
//     (row, rowIdx) => {
//       const agentAName = titles[rowIdx];
//       row.elements.forEach(
//         (col, colIdx) => {
//           if (rowIdx < colIdx) {
//             const weight = parseFloat(col) || 0.0;
//             const agentBName = titles[colIdx];
//             links.push({
//               source: nodesDict[agentAName],
//               target: nodesDict[agentBName],
//               weight: weight,
//             });
//           }
//         },
//       );
//     },
//   );
//   return {
//     nodes,
//     links,
//     nodesDict,
//   };
// };

module.exports = {
  toposort: toposort,
  matrixToGraph: matrixToGraph
};