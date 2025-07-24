import express from 'express'

export const InfoController = (
  _req: express.Request,
  res: express.Response
) => {
  res.render('information', { title: 'Information' })
}
