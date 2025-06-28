import StyledFirebaseAuth from '@/components/StyledFirebaseAuth';
import { createFileRoute } from '@tanstack/react-router'

// todo: let's move this to firebase file


export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
  </div>
}
