(function () {
    'use strict';
    if (window.jsb) {
		var subGameName = "HelloWorld";
        
        /// 1.初始化资源Lib路径Root.
        var subgameSearchPath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/')+"ALLGame/"+ subGameName +"/";

        /// 2.subgame资源未映射，则初始化资源映射表，否则略过映射.
        console.log("cc.HallAndSubGameGlobal:"+ cc.HallAndSubGameGlobal);
		if(!cc.HallAndSubGameGlobal) {
			cc.HallAndSubGameGlobal = {};
		}
		console.log("cc.HallAndSubGameGlobal.subgameGlobal:"+ cc.HallAndSubGameGlobal.subgameGlobal);
        if(!cc.HallAndSubGameGlobal.helloWorldGlobal){
            cc.HallAndSubGameGlobal.helloWorldGlobal = {};

            /// 加载settings.js
            window.require(subgameSearchPath + 'src/settings.js');
            var settings = window._CCSettings;
            window._CCSettings = undefined;
            
//             settings["scenes"].push({"url":"db://assets/Scene/Lobby.fire","uuid":"a5rbZbg0JLWorMdDq0GSao"});


			console.log("settings.debug:"+ settings.debug);
            if ( !settings.debug ) {
                var uuids = settings.uuids;

                var rawAssets = settings.rawAssets;
                var assetTypes = settings.assetTypes;
                var realRawAssets = settings.rawAssets = {};
                for (var mount in rawAssets) {
                    var entries = rawAssets[mount];
                    var realEntries = realRawAssets[mount] = {};
                    for (var id in entries) {
                        var entry = entries[id];
                        var type = entry[1];
                        // retrieve minified raw asset
                        if (typeof type === 'number') {
                            entry[1] = assetTypes[type];
                        }
                        // retrieve uuid
                        realEntries[uuids[id] || id] = entry;
                    }
                }

                var scenes = settings.scenes;
                for (var i = 0; i < scenes.length; ++i) {
                    var scene = scenes[i];

                    if (typeof scene.uuid === 'number') {
                        scene.uuid = uuids[scene.uuid];
                    }
                }

                var packedAssets = settings.packedAssets;
                for (var packId in packedAssets) {
                    var packedIds = packedAssets[packId];
                    for (var j = 0; j < packedIds.length; ++j) {
                        if (typeof packedIds[j] === 'number') {
                            packedIds[j] = uuids[packedIds[j]];
                        }
                    }
                }
            }

            /// 加载project.js
            var projectDir = 'src/project.js';
            if ( settings.debug ) {
                projectDir = 'src/project.dev.js';
            }
            require(subgameSearchPath + projectDir);

            /// 如果当前搜索路径没有subgame，则添加进去搜索路径。
            var currentSearchPaths = jsb.fileUtils.getSearchPaths();
            if(currentSearchPaths && currentSearchPaths.indexOf(subgameSearchPath) === -1){
                jsb.fileUtils.addSearchPath(subgameSearchPath, true);
                console.log(subGameName +" main.js 之前未添加，添加下subgameSearchPath" + currentSearchPaths);
            }

var libraryPath = 'res/import';
libraryPath = libraryPath.replace(/\\/g, '/');
var _libraryBase = cc.path.stripSep(libraryPath) + '/';
var _rawAssetsBase = 'res/raw-';
var md5AssetsMap = settings.md5AssetsMap;
if (md5AssetsMap) {
    var md5Pipe = new MD5Pipe(md5AssetsMap, _libraryBase, _rawAssetsBase);
    cc.loader.insertPipeAfter(cc.loader.assetLoader, md5Pipe);
    cc.loader.md5Pipe = md5Pipe;
}

var resources = cc.loader;
var rawAssets = settings.rawAssets;
if (rawAssets) {
    for (var mountPoint in rawAssets) {
        var assets = rawAssets[mountPoint];
        for (var uuid in assets) {
        	var info = assets[uuid];
            var url = info[0];
            var typeId = info[1];
            var type = cc.js._getClassById(typeId);
            if (!type) {
                cc.error('Cannot get', typeId);
                continue;
            }
                    
            //cc.AssetLibrary.getAssetByUuid(uuid) = new RawAssetEntry(mountPoint + '/' + url, type);
                    
            if (mountPoint === 'assets') {
            var ext = cc.path.extname(url);
            if (ext) {
                // trim base dir and extname
                url = url.slice(0, - ext.length);
            }
            var isSubAsset = info[2] === 1;
                // register
                resources._resources.add(url, uuid, type, !isSubAsset);
            }
                    
        }
    }
}

if (settings.packedAssets) {
    PackDownloader.initPacks(settings.packedAssets);
}

console.log("before:"+ cc.url._rawAssets);
cc.url._init(_rawAssetsBase + 'assets');
console.log("after:"+ cc.url._rawAssets);


//             cc.AssetLibrary.init({
//                 libraryPath: 'res/import',
//                 rawAssetsBase: 'res/raw-',
//                 rawAssets: settings.rawAssets,
//                 packedAssets: settings.packedAssets,
//                 md5AssetsMap: settings.md5AssetsMap
//             });


            cc.HallAndSubGameGlobal.helloWorldGlobal.launchScene = settings.launchScene;

			console.log("before cc.game._sceneInfos.length:"+ cc.game._sceneInfos.length);
            /// 将subgame的场景添加到cc.game中，使得cc.director.loadScene可以从cc.game._sceneInfos查找到相关场景
            for(var i = 0; i < settings.scenes.length; ++i){
                cc.game._sceneInfos.push(settings.scenes[i]);
            }
            
            console.log("settings.scenes.length:"+ settings.scenes.length);
            console.log("after cc.game._sceneInfos.length:"+ cc.game._sceneInfos.length);
//             for(var i = 0; i < settings.scenes.length; ++i){
//                 console.log("scene "+ i +" :"+ cc.game._sceneInfos[i].toString());
//             }
            
        }

        /// 3.加载初始场景
        var launchScene = cc.HallAndSubGameGlobal.helloWorldGlobal.launchScene;
        cc.director.loadScene(launchScene, null,
            function () {
                console.log(subGameName +" main.js 成功加载初始场景" + launchScene);
            }
        );
    }
})();
