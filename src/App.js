import React, {Component} from 'react';
import mapboxgl from 'mapbox-gl'
import axios from 'axios'

import _env from "./config/env"

import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      cityCode: "1f9352af60b0366b589326faf49a2343",
      year: 2000,
      selectedLayer: 1,
      selectedDataType: 1,
      map: null,
      numData: null
    }
  }

  setMeshColor(expArray) {
    let map = this.state.map;
    map.setPaintProperty("500m_mesh_layer", "fill-color", expArray);
    this.setState({map: map});
  }

  getThresholdColor(value) {
    const thresholds = _env.THRESHOLD2048;
    let color = "";
    for (let [key, colorValue] of Object.entries(thresholds)) {
      if (Number(key) > value) {
        break;
      } else {
        color = colorValue;
      }
    }
    return color;
  }

  async fetchNumData(map){
    const cityCode = this.state.cityCode;
      const selectedLayer = this.state.selectedLayer;
      const selectedDataType = this.state.selectedDataType;
      const year = this.state.year;
      const mapBounds = map.getBounds();
      let newBounds = {};
      newBounds["_southWest"] = mapBounds["_sw"];
      newBounds["_northEast"] = mapBounds["_ne"];
      await axios
        .get(`${_env.demoAPI}/numData`, {
          params: {
            cityCode: cityCode,
            year: year,
            selectedLayer: selectedLayer,
            selectedDataType: selectedDataType,
            mapBounds: newBounds
          }
        })
        .then(res => {
          this.setState({
            map: map
          })
          if (Object.keys(res.data).length > 0) {
            this.setState({numData: res.data});
          }
        });
  }

  async createMap(){
    let map = new mapboxgl.Map({
      accessToken: _env.mapboxAccessToken,
      container: this.container, // point map container by element id
        style: {
          version: 8,
          sources: {
            cyberjapandata_std: {
              type: "raster",
              tiles: [
                "https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png"
              ],
              tileSize: 256
            },
            cyberjapandata_pale: {
              type: "raster",
              tiles: [
                "https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png"
              ],
              tileSize: 256
            },
            "500m_mesh_source": {
              type: "vector",
              tiles: [
                "https://demo-sip7map.datacradle.jp/tile/data/japan_500m_mesh/{z}/{x}/{y}.pbf"
              ]
            }
          },
          layers: [
            {
              id: "cyberjapandata_std_layer", // 固有のid
              type: "raster",
              source: "cyberjapandata_std", // sourcesの対応するkey
              minzoom: 0,
              maxzoom: 18
            },
            {
              id: "cyberjapandata_pale_layer", // 固有のid
              type: "raster",
              source: "cyberjapandata_pale", // sourcesの対応するkey
              minzoom: 0,
              maxzoom: 18
            },
            {
              id: "500m_mesh_layer",
              type: "fill",
              source: "500m_mesh_source",
              "source-layer": "japan_500m_mesh",
              paint: {
                "fill-color": "rgba(0,0,0,0)",
                "fill-outline-color": "rgba(0,0,0,0)"
              }
            }
          ]
        },
        center: [132.45944, 34.39639],
        zoom: 11
    });
    map.addControl(new mapboxgl.NavigationControl());
    await this.fetchNumData(map)
  }

  componentDidMount(){
    Promise.all([this.createMap()]).then(() => {
      const numData = this.state.numData;
      let expressionList = ["case"];
      for (let [key, value] of Object.entries(numData)) {
        let color = this.getThresholdColor(value);
        expressionList.push(["==", ["get", "GRID_CODE"], key]);
        expressionList.push(color);
      }
      expressionList.push("rgba(0,0,0,0)");
      this.setMeshColor(expressionList);
    });
  }

  render(){
    return (
      <div className={'map'} ref={e => (this.container = e)} />
    );
  }
}

export default App;
