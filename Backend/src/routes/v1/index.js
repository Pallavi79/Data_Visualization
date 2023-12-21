const express = require('express');
const router = express.Router();

const { InfoController, DashboardController } = require('../../controllers');

router.get('/info', InfoController.info);

router.get('/dashboard', DashboardController.dashboard);

router.get('/optionlist', DashboardController.aggregatedOptionList);

router.post('/filter', DashboardController.filterData);

module.exports = router;