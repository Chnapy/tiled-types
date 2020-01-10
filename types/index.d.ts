// TypeScript Version: 3.7

// Definitions for Tiled 1.3.1
// Project: https://github.com/bjorn/tiled#readme
//
// Types made with help of Tiled documentation
// https://doc.mapeditor.org/en/stable/reference/json-map-format

// --TILESET--

/**
 * @see https://doc.mapeditor.org/en/stable/reference/json-map-format/#point
 */
export interface Point {
    x: number;
    y: number;
}

/**
 * @see https://doc.mapeditor.org/en/stable/reference/json-map-format/#tileset
 */
export interface TiledTileset {
    columns: number;
    firstgid: number;
    grid?: TiledGrid;
    image?: string;
    imagewidth?: number;
    imageheight?: number;
    margin: number;
    name: string;
    properties?: TiledProperty[];
    spacing: number;
    terrains?: TiledTerrain[];
    tilecount: number;
    tileheight: number;
    tileoffset?: { x: number; y: number; };
    tiles?: TiledTile[];
    tilewidth: number;
    transparentcolor?: string;
    type?: 'tileset';
    wangsets?: any; // TODO
}

/**
 * @see https://doc.mapeditor.org/en/stable/reference/json-map-format/#grid
 */
export interface TiledGrid {
    orientation: 'orthogonal' | 'isometric';
    width: number;
    height: number;
}

/**
 * @see https://doc.mapeditor.org/en/stable/reference/json-map-format/#tile-definition
 */
export interface TiledTile {
    animation?: TiledFrame[]; // TODO
    id: number;
    image?: string;
    imageheight?: number;
    imagewidth?: number;
    objectgroup?: TiledLayerObjectgroup<any>;
    properties?: TiledProperty[];
    terrain?: number[];
    type?: string;
}

/**
 * @see https://doc.mapeditor.org/en/stable/reference/json-map-format/#frame
 */
export interface TiledFrame {
    duration: number;
    tileid: number;
}

/**
 * @see https://doc.mapeditor.org/en/stable/reference/json-map-format/#terrain
 */
export interface TiledTerrain {
    name: string;
    tile: number;
}

// --LAYER--

/**
 * @see https://doc.mapeditor.org/en/stable/reference/json-map-format/#chunk
 */
export interface TiledChunk {
    data: number[] | string;
    height: number;
    width: number;
    x: number;
    y: number;
}

/**
 * @see https://doc.mapeditor.org/en/stable/reference/json-map-format/#object
 */
export interface TiledObject<T extends TiledMapType> {
    ellipse?: boolean;
    gid: T extends 'tilelayer' ? number : never;
    height: number;
    id: number;
    name: string;
    point?: boolean;
    polygon?: Point[];
    polyline?: Point[];
    properties: TiledProperty[];
    rotation: number;
    template?: string;
    text?: { text: string; wrap: boolean; };
    type: string;
    visible: boolean;
    width: number;
    x: number;
    y: number;
}

export type TiledLayerType = 'tilelayer' | 'objectgroup' | 'imagelayer' | 'group';

export interface TiledLayerAbstract<T extends TiledLayerType> {
    id: number;
    name: string;
    type: T;
    x: number;
    y: number;
    width: number;
    height: number;
    offsetx?: number;
    offsety?: number;
    opacity: number;
    properties?: TiledProperty[];
    visible: boolean;
}

export interface TiledLayerTilelayer extends TiledLayerAbstract<'tilelayer'> {
    type: 'tilelayer';
    chunks?: TiledChunk[];
    compression?: 'zlib' | 'gzip' | '';
    data?: number[];    // | string ?
    encoding?: 'csv' | 'base64';
    transparentcolor?: string;
}

export interface TiledLayerObjectgroup<O extends TiledMapType> extends TiledLayerAbstract<'objectgroup'> {
    type: 'objectgroup';
    draworder: 'topdown' | 'index';
    objects: Array<TiledObject<O>>;
}

export interface TiledLayerImagelayer extends TiledLayerAbstract<'imagelayer'> {
    type: 'imagelayer';
    image: string;
}

/**
 * @see https://doc.mapeditor.org/en/stable/reference/json-map-format/#layer
 */
export type TiledLayer<O extends TiledMapType> = TiledLayerTilelayer | TiledLayerObjectgroup<O> | TiledLayerImagelayer;

// --MAP--

export type TiledMapType = 'orthogonal' | 'isometric' | 'staggered' | 'hexagonal';

export interface TiledMapAbstract<O extends TiledMapType> {
    type: 'map';
    version: number;
    tiledversion: string;
    width: number;
    height: number;
    tileheight: number;
    tilewidth: number;
    infinite: boolean;
    orientation: O;
    backgroundcolor?: string;
    nextlayerid: number;
    nextobjectid: number;
    properties?: TiledProperty[];
    layers: Array<TiledLayer<any>>;
    tilesets: TiledTileset[];
}

export interface TiledMapIsometric extends TiledMapAbstract<'isometric'> {
    orientation: 'isometric';
}

export interface TiledMapHexAndStag {
    staggeraxis: 'x' | 'y';
    staggerindex: 'odd' | 'even';
}

export type RenderOrder = 'left-down' | 'left-up' | 'right-down' | 'right-up';

export interface TiledMapOrthogonal extends TiledMapAbstract<'orthogonal'> {
    orientation: 'orthogonal';
    renderorder: RenderOrder;
}

export interface TiledMapHexagonal extends TiledMapAbstract<'hexagonal'>, TiledMapHexAndStag {
    orientation: 'hexagonal';
    hexsidelength: number;
}

export interface TiledMapStaggered extends TiledMapAbstract<'staggered'>, TiledMapHexAndStag {
    orientation: 'staggered';
}

/**
 * @see https://doc.mapeditor.org/en/stable/reference/json-map-format/#map
 */
export type TiledMap = TiledMapOrthogonal
    | TiledMapIsometric
    | TiledMapHexagonal
    | TiledMapStaggered;

// --PROPERTY--

export type TiledPropertyValue = string | number;

export type TiledPropertyType = 'string' | 'int';

/**
 * @see https://doc.mapeditor.org/en/stable/reference/json-map-format/#property
 */
export interface TiledPropertyAbstract<V extends TiledPropertyValue, T extends TiledPropertyType> {
    name: string;
    value: V;
    type: T;
}

export type TiledProperty =
    TiledPropertyAbstract<string, 'string'>
    | TiledPropertyAbstract<number, 'int'>;

export {};

export default TiledMap;
