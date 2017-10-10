"use strict";

angular.module('pandora')

.factory('localMediaService', [function() {

         var _media = [
                { type: "G", imageUrl: "assets/img/BP-Europa.png", name: "BP-Europa.png", dmxFolderId: 1, dmxFileId: 1 }, 
                { type: "G", imageUrl: "assets/img/Jerusalem_32x9.png", name: "Jerusalem_32x9.png", dmxFolderId: 1, dmxFileId: 2 }, 
                { type: "G", imageUrl: "assets/img/Peres_1_32x9.png", name: "Peres_1_32x9.png", dmxFolderId: 1, dmxFileId: 3 }, 
                { type: "V", imageUrl: "assets/img/Grenzkontrollen-Deutschland-Austria.png", name: "Grenzkontrollen-Deutschland-Austria.png", dmxFolderId: 1, dmxFileId: 4 },
                { type: "G", imageUrl: "assets/img/Peres_3_32x9.png", name: "Peres_3_32x9.png", dmxFolderId: 1, dmxFileId: 5 },
                { type: "V", imageUrl: "assets/img/Titel-m-HG.png", name: "Titel-m-HG.png", dmxFolderId: 1, dmxFileId: 6 }
        ];

  return {
    media: _media 
  };

}]);


