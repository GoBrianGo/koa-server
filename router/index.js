var smqq_worldcup_getGameInfo = require('../model/smqq/worldcup/getGameInfo')
var smsgz_smsgzGift_getStrategy = require('../model/smsgz/smsgzGift/getStrategy')
var smsgz_smsgzWeChatGift_getRecord = require('../model/smsgz/smsgzWeChatGift/getRecord')
var smsgz_smsgzWeChatGift_getReward = require('../model/smsgz/smsgzWeChatGift/getReward')
var smshd_drawSomething_approval = require('../model/smshd/drawSomething/approval')
var smshd_drawSomething_getAward = require('../model/smshd/drawSomething/getAward')
var smshd_drawSomething_getRandomRiddles = require('../model/smshd/drawSomething/getRandomRiddles')
var smshd_drawSomething_getRanks = require('../model/smshd/drawSomething/getRanks')
var smshd_drawSomething_getUserInfo = require('../model/smshd/drawSomething/getUserInfo')
var smshd_drawSomething_guess = require('../model/smshd/drawSomething/guess')
var smshd_drawSomething_share = require('../model/smshd/drawSomething/share')
var smshd_drawSomething_uploadRiddle = require('../model/smshd/drawSomething/uploadRiddle')
var twszqy_twszqyWinners_twszqylistWinners = require('../model/twszqy/twszqyWinners/twszqylistWinners')
module.exports = (router) => {

	router.get('/smqq/worldcup/getGameInfo', async (ctx) => {
		await smqq_worldcup_getGameInfo(ctx)
	})

	router.get('/smsgz/smsgzGift/getStrategy', async (ctx) => {
		await smsgz_smsgzGift_getStrategy(ctx)
	})

	router.get('/smsgz/smsgzWeChatGift/getRecord', async (ctx) => {
		await smsgz_smsgzWeChatGift_getRecord(ctx)
	})

	router.get('/smsgz/smsgzWeChatGift/getReward', async (ctx) => {
		await smsgz_smsgzWeChatGift_getReward(ctx)
	})

	router.get('/smshd/drawSomething/approval', async (ctx) => {
		await smshd_drawSomething_approval(ctx)
	})

	router.get('/smshd/drawSomething/getAward', async (ctx) => {
		await smshd_drawSomething_getAward(ctx)
	})

	router.get('/smshd/drawSomething/getRandomRiddles', async (ctx) => {
		await smshd_drawSomething_getRandomRiddles(ctx)
	})

	router.get('/smshd/drawSomething/getRanks', async (ctx) => {
		await smshd_drawSomething_getRanks(ctx)
	})

	router.get('/smshd/drawSomething/getUserInfo', async (ctx) => {
		await smshd_drawSomething_getUserInfo(ctx)
	})

	router.get('/smshd/drawSomething/guess', async (ctx) => {
		await smshd_drawSomething_guess(ctx)
	})

	router.get('/smshd/drawSomething/share', async (ctx) => {
		await smshd_drawSomething_share(ctx)
	})

	router.get('/smshd/drawSomething/uploadRiddle', async (ctx) => {
		await smshd_drawSomething_uploadRiddle(ctx)
	})

	router.get('/twszqy/twszqyWinners/twszqylistWinners', async (ctx) => {
		await twszqy_twszqyWinners_twszqylistWinners(ctx)
	})

	return router.routes()
}