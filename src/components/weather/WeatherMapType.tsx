import ImageMapTypeInterface from "../../Interfaces/ImageMapTypeInterface";

export const weatherMapType = (props: {
  layer?: string;
  zoomLevel?: number;
  XtileCoord?: number;
  yTileCoord?: number;
}) => ({
  getTileUrl: function (coord: google.maps.Point, zoom: number) {
    var normalizedCoord = getNormalizedCoord(coord, zoom);
    if (!normalizedCoord) {
      return null;
    }
    var bound = Math.pow(2, zoom);
    return `https://tile.openweathermap.org/map/${props.layer} / ${props.zoomLevel} / ${props.XtileCoord} / ${props.yTileCoord}
    }.png?appid=${process.env.REACT_APP_OPEN_WEATHER_API_URL}`;
  },
  tileSize: { width: 250, height: 250 },
  maxZoom: 9,
  minZoom: 0,
  name: "weatherMapType",
});

function getNormalizedCoord(coord: google.maps.Point, zoom: number) {
  var y = coord.y;
  var x = coord.x;

  // tile range in one direction range is dependent on zoom level
  // 0 = 1 tile, 1 = 2 tiles, 2 = 4 tiles, 3 = 8 tiles, etc
  var tileRange = 1 << zoom;

  // don't repeat across y-axis (vertically)
  if (y < 0 || y >= tileRange) {
    return null;
  }

  // repeat across x-axis
  if (x < 0 || x >= tileRange) {
    x = ((x % tileRange) + tileRange) % tileRange;
  }

  return { x: x, y: y };
}
