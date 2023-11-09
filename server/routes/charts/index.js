const router = require('express').Router()

const {
  pieChart,
} = require('../../Controllers/charts/index')

router.get('/', async (req, res) => {
  return res.send('Chart Data service running...')
})

router.get('/pie-chart', async (req, res) => {
  await pieChart(req, res)
})

module.exports = router
