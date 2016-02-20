import express from 'express'

import expense from './resources/expense'

// ## //

const router = express.Router()

router.version = 'v1'

router.useOn = app => {
    return app.use(
        `/${router.version}`,
        router
    )
}

router.use(
    (req, res, next) => {
        req.routerVersion = router.version

        res.redirectToResource = (resource, id) => {
            res.redirect(`
                /${encodeURIComponent(router.version)}
                /${encodeURIComponent(resource)}
                /${encodeURIComponent(id)}
            `)
        }

        next()
    }
)

router.use('/expenses', expense)

// ## //

export default router
