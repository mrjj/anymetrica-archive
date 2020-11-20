/* @flow */
import React from 'react';
import G6Plugins from '@antv/g6/plugins/tool.d3.mapper';
import G6 from '@antv/g6';
import * as d3 from 'd3';
import { Card } from 'antd';


export class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      graph: {
        nodes: [],
        edges: [],
      },
    };
  }

  start() {
    const { containerID } = this.props;
    const { graph: graphData } = this.state;
    const Mapper = G6Plugins;
    if ((!graphData.nodes) || (graphData.nodes.length === 0)) {
      return;
    }

    G6.registerNode('rect', {
      getPath: function getPath(/* item */) {
        const width = 100; // 一半宽
        const height = 50; // 一半高
        return G6.Util.getRectPath(-width / 2, -height / 2, width, height, 10);
      },
      anchor: [
        [0.5, 1],
        [0.5, 0],
      ],
      draw: (item) => {
        const group = item.getGraphicGroup();
        const model = item.getModel();
        group.addShape('rect', {
          attrs: {
            x: 0,
            y: 0,
            width: 100,
            height: 40,
            fill: model.is_deleted ? 'lightgrey' : '#FAFAFA',
          },
        });
        group.addShape('text', {
          attrs: {
            x: 96,
            y: 0,
            fontSize: 12,
            fill: '#888888',
            text: model.type,
            textAlign: 'right',
            textBaseline: 'top',
          },
        });
        model.id.split('-').forEach((seg, segId) => {
          group.addShape('text', {
            attrs: {
              x: 4,
              y: 2 + (segId * 7),
              fontSize: 9,
              fill: '#333333',
              text: seg,
              textAlign: 'left',
              textBaseline: 'top',
            },
          });
        });
        return group.addShape('rect', {
          attrs: {
            x: 0,
            y: 0,
            width: 100,
            height: 40,
            stroke: model.is_deleted ? 'lightgrey' : 'lightblue',
          },
        });
      },
    });
    /* eslint-disable prefer-destructuring */
    const forceSimulation = d3.forceSimulation;
    const forceLink = d3.forceLink;
    const forceManyBody = d3.forceManyBody;
    const forceX = d3.forceX;
    const forceY = d3.forceY;
    const forceCollide = d3.forceCollide;
    /* eslint-enable prefer-destructuring */

    const nodeSizeMapper = new Mapper('node', 'degree', 'size', [8, 48], { legendCfg: null });
    const nodeColorMapper = new Mapper('node', 'type', 'color', ['#e18826', '#002a67']);
    let simulation = null;
    const graph = new G6.Graph({
      container: containerID,
      height: window.innerHeight,
      plugins: [nodeSizeMapper, nodeColorMapper],
      defaultIntersectBox: 'rect',
      modes: { default: ['rightPanCanvas'] },
      layout: function layout(nodes, edges) {
        if (simulation) {
          simulation.alphaTarget(0.3).restart();
        } else {
          simulation = forceSimulation(nodes)
            .force('charge', forceManyBody().strength(-100))
            .force('link', forceLink(edges).id(model => model.id))
            .force('collision', forceCollide().radius(model => model.size / 2 * 1.2))
            .force('y', forceY())
            .force('x', forceX())
            .on('tick', () => { graph.updateNodePosition(); });
        }
      },
    });
    graph.node({
      shape: 'rect',
      style: function style(model) {
        if (model.type === 'Group') {
          return {
            fill: '#EEEEEE',
            shadowColor: 'rgba(0,0,0, 0.3)',
            shadowBlur: 3,
            shadowOffsetX: 2,
            shadowOffsetY: 2,
            stroke: null,
          };
        }
        return {
          fill: '#FFFFAA',
          shadowColor: 'rgba(0,0,0, 0.3)',
          shadowBlur: 3,
          shadowOffsetX: 3,
          shadowOffsetY: 5,
          stroke: null,
        };
      },
      label: (model: { type: string, id: string }) => ({
        text: `${model.type || ''} ${model.id || ''}`,
        stroke: null,
        fill: '#555555',
        fontSize: 8,
      }),
    });

    graph.edge({
      style: function style() {
        return {
          endArrow: true,
          stroke: '#b3b3b3',
          lineWidth: 2,
        };
      },
    });
    graph.read(graphData);
    graph.translate(graph.getWidth() / 2, graph.getHeight() / 2);

    // eslint-disable-next-line no-void
    let subject = void 0;
    graph.on('mousedown', (ev) => {
      if (ev.domEvent.button === 0) {
        subject = simulation.find(ev.x, ev.y);
      }
    });

    graph.on('dragstart', (/* ev */) => {
      if (subject) { simulation.alphaTarget(0.3).restart(); }
    });

    graph.on('drag', (ev) => {
      if (subject) {
        subject.fx = ev.x;
        subject.fy = ev.y;
      }
    });


    function resetState() {
      if (subject) {
        simulation.alphaTarget(0);
        subject.fx = null;
        subject.fy = null;
        subject = null;
      }
    }

    graph.on('mouseup', resetState);
    graph.on('canvas:mouseleave', resetState);

    /*
    function tryHideLabel(node) {
      const model = node.getModel();
      const label = node.getLabel();
      const labelBox = label.getBBox();
      if (labelBox.maxX - labelBox.minX > model.size) {
        label.hide();
        graph.draw();
      }
    }
    */
    /*
    const nodes = graph.getNodes();
    const edges = graph.getEdges();
    */
    // edges.forEach((edge) => {
    //   edge.getGraphicGroup().set('capture', false);
    // });

    // nodes.forEach((node) => {
    //   const model = node.getModel();
    //   node.getGraphicGroup().set('label2', );
    // });

    /*
    nodes.forEach((node) => {
      tryHideLabel(node);
    });
    */

    /*
    graph.on('node:mouseenter', (ev) => {
      const item = ev.item;
      graph.toFront(item);
      // item.getLabel().show();
      graph.draw();
    });

    graph.on('node:mouseleave', (ev) => {
      const item = ev.item;
      tryHideLabel(item);
    });
    */
  }

  render() {
    // const {} = this.state;
    const { containerID } = this.props;

    return (
      <Card>
        <div
          className="container-g"
          id={containerID}
          ref={
            (ref) => {
              window.setTimeout(() => {
                if (ref) {
                  this.start();
                }
              }, 100);
            }
          }
        />
      </Card>
    );
  }
}
