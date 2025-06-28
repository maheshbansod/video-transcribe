import App from '@/App';
import { SignInButton } from '@/components/SignInButton';
import { useAuth } from '@/hooks/auth'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { isSignedIn, isLoading } = useAuth();
  if (isLoading) {
    return <>Loading...</>
  }
  return <>
    {isSignedIn && <App />}
    {!isSignedIn && <div className='flex flex-col items-center justify-center'>
      <div>
        Log in to continue
      </div>
      <SignInButton />
    </div>}
  </>
}
