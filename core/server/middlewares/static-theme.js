'use strict';

import express from 'express';
import path from 'path';

export const initStaticTheme = () => {
    return function setStatic(req, res, next) {
        let pathSite = path.join(__dirname, "../../../website/core/")
        return express.static(path.join(pathSite, 'public'))(req, res, next);
    }
}