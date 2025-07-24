import passport from 'passport'

// GET auth/google
export const GoogleController = passport.authenticate('google', {
  scope: ['profile', 'email'],
  prompt: 'select_account'
})

// GET auth/google/redirect middleware
export const GoogleRedirectMiddleware = passport.authenticate('google', {
  failureRedirect: '/',
  successReturnToOrRedirect: '/',
  failureMessage: true
})
