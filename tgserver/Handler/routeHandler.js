const express = require('express');
const pscHandler = require('./pscHandler');


module.exports = function (app) {
    const paths = [
        { loc: '../routes/mainManager', api: '' },
        { loc: '../routes/gameManager', api: 'game' },
        { loc: '../routes/mailManager', api: 'mail' },
        { loc: '../routes/eventManager', api: 'event' },
        { loc: '../routes/itemManager', api: 'item' },
        { loc: '../routes/equipmentManager', api: 'equip' },
        { loc: '../routes/guildManager', api: 'guild' },
        { loc: '../routes/friendManager', api: 'friend' },
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

        let result = pscHandler.errorJson(404, 404, '❌ 요청한 URL을 찾을 수 없습니다.', false);

        await res.json(result);
    });
/*
    // 없는 API 처리
    app.route('/api/*').all(function (req, res, next) {
        next(`API_NOT_FOUND URL: [${req.method}] ${req.url} is not found.`);
    });
*/
};
