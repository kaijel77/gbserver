const express = require('express');
const tgRouteHandler = require('../Handler/tgRouteHandler');


module.exports = function (app) {
    const paths = [
        { loc: '../routes/mainManager', api: '' },
        { loc: '../routes/gameManager', api: 'game' },
    ];
    console.log('======= routes loading... =======');
    for (let p of paths) {
        console.log('| file: ', p.loc, ' \t|');
        const v = require(p.loc);
        if (v === null) {
            console.log('[WARN] Not Found File: ' + p.loc);
            process.exit(1);
        }
        app.use('/' + p.api, v);
    }
    console.log('====== routes load finish =======');

    
    ///////////////////////////////////////////////////////////////////////////
    //
    // ✅ 정의되지 않은 라우트 처리 (404)
    //
    app.use(async (req, res, next) => {

    let result = tgRouteHandler.errorJson(404, 404, '❌ 요청한 URL을 찾을 수 없습니다.', false);

    await res.json(result);
    });
};
