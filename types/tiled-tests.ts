import TiledMap, { TiledLayerTilelayer } from "tiled-types";

const sampleOrthogonal: TiledMap = {
    height: 20,
    infinite: false,
    compressionlevel: -1,
    layers: [
        {
            data: [ 93, 93, 93, 93, 93, 93, 93 ],
            height: 20,
            id: 1,
            name: "decors",
            opacity: 1,
            type: "tilelayer",
            visible: true,
            width: 20,
            x: 0,
            y: 0
        },
        {
            data: 'foo-bar',
            height: 20,
            id: 2,
            name: "obstacles",
            opacity: 1,
            type: "tilelayer",
            visible: false,
            width: 20,
            x: 0,
            y: 0
        },
        {
            data: [ 0, 0, 0, 0, 0 ],
            height: 20,
            id: 3,
            name: "init",
            opacity: 1,
            type: "tilelayer",
            visible: true,
            width: 20,
            x: 0,
            y: 0
        }
    ],
    nextlayerid: 4,
    nextobjectid: 1,
    orientation: "orthogonal",
    renderorder: "left-up",
    tiledversion: "1.2.4",
    tileheight: 64,
    tilesets: [
        {
            columns: 27,
            firstgid: 1,
            image: "map_2.png",
            imageheight: 1280,
            imagewidth: 1728,
            margin: 0,
            name: "map_main",
            spacing: 0,
            tilecount: 540,
            tileheight: 64,
            tilewidth: 64
        }
    ],
    tilewidth: 64,
    type: "map",
    version: 1.2,
    width: 20,
    properties: [
        {
            name: "azerty",
            type: "color",
            value: "#ffff5500"
        },
        {
            name: "foo",
            type: "string",
            value: "bar"
        },
        {
            name: "tata",
            type: "float",
            value: 8.89
        },
        {
            name: "titi",
            type: "file",
            value: "Links.txt"
        },
        {
            name: "toto",
            type: "bool",
            value: true
        },
        {
            name: "tutu",
            type: "int",
            value: 8
        },
        {
            name: "tyty",
            type: "object",
            value: 7
        }
    ]
};

const allTilelayers: TiledLayerTilelayer[] = sampleOrthogonal.layers
    .filter((l): l is TiledLayerTilelayer => l.type === 'tilelayer');
