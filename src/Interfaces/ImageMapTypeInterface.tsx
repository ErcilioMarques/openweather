export default interface ImageMapTypeInterface {
    /**
     * Alt text to display when this MapType&#39;s button is hovered over in the
     * MapTypeControl. Optional.
     */
    alt: string|null;
    /**
     * Returns a tile for the given tile coordinate (x, y) and zoom level. This
     * tile will be appended to the given ownerDocument. Not available for base
     * map types.
     * @param tileCoord Tile coordinates.
     * @param zoom Tile zoom.
     * @param ownerDocument The document which owns this tile.
     */
    getTile(
        tileCoord: google.maps.Point|null, zoom: number,
        ownerDocument: Document|null): Node|null;
    /**
     * The maximum zoom level for the map when displaying this MapType. Required
     * for base MapTypes, ignored for overlay MapTypes.
     */
    maxZoom: number;
    /**
     * The minimum zoom level for the map when displaying this MapType.
     * Optional; defaults to 0.
     */
    minZoom: number;
    /**
     * Name to display in the MapTypeControl. Optional.
     */
    name: string|null;
    /**
     * The Projection used to render this MapType. Optional; defaults to
     * Mercator.
     */
    projection: google.maps.Projection|null;
    /**
     * Radius of the planet for the map, in meters. Optional; defaults to
     * Earth&#39;s equatorial radius of 6378137 meters.
     */
    radius: number;
    /**
     * Releases the given tile, performing any necessary cleanup. The provided
     * tile will have already been removed from the document. Optional.
     * @param tile Tile to release.
     */
    releaseTile(tile: Node|null): void;
    /**
     * The dimensions of each tile. Required.
     */
    tileSize: google.maps.Size|null;
  }