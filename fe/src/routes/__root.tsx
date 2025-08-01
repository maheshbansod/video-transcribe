import * as React from 'react'
import { Link, Outlet, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      {/*<div>Hello "__root"!</div>

      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>*/}
      <Outlet />
    </React.Fragment>
  )
}
